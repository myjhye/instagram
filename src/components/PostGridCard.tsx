import { SimplePost } from "@/model/post"
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";

type Props = {
    post: SimplePost,
    priority: boolean;
}

export default function PostGridCard({post, priority = false}: Props) {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <Image 
                src={post.image}
                alt={`photo by ${post.username}`}
                fill sizes='650px'
                priority={priority} 
            />
            {
                openModal && (
                    <ModalPortal>
                        <PostModal onClose={() => setOpenModal(false)}>
                            <PostDetail post={post} />
                        </PostModal>
                    </ModalPortal>
                )
            }
        </div>
    )
}