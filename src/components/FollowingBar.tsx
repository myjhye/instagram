'use client';

import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';

export default function FollowingBar() {

    const { data, isLoading: loading, error } = useSWR<DetailUser>('/api/me');
    const users = data?.following;    

    return (
        <section>
            { 
                loading 
                    ?<PropagateLoader size={8} color='red' />
                    :(!users || users.length === 0) && <p>{`팔로잉이 없습니다`}</p>
            }
            {
                users && users.length > 0 && (
                    <ul>
                        { users.map((user) => (
                            <li key={user.username}>
                                <Link href={`/user/${user.username}`}>
                                    <Avatar image={user.image} highlight />
                                    <p>{user.username}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )
            }
        </section>
    )
}