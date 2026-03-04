import { createContext } from "react";
import { useToast } from "../../hooks/toast";
import { useMessage } from "../../hooks/message";
import type { MessageType } from "./message-context";
import type { ErrorType } from "../../common/response.type";

interface NotificationContextType {
    openNotification: (props: NotificationProps) => void;
}

type ErrorProps = ErrorType

type SuccessProps = string;

type MessageProps = {
    isWait: boolean;
    message: MessageType
    & { func?: () => void }
}

type NotificationProps = {
    eProps?: ErrorProps;
    sProps?: SuccessProps;
    mProps?: MessageProps;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const { showError, showSuccess } = useToast();
    const { addMessage, awaitMessage } = useMessage();

    const openNotification = async (props: NotificationProps) => {
        if (props.eProps) {
            Array.isArray(props.eProps) ? 
                props.eProps.forEach(err => showError(err)) : 
                showError(props.eProps);
        }
        if (props.sProps) {
            showSuccess(props.sProps);
        }
        if (props.mProps) {
            if (props.mProps.isWait) {
                await awaitMessage(props.mProps.message);
            } else {
                addMessage(props.mProps.message);
            }
            if (props.mProps.message.func) {
                props.mProps.message.func(); 
            }
        }
    }

    return (
        <NotificationContext.Provider value={{ openNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}

export { NotificationContext, NotificationProvider };