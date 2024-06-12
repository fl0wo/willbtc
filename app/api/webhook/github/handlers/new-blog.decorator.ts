import {sendEmail} from "@/libs/resend";
import {WorkflowEvent, WorkflowEventType} from "@/app/model/momento/WorkflowEvent";
import {BotType} from "@/libs/drizzle/models/BotType";
import userClient from "@/libs/drizzle/queries/user";
import {logGH} from "@/app/utils";
import {removeCredits} from "@/app/server-actions";
import {sendNewBlogGeneratedEmail} from "@/libs/email/templates/new-blog-generated.email";

function isBlogGenerationCompletedSuccessfully(event: WorkflowEvent, bot: BotType) {
    return event.type === WorkflowEventType.JOB_IDENTITY &&
        event.workflowName?.toLowerCase() === "blog generation" &&
        event.status === "completed" &&
        event.conclusion === "success" &&
        event.repoName === bot.urlSlug;
}

export const onNewBlogGeneratedSendEmail = async (
    event: WorkflowEvent,
    bot: BotType) => {

    logGH('Running onNewBlogGeneratedSendEmail handler')

    const user = await userClient
        .query
        .get
        .byId(bot.userId);

    if(!user || !user.email) {
        console.error(`User not found for bot ${bot.id}`);
        return;
    }

    if(isBlogGenerationCompletedSuccessfully(event, bot)) {
        // send email
        await sendNewBlogGeneratedEmail(
            {
                name: user.name!,
                email: user.email
            },
            bot,
        );
    }
}


export const onNewBlogGeneratedRemoveCredits = async (
    event: WorkflowEvent,
    bot: BotType) => {

    logGH('Running onNewBlogGeneratedRemoveCredits handler')

    if(isBlogGenerationCompletedSuccessfully(event, bot)) {

        // TODO: Calculate the right amount of credits to remove
        await removeCredits(bot.userId, 1);
    }
}