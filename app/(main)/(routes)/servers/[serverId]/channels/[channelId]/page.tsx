"use client"
import { getChannelById } from "@/app/api/ChannelApi";
import { getCurrentMember } from "@/app/api/MemberApi";
import ChatInput from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-message";
import ChatHeader from "@/components/chat/chatheader";
import { Channel } from "@/model/Channel";
import { ChannelType } from "@/model/ChannelType";
import { Member } from "@/model/Member";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { any, set } from "zod";
const ChannelIdPage = () => {
    const params = useParams();
    const serverId = params?.serverId.toString()
    const [channelName, setChannelName] = useState("");

    const [member, setMember] = useState<any>(); 

    const [channel, setChannel] = useState<Channel>({} as Channel);



    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const channelData = await getChannelById(params?.channelId, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI0NGM5ZTYxYS0yMmM1LTQ2NjctYjY4MS1kNDk1YjEwZGE0NjUiLCJpYXQiOjE3MTQ5MjA5NjksImV4cCI6MTcxNzUxMjk2OX0.Ga5fcsyy3_mQtbKKEfLmElD5X027anWIKShs-X5II9Q');
                setChannelName(channelData.data.name);
                setChannel(channelData.data);


                const memberData = await getCurrentMember(serverId, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiI0NGM5ZTYxYS0yMmM1LTQ2NjctYjY4MS1kNDk1YjEwZGE0NjUiLCJpYXQiOjE3MTQ5MjA5NjksImV4cCI6MTcxNzUxMjk2OX0.Ga5fcsyy3_mQtbKKEfLmElD5X027anWIKShs-X5II9Q');
                setMember(memberData); 

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
            <div className="flex-1"></div>
            <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
            <ChatInput name={channelName} type="channel" apiUrl="/api/socket/messages" query={{
                channelId: params?.channelId,
                serverId: serverId
            }} />
        </div>
    )
}
export default ChannelIdPage;