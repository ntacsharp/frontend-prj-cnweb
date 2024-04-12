import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {login} from "@/app/api/UserApi"

async function loginAsync(email, password) {
        login(email,password)
        .then(response => {
            const token = response.data.token;
            sessionStorage.setItem('token', token);
            router.push(`/servers/1`);
            console.log(token)
        })
        .catch(error => {
            console.error('Login failed:', error);
        });
}

export const options = {
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile);
                return {
                    ...profile,
                    id: profile.sub,
                    role: "User"
                };
            },
            clientId: process.env.GOOGLE_ID != null ? process.env.GOOGLE_ID : "",
            clientSecret: process.env.GOOGLE_SECRET != null ? process.env.GOOGLE_SECRET : ""
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
            },
            authorize: async (credentials) => {
                // console.log({credentials});
                await loginAsync(credentials.email, credentials.password);
                return credentials;
            },
        })
    ],
    callback: {
        async jwt({token, user}){
            if(user){
                token.email = user.email,
                token.id = user.id
            }
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.email = token.email,
                session.user.id = token.id
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
};