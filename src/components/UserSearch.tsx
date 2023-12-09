'use client';

import useSWR from 'swr';
import { FormEvent, useState } from "react";
import { ProfileUser } from '@/model/user';
import GridSpinner from './ui/GridSpinner';

export default function UserSearch() {

    const [keyword, setKeyword] = useState('winter');
    const {
        data: users,
        isLoading,
        error
    } = useSWR<ProfileUser[]>(`/api/search/${keyword}`)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();

    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    type='text' 
                    autoFocus
                    placeholder='유저 이름이나 이름으로 검색'
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
            {error && <p>에러 발생</p>}
            {isLoading && <GridSpinner />}
            {!isLoading && !error && users?.length === 0 && <p>찾는 사용자가 없음</p>}
            <ul>
                {users && users.map(user => (
                    <li key={user.username}>
                        <p>{user.username}</p>
                    </li>   
                ))}
            </ul>
        </>
    )
}