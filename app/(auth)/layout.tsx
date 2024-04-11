import { ReactNode } from "react";

export default function AuthLayout({
    children,
}: {
    children: ReactNode
}){
    return (
        <main className='w-full h-full bg-blue-300 mx-auto flex overflow-y-scroll'>
            {children}
        </main>
    )
}