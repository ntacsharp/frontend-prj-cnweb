import { DiscordLogoIcon } from "@radix-ui/react-icons"

export const Welcome = ()=>{
    return (
        <div className="flex flex-col h-full w-full">
            <div className="my-auto h-auto flex" style={{marginLeft:'20%'}}>
                    <div className="flex mx-3 h-[100px] w-[100px] rounded-[46px] 
                    transition-all overflow-hidden items-center justify-center
                    bg-background dark:bg-neutral-700 ">
                      <DiscordLogoIcon className="group-hover:text-white transition text-emerald-500">
                      </DiscordLogoIcon>
                    </div>
                    <div className="items-center justify-center my-auto">
                      <div className="font-bold text-2xl">Chào mừng đến với Conserva</div>
                    </div>
            </div>
      </div>
    )
}