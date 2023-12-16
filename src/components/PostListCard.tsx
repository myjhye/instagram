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

// 컴포넌트에 전달되는 props
type Props = {
    post: SimplePost;
    priority?: boolean;
}

export default function PostListCard({post, priority = false }: Props) {

    // 모달
    const [openModal, setOpenModal] = useState(false);

    return  (
        <article className="rounded-lg shadow-md border-gray-200">
           {/* 사용자 프로필 페이지 이동 */}
           <Link href={`/user/${post.username}`}>
                <PostUserAvatar 
                    image={post.userImage} 
                    username={post.username} 
                />
            </Link>

            {/* 포스트 이미지 -> 모달을 여는 클릭 이벤트 설정 */}
            <Image
                className="w-full object-cover ascpect-square" 
                src={post.image} 
                alt={`photo by ${post.username}`}
                width={500}
                height={500}
                priority={priority}
                onClick={() => setOpenModal(true)}
            />

            {/* 액션 바 -> 좋아요 수, 사용자 이름, 포스트 내용, 생성 날짜 */}
            <ActionBar
                likes={post.likes}
                username={post.username}
                text={post.text}
                createdAt={post.createdAt}
            />

            {/* 댓글 입력 폼 */}
            <CommentForm />

            {/* 포스트 디테일을 모달로 표시 */}
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