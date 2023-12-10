'use client';

import { SimplePost } from "@/model/post"
import Image from "next/image";
import CommentForm from "./CommentForm";
import ActionBar from "./ActionBar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import Link from "next/link";

type Props = {
    post: SimplePost;
    priority?: boolean;
}

export default function PostListCard({post, priority = false }: Props) {

    const {userImage, username, image, createdAt, likes, text} = post;
    const [openModal, setOpenModal] = useState(false);

    return  (
        <article className="rounded-lg shadow-md border-gray-200">
           <Link href={`/user/${username}`}>
                <PostUserAvatar 
                    image={userImage} 
                    username={username} 
                />
            </Link>
            <Image
                className="w-full object-cover ascpect-square" 
                src={image} 
                alt={`photo by ${username}`}
                width={500}
                height={500}
                priority={priority}
                onClick={() => setOpenModal(true)}
            />
            <ActionBar
                likes={likes}
                username={username}
                text={text}
                createdAt={createdAt}
            />
            <CommentForm />
            {
                openModal && (
                    <ModalPortal>
                        <PostModal onClose={() => setOpenModal(false)}>
                            <PostDetail post={post} />
                        </PostModal>
                    </ModalPortal>
                )
            }
        </article>
    )
}