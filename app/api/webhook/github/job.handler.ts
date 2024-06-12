import {GHEventRepository, GHEventWorkflowJob} from "@/app/model/github/GHEvent";
import {logGH} from "@/app/utils";
import {publishWorkflowEvent} from "@/app/model/momento/client";
import {WorkflowEventDispatcher} from "@/app/model/momento/WorkflowEvent";
import botClient from "@/libs/drizzle/queries/bot";
import {
    onNewBlogGeneratedRemoveCredits,
    onNewBlogGeneratedSendEmail
} from "@/app/api/webhook/github/handlers/new-blog.decorator";
import {BotType} from "@/libs/drizzle/models/BotType";

/**
 * Upsert this job status to turso and send it to momento as well for live UI updates
 * @param event
 */
export async function handleNewJob(event: GHEventWorkflowJob & GHEventRepository) {
    // "repo-sync" etc etc..
    logGH(`received job event ${(event.workflow_job.name)}`);

    // 1. Find the bot with the same urlSlug
    const bot = (await botClient
        .query
        .get
        .byUrlSlug(event.repository.name)) as any as BotType

    if(!bot || !bot.id || !bot.userId) {
        throw new Error(`Bot not found for ${event.repository.name}`);
    }

    const workflowEvent = WorkflowEventDispatcher.upsertJobEvent(event)

    // propagate change to FE via momento topics
    await publishWorkflowEvent({
        topicName: bot.userId,
        message: workflowEvent,
        botId: bot.id,
    });

    // 2. Run all the handlers for this event
    await Promise.all([
        onNewBlogGeneratedSendEmail,
        onNewBlogGeneratedRemoveCredits
    ].map(async (handler) => {
        await handler(
            workflowEvent,
            bot
        );
    }));

}
