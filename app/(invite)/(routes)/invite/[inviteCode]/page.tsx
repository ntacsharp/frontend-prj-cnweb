import { joinServer } from '@/app/api/ServerApi';
import { redirect } from 'next/navigation';
import React from 'react'

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = async ({
    params
}: InviteCodePageProps) => {
    
    if(!params.inviteCode) {
        return redirect("/");
    }
    const token = sessionStorage.getItem('token');
    if(!token) redirect("/login");
    const resp = await joinServer(params.inviteCode, token);

    if(resp){
        return redirect(`/servers/${resp.data.id}`);
    }

    return (
        <div>
            xdd
        </div>
    )
}

export default InviteCodePage
