import {NextRequest, NextResponse} from "next/server";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {buildTursoClientEdge} from "@/libs/turso";
import {bots} from "@/libs/drizzle/schema";
import {eq} from "drizzle-orm";
import {orThrow} from "@/app/utils";

export async function POST(request: NextRequest) {
    try {
        const form:FormBotConfigurationType = await request.json();
        const formId = orThrow(form.id, 'Form ID is required')
        await buildTursoClientEdge()
            .delete(bots)
            .where(eq(bots.id, formId));
        return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 })
    }
    catch (err) {
        console.error(err)
        return NextResponse.json({ message: "Failed to delete message" }, { status: 400 })
    }
}
