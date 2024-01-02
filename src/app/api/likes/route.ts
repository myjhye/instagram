import { NextRequest, NextResponse } from "next/server";
import { dislikePost, likePost } from "@/service/posts";
import { withSessionUser } from "@/util/session";

/*
const {id, like} = await req.json();
1. id : 좋아요를 누른 사용자의 id
2. like : 좋아요를 누른 게시물

.then(res => NextResponse.json(res))
- 좋아요 또는 좋아요 취소 결과를 json 형식으로 클라이언트에게 반환 : 클라이언트에서 이를 활용
** res
- 좋아요 또는 좋아요 취소 작업이 성공적으로 완료된 후의 결과
*/

export async function PUT(req: NextRequest) {
    
    return withSessionUser(async (user) => {

        // 요청 (클라이언트)에서 id, like 값 추출
        const {id, like} = await req.json();

        // id, like 값이 유효하지 않으면 bad request 응답 생성
        if (!id || like == null) {
            return new Response('bad request', {status: 400});
        }

        // like 값에 따라 likePost 또는 dislikePost 함수 선택적 호출
        const request = like ? likePost : dislikePost;

        // likePost 또는 dislikePost 함수 실행하고 응답 반환
        return request(id, user.id) 
            // 처리된 결과를 json 형식으로 응답
            .then(res => NextResponse.json(res))
            .catch(error => new Response(JSON.stringify(error), {status: 500}))
    })
}