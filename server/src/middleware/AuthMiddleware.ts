import { Request, Response, NextFunction } from "express";
import { AccountService } from "../services/AccountService";
import { ErrorResponse } from "../types/response";

declare global {
  namespace Express {
    interface Request {
      accountId?: string;
    }
  }
}

const authService = new AccountService();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json(ErrorResponse('Unauthorized', null, 401));
    }

    const token = authHeader.substring(7);
    const decoded = authService.verifyAccessToken(token);
    
    req.account = decoded.account;
    next();
  } catch (error) {
    res.status(401).json(ErrorResponse('Unauthorized', (error as Error).message, 401));
  }
}
