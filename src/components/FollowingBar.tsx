'use client';

import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';
import useMe from '@/hooks/me';

export default function FollowingBar() {

    // useSWR 훅으로 -> /api/me 엔드포인트에서 -> 데이터를 비동기적으로 가져오기 
    const { 
        user, 
        isLoading: loading, 
        error 
    } = useMe();

    // 사용자의 팔로잉 목록 가져오기
    const users = user?.following;

    return (
        <section className='w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
            { 
                loading 
                    ?<PropagateLoader size={8} color='red' />
                    :(!users || users.length === 0) && <p>{`팔로잉이 없습니다`}</p>
            }
            {
                users && users.length > 0 && (
                    <ScrollableBar>
                        { users.map((user) => (
                            <Link
                                key={user.username}
                                className='flex flex-col items-center w-20' 
                                href={`/user/${user.username}`}
                            >
                                <Avatar image={user.image} highlight />
                                <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                                    {user.username}
                                </p>
                            </Link>
                        ))}
                    </ScrollableBar>
                )
            }
        </section>
    )
}