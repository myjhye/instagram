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

type Props = { 
    searchParams: { 
        callbackUrl: string 
    }
};

export default async function SignPage({searchParams: { callbackUrl } }: Props) {

    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/');
    }

    const providers = await getProviders() ?? {};

    return (
        <section className='flex justify-center mt-[30%]'>
            <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
        </section>
    );
}