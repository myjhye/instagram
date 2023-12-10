'use client';

import { ProfileUser } from "@/model/user"
import { useState } from "react";
import PostIcon from "./ui/icons/PostIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostGrid from "./PostGrid";

type Props = {
    user: ProfileUser;
};

const tabs = [
    { type: 'posts', icons: <PostIcon /> },
    { type: 'saved', icons: <BookmarkIcon className="w-3 h-3" /> },
    { type: 'liked', icons: <HeartIcon className="w-3 h-3" /> },
]

export default function UserPosts({user}: Props) {

    // /api/users/${username}/posts
    // /api/users/${username}/liked
    // /api/users/${username}/bookmarks
    
    const [query, setQuery] = useState(tabs[0].type);
    

    return (
        <section>
            <ul className="flex justify-center uppercase">
                {tabs.map((tab) => (
                    <li
                        className={`mx-12 p-4 cursor-pointer border-black ${tab.type === query && 'font-bold border-t'}`}
                        key={tab.type}
                        onClick={() => setQuery(tab.type)}
                    >
                        <button className="scale-150 md:scale-100">{tab.icons}</button>
                        <span className="hidden md:inline ml-1">{tab.type}</span>
                    </li>
                ))}
            </ul>
            <PostGrid 
                username={user.username}
                query={query} 
            />
        </section>
    )
}