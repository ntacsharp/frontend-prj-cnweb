"use client"
import { joinServer } from '@/app/api/ServerApi';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = ({
    params
}: InviteCodePageProps) => {
    
    useEffect(() => {
        const fetchData = async () => {
            if (!params.inviteCode) {
                return redirect("/");
            }
            const token = sessionStorage.getItem('token');

            if (!token) {
                redirect("/login");
                return; // Add return here to exit the function if token is not available
            }
            
            try {
                const resp = await joinServer(params.inviteCode, token);
                console.log(resp);

                // if (resp) {
                //     redirect(`/servers/${resp.data.id}`);
                // }
            } catch (error) {
                // Handle error if joinServer fails
                console.error("Error:", error);
            }
        };

        fetchData(); // Call the fetchData function
    }, []); // Add params.inviteCode as dependency

    return (
        <div>
            xdd
        </div>
    );
};

export default InviteCodePage;
