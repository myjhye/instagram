import { FullPost, SimplePost } from "@/model/post"
import Image from "next/image";
import userSWR from 'swr';
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import Avatar from "./Avatar";

type Props = {
    post: SimplePost;
}

export default function PostDetail({post}: Props) {

    const { data } = userSWR<FullPost>(`/api/posts/${post.id}`);
    const comments = data?.comments;

    return (
        <section className="flex w-full h-full">
            <div className="relative basis-3/5">
                <Image
                    className="object-cover"
                    src={post.image}
                    alt={`photo by ${post.username}`}
                    priority
                    fill 
                    sizes='650px'
                />
            </div>
            <div className="w-full basis-2/5 flex flex-col">
                <PostUserAvatar 
                    image={post.userImage}
                    username={post.username}
                />
                <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
                    {comments && comments.map((comments, index) => (
                        <li 
                            key={index}
                            className="flex items-center mb-1"
                        >
                            <Avatar 
                                image={comments.image}
                                size='small'
                                highlight={comments.username === post.username} 
                            />
                            <div className="ml-2">
                                <span className="font-bold mr-2">{comments.username}</span>
                                <span>{comments.comment}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <ActionBar 
                    likes={post.likes} 
                    username={post.username} 
                    createdAt={post.createdAt} 
                />
                <CommentForm />
            </div>
        </section>
    )
}