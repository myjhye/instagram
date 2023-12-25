import { addUser } from '@/service/user';
// next auth 관련 라이브러리 및  모듈
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// next auth 설정 정의 -> authOptions
const authOptions: NextAuthOptions = {

    // ** 1. providers -> google login
    providers: [
        // google login provider 설정
        GoogleProvider({
            // google oAuth 클라이언트 id
            clientId: process.env.GOOGLE_OAUTH_ID || '',
            // google oAuth 클라이언트 secret
            clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
        }),
    ],

    // ** 2. callbacks -> signIn, session, jwt -> 사용자 로그인, 세션 관리, jwt 관련 콜백 함수 
    callbacks: {
        // 2-1. 로그인 시 호출되는 콜백 함수
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
        
        // 2-2. 세션 관리 시 호출되는 콜백 함수
        async session(params) {
            const { session, token } = params;
            const user = session?.user;

            if (user) {
                // 세션에 username 추가
                session.user = {
                    ...session.user,
                    username: session.user.email?.split('@')[0] || '',
                    id: token.id as string,
                };
            }
            return session;
        },

        // 2-3. jwt 관리 시 호출되는 콜백 함수
        // jwt -> 클라이언트와 서버 간에 정보 안전 전송하는 토큰 기반 인증 방식. 사용자 로그인 상태 유지 & 사용자 권한 유무 확인에 사용.
        async jwt(params) {
            const { token, user } = params;

            if (user) {
                token.id = user.id;
            }
            return token;
        }
        
    },

    // ** 3. pages -> 로그인 페이지 경로 설정
    pages: {
        signIn: '/auth/signin',
    },
};

// next auth 사용해 핸들러 생성
const handler = NextAuth(authOptions);

// 핸들러와 설정 내보내기
export { handler as GET, handler as POST, authOptions };
