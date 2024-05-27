"use client"

import { Member } from "@/model/Member";
import { ChatWelcome } from "./chat-welcome";
import { useChatQuery } from "@/hook/use-chat-query";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useRef } from "react";
import { Message } from "@/model/Message";
import { Profile } from "@/model/Profile";
import { ChatItem } from "@/components/chat/chat-item";
import { format } from "date-fns";
import data from '@emoji-mart/data';
import { useChatSocket } from "@/hook/use-chat-socket";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

interface ChatMessagesProps {
    name: any;
    member: any;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, any>;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
    type: "channel" | "conversation";


}

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

export const ChatMessages = (
    { name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }: ChatMessagesProps
) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;


    const chatRef = useRef<HTMLDivElement>(null);


    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });

    useChatSocket({ queryKey, addKey, updateKey });

    if (member === undefined || data === undefined) {
        return <div></div>;
    }

    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Đang tải tin nhắn...
                </p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Có gì đó không đúng!
                </p>
            </div>
        )
    }

    return (
        <div id = "messagesList" className="flex-1 flex flex-col py-4 overflow-y-auto">
            <div className="flex-1">
                <ChatWelcome
                    type={type} name={name}
                />
                <div  className="flex flex-col-reverse mt-auto">
                    {data?.pages?.map((group, i) => (
                        <Fragment key={i}>
                            {group?.items?.map((message: MessageWithMemberWithProfile) => (

                                <ChatItem
                                    key={message.id}
                                    id={message.id}
                                    currentMember={member}
                                    member={message.member}
                                    content={message.content}
                                    fileUrl={message.fileUrl}
                                    deleted={message.deleted}
                                    timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                    isUpdated={message.updatedAt !== message.createdAt}
                                    socketUrl={socketUrl}
                                    socketQuery={socketQuery}
                                />
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    )

}