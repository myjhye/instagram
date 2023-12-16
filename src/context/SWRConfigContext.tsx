'use client';

import { SWRConfig } from 'swr';

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  
  return (
    // SWRConfig -> swr 라이브러리 설정 제공
    <SWRConfig
        value={{
            // fetcher -> 데이터 가져오는 함수
            fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
    >
        {children}
    </SWRConfig>
  );
}
