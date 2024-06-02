"use client";

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Info = () => {

    const baseUrl = process.env.BASE_URL || 'http://localhost';
   

    useEffect(() => {
    
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('userId');

            axios.get(`${baseUrl}:4869/api/user/verify/${userId}`)
            .catch(err => {
                console.log(err);
            })
            
           
        }
    }, []);

    return (
        <div>
            <div style={{
                backgroundImage: "url('/background.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <svg width="150" height="150" viewBox="0 0 15 15" className='pt-6' fill='#4ade80' xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill='#4ade80' fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-lg font-bold text-center">
                        <p>Xin chúc mừng! Bạn đã đăng ký tài khoản thành công.</p>
                        <a className='text-violet-300 hover:underline' href='/login'>Đăng nhập ngay</a>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;
