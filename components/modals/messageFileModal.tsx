"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

import qs from "query-string"

import axios from "axios";

import {Dialog,DialogContent,DialogDescription,
        DialogFooter,DialogHeader,DialogTitle} 
from "@/components/ui/dialog"

import { Form,FormControl,FormField,FormItem,FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";

const formSchema = z.object({
    fileUrl: z.string().min(1,{
        message: "Cần có tệp đính kèm"
    }),
  
})

export const MessageFileModal = () =>{
    const router = useRouter();

    
    const {isOpen, onClose, type, data} = useModal();
    const isModalOpen = isOpen && type === "messageFile";
    const {apiUrl, query} = data;


  

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: ""
        }
    })

    const handleClose = () => {
       form.reset();
       onClose();
    }

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            const url = qs.stringifyUrl({
                  url : apiUrl || "",
                  query,
            });
            
            axios.post(url,{
                ...values,
                Content : values.fileUrl,
            })
            
            form.reset();
            router.refresh();
            onClose();
        
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                   <DialogTitle className="text-center text-2xl font-bold">
                   Đính kèm file
                   </DialogTitle>
                   <DialogDescription className="text-center text-zinc-500">
                   Đính kèm file vào tin nhắn
                   </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control = {form.control}
                                    name = "fileUrl"
                                    render = {({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint = "messageFile"
                                                    value = {field.value}
                                                    onChange = {field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                    
                        </div>
                        <DialogFooter className = "bg-gray-100 px-6 py-4" >
                        <Button disabled={isLoading} className="bg-blue-600 text-white hover:bg-indigo-500/90">
                            Gửi
                        </Button>
                    </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}