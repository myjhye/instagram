import useSWR from 'swr';
import GridSpinner from './ui/GridSpinner';
import { SimplePost } from '@/model/post';
import PostGridCard from './PostGridCard';
import { FaCamera } from 'react-icons/fa';

type Props = {
    // 사용자명
    username: string;
    // 포스트 종류 -> 쿼리 문자열
    query: string;
};

export default function PostGrid({ username, query }: Props) {
    const { data: posts, isLoading, error } = useSWR<SimplePost[]>(`/api/users/${username}/${query}`);

    return (
        <div className='w-full text-center'>
            {isLoading && <GridSpinner />}
            {error ? (
                <p className='text-lg'>포스트를 불러오는 중 오류가 발생했습니다.</p>
            ) : (
                <ul className='grid grid-cols-3 gap-4 py-4 px-8'>
                    {posts && posts.length > 0 ? (
                        posts.map((post, index) => (
                            <li key={post.id}>
                                <PostGridCard post={post} priority={index < 6} />
                            </li>
                        ))
                    ) : (
                        <div className='flex flex-col items-center mt-4'>
                            <FaCamera className='text-6xl border-2 border-black rounded-full p-2' />
                            <p className='text-3xl mt-4'>게시물 없음</p>
                        </div>
                    )}
                </ul>
            )}
        </div>
    );
}
