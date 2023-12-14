import Signin from '@/components/Signin';
import { getServerSession } from "next-auth"
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { authOptions } from '../[...nextauth]/route';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '회원가입',
    description: '회원가입 또는 로그인',
}

// 컴포넌트에 전달할 프로퍼티 타입 정의
type Props = { 
    searchParams: {
        callbackUrl: string 
    }
};

export default async function SignPage({searchParams: { callbackUrl } }: Props) {

    // 서버 세션을 가져와 현재 로그인된 사용자의 세션 확인
    const session = await getServerSession(authOptions);

    // 사용자가 로그인 되어 있으면 홈으로 리다이렉트
    if (session) {
        redirect('/');
    }

    // auth provider 가져오기 -> null이나 undefined면 빈 객체 반환
    const providers = await getProviders() ?? {};

    return (
        <section className='flex justify-center mt-[30%]'>
            {/* 로그인 컴포넌트에 auth provider 목록, 콜백 url 전달 */}
            <Signin 
                providers={providers} 
                callbackUrl={callbackUrl ?? '/'} 
            />
        </section>
    );
}