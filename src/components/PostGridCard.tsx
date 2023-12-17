import { SimplePost } from "@/model/post"
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import { signIn, useSession } from "next-auth/react";

type Props = {
    // 포스트 데이터
    post: SimplePost,
    // 우선 순위
    priority: boolean;
}

export default function PostGridCard({post, priority = false}: Props) {

    // 모달의 열림/닫힘
    const [openModal, setOpenModal] = useState(false);
    // 현재 세션 정보
    const { data: session } = useSession();
    
    // 이미지 클릭 핸들러
    const handleOpenPost = () => {
        // 세션에 사용자 정보가 없는 경우 -> 로그인 모달 띄우기
        if (!session?.user) {
            return signIn();
        }
        // 사용자가 로그인한 경우 -> 모달 열기
        setOpenModal(true);
    }

    return (
        <div className="relative w-full aspect-square">
            <Image
                className="object-cover" 
                src={post.image}
                alt={`photo by ${post.username}`}
                fill sizes='650px'
                priority={priority} 
                onClick={handleOpenPost}
            />
            {
                openModal && (
                    <ModalPortal>
                        <PostModal onClose={() => setOpenModal(false)}>
                            {/* 포스트 모달 내부에 포스트 디테일 컴포넌트 렌더링 */}
                            <PostDetail post={post} />
                        </PostModal>
                    </ModalPortal>
                )
            }
        </div>
    )
}