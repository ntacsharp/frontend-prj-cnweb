
"use client"


import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {io as ClientIO} from "socket.io-client";

type SocketContextType = {
    socket : any | null;
    isConnected : boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false
});

export const useSocket = () =>{
    return useContext(SocketContext);
}

export const SocketProvider = ({children} : {children : React.ReactNode}) => {
    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    const baseUrl = process.env.BASE_URL || "http://localhost";

    useEffect(() => {
        const socketInstance = new (ClientIO as any)(
            `${baseUrl}:4869`,{
               addTraillingSlash: false,
            }
        );

        socketInstance.on('connect', () => {
            setIsConnected(true);
            
        });

        socketInstance.on('disconnect', () => {
            setIsConnected(false);
        });

        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        }
    }
    , []);

    return (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>
    );
}