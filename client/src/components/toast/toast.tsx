import type { Toast } from "../../contexts/toast-context";

const ToastComponent: React.FC<Toast> = (toast: Toast) => {
    
    return (
        <div className={`bg-white shadow rounded flex px-2 py-1 border-l-3 ${toast.type === "success" ? "border-green-500" : "border-red-500"}`}>
            <div className="flex items-center">
                {toast.type === "success" && (<i className="fa-solid fa-circle-check text-green-500 mr-2"></i>)}
                {toast.type === "error" && (<i className="fa-solid fa-circle-xmark text-red-500 mr-2"></i>)}
            </div>
            <span>
                {toast.message}
            </span>
        </div>
    )
}

export default ToastComponent;