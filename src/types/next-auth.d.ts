import { AuthUser } from '@/model/user';

// next-auth 모듈을 typescript에서 확장
declare module 'next-auth' {
    // session 객체를 확장해 사용자 정보 추가
    interface Session {
        user: AuthUser;
    }
}