"use client"

import { getServerById } from "@/app/api/ServerApi";
import { Loader } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ServerIdPage = () => {
  const params = useParams();
  const [generalChannelId, setGeneralChannelId] = useState();
  const router = useRouter();
  useEffect(() => {
    const fetchGeneralChannelId = async () => {
      try {
        const serverData = await getServerById(
          params?.serverId,
          window.sessionStorage.getItem("token")
        );
        setGeneralChannelId(serverData.data.channels[0].id);
      
      } catch (error) {
        console.error("Error fetching server data:", error);
      }
    };

    if (params?.serverId) {
      fetchGeneralChannelId();
    }

  }, [params?.serverId]);

  if(params?.serverId === "1"){
    return(
      <div>Chào mừng bạn đến với Conserva!</div>
    )
  }

  if (!generalChannelId) {
    return <div>
          </div>;
  }
  else{
    router.push(`/servers/${params?.serverId}/channels/${generalChannelId}`)
  }
};

export default ServerIdPage;
