"use client"

import { CreateServerModal } from "../modals/createServerModal"
import { useEffect,useState } from "react";
import { InviteModal } from "../modals/inviteModal";
import { EditServerModal } from "../modals/editServerModal";

export const ModalProvider = () =>{
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() =>{
        setIsMounted(true);
    }, [])
    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <CreateServerModal/>
            <InviteModal/>
            <EditServerModal/>
        </div>
    )
}