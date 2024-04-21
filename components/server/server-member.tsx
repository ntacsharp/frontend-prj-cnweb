"use client"

import { cn } from "@/lib/utils";
import { Member } from "@/model/Member"
import { MemberRole } from "@/model/MemberRole";
import { Server } from "@/model/Server"
import { ShieldAlert, ShieldBan, ShieldCheckIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheckIcon className="h-4 w-4 ml-2 text-indigo-500" />,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-red-600 ml-auto"/>
};


interface svMemberProps {
    member: Member & {profile?: any}
    server: Server
}

export const ServerMember = ({member,server}:svMemberProps) =>{
    const params = useParams();
    const router = useRouter();

    const handleSelectMember = ()=>{
        router.push(`/servers/${params?.serverId}/conservations/${member.id}`)
    }

    const iconRole = roleIconMap[member.role]
    return (
        <div>
            <button 
                onClick={handleSelectMember}
                className={cn("group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc/50 transition mb-1",
                params?.memberId === member.id && " bg-zinc-700/20 dark:bg-zinc-700"
            )}>
            <UserAvatar src={member.profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8"/>
            <p className={cn("font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                params?.channelId == member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
            )}>
                {member.profile.name}
            </p>
            {iconRole}
            </button>
        </div>
    )
}
