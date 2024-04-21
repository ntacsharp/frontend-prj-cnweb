import { Hash, Menu } from "lucide-react"
import { MobileToogle } from "../responsive"

interface header_props {
    name:string,
    type: "channel" | "conservation",
    serverId: string,
    imageUrl?: string
}

const ChatHeader =  ({serverId,name,type,imageUrl}:header_props) =>{
  return (
    <div className="text-md font-semibold flex items-center px-3 h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
        {/* Nut toogle tren Mobile khi width giam */}
      <MobileToogle serverID = {serverId}/>

      {type==="channel" && (
        <Hash className="w-5 h-5 mr-2 text-zinc-500 dark:text-zinc-400"/>
      )}
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
    </div>
  )
}
export default ChatHeader