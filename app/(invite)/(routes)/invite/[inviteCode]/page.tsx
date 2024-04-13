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

    const resp = await joinServer(params.inviteCode, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlSWQiOiIyIiwiaWF0IjoxNzEyNzg2MTk1LCJleHAiOjE3MTMwMDU3OTV9.G6fsrMzZS0DWb5HqgUZd-UbfSRZCrxB4jD2C135nDBQ');

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
