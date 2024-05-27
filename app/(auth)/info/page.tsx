"use client"

import React from 'react';

const Info = () => {
   
    return (
        <div >
            <div style={{
                backgroundImage: "url('/background.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="flex flex-col items-center justify-center w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <svg width="150" height="150" viewBox="0 0 15 15" className='pt-6' fill="" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z" className='fill-amber-200' fillRule="evenodd" clipRule="evenodd"></path></svg>
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-lg font-bold text-center">
                        Vui lòng kiểm tra email để xác nhận tài khoản của bạn.
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Info;