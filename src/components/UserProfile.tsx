import { ProfileUser } from "@/model/user"
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
    user: ProfileUser;
};

/*
ProfileUser
1. name
2. username
3. email
4. following
5. followers
6. posts
*/

export default function UserProfile({user}: Props) {

    const info = [
        { title: '게시물', data: user.posts },
        { title: '팔로워', data: user.followers },
        { title: '팔로우', data: user.following },
    ]

    return (
        <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 border-b border-neutral-300">
            <Avatar 
                image={user.image} 
                highlight
                size='xlarge'
            />
            <div className="md:ml-10 basis-1/3">
                <div className="flex flex-col items-center md:flex-row">
                    <h1 className="text-2xl md:mr-8 my-2 md:mb-0">
                        {user.username}
                    </h1>
                    <FollowButton user={user} />
                </div>
                <ul className="my-4 flex gap-4">
                    {info.map((item, index) => (
                        <li key={index}>
                            <span>{item.title}</span>
                            <span className="font-bold ml-1">
                                {item.data}
                            </span>
                        </li>
                    ))}
                </ul>
                <p className="text-xl font-bold text-center md:text-start">
                    {user.name}
                </p>
            </div>
        </section>
    )
}