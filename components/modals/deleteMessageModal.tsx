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
import qs from "query-string";
import { deleteMessage } from "@/app/api/MessageApi";

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const [isLoading, setIsLoading] = useState(false);



  const DeleteMessage = async () =>{
    try {
        setIsLoading(true);
        const token = sessionStorage.getItem('token');
        const url = qs.stringifyUrl({
          url: apiUrl || "",
          query
        })
        await deleteMessage(token, url);
        onClose();
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
            Xóa tin nhắn
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Bạn có chắc chắn muốn xóa tin nhắn này?
            Tin nhắn sẽ bị xóa vĩnh viễn.
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
                onClick={DeleteMessage} 
                className="bg-indigo-400 text-white hover:bg-indigo-500 duration-100"
                >
                    Xóa tin nhắn
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}