import { ProfileUser } from "@/model/user"
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
    user: ProfileUser;
};

export default function UserProfile({user}: Props) {

    const info = [
        { title: 'posts', data: user.posts },
        { title: 'followers', data: user.followers },
        { title: 'following', data: user.following },

    ]

    return (
        <section>
            <Avatar 
                image={user.image} 
                highlight
            />
            <div>
                <h1>{user.username}</h1>
                <FollowButton user={user} />
                <ul>
                    {info.map((item, index) => (
                        <li key={index}>
                            <span className="mr-1">{item.data}</span>
                            <span>{item.title}</span>
                        </li>
                    ))}
                </ul>
                <p>{user.name}</p>
            </div>
        </section>
    )
}