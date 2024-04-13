import { getServerById } from "@/app/api/ServerApi";

import { redirect } from "next/navigation";
import ServerHeader from "./server-header";

const ServerSidebar = async ({ serverId }: { serverId: string }) => {

    const response = await getServerById(serverId, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiIyIiwiaWF0IjoxNzEyNzg2MTk1LCJleHAiOjE3MTMwMDU3OTV9.G6fsrMzZS0DWb5HqgUZd-UbfSRZCrxB4jD2C135nDBQ')
    // myId cho nay loi logic do chua co pi getprofile cho user
    const server = response?.data
    const myId = server?.profileId;
    const textChannels = server?.channels.filter((channel: any) => channel.type === "TEXT")
    const audioChannels = server?.channels.filter((channel: any) => channel.type === "AUDIO")
    const videoChannels = server?.channels.filter((channel: any) => channel.type === "VIDEO")
    const members = server?.members.filter((member: any) => member.profileId === myId)
    const myRole = server?.members.filter((member: any) => member.profileId === myId)[0].role

    if (!server) {
        redirect("/")
    }


    return (
        <div className="flex flex-col h-full text-primary w-full 
        dark:bg-[#2B2D31] bg-slate-200">
            <ServerHeader server={server} role={myRole} />
        </div>
    )
}
export default ServerSidebar;