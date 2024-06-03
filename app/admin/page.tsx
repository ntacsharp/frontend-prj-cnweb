"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { adminGetAll, searchUser } from "../api/UserApi"
import { format, set } from "date-fns"
import { useModal } from "@/hook/use-modal"

const Admin = () => {

  const { onOpen } = useModal();

  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("")

  const DATE_FORMAT = "d MMM yyyy, HH:mm";

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token')
      
      if (!token) {
        window.location.href = '/login'
      }
      adminGetAll(token).then(res => {

        setUsers(res.data)
      })
    }

    


  }, [])

  useEffect(() => {
    searchUser(search, sessionStorage.getItem('token')).then(res => {
       setUsers(res.data)
    })
  }, [search])

  

  function logOut(){
    sessionStorage.removeItem('token')
    window.location.href = '/login'
  }


  return (

    <div className="w-screen h-screen bg-white flex flex-col items-center space-y-4">
      <div className="w-full flex h-14 bg-indigo-400 p-3 font-bold justify-between">
           <div>System Admin</div>
           <button onClick={logOut} className="bg-red-400 shadow-md hover:bg-red-500 w-32 p-1 h-[2rem] duration-150 rounded-md font-bold">Đăng xuất</button>
      </div>
      <div className="flex w-[80%] justify-between">

        <button onClick={() => onOpen("createUser")} className="bg-indigo-400 shadow-md hover:bg-indigo-500 w-32 p-1 h-[3.2rem] duration-150 rounded-md font-bold ">Tạo tài khoản</button>


        <form className="w-3/5 ">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Tìm kiếm</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 " placeholder="Tìm kiếm..." required />
          </div>
        </form>


      </div>
      <div className="flex justify-center overflow-x-auto bg-white w-full">
        <table className="w-[90%] text-sm text-left rtl:text-right text-gray-500 shadow-lg mb-[20px]">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className=" border-slate-300">
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Display Name
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                UpdatedAt
              </th>
              <th scope="col" className="px-6 py-3">
                
              </th>
            </tr>
          </thead>
          <tbody>
            
            {users.map((user : any) => (
              <tr key={user.Id} className="bg-white border-b  border-slate-300">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {user.Email}
                </th>
                <td className="px-6 py-4">
                  {user.Username}
                </td>
                <td className="px-6 py-4">
                  {user.Displayname}
                </td>
                <td className="px-6 py-4">
                  {user.Role}
                </td>
                <td className="px-6 py-4">
                  {user.Status}
                </td>
                <td className="px-6 py-4">
                  {format(new Date(user.CreatedAt), DATE_FORMAT)}
                </td>
                <td className="px-6 py-4">
                  {format(new Date(user.UpdatedAt), DATE_FORMAT)}
                </td>
                <td className="px-6 py-4 space-x-3">
                <button onClick={() => onOpen("updateUser",{id : user.Id})} className="bg-violet-300 shadow-md hover:bg-violet-400 w-11 p-1 h-[2rem] duration-150 rounded-md font-bold text-white">Sửa</button>

                <button onClick={() => onOpen("deleteUser",{id : user.Id})} className="bg-red-400 shadow-md hover:bg-red-500 w-11 p-1 h-[2rem] duration-150 rounded-md font-bold text-white">Xóa</button>
 
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Admin