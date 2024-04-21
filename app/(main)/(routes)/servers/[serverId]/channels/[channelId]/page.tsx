"use client"
import { getChannelById } from "@/app/api/ChannelApi";
import ChatHeader from "@/components/chat/chatheader";
import { Channel } from "@/model/Channel";
import { ChannelType } from "@/model/ChannelType";
import { useParams } from "next/navigation";
import { useState,useEffect } from "react";
const ChannelIdPage = () =>{
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
        <div>
          <ChatHeader serverId={serverId} type="channel" name={channelName} />
        </div>
      )
}
export default ChannelIdPage;