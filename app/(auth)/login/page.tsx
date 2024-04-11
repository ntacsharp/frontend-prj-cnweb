// "use client"

// import React, { FormEvent, useState } from 'react'
// import { signIn } from 'next-auth/react'
// import Link from 'next/link'

// const Login = () => {
//     const [Email, setEmail] = useState("");
//     const [Password, setPassword] = useState("");
//     function handleSubmit() {
//         // signIn("credentials", {
//         //     email: Email,
//         //     password: Password,
//         //     redirect: false
//         // })
//         console.log(Email, Password);
//     }
//     function handleSignInWithGoogle() {
//         signIn("google");
//     }
//     return (
//         <div className='bg-zinc-800 mx-auto my-auto w-[480px] h-[450px]'>
//             <button onClick={handleSignInWithGoogle}>Sign in with Google</button>
//             <form className='flex flex-col'>
//                 <label>Email</label>
//                 <input id='email' type='text' className='text-black' onChange={(e) => setEmail(e.target.value)}/>
//                 <label>Password</label>
//                 <input id='password' type='password' className='text-black' onChange={(e) => setPassword(e.target.value)}/>
//             </form>
//             <button onClick={handleSubmit}>Login</button>
//             <br></br>
//             <Link href='/register'>Reg</Link>
//         </div>
//     )
// }

// export default Login


import { redirect } from "next/navigation";
// import { initialProfile } from "@/lib/initial-profile"
// import { db } from "@/lib/db";
import { InitialModal } from "@/components/modals/initial_modal";

const SetupPage = async () =>{
//   const profile = await initialProfile();
//   const server = await db.server.findFirst({
//     where:{
//       members:{
//         some: {
//           profileId: profile?.id
//         }
//       }
//     }
//   })

//   if(server){
//     return redirect(`/servers/${server.id}`)
//   }
  return (
    <div>
      Create a server
      <InitialModal/>
    </div>
  )
}
export default SetupPage
