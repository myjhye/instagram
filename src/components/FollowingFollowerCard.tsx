import { ProfileUser, SearchUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
    user: ProfileUser;
}

export default function FollowingFollowerCard({ user }: Props) {
    return (
        <div className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 bg-white hover:bg-neutral-50">
            <Link 
                href={`/user/${user.username}`}
                className="flex items-center w-full p-4"
            >
                <Avatar image={user.image} />
                <div className="text-neutral-500">
                    <p className="text-black font-bold leading-4">{user.username}</p>
                    <p>{user.name}</p>
                    <p className="text-sm leading-4">
                        {user.followers === null ? "팔로워 0명" : `팔로워 ${user.followers}명`}
                    </p>
                </div>
            </Link>
            <div className="ml-auto">
                <FollowButton user={user} />
            </div>
        </div>
    );
}
