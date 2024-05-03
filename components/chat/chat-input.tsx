"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { sendMessage } from "@/app/api/MessageApi"
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Plus, Smile } from 'lucide-react';
import { redirect } from 'next/navigation';

interface ChatInputProps {
    apiUrl: string;
    serverId: string | undefined;
    channelId: string | string[] | undefined;
    name: string;
    type: "conversation" | "channel";
}

const formSchema = z.object({
    content: z.string().min(1)
});

const ChatInput = ({
    apiUrl,
    serverId,
    channelId,
    name,
    type
}: ChatInputProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            const token = sessionStorage.getItem('token');
            if(!token) redirect("/login");
            const response = await sendMessage(token, serverId, channelId, value);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative p-4 pb-6'>
                                    <button
                                        type="button"
                                        onClick={() => { }}
                                        className='absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center'
                                    >
                                        <Plus className='text-white dark:text-[#31]' />
                                    </button>
                                    <Input
                                        disabled={isLoading}
                                        className='px-14 py-6 bg-zinc-200/9 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-00 dark:text-zinc-200'
                                        placeholder={`Message ${type === "conversation" ? name : "#" + name}`}
                                        {...field}
                                    />
                                    <div className='absolute top-7 right-8'>
                                        <Smile />
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default ChatInput
