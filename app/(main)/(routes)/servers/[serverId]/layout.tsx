"use client"

import { getServerById } from "@/app/api/ServerApi";
import ServerSidebar from "@/components/server/server-sidebar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const ServerIdLayout = async ({ children, params, }: { children: React.ReactNode, params: { serverId: string } }) => {
    const [server, setServer] = useState();
    // Khi co authen voi id thi se xu li kiem tra sau

    // const server = await getServerById(params.serverId, token)
    useEffect(() => {
        const fecthData = async () => {
            const token = sessionStorage.getItem('token');
            if (!token) {
                redirect("/login");
            } else {
                const response = await getServerById(params.serverId, token)
                    .then((res) => {
                        console.log(res);
                    })
            }
        }
    }, [])

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-5 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId} />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}
export default ServerIdLayout;