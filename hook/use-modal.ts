import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members";


interface ModalData {
    server?: any
    // server?: Server
}

interface Modal {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const useModal = create<Modal>((set) => ({
    type: null,
    isOpen: false,
    data: {},
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null })
}))