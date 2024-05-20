"use client"
import { joinServer } from '@/app/api/ServerApi';
import { Loader2 } from 'lucide-react';
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
    }, []); // Add params.inviteCode as dependency

    return (
        <div className="flex flex-col flex-1 justify-center items-center">
            <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4"/>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Đang tải...
            </p>
        </div>
    )
};

export default InviteCodePage;
