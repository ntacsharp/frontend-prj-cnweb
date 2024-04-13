"use client"

import { CreateServerModal } from "../modals/createServerModal"
import { useEffect,useState } from "react";
import { DeleteServerModal} from "../modals/deleteServerModal";
import { Delete } from "lucide-react";
import { CreateChannelModal } from "../modals/createChannelModel";
import { LeaveServerModal } from "../modals/leaveServerModal";

export const ModalProvider = () =>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() =>{
        setIsMounted(true);
    })
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <CreateServerModal/>
            <CreateChannelModal/>
            <LeaveServerModal/>
            <DeleteServerModal/>

        </div>
    )
}