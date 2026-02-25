import { Request, Response, NextFunction } from "express";
import { ErrorResponse, RestResponse } from "../types/response";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const messageErr = err.message || 'Internal Server Error';
    if (messageErr.includes('Cannot destructure property')) {
        const response = ErrorResponse("Failed", null, 400);
        return res.status(response.status).json(response);
    }

    // Error when throw new Error
    const response = ErrorResponse("Failed", messageErr, 400);
    return res.status(response.status).json(response);
};
