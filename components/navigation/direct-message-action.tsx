"use client"
import { Plus } from "lucide-react";
import { MyTooltip } from "../tool-tip";
import { useModal } from "@/hook/use-modal";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
const DirectMessageAction = ()=>{
    const {onOpen} = useModal();
    return (
        <div>
            <MyTooltip side="right" align="center" label="Tin nhắn trực tiếp (Chưa hoàn thiện)">
                <button className="group flex items-center" onClick={()=>onOpen("createServer")}>
                    <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] 
                    group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center
                    bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
                    <DiscordLogoIcon className="group-hover:text-white transition text-emerald-500">
                    </DiscordLogoIcon>
                    </div>
                </button>
            </MyTooltip>
        </div>
    )
}
export default DirectMessageAction ;