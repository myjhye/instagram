import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId: string, bookmark: boolean) {
    return fetch('/api/bookmarks', {
        method: 'PUT',
        body: JSON.stringify({ 
            id: postId, 
            bookmark 
        }),
    }).then(res => res.json());
}

async function updateFollow(targetId: string, follow: boolean) {
    return fetch('/api/follow', {
        method: 'PUT',
        body: JSON.stringify({ 
            id: targetId, 
            follow
        }),
    }).then(res => res.json());
}


// 사용자 정보 제공 react hook
export default function useMe() {

    //---- 데이터 가져오는 파트
    
    const {
        // 사용자 데이터 
        data: user, 
        isLoading, 
        error,
        // 데이터 업데이트
        mutate, 
    } = useSWR<HomeUser>('/api/me');


    //---- 상태 업데이트 파트

    // 즐겨찾기 상태 업데이트 함수
    const setBookmark = useCallback((postId: string, bookmark: boolean) => {

        // 사용자 데이터 없으면 아무 작업 수행 x
        if (!user) {
            return;
        }

        // 현재 사용자의 즐겨찾기 목록
        const bookmarks = user.bookmarks;
        
        // 업데이트 사용자 데이터 생성 
        const newUser = {
            // 기존 사용자 정보 복사
            ...user,
            // bookmark 추가 시 -> 새 배열을 생성하고 -> postId 추가
            // bookmark 제거 시 -> postId를 제외한 이전 'bookmarks' 배열 유지
            bookmark: bookmark 
                ? [ ...bookmarks, postId ] 
                : bookmarks.filter((b) => b !== postId)
        }

        // swr를 사용해 즐겨찾기 업데이트 및 최적화 데이터 업데이트 실행
        return mutate(updateBookmark(postId, bookmark), {
            // 최적화된 데이터 업데이트
            optimisticData: newUser,
            // 캐시를 채우지 않음
            populateCache: false,
            // 데이터 재검증 비활성화
            revalidate: false,
            // 에러 발생 시 롤백 활성화
            rollbackOnError: true,
        });
        
    }, [user, mutate]);


    // 팔로우 상태 업데이트 함수
    const toggleFollow = useCallback((targetId: string, follow: boolean) => {

        // 팔로우 상태 업데이트 -> 업데이트 된 데이터를 swr 캐시에 즉시 반영하지 않음 -> 업데이트 결과 반환
        return mutate(updateFollow(targetId, follow), {populateCache: false});
    }, [mutate]);

    return {user, isLoading, error, setBookmark, toggleFollow};
}



/*

**커스텀 훅 
공통 로직이나 기능을 하나의 컴포넌트 내에서 정의하고, 이를 여러 컴포넌트에서 재사용
코드 중복을 줄이고, 관련 로직을 추상화해 코드 가독성, 유지보수성 up

*/