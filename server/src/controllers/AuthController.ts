import { Request, Response } from "express";
import { AccountService } from "../services/AccountService";

export class AuthController {
    private authService: AccountService;
    constructor() {
        this.authService = new AccountService();
    }

    async register(req: Request, res: Response) {
        const { email, password } = req.body;

        const result = await this.authService.register({ email, password });
        const { refreshToken, ...responseData } = result;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(responseData.status).json(responseData);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await this.authService.login(email, password);
        const { refreshToken, ...responseData } = result;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(responseData.status).json(responseData);
    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies.refreshToken;
        const result = await this.authService.refreshAccessToken(refreshToken);

        res.status(result.status).json(result);
    }

    async checkToken(req: Request, res: Response) {
        const token = req.headers.authorization?.split(' ')[1] || '';
        const result = await this.authService.checkTokenExpiry(token);
        
        res.status(result.status).json(result);
    }
}