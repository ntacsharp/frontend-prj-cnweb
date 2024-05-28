"use client"

import { listAllServers } from "@/app/api/ServerApi";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import AddServerAction from "./add-server-action";
import DirectMessageAction from "./direct-message-action";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAvatar } from "../UserAvatar";
import { ManageAccountButton } from "../manage-account-button";

export const NavigationSidebar = () => {
    const [servers, setServers] = useState([]);
    const [profileId,setProfileId] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('token');
            if(token!=null){
                const response = await listAllServers(token)
                .then((res) => {
                    if(res.status == 200 && res.data !=null){
                        setServers(res.data);
                        setProfileId(res.data[0]?.profileId)
                    }
                    else{
                        redirect('/login');
                    }
                })
            }
        };
        fetchData();
    }, []);
    
    return (
        <div className="space-y-4 flex flex-col items-center 
        h-full w-full text-primary dark:bg-[#1E1F22] py-3 bg-[#E3E5E8]">

           
            <Separator className="h-[2px] bg-zinc-300 
                         dark:bg-zinc-700 rounded-md w-14 mx-auto"/>

            <ScrollArea className="flex-1 w-full">
                {servers.map((server: any) => (
                    <div key={server.id}>
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}

                <AddServerAction />
            </ScrollArea>


            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">

                <UserAvatar profileId={profileId}/>
                <ModeToggle/>
            </div>

        </div>
    );
};

export default NavigationSidebar;
