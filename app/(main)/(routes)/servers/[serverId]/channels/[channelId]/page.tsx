"use client"
import { getChannelById } from "@/app/api/ChannelApi";
import ChatInput from "@/components/chat/chat-input";
import ChatHeader from "@/components/chat/chatheader";
import { Channel } from "@/model/Channel";
import { ChannelType } from "@/model/ChannelType";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
const ChannelIdPage = () => {
    const params = useParams();
    const serverId = params?.serverId.toString()
    const [channelName, setChannelName] = useState("");

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const channelData = await getChannelById(params?.channelId, process.env.NEXT_PUBLIC_TOKEN);
                setChannelName(channelData.data.name);

            } catch (error) {
                console.error("Error fetching channel:", error);
            }
        };

        if (params?.channelId) {
            fetchChannel();
        }
    }, [params?.channelId]);

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
            <ChatHeader serverId={serverId} type="channel" name={channelName} />
            <div className="flex-1">d</div>
            <ChatInput name={channelName} type="channel" apiUrl="/api/socket/messages" query={{
                channelId: params?.channelId,
                serverId: serverId
            }} />
        </div>
    )
}
export default ChannelIdPage;