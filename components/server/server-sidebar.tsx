"use client"

import { getServerById } from "@/app/api/ServerApi";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Hash, Loader, Loader2, LoaderCircle, LucideLoader, Mic, Search, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerSection } from "./server-section";
import { ChannelType } from "@/model/ChannelType";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import { Member } from "@/model/Member";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Channel } from "@/model/Channel";
import ServerSearch from "./server-search";

const iconMap = {
    [ChannelType.TEXT]: <Hash className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>,
}

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 text-rose-500" />
}

const ServerSidebar = ({ serverId }: { serverId: string }) => {

    //const response = await getServerById(serverId, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiIyIiwiaWF0IjoxNzE0MjA3MzE5LCJleHAiOjE3MTY3OTkzMTl9.QhxuGRVrTEOx6lE7xnX-GhkMPHU8NxC9LNKjqu1P4_E')
    // myId cho nay loi logic do chua co pi getprofile cho user
    const [server, setServer] = useState();
    const [myId, setMyId] = useState();
    const [channels, setChannels] = useState([]);
    const [members, setMembers] = useState([]);
    const [myRole, setMyRole] = useState();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');

            if (token==null) router.push("/login");

            else{
                const response = await getServerById(serverId, token)
                .then((res) => {
                    if (res.status == 200 && res.data != null) {
                        console.log(res);
                        setServer(res.data);
                        setMyId(res.data.profileId);
                        setChannels(res.data.channels);
                        setMembers(res.data.members);
                        setMyRole(res.data.members.filter((member: Member) => member.profileId === res.data.profileId)[0].role);
                    };
                })
            }
        };
        fetchData();
    }, []);
    const textChannels = channels.filter((channel: Channel) => channel.type === ChannelType.TEXT)
    const audioChannels = channels.filter((channel: Channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = channels.filter((channel: Channel) => channel.type === ChannelType.VIDEO)
    // const myRole = members.filter((member: any) => member.profileId === myId)[0].role;

    if (!server) {
        if(serverId =="1")
            return(<div></div>)
        return (
            <div className="flex flex-col h-full w-full">
                <Loader className="m-auto h-auto flex"/>
            </div>
            );
    }

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-slate-200">
            <ServerHeader server={server} role={myRole} />
            <ScrollArea className="flex-1 px-3">
                <div className="mt-2">
                    <ServerSearch data={[
                        {
                            label: "Text Channels",
                            type: "channel",
                            data: textChannels?.map((channel: Channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        },
                        {
                            label: "Voice Channels",
                            type: "channel",
                            data: audioChannels?.map((channel: Channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        },
                        {
                            label: "Video Channels",
                            type: "channel",
                            data: videoChannels?.map((channel: Channel) => ({
                                id: channel.id,
                                name: channel.name,
                                icon: iconMap[channel.type],
                            }))
                        },
                        {
                            label: "Members",
                            type: "member",
                            data: members?.map((member: Member) => ({
                                id: member?.id,
                                name: member?.profileId,
                                icon: roleIconMap[member.role],
                            }))
                        },
                    ]}/>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
                {!!textChannels.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.TEXT} role={myRole} label="Text Channels" />
                        <div className="space-y-[2px]">
                            {textChannels.map((channel: Channel) => (
                                <ServerChannel key={channel.id} channel={channel} role={myRole} server={server} />
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannels.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.AUDIO} role={myRole} label="Voice Channels" />
                        <div className="space-y-[2px]">
                            {audioChannels.map((channel: Channel) => (
                                <ServerChannel key={channel.id} channel={channel} role={myRole} server={server} />
                            ))}
                        </div>
                    </div>
                )}
                {!!videoChannels.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.VIDEO} role={myRole} label="Video Channels" />
                        <div className="space-y-[2px]">
                            {videoChannels.map((channel: Channel) => (
                                <ServerChannel key={channel.id} channel={channel} role={myRole} server={server} />
                            ))}
                        </div>
                    </div>
                )}
                {!!members.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="members" server={server} role={myRole} label="Members" />
                        <div className="space-y-[2px]">
                            {members.map((member: Member) => (
                                <ServerMember key={member.id} member={member} server={server} />
                            ))}
                        </div>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default ServerSidebar;
