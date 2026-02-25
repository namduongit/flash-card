import jwt from "jsonwebtoken";

type TokenPayload = {
  account: {
    _id: string,
    email: string
  },
  type: "access" | "refresh",
  app: string,
  UTCTime: string
  iat?: number,
  exp?: number
}

export class JsonWebToken {
  private jwtSecret: string;
  private refreshSecret: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    this.refreshSecret = process.env.REFRESH_SECRET || "your-refresh-secret";
  }

  /**
   * Generate access token (1 hour expiry)
   */
  generateAccessToken(id: string, email: string): string {
    return jwt.sign({
      account: {
        _id: id,
        email: email
      },
      type: "access",
      app: "flash-card",
      UTCTime: new Date().toISOString()
    } as TokenPayload, this.jwtSecret, { expiresIn: "1h" });
  }

  /**
   * Generate refresh token (7 days expiry)
   */
  generateRefreshToken(id: string, email: string): string {
    return jwt.sign({
      account: {
        _id: id,
        email: email
      },
      type: "refresh",
      app: "flash-card",
      UTCTime: new Date().toISOString()
    } as TokenPayload, this.refreshSecret, { expiresIn: "7d" });
  }

  /**
   * Generate both tokens
   */
  generateTokens(id: string, email: string): { accessToken: string; refreshToken: string } {
    const accessToken = this.generateAccessToken(id, email);
    const refreshToken = this.generateRefreshToken(id, email);
    return { accessToken, refreshToken };
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired access token");
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.refreshSecret) as TokenPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  /**
   * Check token expiry
   */
  checkTokenExpiry(token: string): {
    isValid: boolean,
    account: {
      _id: string,
      email: string
    },
    expiresIn: number | null
  } {
    try {
      const decoded = jwt.decode(token) as TokenPayload;
      if (!decoded || !decoded.exp) {
        return { isValid: false, account: { _id: "", email: "" }, expiresIn: null };
      }
      const expiresIn = decoded.exp * 1000 - Date.now();
      return { isValid: expiresIn > 0, account: decoded.account, expiresIn };
    } catch (error) {
      return { isValid: false, account: { _id: "", email: "" }, expiresIn: null };
    }
  }
}