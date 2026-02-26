import { useContext, useState } from "react";
import type { ErrorType, HttpMessage } from "../common/response.type";
import { AxiosError } from "axios";
import { MessageContext } from "../contexts/message-context";

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
    const useMessageContext = useContext(MessageContext);

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
            if (error instanceof AxiosError) {
                if (error.response) {
                    // Do anything with error.response.data
                    
                    // Case: Network error
                    if (error.response.data) {
                        if (error.response.data.status === 500 && error.response.data.error === "Network error or server is unreachable") {
                            useMessageContext?.addMessage({
                                title: "Có lỗi xảy ra phía máy chủ",
                                content: "Có vẻ máy chủ đang gặp sự cố không thể xử lý yêu cầu, vui lòng thử lại sau ít phút. Gửi báo cáo lỗi tới email: namduongit@hotmail.com nếu lỗi vẫn tiếp diễn.",
                                type: "error"
                            });
                        }
                    }
                }
            }
            setIsLoading(false);
            return null;
        }
    }

    return { execute, isLoading };
}
