import GoogleProvider from "next-auth/providers/google";
// import { signIn } from 'next-auth/client';

// async function loginAsync(email, password) {
//         login(email,password)
//         .then(response => {
//             const token = response.data.token;
//             if (typeof window !== 'undefined') sessionStorage.setItem('token', token);
//             console.log(token)
//             // redirect(`/servers/1`);
//         })
//         .catch(error => {
//             console.error('Login failed:', error);
//         });
// }

export const options = {
    providers: [
        GoogleProvider({
            profile(profile) {
                // console.log("Profile Google: ", profile);
                return {
                    ...profile,
                    id: profile.sub,
                    role: "User"
                };
            },
            clientId: process.env.GOOGLE_ID != null ? process.env.GOOGLE_ID : "",
            clientSecret: process.env.GOOGLE_SECRET != null ? process.env.GOOGLE_SECRET : ""
        }),
    ],
    pages: {
        signIn: "/login",
    }
};