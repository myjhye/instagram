import { SearchUser } from "@/model/user"
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
    user: SearchUser;
}

export default function UserCard({user}: Props) {

    return (
        <Link 
            href={`/user/${user.username}`}
            className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
        > 
            <Avatar image={user.image} />
            <div className="text-neutral-500">
                <p className="text-black font-bold leading-4">{user.username}</p>
                <p>{user.name}</p>
                <p className="text-sm leading-4">팔로워 {`${user.followers}명`}</p>
            </div>
        </Link>
    )
}