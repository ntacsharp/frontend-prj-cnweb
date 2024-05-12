"use client"
import { joinServer } from '@/app/api/ServerApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    }
}

const InviteCodePage = ({
    params
}: InviteCodePageProps) => {
    const router = useRouter();
    
    useEffect(() => {
        const fetchData = async () => {
            if (!params.inviteCode) {
                return router.push("/");
            }
            const token = sessionStorage.getItem('token');

            if (!token) {
                router.push("/login");
                return; // Add return here to exit the function if token is not available
            }
            
            try {
                const resp = await joinServer(params.inviteCode, token);

                if (resp) {
                    router.push(`/servers/${resp.data.id}`);
                }
            } catch (error) {
                // Handle error if joinServer fails
                console.error("Error:", error);
            }
        };

        fetchData(); // Call the fetchData function
    }, [params.inviteCode]); // Add params.inviteCode as dependency

    return (
        <div>
            xdd
        </div>
    );
};

export default InviteCodePage;
