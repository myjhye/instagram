import { NextRequest, NextResponse } from "next/server";
import { dislikePost, likePost } from "@/service/posts";
import { withSessionUser } from "@/util/session";

/*
const {postId, like} = await req.json();
- 커스텀 훅의 요청 (req.json)에서 id, like 추출
1. postId : 좋아요가 눌러진 게시물 id
2. like : 좋아요 여부 (true, false)

.then(res => NextResponse.json(res))
- 좋아요 또는 좋아요 취소 결과를 json 형식으로 클라이언트에게 반환 : 클라이언트에서 이를 활용
** res
- 좋아요 또는 좋아요 취소 작업이 성공적으로 완료된 후의 결과
*/

export async function PUT(req: NextRequest) {
    
    return withSessionUser(async (user) => {

        // 요청 (클라이언트)에서 id, like 값 추출
        const {postId, like} = await req.json();

        // id, like 값이 유효하지 않으면 bad request 응답 생성
        if (!postId || like == null) {
            return new Response('bad request', {status: 400});
        }

        // 좋아요를 누르면 (like) likePost 호출, 아니면 dislikePost 호출
        const request = like ? likePost : dislikePost;

        // likePost 또는 dislikePost 함수 실행하고 응답 반환
        return request(postId, user.id) 
            // 처리된 결과를 json 형식으로 응답
            .then(res => NextResponse.json(res))
            .catch(error => new Response(JSON.stringify(error), {status: 500}))
    })
}