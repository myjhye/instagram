import { Comment, FullPost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

/*
커스텀 훅
- api 호출
- 컴포넌트 간에 데이터 로직 재사용

mutate
- 데이터 갱신 함수

useSWR<FullPost>(`/api/posts/${postId}`);
** postId를 인자로 받는 이유
- 해당 훅이 <특정 게시물에 대한 데이터> 가져오려고

newPost
- 로컬 상태 업데이트용 변수
- 클라이언트에서 댓글을 추가한 후에 화면 실시간 반영하기 위함

[post, mutate, globalMutate]
- useCallback 함수의 두 번째 인수로 사용
- 함수 내에서 참조하는 변수나 함수
- 해당 변수나 함수들의 값이 변경될 때만 postComment 함수가 재생성되도록 제어
** 목적
- 리액트 최적화
- 함수 컴포넌트 내에서 상태나 프롭스가 변경되었을 때, 함수 컴포넌트 전체가 다시 렌더링되는 것이 아니라 변경된 부분만 업데이트
** useCallback 함수와 의존성 배열 사용 : 메모이제이션의 한 예
- useCallback은 함수를 캐시하고, 해당 함수 내에서 의존성 배열에 지정된 변수나 함수가 변경되지 않으면 이전 함수 재사용
- 리액트 컴포넌트가 필요한 상황에서만 재렌더링 되고, 함수가 재생성 되지 않음
- 또 다른 메모이제이션 기법으로는 <useMemo>, <useEffect 내에서의 조건부 실행> : 어플리케이션 성능 향상
*/

async function addComment(id: string, comment: string) {
    return fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ id, comment }),
    }).then(res => res.json());
}

export default function useFullPost(postId: string) {

    const { 
        data: post, 
        isLoading, 
        error,
        mutate, 
    } = useSWR<FullPost>(`/api/posts/${postId}`);

    const { mutate: globalMutate } = useSWRConfig();

    // 댓글 추가 함수
    const postComment = useCallback((comment: Comment) => {

        // 게시물 데이터가 없는 경우 함수 종료
        if (!post) {
            return;
        }

        const newPost = {
            // 기존 게시물
            ...post,
            comments: [
                // 게시물의 기존 댓글 
                ...post.comments,
                // ** 게시물의 새 댓글 
                comment
            ],
        };

        // 댓글 추가를 서버에 요청하고 -> 데이터 갱신
        return mutate(addComment(post.id, comment.comment), {
            optimisticData: newPost,
            populateCache: false,
            revalidate: false,
            rollbackOnError: true,
        }).then(() => globalMutate('/api/posts'));
        
    }, [post, mutate, globalMutate]);

    // 게시물 데이터, 로딩 상태, 오류 상태, 댓글 추가 함수 반환
    return {post, isLoading, error, postComment};
}