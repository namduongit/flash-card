import { useState } from "react";
import type { ErrorType, HttpMessage } from "../common/response.type";

interface ExecuteOptions {
    isConfirm?: boolean;
}

/**
 * 
 * @RestResponse<T>
 * {
 *  status: number;
 *  message: HttpMessage;
 *  error: ErrorType;
 *  data: T;
 * } 
 * 
 * 
 * apiCall will retuen a response. To do: parse from response: data, message, error, ...
 */

type ExecuteResult<T> = {
    status: number;
    data: T;
    error: ErrorType;
    message: HttpMessage;
} | null;

export const useExecute = () => {
    const [isLoading, setIsLoading] = useState(false);

    const execute = async <T,>(
        apiCall: Promise<any>,
        options: ExecuteOptions = {}
    ): Promise<ExecuteResult<T>> => {
        if (options) {

        }

        try {
            setIsLoading(true);

            const response = await apiCall;
            
            setIsLoading(false);

            return {
                status: response.data.status,
                data: response.data.data,
                error: response.data.error,
                message: response.data.message
            }
        } catch (error: any) {
            setIsLoading(false);
            return null;
        }
    }

    return { execute, isLoading };
}
