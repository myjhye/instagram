import { NextRequest, NextResponse } from "next/server";
import { createPost, getFollowingPostsOf } from "@/service/posts";
import { withSessionUser } from "@/util/session";

/*
next.js의 api 라우트 파일
- <클라이언트와 서버 간의 데이터 통신 처리>
- api 엔드포인트로 사용
- 클라이언트는 이 엔드포인트로 데이터를 요청하고, 서버는 <해당 요청을 처리하고 응답 제공>
- <요청에 대한 응답을 화면에 보냄>

1. GET 함수
- 클라이언트로부터 GET 요청 처리
- withSessionUser 함수를 사용해 현재 로그인한 사용자 정보 가져오기
- getFollowingPostsOf 함수로 <로그인한 사용자와 팔로우하는 사용자들의 게시물> 가져오기
- 가져온 데이터를 json 형식으로 응답으로 반환

2. POST 함수
- 클라이언트로부터 POST 요청 처리
- withSessionUser 함수를 사용해 현재 로그인한 사용자 정보 가져오기
- 요청에서 폼 데이터를 추출해 게시물의 텍스트 내용과 첨부된 파일 얻기
- 텍스트 내용과 파일을 사용해 createPost 함수를 호출해 <새 게시물 생성>
- 생성된 게시물 정보를 json 형식으로 응답으로 반환

NextResponse.json(data)
- data를 json 형식으로 변환
*/


// 로그인한 사용자의 게시물 조회 -> 본인 게시물, 팔로우하는 사용자의 게시물
export async function GET() {

    return withSessionUser(async (user) =>
        getFollowingPostsOf(user.username)
            .then((data) => NextResponse.json(data))
    );
}


// 새 게시물 생성
export async function POST(req: NextRequest) {

    return withSessionUser(async (user) => {
        const form = await req.formData();
        const text = form.get('text')?.toString();
        const file = form.get('file') as Blob;

        if (!text || !file) {
            return new Response('bad request', { status: 400 });
        }

        return createPost(user.id, text, file)
            .then((data) => NextResponse.json(data));
    })
}