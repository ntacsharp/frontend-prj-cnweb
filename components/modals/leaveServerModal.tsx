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
import { leaveServer } from "@/app/api/ServerApi";

export const LeaveServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data;

  const [isLoading, setIsLoading] = useState(false);



  const onClick = async () =>{
    try {
        const token = sessionStorage.getItem('token');
        setIsLoading(true);
        // call api từ back end 
        await leaveServer(server?.id,token);
        onClose();
        router.refresh();
        window.location.href = "/servers/1"
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
            Rời server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            'Bạn có chắc chắn muốn rời server không ?' <span className="font-semibold text-indigo-500">{server?.name}</span>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button
              disabled={isLoading}
              onClick={onClose}
              variant="ghost"
            >
              Hủy
            </Button>
            <Button
              disabled={isLoading}
              variant='destructive'
              onClick={onClick}
            >
              Xác nhận
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}