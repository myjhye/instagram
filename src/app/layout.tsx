import './globals.css';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';

/*
layout.tsx
- 전체 어플리케이션의 기본 레이아웃 정의
- 전역 스타일 설정, 폰트 설정, 메타 데이터 설정
- 상단 네비게이션 바 렌더링
- 컨텍스트 제공

** 렌더링하는 컴포넌트
- Navbar -> 데이터를 가져오는 역할을 하지 않기에 SWRConfigContext 포함 x
- SWRConfigContext 컴포넌트 내에 포함된 자식 컴포넌트들


*/


const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instagram',
    template: 'Instagram | %s',
  },
  description: 'Instagram Photos',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' className={openSans.className}>
      <body className='w-full bg-neutral-50 overflow-auto'>
        <AuthContext>
          <header className='sticky top-0 bg-white z-10 border-b'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <main className='w-full flex justify-center max-w-screen-xl mx-auto'>
            <SWRConfigContext>
              {children}
            </SWRConfigContext>
          </main>
        </AuthContext>
        <div id='portal' /> 
      </body>
    </html>
  );
}