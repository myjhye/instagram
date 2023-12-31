import UserPosts from "@/components/UserPosts";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

/*
사용자 프로필 컴포넌트

getUser
- 사용자 정보 쿼리인 getUserForProfile 캐싱 -> <데이터 결과를 캐시에 저장> -> 동일한 사용자 정보를 여러 번 요청 시 <캐시된 데이터를 활용해 중복 요청 방지>
- <메모리 캐시>라고 부름
- 네트워크 요청 줄여 서버 부하 줄임

getUserForProfile
- 서비스 훅을 통해 불러오지 않고 바로 즉석에서 데이터 쿼리 호출
** 즉석에서 호출
- 페이지가 렌더링될 때마다 사용자 정보 요청하고 화면에 표시 -> 렌더링 속도 빠름
** 서비스 훅을 통한 호출
- 컴포넌트가 렌더링 되기 전에 데이터를 불러와야 하므로 추가적인 비동기 작업 필요 -> 렌더링 속도 느림
- 데이터를 캐싱하고 관리하기 위한 추가 로직이 필요할 수 있음

*/


type Props = {
    params: {
        username: string
    };
}

// 사용자 정보를 캐싱해 중복 요청 방지 함수
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({params: {username}}: Props) {

    // 사용자 정보
    const user = await getUser(username);

    // 사용자 정보가 없으면 404 오류 페이지로 리다이렉션
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