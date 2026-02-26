import type { Toast } from "../../contexts/toast-context";

const ToastComponent: React.FC<Toast> = (toast: Toast) => {
    
    return (
        <div className={`toast bg-white shadow rounded flex px-4 py-3 border-l-4 ${toast.type === "success" ? "border-green-500" : "border-red-500"}`}>
            <div className="flex items-center">
                {toast.type === "success" && (<i className="fa-solid fa-circle-check text-green-500 mr-2"></i>)}
                {toast.type === "error" && (<i className="fa-solid fa-circle-xmark text-red-500 mr-2"></i>)}
            </div>
            <span className="text-sm font-semibold">
                {toast.message}
            </span>
        </div>
    )
}

export default ToastComponent;