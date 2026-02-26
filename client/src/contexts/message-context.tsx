import { createContext, useState, type JSX } from "react";

type MessageType = {
    type: "message" | "success" | "error";
    title: string;
    content: string;
}

interface MessageContextType {
    addMessage: (message: MessageType) => void;
    removeMessage: (index: number) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessages] = useState<MessageType | null>(null);

    const addMessage = (message: MessageType) => {
        setMessages(message);
    }

    const removeMessage = () => {
        setMessages(null);
    }

    const MessageIcon: JSX.Element = <i className="fa-solid fa-circle-info text-blue-500"></i>
    const SuccessIcon: JSX.Element = <i className="fa-solid fa-circle-check text-green-500"></i>
    const ErrorIcon: JSX.Element = <i className="fa-solid fa-circle-xmark text-red-500"></i>

    return (
        <MessageContext.Provider value={{ addMessage, removeMessage }}>
            {message && (
                <div className="fixed top-0 left-0 bg-gray-500/40 w-full h-full flex items-center justify-center z-100">
                    <div className="message w-120 bg-white shadow-lg rounded">
                        <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-300">
                            {message.type === "message" && MessageIcon}
                            {message.type === "success" && SuccessIcon}
                            {message.type === "error" && ErrorIcon}
                            <h3 className="text-lg font-bold">{message.title}</h3>
                        </div>
                        <div className="p-4">
                            <p>{message.content}</p>
                        </div>
                        <div className="flex justify-end px-4 py-2 pb-4">
                            <button
                                onClick={() => removeMessage()}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {children}
        </MessageContext.Provider >
    )
}

export { MessageContext, MessageProvider }