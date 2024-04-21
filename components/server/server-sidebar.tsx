"use client"
import { getServerById } from "@/app/api/ServerApi";

import ServerHeader from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Search } from "lucide-react";
import { ServerSection } from "./server-section";
import { ChannelType } from "@/model/ChannelType";
import { ServerChannel } from "./server-channel";
import { Channel } from "@/model/Channel";
import { ServerMember } from "./server-member";
import { Member } from "@/model/Member";

const ServerSidebar = async ({ serverId }: { serverId: string }) => {

    const response = await getServerById(serverId, process.env.NEXT_PUBLIC_TOKEN)
    // myId cho nay loi logic do chua co pi getprofile cho user
    const server = response?.data
    const myId = server?.profileId;
    const textChannels = server?.channels.filter((channel: Channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel: Channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel: Channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members
    const myRole = server?.members.filter((member: any) => member.profileId === myId)[0].role

    if (!server) {
        return(<div>Select a server!</div>)
    }


    return (
        <div className="flex flex-col h-full text-primary w-full 
        dark:bg-[#2B2D31] bg-slate-200">
            <ServerHeader server={server} role={myRole} />

            <ScrollArea>
                <div className="px-1 text-sm flex">
                    Sever Search Here...
                    <Search className="h-4 w-4 ml-auto"/>
                </div>
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2"/>
                {/* Phan nay chua cac kenh trong server */}
                {!!textChannels?.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.TEXT} 
                            role={myRole} label="Text Channels"/>
                        <div className="space-y-[2px]">
                            {textChannels.map((channel : Channel)=>(
                                <ServerChannel key={channel.id} channel={channel} role={myRole} server={server}/>
                            ))}
                        </div>
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.AUDIO} 
                            role={myRole} label="Voice Channels"/>
                        <div className="space-y-[2px]">
                            {audioChannels.map((channel : Channel)=>(
                                <ServerChannel key={channel.id} channel={channel} role={myRole} server={server}/>
                            ))}
                        </div>     
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="channels" channelType={ChannelType.VIDEO} 
                            role={myRole} label="Video Channels"/>
                        <div className="space-y-[2px]">
                            {videoChannels.map((channel : Channel)=>(
                                <ServerChannel key={channel.id} channel={channel} role={myRole} server={server}/>
                            ))}
                        </div>
                    </div>
                )}
                {!!members?.length && (
                    <div className="ml-2">
                        <ServerSection sectionType="members" server={server}
                            role={myRole} label="Members"/>
                        <div className="space-y-[2px]">
                            {members.map((member : Member)=>(
                                <ServerMember key={member.id} member={member} server={server}/>
                            ))}
                        </div>
                        
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}
export default ServerSidebar;