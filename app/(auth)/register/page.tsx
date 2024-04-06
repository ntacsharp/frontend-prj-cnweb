"use client"


import Link from 'next/link';
import React, { useState } from 'react'

const Register = () => {
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [DisplayName, setDisplayName] = useState("");
    function handleSubmit() {

    }
    return (
        <div className='bg-zinc-800 mx-auto my-auto w-[480px] h-[450px]'>
            <form className='flex flex-col'>
                <label>Username</label>
                <input id='username' type='text' className='text-black' onChange={(e) => setUsername(e.target.value)} />
                <label>Password</label>
                <input id='password' type='password' className='text-black' onChange={(e) => setPassword(e.target.value)} />
                <label>Email</label>
                <input id='email' type='email' className='text-black' onChange={(e) => setEmail(e.target.value)} />
                <label>Display name</label>
                <input id='displayname' type='displayname' className='text-black' onChange={(e) => setDisplayName(e.target.value)} />
            </form>
            <button onClick={handleSubmit}>Sign Up</button>
            <br></br>
            <Link href='/login'>Login</Link>
        </div>
    )
}

export default Register
