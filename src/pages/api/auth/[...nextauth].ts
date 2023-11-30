import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
        }),
    ],
};

export default NextAuth(authOptions);