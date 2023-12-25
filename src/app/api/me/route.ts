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