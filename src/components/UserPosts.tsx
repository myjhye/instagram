'use client';

import { ProfileUser } from "@/model/user"
import { useState } from "react";
import useSWR from 'swr';

type Props = {
    user: ProfileUser;
};

export default function UserPosts({user}: Props) {

    // /api/users/${username}/posts
    // /api/users/${username}/liked
    // /api/users/${username}/bookmarks
    
    const [tab, setTab] = useState('posts');
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR(`/api/users/${user.username}/${tab}`)
    
    console.log(posts);

    return (
        <>
        </>
    )
}