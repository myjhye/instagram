'use client';

import { ProfileUser } from "@/model/user"
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";
import ModalPortal from "./ui/ModalPortal";
import { useState } from "react";
import FollowingsPage from "@/app/followings/[username]/page";
import FollowersPage from "@/app/followers/[username]/page";
import FollowingFollowerModal from "./FollowingFollowerModal";

type Props = {
    user: ProfileUser;
};

export default function UserProfile({user}: Props) {

    const [openModal, setOpenModal] = useState(false);
    // 모달에 표시될 내용이 팔로워 또는 팔로잉인지 결정
    const [modalContent, setModalContent] = useState<'followers' | 'following'>('followers');
    // 모달 열 때 : modalContent 상태를 결정 (내용이 팔로워 또는 팔로잉인지)
    const handleModalOpen = (content: 'followers' | 'following') => {
        setModalContent(content);
        setOpenModal(true);
    };

    const info = [
        { title: '게시물', data: user.posts },
        { title: '팔로워', data: user.followers, onClick: () => handleModalOpen('followers') },
        { title: '팔로우', data: user.following, onClick: () => handleModalOpen('following') },
    ];

    // 모달 타이틀 : 팔로워 또는 팔로잉 (상단 표시)
    const modalTitle = modalContent === 'following' ? '팔로잉' : '팔로워';

    return (
        <>
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
                                <span
                                    onClick={item.data > 0 && (item.title === '팔로우' || item.title === '팔로워') ? item.onClick : undefined}
                                    className={item.data > 0 && (item.title === '팔로우' || item.title === '팔로워') ? 'cursor-pointer' : ''}
                                >
                                    {item.title}
                                </span>
                                <span
                                    onClick={item.data > 0 ? item.onClick : undefined} 
                                    className={item.data > 0 ? 'font-bold ml-1 cursor-pointer' : 'font-bold ml-1 text-gray-400'}
                                >
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
            {
                openModal && (
                    <ModalPortal>
                        <FollowingFollowerModal 
                            onClose={() => setOpenModal(false)}
                            title={modalTitle}
                        >
                            {/* modalContent 상태에 따라 다른 페이지 (팔로잉 또는 팔로워) 표시 */}
                            {modalContent === 'following' ? (
                                <FollowingsPage username={user.username} />
                            ) : (
                                <FollowersPage username={user.username} />
                            )}
                        </FollowingFollowerModal>
                    </ModalPortal>
                )
            }
        </>
    )
}
