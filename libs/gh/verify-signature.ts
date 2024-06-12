import {NextRequest} from "next/server";
import {GHEvent} from "@/app/model/github/GHEvent";
import {Webhooks} from "@octokit/webhooks";
import {orThrow} from "@/app/utils";

export async function verifyGitHubSignature(req: NextRequest, payload:GHEvent) {
    const webhooks = new Webhooks({
        secret: orThrow(process.env.GITHUB_WEBHOOK_SECRET, "Missing GitHub webhook secret"),
    });
    return await webhooks.verify(
        JSON.stringify(payload),
        orThrow(req.headers.get("X-Hub-Signature-256"), "Missing header"),
    );
}
