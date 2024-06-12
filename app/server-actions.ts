"use server";

import {BotType} from "@/libs/drizzle/models/BotType";
import botClient from "@/libs/drizzle/queries/bot";
import userClient from "@/libs/drizzle/queries/user";
import {CreateNewRepoFromTemplate} from "@/libs/gh/CreateNewRepoFromTemplate";
import {hasCredits, orThrow, sleep} from "@/app/utils";
import {createRepoFromTemplate} from "@/libs/gh/create-repo";
import {RepoGitHubType} from "@/_one_time/repo-gh-type";
import {requestGithubWorkflowDispatch} from "@/libs/gh/request-blog-generation-workflow";
import {UserType} from "@/libs/drizzle/models/UserType";
import {getCurrentUser} from "@/libs/auth/session";
import {cookies} from "next/headers";

export async function turnOnAndCreateRepo(bot: BotType, user: any) {
    const botBefore = (await botClient
        .query
        .get
        .byId(bot.id) as any) as BotType;

    await botClient
        .mutations
        .update
        .byId(bot.id, {
            turnOn: bot.turnOn ? 0 : 1,
            alreadyTurnedOn: 1,
        });

    const botNow = await botClient
        .query
        .get
        .byId(bot.id) as any;

    // if it's the first time the bot is turned on, we create a new GitHub repo from template for this domain
    if (!botBefore.turnOn && botNow.turnOn) {
        // Turing on the bot
        // this bot still has no github repo
        if (!botBefore.github?.repoUrl) {

            // Maybe we should make an http call to the server to create the repo
            // Run an async function to create a new GitHub repo from template
            await createRepo(botNow, user);
        }
    }

    return botNow;
}

export async function createRepo(botNow: any, user: any) {
    const botDomain = botNow.urlSlug; // make sure this urlSlug does not have invalid characters
    const newRepoArgs: CreateNewRepoFromTemplate = {
        organization: orThrow(process.env.GITHUB_ORGANIZATION, 'missing GITHUB_ORGANIZATION'),
        template_owner: orThrow(process.env.GITHUB_ORGANIZATION, 'missing GITHUB_ORGANIZATION'),
        template_repo: orThrow(process.env.GITHUB_TEMPLATE_REPO, 'missing GITHUB_TEMPLATE_REPO'),
        repo: botDomain,

        secrets: {
            // used by BlogFast/template/.github/workflows/gen-blgos-and-push.yml
            USER_ID: user.id,
            BOT_ID: botNow.id,
            // used by BlogFast/template/.github/workflows/template-sync.yml
            // used by BlogFast/template/.github/workflows/auto-merge.yml
            CUSTOM_GITHUB_PAT: orThrow(process.env.CUSTOM_GITHUB_PAT, 'missing CUSTOM_GITHUB_PAT'),
            SOURCE_REPO_PATH: orThrow(process.env.SOURCE_REPO_PATH, 'missing SOURCE_REPO_PATH'),

            // used by BlogFast/template/.github/workflows/after-push-deploy-sst-astro.yml
            AWS_ACCESS_KEY_ID: orThrow(process.env.ASTRO_DEPLOY_AWS_ACCESS_KEY_ID, 'missing ASTRO_DEPLOY_AWS_ACCESS_KEY_ID'),
            AWS_SECRET_ACCESS_KEY: orThrow(process.env.ASTRO_DEPLOY_AWS_SECRET_ACCESS_KEY, 'missing ASTRO_DEPLOY_AWS_SECRET_ACCESS_KEY'),

            // used by BlogFast/template/.github/workflows/gen-blgos-and-push.yml
            OPENAI_API_KEY: orThrow(process.env.OPENAI_API_KEY, 'missing OPENAI_API_KEY'),
            SERP_API_KEY: orThrow(process.env.SERP_API_KEY, 'missing SERP_API_KEY'),
            OPENAI_ORGANIZATION_ID: orThrow(process.env.OPENAI_ORGANIZATION_ID, 'missing OPENAI_ORGANIZATION_ID'),

            // TODO: check the process.env.ENV and see what we should use
            HTTP_BASE_URL: orThrow(process.env.HTTP_BASE_URL, 'Missing HTTP_BASE_URL'),//!isDev ? 'blogfa.st' : 'ddi9w75977m58.cloudfront.net'
        }
    };
    return await createRepoFromTemplate(newRepoArgs);
}

export async function forceRequestBlogCreation(bot: BotType, user: any, repo: RepoGitHubType) {
    // This is not logged because it's server side
    // Call oktakit requesting a dispatch event (of the workflow "Blog Creation") to the repo


    return await requestGithubWorkflowDispatch(
        repo,
        "Blog Generation"
    );
}

export const removeCredits = async (userId: string, amount: number) => {
    // This is not logged because it's server side
    return userClient
        .mutations
        .update
        .byId
        .removeCredits(userId, amount)
}

export const getBotsByUserId = async (user: UserType) => {
    return botClient
        .query
        .list
        .ofUserId(
            orThrow(user?.id, `User ID is required but is ${user}`)
        );
}

export const getBotsWithLatestJobByUserId = async (user: UserType) => {
    // disable cache for this server action
    const _cookies = cookies()

    return botClient
        .query
        .list
        .ofUserIdJoinLatestJob(
            orThrow(user?.id, `User ID is required but is ${user}`)
        );
}

////

export const switchBotFn = async function (bot: BotType) {
    "use server";

    // can turn on only if the user has paid
    const user = await getCurrentUser();
    if (!user || !user.hasAccess || user.id !== bot.userId || !user.customerId) {
        return null;
    }

    return await turnOnAndCreateRepo(bot, user);
};

export const tryFirstBlog = async function (bot: BotType) {
    "use server";
    console.log('Request a repo creation for bot', bot.id);
    const user = await getCurrentUser();

    if (!user?.id) {
        return false;
    }

    // run first bot only if has credits
    if (!hasCredits(user, 1)) {
        console.log('User has credits', user.credits);
        return false;
    }

    const repo = await createRepo(bot, user);

    await sleep(2000);

    const request = await forceRequestBlogCreation(bot, user, repo);

    return repo;
}