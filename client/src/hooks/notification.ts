import { useContext } from "react";
import { ToastContext } from "../contexts/toast-context";

export const useNotification = () => {
    const useToast = useContext(ToastContext);

    const showSuccess = (message: string) => {
        useToast?.addToast(message, "success");
    };

    const showError = (message: string) => {
        useToast?.addToast(message, "error");
    };

    return { showSuccess, showError };
};
