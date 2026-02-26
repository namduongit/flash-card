import { createContext, useState, useRef } from "react";

type ConfirmPayload = {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
};

interface ConfirmContextType {
    isOpen: boolean;
    payload: ConfirmPayload | null;
    openConfirm: (payload: ConfirmPayload) => Promise<boolean>;
    closeConfirm: () => void;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [payload, setPayload] = useState<ConfirmPayload | null>(null);
    
    /**
     * resolveConfirm
     * + func(value: boolean): void
     * + null
     * - Get is: resolveConfirm.current?.(true) to set value of the promise when user click "Confirm"
     */
    const resolveConfirm = useRef<((value: boolean) => void) | null>(null);

    /**
     * When call openConfirm: const result = await showConfirm("Title", "Message");
     * - It will open the confirm dialog with the provided title and message.
     * - The function will return a promise that resolves to true if the user clicks "Confirm" and false if the user clicks "Cancel".
     * - The value return is Promise<boolean<: true or false
     */
    const openConfirm = (payload: ConfirmPayload): Promise<boolean> => {
        return new Promise((resolve) => {
            setPayload(payload);
            setIsOpen(true);
            resolveConfirm.current = resolve;
        });
    }

    const closeConfirm = () => {
        setIsOpen(false);
        setPayload(null);
    }

    const handleConfirm = () => {
        resolveConfirm.current?.(true);
        closeConfirm();
    }

    const handleCancel = () => {
        resolveConfirm.current?.(false);
        closeConfirm();
    }

    return (
        <ConfirmContext.Provider value={{ isOpen, payload,  openConfirm, closeConfirm }}>
            {isOpen && payload && (
                <div className="fixed top-0 left-0 bg-gray-500/40 w-full h-full flex items-center justify-center z-100">
                    <div className="confirm w-96 bg-white shadow-lg rounded">
                        <div className="px-4 py-2 border-b border-gray-300">
                            <h3 className="text-lg font-bold">{payload.title}</h3>
                        </div>
                        <div className="p-4">
                            <p>{payload.message}</p>
                        </div>
                        <div className="flex justify-end gap-2 px-4 py-2 pb-4">
                            <button
                                onClick={handleCancel}
                                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                {payload.cancelText || "Hủy"}
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                {payload.confirmText || "Xác nhận"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </ConfirmContext.Provider>
    );
};

export { ConfirmContext, ConfirmProvider }
