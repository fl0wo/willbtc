// app/api/test/route.ts
import {scheduleOnboardingEmails} from "@/libs/email/schedule-onboarding";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {

    await scheduleOnboardingEmails({
        email: 'sabaniflorian@gmail.com',
        name: 'Florian Sabani'
    });

    return NextResponse.json({
        message: "Ok"
    }, {status: 200});
}
