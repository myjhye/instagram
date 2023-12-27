import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateLike(id: string, like: boolean) {
    return fetch('/api/likes', {
        method: 'PUT',
        body: JSON.stringify({ id, like }),
    }).then(res => res.json());
}

async function addComment(id: string, comment: string) {
    return fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ id, comment }),
    }).then(res => res.json());
}

export default function usePosts() {

    // useSWR : 데이터 가져오기 -> posts 배열
    const { 
        data: posts, 
        isLoading, 
        error,
        mutate, 
    } = useSWR<SimplePost[]>('/api/posts');


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

*/