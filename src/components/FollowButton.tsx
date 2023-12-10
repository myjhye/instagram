'use client';

import { HomeUser, ProfileUser } from "@/model/user"
import useSWR from 'swr';
import Button from "./ui/Button";

type Props = {
    user: ProfileUser;
}

export default function FollowButton({user}: Props) {

    const { data: loggedInUser } = useSWR<HomeUser>('/api/me');
    const showButton = loggedInUser && loggedInUser.username !== user.username;
    const following = loggedInUser && loggedInUser.following.find((item) => item.username === user.username);
    const text = following ? 'Unfollow' : 'Follow';

    return (
        <>
            {showButton && (
                <Button 
                    text={text}
                    onClick={()=>{}}
                    red={text === 'Unfollow'}
                />
            )}
        </>
    )
}