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

    // 포스트 상세 정보 가져오기 -> swr 사용
    const { data } = userSWR<FullPost>(`/api/posts/${post.id}`);
    // 포스트 댓글
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
                {/* 포스트 작성자 아바타 & 유저명 */}
                <PostUserAvatar 
                    image={post.userImage}
                    username={post.username}
                />
                <ul className="border-t border-gray-200 h-full overflow-y-auto p-4 mb-1">
                    {/* 포스트 댓글 목록 */}
                    {comments && comments.map((comments, index) => (
                        <li 
                            key={index}
                            className="flex items-center mb-1"
                        >
                            {/* 댓글 작성자 아바타 */}
                            <Avatar 
                                image={comments.image}
                                size='small'
                                highlight={comments.username === post.username} 
                            />
                            {/* 댓글 작성자 유저명 & 댓글 내용 */}
                            <div className="ml-2">
                                <span className="font-bold mr-2">{comments.username}</span>
                                <span>{comments.comment}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* 포스트 좋아요, 작성자, 작성일 */}
                <ActionBar 
                    likes={post.likes} 
                    username={post.username} 
                    createdAt={post.createdAt} 
                />
                {/* 댓글 작성 폼 */}
                <CommentForm />
            </div>
        </section>
    )
}