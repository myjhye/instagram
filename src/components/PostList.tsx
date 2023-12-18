'use client'
import PostListCard from './PostListCard';
import GridSpinner from './ui/GridSpinner';
import usePosts from '@/hooks/posts';

export default function PostList() {

    const { 
        posts, 
        isLoading
    } = usePosts();

    return (
        <section>
            {isLoading && (
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