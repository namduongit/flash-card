import { createContext, useState } from "react";
import type { ErrorType, RestResponse } from "../../common/response.type";
import { MessageContext, type MessageContextType, type Message, type MessageType } from "../providers/message-context";
import { ConfirmContext, type ConfirmContextType } from "../providers/confirm-context";
import { ToastContext, type ToastContextType } from "../providers/toast-context";

import { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { AuthContext, type AuthContextType } from "../providers/authentication-context";
import { requireContext } from "../../utils/require-context";

type ExecuteResult<T> = {
    data?: T,
    error?: ErrorType,
    dialog?: {
        isWait: boolean;
        message: MessageType,
        func?: () => void
    }
} | null;

type ExecuteQueryOptions = {
    isConfirm?: boolean,
    success?: {
        isWait?: boolean,
        message?: Message,
        toast?: string
    },
    error?: {
        isWait?: boolean,
        message?: Message,
        toast?: string
    }
}

type EntryConfigOptions = {
    _retry?: boolean;
    _networkError?: boolean;
}

interface ExecuteContextType {
    ExecuteQuery: () => {
        execute: <T, >(apiService: Promise<any>, opts?: ExecuteQueryOptions) => Promise<ExecuteResult<T>>,
        isLoading: boolean
    }
}

const ExecuteContext = createContext<ExecuteContextType | undefined>(undefined);

const ExecuteProvider = ({ children }: { children: React.ReactNode }) => {
    const confirmContext = requireContext<ConfirmContextType>(ConfirmContext);
    const toastContext = requireContext<ToastContextType>(ToastContext);
    const messageContext = requireContext<MessageContextType>(MessageContext);

    const authContext = requireContext<AuthContextType>(AuthContext);

    const ExecuteQuery = () => {
        const [isLoading, setIsLoading] = useState<boolean>(false);

        const execute = async <T,>(
            apiService: Promise<any>,
            opts?: ExecuteQueryOptions
        ): Promise<ExecuteResult<T>> => {
            const { isConfirm, success, error } = opts || {};

            if (isConfirm) {
                const confirmed = await confirmContext.openConfirm({
                    title: "Xác nhận hành động",
                    message: "Bạn có chắc chắn muốn thực hiện hành động này không?"
                });
                if (!confirmed) return null;
            }

            console.log("Executing API service with options:", opts);

            try {
                setIsLoading(true);
                const response: AxiosResponse<RestResponse<T>> = await apiService;
                /**
                 * response.data is RestResponse<T> type
                 * Structure: {
                 *     status: number,
                 *     message: string,
                 *     error: ErrorType,
                 *     data: T
                 * }
                 * -> return data field as ExecuteResult<T> type
                 */
                setIsLoading(false);
                const result = {
                    data: response.data.data
                } as ExecuteResult<T>;

                if (success) {
                    if (success.toast) {
                        toastContext.addToast(success.toast, "success");
                    }
                    if (success.message) {
                        if (success.isWait) {
                            await messageContext.waitMessage(success.message);
                        } else {
                            messageContext.addMessage({
                                title: success.message.title || "Thao tác thành công",
                                content: success.message.content || "Hành động đã được thực hiện thành công",
                                type: success.message.type || "success"
                            });
                        }
                    }
                }

                return result;
            }
            catch (err: unknown) {
                setIsLoading(false);
                console.log("Error in ExecuteQuery:", err);
                if (err instanceof AxiosError) {
                    // Case 1: Error declared in Component call
                    if (error) {
                        if (error.toast) {
                            toastContext.addToast(error.toast, "error");
                        }
                        if (error.message) {
                            if (error.isWait) {
                                await messageContext.waitMessage(error.message);
                            } else {
                                messageContext.addMessage(error.message || {
                                    title: "Đã có lỗi xảy ra",
                                    content: "Có lỗi đã xảy ra trong quá trình thực hiện hành động",
                                    type: "error"
                                });
                            }
                        }
                    }

                    // Case 2: Network error or Unauthorized error
                    const entryConfig = err.config as InternalAxiosRequestConfig & EntryConfigOptions;
                    console.log("Error config:", entryConfig);
                    if (entryConfig) {
                        if (entryConfig._networkError) {
                            messageContext.addMessage({
                                title: "Có lỗi xảy ra phía máy chủ",
                                content: "Có vẻ máy chủ đang gặp sự cố không thể xử lý yêu cầu, vui lòng thử lại sau ít phút.",
                                type: "error"
                            });
                        }
                        if (entryConfig._retry) {
                            await messageContext.waitMessage({
                                title: "Phiên làm việc đã hết hạn",
                                content: "Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ.",
                                type: "message",
                            });
                            authContext.clearAuthState();
                            window.location.href = "/auth/login";
                        }
                    }
                    return null;
                }
            }


            return null;
        }

        return { execute, isLoading }
    }


    return (
        <ExecuteContext.Provider value={{ ExecuteQuery }}>
            {children}
        </ExecuteContext.Provider>
    )
}

export { ExecuteContext, ExecuteProvider }
export type { ExecuteContextType }