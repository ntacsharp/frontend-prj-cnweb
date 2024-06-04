
import { Channel } from "@/model/Channel";
import { ChannelType } from "@/model/ChannelType";
import { Server } from "@/model/Server";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members" | "createChannel" | "leaveServer" | "deleteServer" | "deleteChannel" | "editChannel" | "messageFile" | "deleteMessage" | "editProfile" | "changePassword" | "createUser" | "updateUser" | "deleteUser";


// Data nhan vao cua modal
interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  id? : string;
  username? : string;
  displayname? : string;
  status? : string
}


interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {
    id: ""
  },
  isOpen: false,
  onOpen: (type, data = {
    id: ""
  }) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false })
}));
