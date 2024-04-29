"use client"

import React, { FormEvent, useEffect, useState } from 'react';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import { login } from "@/app/api/UserApi"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        login(email, password, "credentials")
            .then(response => {
                const token = response.data.token;
                if (typeof window !== 'undefined') sessionStorage.setItem('token', token);
                console.log('Login success:', response);
                router.push('/servers/1');
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    }

    function handleSignInWithGoogle() {
        signIn("google");
    }

    useEffect(() => {
        const fetchData = async () => {
            const session = await getSession();
            if (session) {
                login(session.user?.email, "", "google")
                    .then(response => {
                        const token = response.data.token;
                        if (typeof window !== 'undefined') sessionStorage.setItem('token', token);
                        redirect(`/servers/1`);
                    })
                    .catch(error => {
                        console.error('Login failed:', error);
                    });
            }
        };
        fetchData();
    }, []);

    return (
        <div className='mx-auto h-screen flex flex-col justify-center items-center'>
            <div className='bg-gray-800 mx-auto w-[480px] p-8 rounded-lg'>
                <div className="text-center">
                    <h4 className="text-2xl font-bold">Chào mừng đến Conserva.</h4>
                    <hr className="my-4 border-t border-gray-300" />
                </div>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg mb-4" onClick={handleSignInWithGoogle}>Sign in with Google</button>
                <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                    <label htmlFor='email' className='text-white'>Email</label>
                    <input id='email' type='text' className='bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-3 rounded-lg mb-4' onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor='password' className='text-white'>Password</label>
                    <input id='password' type='password' className='bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-3 rounded-lg mb-4' onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>Login</button>
                </form>
                <br />
                <Link href='/register' className='text-blue-400 hover:text-blue-600'>
                    Register
                </Link>
            </div>
        </div>
    )
}

export default Login;
