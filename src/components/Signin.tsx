'use client';

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
    providers: Record<string, ClientSafeProvider>;
    callbackUrl: string;
};

export default function Signin({providers, callbackUrl}: Props) {

    return (
        <>
        {
            Object.entries(providers).map(([id, provider]) => (
                <ColorButton
                    key={id}
                    text={`Sign in with ${provider.name}`}
                    onClick={() => signIn(id, { callbackUrl })}
                    size='big'
                />
            ))
        }
        </>
    )
}