"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
}
    from "@/components/ui/dialog"
import { useModal } from "@/hook/use-modal";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCcw } from "lucide-react";
import { useOrigin } from "@/hook/use-origin";
import { useState } from "react";
import axios from "axios";
import { generateNewLink } from "@/app/api/ServerApi";

export const InviteModal = () => {
    const { isOpen, onOpen, onClose, type, data } = useModal();
    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";
    const { server } = data;
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }

    const onNew = async () => {
        console.log("abc");
        try {
            setIsLoading(true);
            //const resp = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            const resp = await generateNewLink(server?.id, process.env.token);
            onOpen("invite", { server: resp.data });
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center text-2xl font-bold">
                        Tuỳ chỉnh máy chủ của bạn
                    </DialogTitle>
                </DialogHeader>
                <div className="p-6">
                    <Label>
                        Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 
                            focus-visible:ring-0 text-black 
                            focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button disabled={isLoading} size="icon" onClick={onCopy}>
                            {copied
                                ? <Check className="w-4 h-4" />
                                : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={isLoading}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4">
                        Tạo một đường dẫn mới
                        <RefreshCcw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}