import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { SimplePost } from '@/model/post';
import PostGridCard from './PostGridCard';

type Props = {
    // 사용자명
    username: string;
    // 포스트 종류 -> 쿼리 문자열
    query: string;
}

export default function PostGrid({username, query}: Props) {

    const {
        data: posts,
        isLoading,
        error,
    // 사용자의 포스트 데이터 가져오기
    } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

    return (
        <div className='w-full text-center'>
            {isLoading && <GridSpinner />}
            <ul className='grid grid-cols-3 gap-4 py-4 px-8'>
                {posts && posts.map((post, index) => (
                    <li key={post.id}>
                        <PostGridCard 
                            post={post}
                            priority={index < 6}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}