import { OAuthUser, addUser } from '@/service/user';
import { Session } from 'next-auth';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
        }),
    ],

    callbacks: {
        async signIn(params) {
            const { user } = params;
            if (!user?.email) {
                return false;
            }
            addUser({
                id: user.id,
                name: user.name || '',
                image: user.image,
                email: user.email,
                username: user.email.split('@')[0],
            });
            return true;
        },
        
        async session(params) {
            const { session } = params;
            if (session) {
                session.user = {
                    ...session.user,
                    username: session.user.email?.split('@')[0] || '',
                };
            }
            return session;
        },
        
    },

    pages: {
        signIn: '/auth/signin',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
