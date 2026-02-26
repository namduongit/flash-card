import React, { useState } from "react";
import ToastComponent from "../components/toast/toast";

type ToastType = "success" | "error";

export type Toast = {
    id: string,
    message: string,
    type: ToastType
}

interface ToastContextType {
    toasts: Toast[],
    addToast: (message: string, type: ToastType) => void,
    removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    const newToast: Toast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
        <div className="fixed top-5 right-5 space-y-2 z-100">
            {toasts.map((toast, idx) => (<ToastComponent key={idx} {...toast} />))}
        </div>

      {children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider }