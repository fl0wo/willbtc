import {NextRequest, NextResponse} from "next/server";
import botClient from "@/libs/drizzle/queries/bot";

export async function GET(request: NextRequest) {
   // id from url params
    const id = request.url.split('/').pop();

    if(!id) {
        return NextResponse.error();
    }

    // the field "cta" is not returned for some reasons.
    // https://blogfa.st/api/bot/b81104d5-678d-4a00-9202-d84fadfc8e58
    const bot = await botClient
        .query
        .get
        .byId(id)

    return NextResponse.json({
        ...bot
    });
}
