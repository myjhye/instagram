import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getUserByUsername } from "@/service/user";
import { getFollowingPostsOf } from "@/service/posts";

export async function GET() {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response('authentication error: ', { status: 401 });
    }

    return getFollowingPostsOf(user.username)
        .then((data) => NextResponse.json(data));
}