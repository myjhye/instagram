'use client';

import { ProfileUser } from "@/model/user"
import Button from "./ui/Button";
import useMe from "@/hooks/me";

type Props = {
    user: ProfileUser;
}

export default function FollowButton({user}: Props) {

    // 현재 로그인된 사용자 정보 가져오기 -> useSWR 사용
    const { user: loggedInUser, toggleFollow } = useMe();

    // 현재 로그인된 사용자 !== 현재 사용자 -> true
    const showButton = loggedInUser && loggedInUser.username !== user.username;

    // 현재 로그인된 사용자가 이미 팔로우 중인지
    const following = loggedInUser && loggedInUser.following.find((item) => item.username === user.username);

    // 현재 로그인된 사용자가 팔로우 중이면 -> Unfollow, 언팔로우 중이면 Follow
    const text = following ? 'Unfollow' : 'Follow';

    const handleFollow = () => {
        toggleFollow(user.id, !following);
    }

    return (
        <>
            {showButton && (
                <Button 
                    text={text}
                    onClick={handleFollow}
                    red={text === 'Unfollow'}
                />
            )}
        </>
    )
}