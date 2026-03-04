export type HttpMessage = 'Success' | 'Failed' | 'Unauthorized' | 'Forbidden' | 'Not Found' | 'Internal Server Error';
export type ErrorType = string | string[] | null;

export type RestResponse<T> = {
    status: number;
    message: HttpMessage;
    error: ErrorType;
    data: T;
}