"use client";

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod"

import {createServer} from "@/app/api/ServerApi";

import {Dialog,DialogContent,DialogDescription,
        DialogFooter,DialogHeader,DialogTitle} 
from "@/components/ui/dialog"

import { Form,FormControl,FormField,FormItem,FormLabel,FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { FileUpload } from "../file-upload";
import { redirect, useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";

const formSchema = z.object({
    name: z.string().min(1,{
        message: "Tên máy chủ là bắt buộc."
    }),
    imageUrl: z.string().min(1, {
        message: "Ảnh máy chủ là bắt buộc"
    })
})

export const CreateServerModal = () =>{
    const router = useRouter();
    const {isOpen, onClose, type} = useModal();

    const isModalOpen = isOpen && type === "createServer";
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        try {
            const token = sessionStorage.getItem('token');
            if(!token) redirect("/login");
            const response = await createServer(values, token)
            const id = response.data.id;
            form.reset();
            window.location.reload();
            router.push(`/servers/${id}`);
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                   <DialogTitle className="text-center text-2xl font-bold">
                   Tuỳ chỉnh máy chủ của bạn
                   </DialogTitle>
                   <DialogDescription className="text-center text-zinc-500">
                   Tạo cho máy chủ của bạn một cái tên và ảnh. Bạn luôn có thể chỉnh sửa nó sau này
                   </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} 
                    className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control = {form.control}
                                    name = "imageUrl"
                                    render = {({field})=>(
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload 
                                                    endpoint = "serverImageUploader"
                                                    value = {field.value}
                                                    onChange = {field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name = "name"
                                render = {({field})=>(
                                    <FormItem>
                                        <FormLabel 
                                        className="text-xs text-zinc-500 font-bold uppercase">
                                            Tên máy chủ
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className = "bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0" 
                                                placeholder = "Nhập tên máy chủ" 
                                                {...field}
                                            />  
                                            
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                    
                        </div>
                        <DialogFooter className = "bg-gray-100 px-6 py-4" >
                        <Button disabled={isLoading} className="bg-indigo-600 text-white hover:bg-indigo-500/90">
                            Tạo mới
                        </Button>
                    </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}