import React, { useState } from "react";

type ToastType = "success" | "error";

type Toast = {
  id: string,
  message: string,
  type: ToastType
}

interface ToastContextType {
  addToast: (message: string, type: ToastType) => void,
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
    <ToastContext.Provider value={{ addToast }}>
      <div className="fixed top-5 right-5 space-y-2 z-100">
        {toasts.map((toast, idx) => (
          <div key={idx} className={`toast bg-white shadow rounded flex px-4 py-3 border-l-4 ${toast.type === "success" ? "border-green-500" : "border-red-500"}`}>
            <div className="flex items-center">
              {toast.type === "success" && (<i className="fa-solid fa-circle-check text-green-500 mr-2"></i>)}
              {toast.type === "error" && (<i className="fa-solid fa-circle-xmark text-red-500 mr-2"></i>)}
            </div>
            <span className="text-sm font-semibold">
              {toast.message}
            </span>
          </div>
        ))}
      </div>

      {children}
    </ToastContext.Provider>
  );
}

export { ToastContext, ToastProvider }
export type { ToastContextType }