"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"


import {
    Dialog, DialogContent, 
    DialogFooter, DialogHeader, DialogTitle
}
    from "@/components/ui/dialog"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";
import { usePathname } from 'next/navigation';
import { updateUser } from "@/app/api/UserApi";


const allowedTypes = ["TEXT", "AUDIO", "VIDEO"];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formSchema = z.object({

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

export const UpdateUserModal = () => {

    const router = useRouter();
    const pathname = usePathname();

    const { isOpen, onClose, type, data } = useModal();
    const userId = data.id;
    
    const isModalOpen = isOpen && type === "updateUser";
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
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
            console.log(values);
            const response = await updateUser(userId,values.username, values.password, values.displayname, window.sessionStorage.getItem("token"));
           
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
                        Chỉnh sửa tài khoản
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="space-y-8 px-6">

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
                                Sửa
                            </Button>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}