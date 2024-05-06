import { Hash } from "lucide-react";

interface ChatWelcomeProps {
    name : string;
    type : "channel" | "conversation";
}

export const ChatWelcome = ({
    name, type 
} : ChatWelcomeProps) => {
    return (
        <div className="space-y-2 px-4 mb-4">
            {
                type === "channel" && (
                    <div className="flex h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700
                    items-center justify-center">
                        <Hash className="w-12 h-12 text-white" />
                    </div>
                )
            }
            <p className="tetx-xl md:text-3xl font-bold">
                {type === "channel" ? "Chào mừng đến với #" : ""}{name}
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 tex-sm">
                {type === "channel" ? `Đây là bắt đầu của kênh ${name}. Hãy bắt đầu trò chuyện!` : `Đây là bắt đầu của cuộc trò chuyện. Hãy bắt đầu trò chuyện! với ${name}`}
            </p>

            
        </div>
    )
}