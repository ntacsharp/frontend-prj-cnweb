"use client"
import ChatHeader from "@/components/chat/chatheader";
import { useParams } from "next/navigation";

const ChannelIdPage = () =>{
    const params = useParams();

    return (
        <div>
          <ChatHeader serverId="0a338e19-94be-41a9-92ac-a422958bea5f" type="channel" name="Hust" />
        </div>
      )
}
export default ChannelIdPage;