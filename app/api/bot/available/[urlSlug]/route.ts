import {NextRequest, NextResponse} from "next/server";
import botClient from "@/libs/drizzle/queries/bot";

export async function GET(request: NextRequest) {
   // id from url params
    const urlSlug = request.url.split('/').pop();

    if(!urlSlug) {
        return NextResponse.error();
    }

    const bot = await botClient
        .query
        .get
        .byUrlSlug(urlSlug);

    const urlSlugOfBot = bot?.urlSlug;

    return NextResponse.json({
        available: urlSlug !== urlSlugOfBot,
        domain: urlSlug
    });
}
