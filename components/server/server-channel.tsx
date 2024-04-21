"use client"

import { cn } from "@/lib/utils";
import { Channel } from "@/model/Channel";
import { ChannelType } from "@/model/ChannelType";
import { MemberRole } from "@/model/MemberRole";
import { Server } from "@/model/Server";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MyTooltip } from "../tool-tip";
import { useModal } from "@/hook/use-modal";

interface svChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const icon = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
};
// Icon Map cho hinh hien thi channel
export const ServerChannel = ({ channel, server, role }: svChannelProps) => {
    const params = useParams();
    const router = useRouter();
    const Icon = icon[channel.type];
    const {onOpen} = useModal();

    const handleSelectChannel = ()=>{
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }


    return (
        <div className="flex items-center space-x-2">
            <button 
                onClick={handleSelectChannel}
                className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc/50 transition mb-1",
                params?.channelId === channel.id && " bg-zinc-700/20 dark:bg-zinc-700"
            )}>
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400"></Icon>

            {/* Hien thi ten cua channel, noi bat hon khi duoc select */}
            <p className={cn("line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition"
                ,params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>

            {/* Cac nut edit va delete channel */}
            {channel.name !=="general" && role!= MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <MyTooltip label="Edit" side="top">
                        <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400"
                            onClick={(e:React.MouseEvent) => {e.stopPropagation();onOpen("editChannel",{server,channel})}}/>
                    </MyTooltip>
                    <MyTooltip label="Delete" side="top">
                        <Trash className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400"
                            onClick={(e:React.MouseEvent) => {e.stopPropagation();onOpen("deleteChannel",{server,channel})}}/>
                    </MyTooltip>
                </div>
            )}
            {channel.name==="general" && (
                <Lock className="w-4 h-4 ml-auto text-zinc-500 hover:text-zinc-600 dark:text-zinc-400"/>
            )}
            </button>
        </div>
    );
};
