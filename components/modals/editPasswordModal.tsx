"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";
import { changePassword } from "@/app/api/UserApi";
import {
    Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Mật khẩu hiện tại là bắt buộc."),
    newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự."),
    confirmPassword: z.string().min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự.")
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
    path: ["confirmPassword"]
});

export const ChangePasswordModal = () => {
    const router = useRouter();
    const { isOpen, onClose, type } = useModal();
    const isModalOpen = isOpen && type === "changePassword";

    const form = useForm({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof passwordSchema>) => {

        const token = window.sessionStorage.getItem('token');
        if (!token) {
            throw new Error('Authentication token is missing');
        }
        try {
            const response = await changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword },token);
            console.log(response)
            form.reset();
            if(response.status === 200 && response.config.method === "put"){
                window.sessionStorage.clear();
            }
            location.reload()
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
                        Đổi mật khẩu
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-500 font-bold uppercase">
                                            Mật khẩu hiện tại
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black"
                                                placeholder="Nhập mật khẩu hiện tại"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-500 font-bold uppercase">
                                            Mật khẩu mới
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black"
                                                placeholder="Nhập mật khẩu mới"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs text-zinc-500 font-bold uppercase">
                                            Xác nhận mật khẩu
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black"
                                                placeholder="Xác nhận mật khẩu mới"
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
                                Đổi mật khẩu
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
