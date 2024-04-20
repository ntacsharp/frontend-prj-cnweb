"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hook/use-modal";
import { useRouter } from "next/navigation";
import { deleteChannel } from "@/app/api/ChannelApi";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server,channel } = data;

  const [isLoading, setIsLoading] = useState(false);



  const DeleteChannel = async () =>{
    try {
        console.log(channel?.id);
        setIsLoading(true);
        // call api từ back end 
        // await deleteChannel(server?.id,channel?id,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiIyIiwiaWF0IjoxNzEzNDk4NTIwLCJleHAiOjE3MTM3MTQ1MjB9.3Mkm6n9BMXJcJyWsHeX23JlBRu15eFHbk-BwUOmUa_w');
        onClose();
        router.refresh();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        setIsLoading(false);
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Xóa kênh
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Bạn có chắc chắn muốn xóa kênh này? 
            <br />
            <span className="font-semibold text-indigo-500">{channel?.name} sẽ bị xóa vĩnh viễn.</span>
         </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between w-full">
                <Button 
                disabled={isLoading} 
                onClick={() => {onClose}} variant="ghost">
                    Hủy
                </Button>
                <Button
                disabled={isLoading}
                onClick={DeleteChannel} 
                className="bg-indigo-400 text-white hover:bg-indigo-500 duration-100"
                >
                    Xóa kênh
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}