import {GithubRepo} from "@/libs/drizzle/models/GithubRepo";
import botClient from "@/libs/drizzle/queries/bot";
import {WorkflowEvent, WorkflowEventType} from "@/app/model/momento/WorkflowEvent";
import {BotType} from "@/libs/drizzle/models/BotType";
import {logGH} from "@/app/utils";

export const onNewRepoSetGithubFieldsToBot = async (event: WorkflowEvent, bot: BotType) => {

    logGH('Running onNewRepoSetGithubFieldsToBot handler')

    console.log({
        type: event.type,
        status: event.status,
        conclusion: event.conclusion,
        repoName: event.repoName,
    },  event.type === WorkflowEventType.REPO_IDENTITY &&
        event.status === "completed" &&
        event.conclusion === "success" &&
        event.repoName === bot.urlSlug )

    if(
        event.type === WorkflowEventType.REPO_IDENTITY &&
        event.status === "completed" &&
        event.conclusion === "success" &&
        event.repoName === bot.urlSlug
    ) {
        const github:GithubRepo = {
            repoName: bot.urlSlug,
        }

        // 2. Save the github repo to the bot (this way you know the repo exists)
        await botClient
            .mutations
            .update
            .byId(bot.id,{
                github: github
            });
    }

}