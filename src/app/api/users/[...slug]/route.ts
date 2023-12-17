import { getSavedPostsOf, getPostsOf, getLikedPostsOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: {
        slug: string[]; 
    }
}

export async function GET(_: NextRequest, context: Context) {

    const {slug} = context.params;

    // slug 배열이 없거나, 길이가 2보다 작으면 잘못된 요청으로 처리
    if (!slug || !Array.isArray(slug) || slug.length < 2) {
        return new NextResponse('bad request', { status: 400});
    }

    // slug 배열의 1, 2번째 요소 추출
    const [username, query] = slug;

    let request = getPostsOf;
    
    // query 값에 따라 요청할 서비스 선택

    // 'saved' 쿼리면 -> 'getSavedPostsOf' 함수 사용
    if (query === 'saved') {
        request = getSavedPostsOf;
    }
    
    // 'liked' 쿼리면 -> 'getLikedPostsOf' 함수 사용
    else if (query === 'liked') {
        request = getLikedPostsOf;
    }

    // 선택한 서비스를 이용해 요청 처리 -> 결과를 json 형식으로 반환
    return request(username)
        .then((data) => NextResponse.json(data));
}