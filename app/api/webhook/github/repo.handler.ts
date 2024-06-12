import {GHEventRepository} from "@/app/model/github/GHEvent";
import {publishWorkflowEvent} from "@/app/model/momento/client";
import {WorkflowEventDispatcher} from "@/app/model/momento/WorkflowEvent";
import botClient from "@/libs/drizzle/queries/bot";
import {onNewRepoSetGithubFieldsToBot} from "@/app/api/webhook/github/handlers/new-repo.decorator";
import {BotType} from "@/libs/drizzle/models/BotType";

/**
 * Upsert this repo to turso and send it to momento as well for live UI updates
 * @param event
 * @param repoName
 */
export async function handleNewRepo(event: GHEventRepository, repoName: string | undefined) {

    const ghRepoName = event.repository.name;
    if (ghRepoName !== repoName) {
        console.log(`Received event for different repo: ${ghRepoName} vs ${repoName}`);
        return false;
    }

    // 1. Find the the bot with the same urlSlug
    const bot = await botClient
        .query
        .get
        .byUrlSlug(ghRepoName);

    if(!bot || !bot.id || !bot.userId) {
        throw new Error(`Bot not found for ${ghRepoName}`);
    }

    const workflowEvent = WorkflowEventDispatcher.createRepoEvent(event);

    // 200ms updates the UI
    await publishWorkflowEvent({
        topicName: bot.userId,
        botId: bot.id,
        message: workflowEvent,
    });


    await Promise.all([
        onNewRepoSetGithubFieldsToBot,
    ].map(async (handler) => {
        await handler(
            workflowEvent,
            bot as any as BotType
        );
    }));

    return true;
}