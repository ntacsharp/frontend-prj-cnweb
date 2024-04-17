"use client"

import { useSocket } from "./providers/socket-provider"
import { Badge } from "./ui/badge"

export const SocketIndicator = () => {
    const {isConnected} = useSocket();

    if(!isConnected){
        return (
            <Badge variant="outline" className="bg-yellow-500 text-white border-none">
                Fallback : Polling every 1s
            </Badge>
        );
    }
    else {
        return (
            <Badge variant="outline" className="bg-green-500 text-white border-none">
                Live : real-time updates
            </Badge>
        );
    }

}