import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
      redirect('/auth/signin');
  }

  return (
    <section>
      <FollowingBar />
      <PostList />
      <SideBar user={user} />
    </section>
  )
}
