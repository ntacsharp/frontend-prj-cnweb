"use client"

import React, { useState, useEffect } from "react";
import { getServerById } from "@/app/api/ServerApi";
import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { ServerSection } from "./server-section";
import { ChannelType } from "@/model/ChannelType";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
import { Member } from "@/model/Member";
import { Channel } from "@/model/Channel";
import { MemberRole } from "@/model/MemberRole";

export const ServerSidebar = ({ serverId }: { serverId: string }) => {
    const [server, setServer] = useState(null);
    const [myRole, setMyRole] = useState(MemberRole.GUEST);
    const [textChannels, setTextChannels] = useState([]);
    const [audioChannels, setAudioChannels] = useState([]);
    const [videoChannels, setVideoChannels] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getServerById(serverId, process.env.NEXT_PUBLIC_TOKEN);
                const data = response.data;
                setServer(data);
                const myId = data?.profileId;
                const text = data?.channels.filter((channel: Channel) => channel.type === ChannelType.TEXT);
                const audio = data?.channels.filter((channel: Channel) => channel.type === ChannelType.AUDIO);
                const video = data?.channels.filter((channel: Channel) => channel.type === ChannelType.VIDEO);
                const role = data?.members.filter((member: any) => member.profileId === myId)[0]?.role;

                setTextChannels(text);
                setAudioChannels(audio);
                setVideoChannels(video);
                setMembers(data.members);
                setMyRole(role);
            } catch (error) {
                console.error("Error fetching server:", error);
            }
        };

        fetchData();
    }, [serverId]);

    if (!server) {
        return <div>Select a server!</div>;
    }

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-slate-200">
            <ServerHeader server={server} role={myRole} />
            <ScrollArea>
                <div className="px-1 text-sm flex">
                    Sever Search Here...
                    <Search className="h-4 w-4 ml-auto" />
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
