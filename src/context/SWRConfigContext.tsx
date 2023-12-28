'use client';

import { SWRConfig } from 'swr';

/*
SWRConfigContext
- SWRConfig : 컴포넌트 내에 swr 라이브러리 설정 제공
- fetcher : 데이터를 가져오는 함수. 주어진 url로 http get 요청을 보내고, 응답을 json 형식으로 파싱하여 데이터를 반환하는 방식으로 데이터 가져옴.
- {children} : SWRConfig 컴포넌트 내부에서 'children' 프로퍼티로 전달된 자식 컴포넌트 렌더링. 이를 통해 자식 컴포넌트에서 swr 라이브러리를 사용해 데이터를 가져오고 관리. 


** SWR 특징
- 어플리케이션에서 데이터를 비동기적으로 가져오고 캐싱하는 라이브러리
- 데이터 캐싱 : swr은 데이터를 캐싱해 동일한 요청을 여러번 보내지 않고도 이전에 가져온 데이터 사용 가능. 불필요한 네트워크 요청 줄임.
- 자동 리프레시 : swr은 데이터를 주기적으로 다시 가져와서 최신 데이터 유지
- swr는 주로 next.js와 같이 사용됨
*/

type Props = {
  children: React.ReactNode;
};

export default function SWRConfigContext({ children }: Props) {
  
  return (
    <SWRConfig
        value={{
            fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
    >
        {children}
    </SWRConfig>
  );
}
