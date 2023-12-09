'use client';

import useSWR from 'swr';
import { FormEvent, useState } from "react";
import { SearchUser } from '@/model/user';
import GridSpinner from './ui/GridSpinner';
import UserCard from './UserCard';
import useDebounce from '@/hooks/debounce';

export default function UserSearch() {

    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword);
    const {
        data: users,
        isLoading,
        error
    } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <section className='w-full max-w-2xl my-4 flex flex-col items-center'>
            <form
                className='w-full mb-4' 
                onSubmit={onSubmit}
            >
                <input
                    className='w-full text-xl p-3 outline-none border border-gray-400' 
                    type='text' 
                    autoFocus
                    placeholder='ID 또는 이름으로 검색'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
            {/* 검색 중 에러 발생 */}
            {error && <p>에러 발생</p>}
            {/* 검색 로딩 */}
            {isLoading && <GridSpinner />}
            {/* 검색 결과 없음 */}
            {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
            <ul className='w-full p-4'>
                {users && users.map(user => (
                    <li key={user.username}>
                        <UserCard user={user} />
                    </li>   
                ))}
            </ul>
        </section>
    )
}