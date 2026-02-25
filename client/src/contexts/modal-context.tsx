import React, { createContext, useState } from "react";

export type ModalType = "add-lesson" | "add-word" | null;

interface ModalContextType {
    modalType: ModalType;
    modalData?: any;
    openModal: (type: ModalType, data?: any) => void;
    closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modalType, setModalType] = useState<ModalType>(null);
    const [modalData, setModalData] = useState<any>(null);

    const openModal = (type: ModalType, data?: any) => {
        setModalType(type);
        setModalData(data);
    };

    const closeModal = () => {
        setModalType(null);
        setModalData(null);
    };

    return (
        <ModalContext.Provider value={{ modalType, modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
