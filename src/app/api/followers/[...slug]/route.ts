import { getFollowerOf, getFollowingOf } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

type Context = {
    params: {
        slug: string[];
    };
};

export async function GET(_: NextRequest, context: Context) {

    const { slug } = context.params;

    const [ username ] = slug;

    return getFollowerOf(username)
        .then((data) => NextResponse.json(data));
}