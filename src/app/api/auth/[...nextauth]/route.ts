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
        // 2-1. 로그인
        async signIn(params) {
            const { user } = params;

            if (!user?.email) {
                return false;
            }

            // 사용자 정보를 데이터베이스에 추가 (일반적 관행) -> 사용자가 앱에 처음 로그인 시 사용자에 대한 정보를 저장 -> 나중에 이 정보를 활용해 사용자 관련 기능 제공 
            addUser({
                id: user.id,
                name: user.name || '',
                image: user.image,
                email: user.email,
                username: user.email.split('@')[0],
            });

            // 로그인 성공 나타냄 -> 사용자 로그인 상태로 유지 (return false시 로그인이 실패 처리되어 사용자는 로그인 페이지에 남음)
            return true;
        },
        
        // 2-2. 세션 관리 -> 로그인 상태 유지
        async session(params) {
            const { session, token } = params;
            const user = session?.user;

            if (user) {
                // 세션에 username, id 추가
                session.user = {
                    // 기존 사용자 정보
                    ...session.user,
                    // 1. username (user@example.com -> "user")
                    username: session.user.email?.split('@')[0] || '',
                    // 2. id -> token에서 가져옴 -> 사용자 고유 식별자 
                    id: token.id as string,
                };
            }

            // 최종적으로 생성된 session을 반환
            return session;
        },

        // 2-3. jwt 관리 -> 클라이언트와 서버 간에 정보 전송하는 토큰 기반 인증 방식. 사용자 로그인 상태 유지 & 사용자 권한 유무 확인에 사용.
        async jwt(params) {
            
            // params 객체에서 token, user 속성 추출
            const { token, user } = params;

            // 사용자가 로그인 시
            if (user) {
                // jwt 토큰에 사용자 고유 식별자 (id) 추가 -> 사용자 식별에 사용 -> 로그인 상태 유지, 권한 관리.. 등에 사용
                token.id = user.id;
            }

            // 수정된 jwt 토큰 반환
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
