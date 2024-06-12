import {NextRequest, NextResponse} from "next/server";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/libs/next-auth";
import botClient from "@/libs/drizzle/queries/bot";
import {CreateNewBot, InsertBotSchema} from "@/libs/drizzle/zod";

export async function POST(request: NextRequest) {
    try {
        const form: FormBotConfigurationType = await request.json();
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({message: "User not found"}, {status: 400})
        }

        const userId = session.user.id;

        if (!userId) {
            return NextResponse.json({message: `User ID is required, but session is ${session}`}, {status: 400})
        }

        const cmd:CreateNewBot = {
            userId: userId,
            ...form,

            cta: {
                title: form.ctaTitle,
                description: form.ctaDescription,
                url: form.ctaRedirectUrl,
                text: form.ctaRedirect,
            },

            updatedAt: new Date(),
            createdAt: new Date(form.createdAt ?? Date.now())
        }

        // TODO: urlSlug should be unique (we have a unique index on it)
        // make sure this urlSlug does not have invalid characters (those not allowed by GitHub repos) (aka only alphanumeric and -)

        await botClient
            .mutations
            .upsert(InsertBotSchema.parse(cmd) as any);

        return NextResponse.json({message: "Message sent successfully"}, {status: 201})
    } catch (err) {
        console.error(err)
        return NextResponse.json({message: "Failed to send message "}, {status: 400})
    }
}