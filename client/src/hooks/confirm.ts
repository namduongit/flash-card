import { useContext } from "react";
import { ConfirmContext } from "../contexts/confirm-context";

export const useConfirm = () => {
    const confirmContext = useContext(ConfirmContext);

    if (!confirmContext) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }

    const showConfirm = async (
        title: string,
        message: string,
        options?: {
            confirmText?: string;
            cancelText?: string;
        }
    ): Promise<boolean> => {
        return confirmContext.openConfirm({
            title,
            message,
            confirmText: options?.confirmText,
            cancelText: options?.cancelText,
        });
    };

    return { showConfirm };
};
