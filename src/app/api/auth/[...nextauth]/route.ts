import { addUser } from '@/service/user';
// next auth 관련 라이브러리 및  모듈
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// next auth 설정 정의 -> authOptions -> google login
const authOptions: NextAuthOptions = {
    providers: [
        // google login provider 설정
        GoogleProvider({
            // google oAuth 클라이언트 id
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            // google oAuth 클라이언트 secret
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
        }),
    ],

    callbacks: {
        //** 로그인 -> 콜백 함수
        async signIn(params) {
            const { user } = params;
            if (!user?.email) {
                return false;
            }
            // 사용자 정보를 데이터베이스에 추가
            addUser({
                id: user.id,
                name: user.name || '',
                image: user.image,
                email: user.email,
                username: user.email.split('@')[0],
            });
            return true;
        },
        
        //** 세션 관리 -> 콜백 함수
        async session(params) {
            const { session } = params;
            if (session) {
                // 세션에 username 추가
                session.user = {
                    ...session.user,
                    username: session.user.email?.split('@')[0] || '',
                };
            }
            return session;
        },
        
    },

    // 로그인 페이지 경로 설정
    pages: {
        signIn: '/auth/signin',
    },
};

// next auth 사용해 핸들러 생성
const handler = NextAuth(authOptions);

// 핸들러와 설정 내보내기
export { handler as GET, handler as POST, authOptions };
