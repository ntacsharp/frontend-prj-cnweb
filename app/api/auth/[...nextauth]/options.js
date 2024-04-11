import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
    providers: [
        GoogleProvider({
            profile(profile) {
                console.log("Profile Google: ", profile);

                let userRole = "Google User";
                if (profile?.email == "test@gmail.com") {
                    userRole = "admin";
                }
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
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
                console.log({credentials});
                return credentials;
            },
        })
    ],
    pages: {
        signIn: "/login",
    }
};