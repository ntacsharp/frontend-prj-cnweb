"use client"

import React, { useState, useEffect } from "react";
import { listAllServers } from "@/app/api/ServerApi";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { NavigationItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import AddServerAction from "./add-server-action";
import DirectMessageAction from "./direct-message-action";

export const NavigationSidebar = () => {
    const [servers, setServers] = useState([]);
    // THem useEffect de viec mount nhung chua co data 

    useEffect(() => {
        const fetchServers = async () => {
            try {
                const response = await listAllServers(process.env.NEXT_PUBLIC_TOKEN);
                setServers(response.data);
            } catch (error) {
                console.error("Error fetching servers:", error);
            }
        };

        fetchServers();
    }, []);

    console.log("re-render");

    return (
        <div className="space-y-4 flex flex-col items-center h-full w-full text-primary dark:bg-[#1E1F22] py-3 bg-[#E3E5E8]">
            <DirectMessageAction />
            <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-14 mx-auto" />

            <ScrollArea className="flex-1 w-full">
                {servers.map((server:any) => (
                    <div key={server.id}>
                        <NavigationItem id={server.id} name={server.name} imageUrl={server.imageUrl} />
                    </div>
                ))}
                <AddServerAction />
            </ScrollArea>
            <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">

                <button className="group flex relative items-center mb-3">
                    <div className="relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden">
                        <Image fill src="https://utfs.io/f/3177dc04-023d-45ba-955a-59a05fdb9e24-1ww8e.jpg" alt="User Image" />
                    </div>
                </button>
                <ModeToggle/>
            </div>

        </div>
    );
};

export default NavigationSidebar;
