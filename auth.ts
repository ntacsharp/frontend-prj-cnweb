import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from '@/app/api/UserApi'; // Adjust the import path as needed

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials : any) {
                try {
                    const response = await login(credentials.email, credentials.password, "credentials");
                    const user = response.data.user;

                    if (user) {
                        return { id: user.id, email: user.email, role: user.role };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Login failed:', error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                //@ts-ignore
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                //@ts-ignore
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
});
