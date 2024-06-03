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
import { deleteServer } from "@/app/api/ServerApi";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);



  const DeleteServer = async () =>{
    try {
        setIsLoading(true);
        const token = sessionStorage.getItem('token');
        // call api từ back end 
        await deleteServer(server?.id,token);
        onClose();
        router.refresh();
        window.location.href = "/servers/1";
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
            <span className="font-semibold text-indigo-500">{server?.name} sẽ bị xóa vĩnh viễn.</span>
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
                onClick={DeleteServer} 
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