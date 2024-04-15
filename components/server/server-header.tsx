"use client";
import { ChevronDown, Delete, LogOut, LucidePlusCircle, Settings2, Trash, Trash2, UserPlus, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hook/use-modal";


const ServerHeader = ({ server, role }: { server: any, role: string }) => {
    const { onOpen } = useModal();

    console.log(role)
    const isAdmin = role === "ADMIN"
    const isModerator = isAdmin || role === "MODERATOR"
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button
                    className="w-full text-md font-semibold px-3 flex items-center h-12 
                    border-neutral-300 dark:border-neutral-800 border-b-2
                     hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
                {isModerator && (
                    <DropdownMenuItem
                        onClick={() => onOpen("invite", { server })}
                        className="text-indigo-500 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
                        Invite people
                        <UserPlus className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}
                {isModerator && (
                    <DropdownMenuItem
                        className="px-3 py-2 text-sm cursor-pointer">
                        Create channel
                        <LucidePlusCircle className="h-4 w-4 ml-auto" />
                    </DropdownMenuItem>
                )}

                {isAdmin && (
                    <div>
                        <DropdownMenuItem
                            onClick={() => onOpen("editServer", { server })}
                            className="px-3 py-2 text-sm cursor-pointe">
                            Server Settings
                            <Settings2 className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onOpen("members", { server })}
                            className="px-3 py-2 text-sm cursor-pointer">
                            Manage Members
                            <Users className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>

                    </div>
                )}
                {isModerator && (
                    <DropdownMenuSeparator />
                )}
                {isAdmin && (
                    <div>
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer text-rose-500">
                            Delete Server
                            <Trash2 className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>

                    </div>
                )}
                {!isAdmin && (
                    <div>
                        <DropdownMenuItem
                            className="px-3 py-2 text-sm cursor-pointer">
                            Leave Server
                            <LogOut className="h-4 w-4 ml-auto" />
                        </DropdownMenuItem>

                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export default ServerHeader;