type HttpMessage = 'Success' | 'Failed' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Internal Server Error';
type ErrorType = string | string[] | null;

export type RestResponse<T> = {
    status: number;
    message: HttpMessage;
    error: ErrorType;
    data: T;
}

export const SuccessResponse = <T>(data: T, opts: {
    message?: HttpMessage;
    statusCode?: number;
} = {}): RestResponse<T> => {
    const { message = 'Success', statusCode = 200 } = opts;
    return {
        status: statusCode,
        message,
        error: null,
        data
    };
}

export const ErrorResponse = <T = null>(message: HttpMessage, error: ErrorType = null, statusCode = 400): RestResponse<T> => ({
    status: statusCode,
    message,
    error,
    data: null as any
});