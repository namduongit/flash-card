import { Request, Response, NextFunction } from "express";
import { ErrorResponse, RestResponse } from "../types/response";

type ValidatorError = {
    errors: {
        title: {
            name: string;
            message: string;
            properties: Object;
            kind: string;
            path: string;
            value: string;
        }
    },
    _message: string;
    name: string,
    message: string
}


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error:", JSON.parse(JSON.stringify(err)));
    let messageErr = err.message || 'Internal Server Error';

    // Handle specific error for destructuring undefined (e.g., from missing fields in request body)
    if (messageErr.includes('Cannot destructure property')) {
        const response = ErrorResponse("Failed", null, 400);
        return res.status(response.status).json(response);
    }

    // Handle Mongoose validation errors
    const parsedError = JSON.parse(JSON.stringify(err)) as ValidatorError;
    if (parsedError._message) {
        messageErr = parsedError._message;
    }

    // Error when throw new Error
    const response = ErrorResponse("Failed", messageErr, 400);
    return res.status(response.status).json(response);
};
