'use client';

// next.js react 제공 컴포넌트 -> nextauth 관련 session 관리 위한 provider 가져옴
import { SessionProvider } from 'next-auth/react';

// props 정의 -> children 
type Props = {
	// React.ReactNode -> children 요소 정의 시 자주 사용
  children: React.ReactNode;
};


export default function AuthContext({ children }: Props) {
  return (
    // session 관리를 위한 session provider 사용 -> 앱 내에서 session 관리 -> 로그인 관련 컴포넌트에서 사용자 세션 정보에 액세스 할 수 있게
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}