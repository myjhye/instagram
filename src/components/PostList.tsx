'use client'

import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';

export default function PostList() {

    const { 
        data: posts, 
        isLoading: loading
    // 포스트 데이터 가져오기 -> swr 사용 
    } = useSWR<SimplePost[]>('/api/posts')

    return (
        <section>
            {loading && (
                // 데이터가 로딩 중인 동안 스피너 표시
                <div className='text-center mt-32'>
                    <GridSpinner color='red' />
                </div>
            )}
            {posts && (
                <ul>
                    {posts.map((post, index) => (
                        <li 
                            key={post.id}
                            className='mb-4'
                        >
                            {/* priority={index < 2} -> 1, 2번째 포스트에 강조 표시 */}
                            <PostListCard 
                                post={post}
                                priority={index < 2} 
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>        
    )
}