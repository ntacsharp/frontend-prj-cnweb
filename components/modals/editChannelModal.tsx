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
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";
import { usePathname } from 'next/navigation';
import { useEffect } from "react";
import { ChannelType } from "@/model/ChannelType";


const allowedTypes = ["TEXT", "AUDIO", "VIDEO"];

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Tên kênh là bắt buộc."
    }).refine(
        name => name !== 'general',
        { message: "Tên kênh không được phép là general" }
    ),
    type: z.string().refine(
        type => allowedTypes.includes(type)
    )
});

export const EditChannelModal = () => {

    const router = useRouter();
    const pathname = usePathname();
    
    const { isOpen, onClose, type ,data} = useModal();
    const {server , channel} = data;
  
    const isModalOpen = isOpen && type === "editChannel";

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            type: ""
        }
    })

    const serverId = pathname.split("/")[2];

    const isLoading = form.formState.isSubmitting;

    // Set gia tri channelType theo moi loai kenh khi them moi
    useEffect(() => {
        if (channel){
            form.setValue("type",channel.type);
            form.setValue("name",channel.name);
        }
        else{
            form.setValue("type",ChannelType.TEXT)
        }
    },[channel,form])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values);

            // const response = await editChannel(values,serverId, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiIyIiwiaWF0IjoxNzEzNDk4NTIwLCJleHAiOjE3MTM3MTQ1MjB9.3Mkm6n9BMXJcJyWsHeX23JlBRu15eFHbk-BwUOmUa_w');
            form.reset();
            router.refresh();
            onClose();
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={() => { form.reset(); onClose(); }}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Chỉnh sửa kênh
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8">
                        <div className="space-y-8 px-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="text-xs text-zinc-500 font-bold uppercase">
                                            Tên kênh
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={isLoading}
                                                className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                                placeholder="Nhập tên kênh"
                                                {...field}
                                            />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Loại kênh</FormLabel>
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black
                                                ring-offset-0 focus:ring-offset-0 capitalize outline-none">

                                                    <SelectValue placeholder="Chọn loại kênh"></SelectValue>

                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {allowedTypes.map((type) => {
                                                    return (
                                                        <SelectItem key={type} value={type} className="capitalize">
                                                            {type.toLowerCase()}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4" >
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