import { NextRequest, NextResponse } from "next/server";
import { follow, unfollow } from "@/service/user";
import { withSessionUser } from "@/util/session";

export async function PUT(req: NextRequest) {
    
    return withSessionUser(async (user) => {
        const {id: targetId, follow: isFollow} = await req.json();

        if (!targetId || isFollow == null) {
            return new Response('bad request', {status: 400});
        }

        const request = isFollow ? follow : unfollow; 

        return request(user.id, targetId)
            .then(res => NextResponse.json(res))
            .catch(error => new Response(JSON.stringify(error), {status: 500}))
    })
}