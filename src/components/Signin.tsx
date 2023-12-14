'use client';

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
    // auth provider 목록
    providers: Record<string, ClientSafeProvider>;
    // 로그인 후 리다이렉션 할 url
    callbackUrl: string;
};

export default function Signin({providers, callbackUrl}: Props) {

    return (
        <>
        {
            // auth provider 목록 반복하며 로그인 버튼 렌더링
            Object.entries(providers).map(([id, provider]) => (
                <ColorButton
                    key={id}
                    text={`Sign in with ${provider.name}`}
                    // 클릭 시 로그인 함수 호출
                    onClick={() => signIn(id, { callbackUrl })}
                    // 버튼 크기
                    size='big'
                />
            ))
        }
        </>
    )
}