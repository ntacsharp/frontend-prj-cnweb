import { listAllServers } from "@/app/api/ServerApi";
import { useState, useEffect } from "react";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";

export const NavigationSidebar = async () => {
   
    const servers = await listAllServers('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiIyIiwiaWF0IjoxNzEyNzg2MTk1LCJleHAiOjE3MTMwMDU3OTV9.G6fsrMzZS0DWb5HqgUZd-UbfSRZCrxB4jD2C135nDBQ')
  
    return (
        <div className="space-y-4 flex flex-col items-center 
        h-full w-full text-primary dark:bg-[#1E1F22] py-3">
            <NavigationAction/>
            <Separator className="h-[2px] bg-zinc-300 
            dark:bg-zinc-700 rounded-md w-14 mx-auto"/>
            <ScrollArea className="flex-1 w-full">
                {servers.data.map((server:any) => (
                    <div key={server.id}>
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl}/>
                    </div>
                ))}
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
                <ModeToggle></ModeToggle>
                <button className="group flex relative items-center mb-3">
                    <div className="relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden">
                        <Image 
                            fill
                            src = 'https://utfs.io/f/3177dc04-023d-45ba-955a-59a05fdb9e24-1ww8e.jpg'
                            alt = "User Image"
                            />
                    </div>
                    
                </button>
            </div>
        </div>
    );
};

// Exporting NavigationSidebar with useClient
export default NavigationSidebar
