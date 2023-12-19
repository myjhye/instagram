import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { addBookmark, removeBookmark } from "@/service/user";

export async function PUT(req: NextRequest) {
    
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        return new Response('authentication error', {status: 401});
    }

    const {id, bookmark} = await req.json();

    if (!id || bookmark === undefined) {
        return new Response('bad request', {status: 400});
    }

    const request = bookmark ? addBookmark: removeBookmark;

    return request(user.id, id)
        .then(res => NextResponse.json(res))
        .catch(error => new Response(JSON.stringify(error), {status: 500}))


}