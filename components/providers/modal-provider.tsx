"use client"

import { CreateServerModal } from "../modals/createServerModal"
import { useEffect,useState } from "react";
import { DeleteServerModal} from "../modals/deleteServerModal";
import { CreateChannelModal } from "../modals/createChannelModal";
import { LeaveServerModal } from "../modals/leaveServerModal";
import { InviteModal } from "../modals/inviteModal";
import { EditServerModal } from "../modals/editServerModal";
import { MembersModal } from "../modals/membersModal";
import { DeleteChannelModal } from "../modals/deleteChannelModal";
import { EditChannelModal } from "../modals/editChannelModal";
import { MessageFileModal } from "../modals/messageFileModal";
import { DeleteMessageModal } from "../modals/deleteMessageModal";
import { EditProfileModal } from "../modals/editProfileModal";
import { ChangePasswordModal } from "../modals/editPasswordModal";
import { CreateUserModal } from "../modals/createUserModal";
import { UpdateUserModal } from "../modals/updateUserModal";
import { DeleteUserModal } from "../modals/deleteUserModal";

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
            <CreateChannelModal/>
            <LeaveServerModal/>
            <DeleteServerModal/>
            <InviteModal/>
            <EditServerModal/>
            <MembersModal/>
            <DeleteChannelModal/>
            <EditChannelModal/>
            <MessageFileModal/>
            <DeleteMessageModal/>
            <EditProfileModal/>
            <ChangePasswordModal/>
            <CreateUserModal />
            <UpdateUserModal />
            <DeleteUserModal />
        </div>
    )
}