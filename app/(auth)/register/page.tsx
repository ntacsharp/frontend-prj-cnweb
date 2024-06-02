"use client"
import React, { useState } from 'react';
import {signUp} from '@/app/api/UserApi';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

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
            router.push('/info');
            // Xử lý thành công
        } catch (error) {
            //@ts-ignore
            if(error.response.status === 400){
                setErrorMessage("Email đã tồn tại. Vui lòng chọn email khác.");
            }
            else setErrorMessage("Đăng ký không thành công. Vui lòng thử lại sau.");
        }
    };

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
                      Đăng ký tài khoản Conversa
                  </h1>
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" >
                      <div>
                          <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-indigo-300">Email</label>
                          <input  value={email} 
                        onChange={(e) => setEmail(e.target.value)}  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                      </div>
                      <div>
                          <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-900 dark:text-indigo-300">Tên tài khoản</label>
                          <input value={username} 
                        onChange={(e) => setUsername(e.target.value)}  type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                      </div>
                      <div>
                          <label htmlFor="displayName" className="block mb-2 text-sm font-bold text-gray-900 dark:text-indigo-300">Tên hiển thị</label>
                          <input value={displayName} 
                        onChange={(e) => setDisplayName(e.target.value)}  type="text" name="displayName" id="displayname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="bexuanmailonton" required />
                      </div>
                      <div>
                          <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-900 dark:text-indigo-300">Mật khẩu</label>
                          <input value={password} 
                        onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                      </div>
                      {errorMessage && <p className="text-red-500 text-sm mt-0 mb-0">{errorMessage}</p>}
                      <button type="submit" className="w-full text-white bg-indigo-500 hover:bg-indigo-600 duration-100 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Bạn đã có tài khoản? <a href='/login' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </div>
    
        );
};

export default Register;

