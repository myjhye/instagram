import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

export default async function Home() {

  // 세션에서 사용자 정보 가져오기
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // 사용자가 미로그인 상태면 -> 로그인 페이지로 리다이렉트
  if (!user) {
      redirect('/auth/signin');
  }

  return (
    <section className="flex flex-col md:flex-row max-w-[850px] p-4">
      <div className="w-full basis-3/4 min-w-0">
        {/* 팔로잉 바 */}
        <FollowingBar />
        {/* 포스트 목록 */}
        <PostList />
      </div>
      <div className="basis-1/4 ml-8">
        {/* 사이바 컴포넌트 -> 사용자 정보 전달 */}
        <SideBar user={user} />
      </div>
    </section>
  )
}
