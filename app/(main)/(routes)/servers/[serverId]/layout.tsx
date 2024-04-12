import { getServerById } from "@/app/api/ServerApi";
import ServerSidebar from "@/components/server/server-sidebar";

const ServerIdLayout = async ({children,params,}:{children:React.ReactNode,params:{serverId:string}}) =>{

    // Khi co authen voi id thi se xu li kiem tra sau

    const server = await getServerById(params.serverId,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiIyIiwiaWF0IjoxNzEyNzg2MTk1LCJleHAiOjE3MTMwMDU3OTV9.G6fsrMzZS0DWb5HqgUZd-UbfSRZCrxB4jD2C135nDBQ')

    return(
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-5 flex-col fixed inset-y-0">
                <ServerSidebar serverId = {params.serverId}/>
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    )
}
export default ServerIdLayout;