"use client"

import { getServerById } from "@/app/api/ServerApi";

import { Welcome } from "@/components/welcome";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ServerIdPage = () => {
  const params = useParams();
  const [generalChannelId, setGeneralChannelId] = useState();
  const router = useRouter();

  useEffect(() => {

    
   
    const fetchGeneralChannelId = async () => {
      try {
        if (params?.serverId == "1") {
          return;
        }
        const serverData = await getServerById(
          params?.serverId,
          window.sessionStorage.getItem("token")
        );
        console.log(serverData);
        setGeneralChannelId(serverData.data.channels[0].id);
      
      } catch (error) {
        window.location.href = "/servers/1";
        console.error("Error fetching server data:", error);
      }
    };

    if (params?.serverId) {
      fetchGeneralChannelId();
    }

  }, [params?.serverId]);

  if(params?.serverId === "1"){
    return(
      <Welcome/>
    )
  }

  if (!generalChannelId) {
    return <></>;
  }
  else{
    router.push(`/servers/${params?.serverId}/channels/${generalChannelId}`)
  }
};

export default ServerIdPage;
