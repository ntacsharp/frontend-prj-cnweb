"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { updateUserProfile } from "@/app/api/UserApi";

import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";
import { useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { FileUpload } from "../file-upload";

const formSchema = z.object({
    displayName: z.string().min(1, {
        message: "Tên hiển thị là bắt buộc."
    }),
    avatarUrl: z.string().url({
        message: "URL ảnh đại diện không hợp lệ."
    }).optional(),
});

export const EditProfileModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type } = useModal();
    
    const isModalOpen = isOpen && type === "editProfile";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            displayName: "",
            avatarUrl: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            form.setValue("displayName", window.sessionStorage.getItem('name')??'');
            form.setValue("avatarUrl", window.sessionStorage.getItem('avatarUrl')??'');
        }
    }, [window.sessionStorage, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await updateUserProfile(values,window.sessionStorage.getItem('token'));
            form.reset();
            router.refresh();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={() => { form.reset(); onClose(); }}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Chỉnh sửa hồ sơ
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField
                                    control={form.control}
                                    name="avatarUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <FileUpload
                                                    endpoint="avatarImageUploader"
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                
                            </div>
                            <FormField
                                control={form.control}
                                name="displayName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-500 font-bold uppercase">
                                            Tên hiển thị
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nhập tên hiển thị"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        
                           
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button disabled={isLoading} className="bg-blue-600 text-white hover:bg-indigo-500/90">
                                Lưu
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
