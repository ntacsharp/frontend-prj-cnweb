"use client"
import { getChannelById } from "@/app/api/ChannelApi";
import { getCurrentMember } from "@/app/api/MemberApi";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-message";
import ChatHeader from "@/components/chat/chatheader";
import { MediaRoom } from "@/components/media-room";
import { Channel } from "@/model/Channel";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
const ChannelIdPage = () => {
    const params = useParams();
    const serverId = params?.serverId.toString()
    const [channelName, setChannelName] = useState("");

    const [member, setMember] = useState<any>();

    const [channel, setChannel] = useState<Channel>({} as Channel);



    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const channelData = await getChannelById(params?.channelId, sessionStorage.getItem('token'));
                setChannelName(channelData.data.name);
                setChannel(channelData.data);


                const memberData = await getCurrentMember(serverId, sessionStorage.getItem('token'));
                setMember(memberData);

            } catch (error) {
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
                <ChatHeader serverId={serverId} type="channel" name={channelName} />
                <div className="flex-1"></div>
                <ChatMessages
                member={member}
                name={channel.name}
                chatId={channel.id}
                type="channel"
                apiUrl="http://localhost:4869/api/messages"
                socketUrl="/api/socket/messages"
                socketQuery={{
                  channelId: channel.id,
                  serverId: channel.serverId,
                }}
                paramKey="channelId"
                paramValue={channel.id}
              />
                <ChatInput name={channelName} type="channel" apiUrl="http://localhost:4869/api/messages" query={{
                    channelId: params?.channelId,
                    serverId: serverId
                }} />
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