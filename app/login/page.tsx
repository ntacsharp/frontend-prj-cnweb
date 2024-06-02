"use client"

import React, { FormEvent, useEffect, useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { login } from "@/app/api/UserApi";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
   
    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log(email,password);
        login(email, password, "credentials")
            .then(response => {
                const token = response.data.token;
               
                if (typeof window !== 'undefined') sessionStorage.setItem('token', token);
                router.push('/servers/1');
            })
            .catch(error => {
                setErrorMessage("Email hoặc mật khẩu không chính xác.");
                console.error('Login failed:', error);
            });
    }



    return (
        <div >
  <div style={{
                backgroundImage: "url('/background.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Chào mừng đến Conversa
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-indigo-300">Email</label>
                      <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-indigo-300">Mật khẩu</label>
                      <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
                  {errorMessage && <p className="text-red-500 text-sm mt-0 mb-0">{errorMessage}</p>}
                  <button type="submit" className="w-full text-white bg-indigo-500 hover:bg-indigo-600 duration-100 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Bạn chưa có tài khoản? <a href='/register' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</div>

    );
}

export default Login;