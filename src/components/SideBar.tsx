import { User } from "@/model/user"
import Avatar from "./Avatar";

type Props = {
    user: User;
}

export default function SideBar({user}: Props) {

    return (
        <>
            <div>
                {user.image && <Avatar image={user.image} /> }
                <p>{user.username}</p>
                <p>{user.name}</p>
            </div>
            <p>
                About · Help · Press · API · Jobs · Privacy · Terms · Location · Language
            </p>
            <p>
                @Copyright INSTAGRAM FROM META
            </p>
        </>
    )
}