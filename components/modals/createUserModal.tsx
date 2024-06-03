"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"

import { createChannel } from "@/app/api/ChannelApi";

import {
    Dialog, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle
}
    from "@/components/ui/dialog"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { ChannelType } from "@/model/ChannelType";
import { createUser } from "@/app/api/UserApi";


const allowedTypes = ["TEXT", "AUDIO", "VIDEO"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formSchema = z.object({
    email: z.string().min(1, {
        message: "email là bắt buộc."
    }).refine(
        email => emailRegex.test(email),
        { message: "Email không hợp lệ" }
    ),
    password: z.string().min(8, {
        message: "Mật khẩu lớn hơn 8 ký tự"
    }),
    username: z.string().min(1, {
        message: "username là bắt buộc."
    }),
    displayname: z.string().min(1, {
        message: "username là bắt buộc."
    })
});

export const CreateUserModal = () => {

    
    const pathname = usePathname();

    const { isOpen, onClose, type, data } = useModal();
   

    const isModalOpen = isOpen && type === "createUser";
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
            displayname: ""
        }
    })

    const serverId = pathname?.split("/")[2];


    const isLoading = form.formState.isSubmitting;

    // Set gia tri channelType theo moi loai kenh khi them moi


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            const response = await createUser(values.username, values.email, values.password, values.displayname, window.sessionStorage.getItem("token"));
           
            form.reset();
            onClose();
            window.location.reload();
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={() => { form.reset(); onClose(); }}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Tạo tài khoản mới
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="space-y-8 px-6">

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="text-xs text-zinc-500 font-bold uppercase">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nhập email"
                                                {...field}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="text-xs text-zinc-500 font-bold uppercase">
                                            Mật khẩu
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nhập mật khẩu"
                                                {...field}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="text-xs text-zinc-500 font-bold uppercase">
                                            Username
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nhập username"
                                                {...field}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="displayname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="text-xs text-zinc-500 font-bold uppercase">
                                            Display Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nhập displayname"
                                                {...field}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4" >
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