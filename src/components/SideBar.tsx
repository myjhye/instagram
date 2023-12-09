import { AuthUser } from "@/model/user"
import Avatar from "./Avatar";

type Props = {
    user: AuthUser;
}

export default function SideBar({user}: Props) {

    return (
        <>
            <div className="flex item-center">
                {user.image && (
                    <Avatar image={user.image} /> 
                )}
                <div className="ml-4">
                    <p className="font-bold">{user.username}</p>
                    <p className="text-lg text-neutral-500 leading-4">{user.name}</p>
                </div>
            </div>
            <p className="text-sm text-neutral-500 mt-8">
                About · Help · Press · API · Jobs · Privacy · Terms · Location · Language
            </p>
            <p className="font-bold text-sm mt-8 text-neutral-500">
                @Copyright INSTAGRAM FROM META
            </p>
        </>
    )
}