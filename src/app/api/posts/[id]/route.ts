import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { getPost } from "@/service/posts";
import { authOptions } from "../../auth/[...nextauth]/route";

// 컨텍스트 타입 정의
type Context = {
    params: { 
        id: string 
    };
}

export async function GET(request: NextRequest, context: Context) {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response('authentication error: ', { status: 401 });
    }

    // 주어진 post id로 -> context.params.id -> 포스트 데이터 가져오기
    return getPost(context.params.id)
        .then((data) => NextResponse.json(data));
}