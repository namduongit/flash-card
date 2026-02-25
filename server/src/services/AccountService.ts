import { AccountRepository } from "../repositories/AccountRepository";
import { IAccount } from "../types/index";
import { RestResponse, SuccessResponse } from "../types/response";
import { LoginRes, RegisterRes, RefreshTokenRes, CheckTokenRes, VerifyTokenRes } from "../types/responses/account-response";
import { BcyptHashing } from "../utils/bcrypt";
import { JsonWebToken } from "../utils/jsonwt";

export class AccountService {
  private accountRepository: AccountRepository;
  private bcryptService: BcyptHashing;
  private jwtService: JsonWebToken;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.bcryptService = new BcyptHashing();
    this.jwtService = new JsonWebToken();
  }

  async register(data: IAccount): Promise<RestResponse<RegisterRes> & { refreshToken: string }> {
    const existingAccount = await this.accountRepository.findByEmail(data.email);
    if (existingAccount) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await this.bcryptService.hashPlainResource(data.password);

    const account = await this.accountRepository.create({
      email: data.email,
      password: hashedPassword
    });

    const { accessToken, refreshToken } = this.jwtService.generateTokens(account._id.toString(), account.email);

    const response = SuccessResponse({
      account: { _id: account._id.toString(), email: account.email },
      accessToken: accessToken
    });

    return { ...response, refreshToken };
  }

  async login(email: string, password: string): Promise<RestResponse<LoginRes> & { refreshToken: string }> {
    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await this.bcryptService.compareResource(password, account.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const { accessToken, refreshToken } = this.jwtService.generateTokens(account._id.toString(), account.email);

    const response = SuccessResponse({
      account: { _id: account._id.toString(), email: account.email },
      accessToken: accessToken
    });

    return { ...response, refreshToken };
  }

  async refreshAccessToken(refreshToken: string): Promise<RestResponse<RefreshTokenRes>> {
    try {
      const decoded = this.jwtService.verifyRefreshToken(refreshToken);
      const accessToken = this.jwtService.generateAccessToken(decoded.account._id, decoded.account.email);
      return SuccessResponse({ accessToken });
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }
  }

  async checkTokenExpiry(token: string): Promise<RestResponse<CheckTokenRes>> {
    try {
      const status = this.jwtService.checkTokenExpiry(token);
      return SuccessResponse(status);
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  // Other service, used for valid token in middleware 
  verifyAccessToken(token: string): VerifyTokenRes {
    const decoded = this.jwtService.verifyAccessToken(token);
    return { account: decoded.account };
  }
}