"use client"

import { Plus, Settings} from "lucide-react";
import { MyTooltip } from "../tool-tip";
import { useModal } from "@/hook/use-modal";
import { Server } from "@/model/Server";
import { ChannelType } from "@/model/ChannelType";
import { MemberRole } from "@/model/MemberRole";

interface ServerSectionProps {
    label: string,
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: Server;
}

export const ServerSection = ({label, role, sectionType,channelType,server}:ServerSectionProps) =>{
    const {onOpen} = useModal();
    return (
        <div className="flex items-center justify-between py-2">
            <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
                {label}
            </p>
            {role!== MemberRole.GUEST && sectionType === "channels" && (
                <MyTooltip label="Tạo kênh" side="top">
                    <button 
                        onClick={() => onOpen("createChannel",{channelType})}
                        className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                        <Plus className="h-4 w-4 mr-2"/>
                        
                    </button>
                </MyTooltip>
                
            )}
            {role=== MemberRole.ADMIN && sectionType === "members" && (
                <MyTooltip label="Quản lý thành viên">
                <button 
                    onClick={() => onOpen("members",{server})}
                    className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition">
                    <Settings className="h-4 w-4 mr-2"/>
                </button>
                </MyTooltip>
            )}
        </div>
    )
}
