import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/service/posts";
import { withSessionUser } from "@/util/session";

// 컨텍스트 타입 정의
type Context = {
    params: { 
        id: string 
    };
}

export async function GET(_: NextRequest, context: Context) {

    return withSessionUser(async () =>
        // 주어진 post id로 -> context.params.id -> 포스트 데이터 가져오기
        getPost(context.params.id)
            .then((data) => NextResponse.json(data))
    );
}