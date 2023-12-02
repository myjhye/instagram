'use client';

import useSWR from 'swr';

export default function FollowingBar() {

    const { data, isLoading, error } = useSWR('/api/me');
    
    console.log(data);

    // 1. 클라이언트 컴포넌트에서 -> 백엔드에게 api/me 사용자의 정보 가져오기
    // 2. 백엔드에서 현재 로그인된 사용자의 세션 정보를 이용하여
    // 3. 벡엔드에서 followings의 상세 정보를 sanity에서 가져오기
    // 4. 클라이언트 컴포넌트에서 followings 정보를 화면에 표시 -> image, username

    return (
        <p>following bar</p>
    )
}