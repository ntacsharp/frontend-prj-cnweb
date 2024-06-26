'use client'
import { getChannelById } from "@/app/api/ChannelApi";
import { getCurrentMember } from "@/app/api/MemberApi";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-message";
import ChatHeader from "@/components/chat/chatheader";
import { MediaRoom } from "@/components/media-room";
import { Channel } from "@/model/Channel";
import { ChannelType } from "@/model/ChannelType";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { io as ClientIO } from "socket.io-client";
const ChannelIdPage = () => {
    const params = useParams();
    const serverId = params?.serverId.toString()
    const [channelName, setChannelName] = useState("");

    const [member, setMember] = useState<any>();

    const [channel, setChannel] = useState<Channel>({} as Channel);

    const baseUrl = process.env.BASE_URL || "http://localhost";

    const apiUrl = `${baseUrl}:4869/api/messages`;

    const socketUrl = `${baseUrl}/api/socket/messages`;



    useEffect(() => {

        const fetchChannel = async () => {
            try {
                const channelData = await getChannelById(params?.channelId, sessionStorage.getItem('token'));
                setChannelName(channelData.data.name);
                setChannel(channelData.data);
                console.log(channelData);


                const memberData = await getCurrentMember(serverId, sessionStorage.getItem('token'));
                setMember(memberData);

            } catch (error) {
                window.location.href = "/servers/1";
                console.error("Error fetching channel:", error);
            }
        };

        if (params?.channelId) {
            fetchChannel();
        }
    }, [params?.channelId]);

    if (channelName !== "") {

        return (
            <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
                <ChatHeader serverId={serverId || ""} type="channel" name={channelName} />
                {/* <div className="flex-1"></div> */}
                {channel.type === ChannelType.TEXT && (
                    <>
                        <ChatMessages
                            member={member}
                            name={channel.name}
                            chatId={channel.id}
                            type="channel"
                            apiUrl={apiUrl}
                            socketUrl={socketUrl}
                            socketQuery={{
                                channelId: channel.id,
                                serverId: channel.serverId,
                            }}
                            paramKey="channelId"
                            paramValue={channel.id}
                        />
                        <ChatInput name={channelName} type="channel" apiUrl={apiUrl} query={{
                            channelId: params?.channelId,
                            serverId: serverId
                        }} />
                    </>
                )}
                {channel.type === ChannelType.AUDIO && (
                    <MediaRoom chatId={channel.id} video={false} audio={true} />
                )}
                {channel.type === ChannelType.VIDEO && (
                    <MediaRoom chatId={channel.id} video={true} audio={true} />
                )}
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full w-full">
            <Loader className="m-auto h-auto flex" />
        </div>
    )

}
export default ChannelIdPage;