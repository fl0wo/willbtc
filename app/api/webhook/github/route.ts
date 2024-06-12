import {NextRequest, NextResponse} from "next/server";
import {logGH} from "@/app/utils";
import {GHEvent, GHEventRepository, GHEventWorkflowJob,} from "@/app/model/github/GHEvent";
import {handleNewRepo} from "@/app/api/webhook/github/repo.handler";
import {verifyGitHubSignature} from "@/libs/gh/verify-signature";
import {handleNewJob} from "@/app/api/webhook/github/job.handler";
import botClient from "@/libs/drizzle/queries/bot";

async function process(payload:GHEvent, repoName: string | undefined) {

    // We have both a job and a repository
    if (!!payload.workflow_job && !!payload.repository) {
        const action = payload.action;
        switch (action) {
            case "queued":          // 1. A job is queued
            case "in_progress":     // 2. A job is running
            case "completed":       // 3. A job is completed
                const event = payload as GHEventWorkflowJob & GHEventRepository;
                await handleNewJob(event);
        }
    }

    if ('created' === payload.action && !!payload.repository) {
        const event: GHEventRepository = payload as GHEventRepository;
        await handleNewRepo(event, repoName);                               // A repo is identified for the first time
    }
}

export async function POST(req: NextRequest) {
    const payload: GHEvent = await req.json();

    if (!(await verifyGitHubSignature(req,payload))) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const repoName = payload?.repository?.name;

    logGH(`Received event ${repoName} ${payload?.action} ${payload?.workflow_job?.name} ${payload?.check_run?.name}`);

    if(!repoName) {
        console.log("No repo name found in the payload");
        return NextResponse.json({message: "No repo name found in the payload"}, {
            status: 200
        });
    }

    // is this an existing repo name?
    const bot = await botClient
        .query
        .get
        .byUrlSlug(repoName);

    if(!bot) {
        console.log("No bot found for this repo name");
        return NextResponse.json({message: "No bot found for this repo name"}, {
            status: 200
        });
    }

    await process(payload, repoName);

    return NextResponse.json({
        message: "Ok"
    }, {status: 200});
}
