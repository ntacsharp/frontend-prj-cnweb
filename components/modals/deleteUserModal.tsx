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
import { deleteUser } from "@/app/api/UserApi";

export const DeleteUserModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  

  const isModalOpen = isOpen && type === "deleteUser";
  const userId = data.id;

  const [isLoading, setIsLoading] = useState(false);



  const DeleteUser = async () =>{
    try {
        setIsLoading(true);
        // call api từ back end 
        await deleteUser(userId,window.sessionStorage.getItem('token'));
       
        onClose();
        
        window.location.reload();
    }
    catch (error) {
        console.error(error);
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
            Xóa tài khoản
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Bạn có chắc chắn muốn xóa tài khoản này? 
            <br />
            
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
                onClick={DeleteUser} 
                className="bg-red-400 text-white hover:bg-red-500 duration-100"
                >
                    Xóa 
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}