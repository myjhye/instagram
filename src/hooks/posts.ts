import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR from 'swr';

/*
updateLike 함수
- 클라이언트에서 서버에 요청 보내는 역할 : 좋아요 추가/제거 요청
- 서버에 데이터를 업데이트 하고 업데이트 된 결과 받아옴

body: JSON.stringify({ postId, like })
- postId : 좋아요를 추가/제거할 게시물의 고유 식별자
- like : true/false 값을 담아서, 좋아요를 추가할 것인지 제거할 것인지 서버에 알려준다. true : 좋아요 추가, false : 좋아요 제거
- JSON.stringify({ ... }) : 객체를 json 문자열로 변환하고 http 요청 본문에 포함시켜 서버에 데이터 전송한다 : 서버에서는 이 json 데이터를 다시 파싱해 필요한 데이터를 추출한다

addComment 함수

*/

async function updateLike(postId: string, like: boolean) {
    return fetch('/api/likes', {
        method: 'PUT',
        body: JSON.stringify({ postId, like }),
    }).then(res => res.json());
}

async function addComment(id: string, comment: string) {
    return fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ id, comment }),
    }).then(res => res.json());
}


/*
usePosts 커스텀 훅
- posts 관련 작업 관리
- updateLike 함수 같은 데이터 업데이트 함수를 컴포넌트에서 사용할 수 있게 함 : 게시물 좋아요 추가/제거 작업 처리하고, 업데이트된 데이터를 화면에 반영
- useSWR 라이브러리를 사용해 데이터를 가져오고 관리
*/

export default function usePosts() {

    // 본인과 팔로우 하는 사용자의 게시물 가져오기 : getFollowingPostsOf
    const { 
        data: posts, 
        isLoading, 
        error,
        mutate, 
    } = useSWR<SimplePost[]>('/api/posts');



    /*
        setLike 
        - 매개변수 3개 받음
        1. post : 좋아요 추가/제거 할 게시물 정보
        2. username : 현재 사용자의 사용자명
        3. like : true 또는 false 값으로 좋아요 추가/제거 여부

        const newPost = { ... }
        * like ? [...post.likes, username] 
        - like 변수가 true 일 시 (사용자가 좋아요 추가 시) : 기존의 likes 배열에 <사용자의 username을 추가>해 새로운 배열 생성 : 사용자가 이미 좋아요를 누른 게시물에 중복으로 좋아요를 누르지 않게 됨
        * : post.likes.filter(item => item !== username)
        - like 변수가 false 일 시 (사용자가 좋아요 취소 시) : 기존 likes 배열에서 <사용자의 username을 제외>한 배열 생성 : 사용자가 이미 좋아요를 누른 게시물에서 좋아요 취소 됨

        const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));
        - 업데이트된 게시물만 변경되고 (newPost), 나머지 게시물은 변경되지 않은 상태로 남음

        return mutate(updateLike(post.id, like), { ... }
        - mutate 함수 사용해 updateLike(post.id, like) 함수 호출 : 서버에 좋아요 업데이트 요청 보내기

        optimisticData: newPosts
        - 서버 응답을 기다리는 동안 화면에 최적화된 데이터 표시
        * newPosts
        - 업데이트된 게시물 목록 : 좋아요 즉시 반영
    */


    // setLike : 게시물 좋아요 추가/제거
    const setLike = useCallback((post: SimplePost, username: string, like: boolean) => {

        const newPost = {
            ...post,
            likes: like
                ? [...post.likes, username] 
                : post.likes.filter(item => item !== username),
        };

        const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

        return mutate(updateLike(post.id, like), {
            optimisticData: newPosts,
            populateCache: false,
            revalidate: false,
            rollbackOnError: true,
        });
        
    }, [posts, mutate]);



    // postComment : 게시물 댓글 추가
    const postComment = useCallback((post: SimplePost, comment: Comment) => {

        const newPost = {
            ...post,
            comments: post.comments + 1,
        };

        const newPosts = posts?.map(p => (p.id === post.id ? newPost : p));

        return mutate(addComment(post.id, comment.comment), {
            optimisticData: newPosts,
            populateCache: false,
            revalidate: false,
            rollbackOnError: true,
        });
        
    }, [posts, mutate]);

    return {posts, isLoading, error, setLike, postComment};
}



/*
useCallback
- 함수 메모이제이션
- 리렌더링 시 새 인스턴스를 생성하지 않도록 함
- 의존하는 상태나 프롭스가 변경될 때만 함수 새로 생성
- posts나 mutate가 변경될 때만 setLike 함수가 다시 생성

return {posts, isLoading, error, setLike, postComment};
- 다른 컴포넌트에서 해당 데이터와 함수를 사용하기 위함 -> 컴포넌트 간에 데이터 공유 (커스텀 훅의 원리)

*/