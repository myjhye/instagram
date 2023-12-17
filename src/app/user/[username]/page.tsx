import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
    // params -> url 파라미터 중 사용자명 (username) 포함
    params: {
        username: string
    };
}

// 사용자 정보 (getUserForProfile) 캐싱 -> 데이터 결과를 캐시에 저장 -> 동일한 사용자 정보 여러 번 요청 시 캐시된 데이터를 활용해 중복 요청 방지 
const getUser = cache(async (username: string) => getUserForProfile(username));

// 사용자 프로필 컴포넌트
export default async function UserPage({params: {username}}: Props) {

    const user = await getUser(username);

    if (!user) {
        notFound();
    }

    return (
        <section className="w-full">
            {/* 사용자 프로필 */}
            <UserProfile user={user} />
            {/* 사용자 포스트 */}
            <UserPosts user={user} />
        </section>
    )
}

// 메타데이터 생성
export async function generateMetadata({ params: { username }}: Props): Promise<Metadata> {

    const user = await getUser(username);

    return {
        title: `${user?.name} (@${user?.username}) ˑ 사진 및 동영상`,
        description: `${user?.name}의 사진 및 동영상`,
    };
}