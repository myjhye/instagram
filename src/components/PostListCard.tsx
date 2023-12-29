'use client';

import { Comment, SimplePost } from "@/model/post"
import Image from "next/image";
import ActionBar from "./ActionBar";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import Link from "next/link";
import usePosts from "@/hooks/posts";

/*
PostListCard
- 개별 포스트 카드
- 사용자의 프로필 이미지, 포스트 이미지, 액션 바(좋아요, 북마크, 댓글, 생성날짜), 모달 렌더링
*/

type Props = {
    post: SimplePost;
    priority?: boolean;
}

export default function PostListCard({post, priority = false }: Props) {

    const [openModal, setOpenModal] = useState(false);
    const { postComment } = usePosts();
    const handlePostComment = (comment: Comment) => {
        postComment(post, comment);
    }

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

            {/* 액션 바 -> 좋아요, 북마크, 댓글, 생성 날짜 */}
            <ActionBar 
                post={post} 
                onComment={handlePostComment}
            >
                <p>
                    <span className="font-bold mr-1">{post.username}</span>
                    <span>{post.text}</span>
                </p>
                {post.comments > 1 && (
                    <button
                        className="font-bold my-2 text-gray-500" 
                        onClick={() => setOpenModal(true)}
                    >
                        {`댓글 ${post.comments}개 모두 보기`}
                    </button>
                )}
            </ActionBar>

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


/*

** 모달 관련 컴포넌트를 2개 사용하는 이유
- 코드 모듈화 : 큰 코드베이스를 여러 작은 코드로 분할 -> ex) html + js가 합쳐진 한 파일을 html, js 두 파일로 나누기
- 컴포넌트 역할과 책임 분리

1. ModalPortal
- ReactDOM.createPortal 사용해 모달 생성하고 화면에 표시

2. PostModal
- 모달 컨텐츠, 내용 정의
- PostListCard로부터 받은 onClose 콜백함수 호출해 모달 닫기

*/