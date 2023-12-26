import { NextResponse } from "next/server";
import { getUserByUsername } from "@/service/user";
import { withSessionUser } from "@/util/session";

export async function GET(request: Request) {

    // withSessionUser -> 사용자 세션 정보
    return withSessionUser(async (user) => 

        // getUserByUsername -> 사용자 정보
        getUserByUsername(user.username)
            // 사용자 정보를 json으로
            .then(data => NextResponse.json(data))
    );
}


/*

로그인한 사용자의 세션으로 사용자 정보를 가져와 클라이언트에게 json 형식으로 응답

1. GET 함수
클라이언트로부터 http get 요청 처리
요청 객체인 request를 매개변수로 받음

2. withSessionUser
사용자의 세션 정보를 가져오고, 해당 세션에 사용자가 로그인한 경우에만 실행

3. getUserByUsername
사용자의 username으로 사용자 정보를 데이터베이스에서 가져옴
사용자 정보를 json으로 변환 -> 클라이언트와 서버 간의 데이터 교환을 간단하게 만드는 경량 데이터 형식

*/