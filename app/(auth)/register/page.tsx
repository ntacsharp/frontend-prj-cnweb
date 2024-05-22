"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import {signUp} from '@/app/api/UserApi';
import { useRouter } from 'next/navigation';
import { createProfile } from '@/app/api/ProfileApi';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);


    const handleSubmit = async (e:any) => {
        e.preventDefault();
        
        if (password.length < 8) {
            setErrorMessage("Mật khẩu phải có ít nhất 8 ký tự.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Địa chỉ email không hợp lệ.");
            return;
        }

        if (!username || !displayName) {
            setErrorMessage("Tên đăng nhập và tên hiển thị không được để trống.");
            return;
        }

        try {
            const response = await signUp(username,email,password,displayName)
            setShowModal(true);
            // Xử lý thành công
        } catch (error) {
            console.error("Đăng ký không thành công:", error);
            setErrorMessage("Đăng ký không thành công. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className='mx-auto h-screen flex flex-col justify-center items-center'>
            <div className='bg-gray-800 mx-auto w-[480px] p-8 rounded-lg'>
                <div className="text-center">
                    <h4 className="text-2xl font-bold">Đăng kí tài khoản Conserva.</h4>
                    <hr className="my-4 border-t border-gray-300" />
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col w-full'>
                    <label htmlFor='username' className='text-white'>Username</label>
                    <input 
                        id='username' 
                        type='text' 
                        className='bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-3 rounded-lg mb-4' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <label htmlFor='password' className='text-white'>Password</label>
                    <input 
                        id='password' 
                        type='password' 
                        className='bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-3 rounded-lg mb-4' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label htmlFor='email' className='text-white'>Email</label>
                    <input 
                        id='email' 
                        type='email' 
                        className='bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-3 rounded-lg mb-4' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label htmlFor='displayname' className='text-white'>Display name</label>
                    <input 
                        id='displayname' 
                        type='text' 
                        className='bg-gray-700 text-white border-b-2 border-gray-500 focus:outline-none focus:border-blue-500 py-2 px-3 rounded-lg mb-4' 
                        value={displayName} 
                        onChange={(e) => setDisplayName(e.target.value)} 
                    />
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg'>Sign Up</button>
                </form>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <br />
                <Link href='/login'>
                    <span className='text-blue-400 hover:text-blue-600 cursor-pointer'>Đăng nhập</span>
                </Link>
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-12 rounded-lg relative">
                        <button onClick={() => setShowModal(false)} className="absolute top-2 right-2 text-red-600 hover:text-red-700 focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-3xl font-bold mb-4 text-zinc-950">Đăng ký thành công!</h2>
                        <hr className="my-4 border-t border-gray-300" />
                        {username && <p className="mb-4 text-zinc-950 font-bold">Tài khoản: {username}</p>}
                        {email && <p className="mb-4 text-zinc-950 font-bold">Email: {email}</p>}
                        <hr className="my-4 border-t border-gray-300" />
                        <p className="mb-4 text-zinc-950">Chuyển đến trang đăng nhập?</p>
                        <div className = " m-auto text-center mt-10 text-xl">
                            <Link href="/login">
                                <span className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg">Đăng nhập</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;

