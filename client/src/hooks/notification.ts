import { useContext } from "react";
import { ToastContext } from "../contexts/toast-context";

export const useNotification = () => {
    const { addToast } = useContext(ToastContext);

    const showSuccess = (message: string) => {
        addToast(message, "success");
    };

    const showError = (message: string) => {
        addToast(message, "error");
    };

    return { showSuccess, showError };
};
