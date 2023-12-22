import NewPost from "@/components/NewPost";
import { Metadata } from "next"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
    title: '새 게시물 만들기',
    description: '새 게시물 만들기'
};

export default async function NewPostPage() {
    
    const session = await getServerSession(authOptions);
    // ?.user -> session에 user가 있는지 검사 -> 항상 user를 전달하려고
    if (!session?.user) {
        redirect('/auth/signin');
    }
    
    return (
        <NewPost user={session.user} />
    )
}