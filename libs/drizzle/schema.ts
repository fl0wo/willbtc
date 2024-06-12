import {index, integer, primaryKey, sqliteTable, text, uniqueIndex} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";
import {AwsCreds} from "@/libs/drizzle/models/AwsCreds";
import {GithubRepo} from "@/libs/drizzle/models/GithubRepo";
import {CTAStyleBlog} from "@/libs/drizzle/models/CTAStyleBlog";
import * as crypto from "crypto";
import {CustomDomainBotType} from "@/libs/drizzle/models/BotType";

export const users = sqliteTable("user", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),

    customerId: text("customerId"),
    priceId: text("priceId"),
    hasAccess: integer("hasAccess", { mode: "boolean" })
        .default(sql`(cast (0 as int))`),

    // 1 default credit
    credits: integer("credits")
        .default(sql`(cast (1 as int))`),

    aws: text("aws", {mode: 'json'}).$type<AwsCreds>(),

}, (user:any) => ({
    emailIdx: uniqueIndex('email_idx').on(user.email),
    idIdx: index('user_pr_id_idx').on(user.id),
}));

export const accounts = sqliteTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<any>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account:any) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
        userIdIdx: index('user_accounts_id_idx').on(account.userId),
    })
)

export const sessions = sqliteTable("session", {
    sessionToken: text("sessionToken").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
}, (session:any) => ({
    userIdIdx: index('user_session_id_idx').on(session.userId),
}));

export const verificationTokens = sqliteTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
    },
    (vt:any) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

export const bots = sqliteTable("bot", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

    name: text("name"),
    userId: text("userId"),
    userEmail: text("userEmail"),
    urlSlug: text("urlSlug")
        .unique(), // this basically creates an index unique that we already have below

    googleSearch: text("googleSearch"),
    frequency: integer("frequency"),

    tone: text("tone", {mode:"json"})
        .$type<string[]>()
        .notNull(),

    imgGpt: text("imgGpt"),

    wantCoverImg: integer("wantCoverImg",{mode: 'boolean'})
            .default(sql`(cast (0 as int))`),

    gptModel: text("gptModel")
        .default(sql`'gpt-4o'`),

    length: text("length"),
    type: text("type"),
    task: text("task"),
    topic: text("topic"),

    country: text("country"), // e.g. countryIT
    lang: text("lang"), // e.g. it, en, es
    language: text("language"), // e.g. Italian, English, Spanish

    skill: text("skill"),
    hasAccess: integer("hasAccess"),
    turnOn: integer("turnOn"),

    alreadyTurnedOn: integer("alreadyTurnedOn")
        .default(sql`(cast (0 as int))`),

    businessDescription: text("businessDescription"),
    businessName: text("businessName"),

    siteTitle: text("siteTitle"),
    siteDescription: text("siteDescription"),

    createdAt: integer('created_at', {mode: 'timestamp_ms'})
        .default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer('updated_at', {mode: 'timestamp_ms'})
        .default(sql`(cast (unixepoch () as int))`),

    ctaRedirect: text("ctaRedirect"),
    ctaRedirectUrl: text("ctaRedirectUrl"),
    cta:text("cta", {mode: 'json'})
        .$type<CTAStyleBlog>()
        // .$default(() => ({
        //     title: "Read More",
        //     description: "Read more about this topic",
        //     text: "Click here!"
        // })),
        .default(sql`'{"title":"Read More","description":"Read more about this topic","text":"Click here!"}'`),

    github: text("github", {mode: 'json'}).$type<GithubRepo>(),

    customDomain: text("customDomain", {mode: 'json'})
        .$type<CustomDomainBotType>(),

    analytics: text("analytics", {mode: 'json'})
        .$type<{
            gTagCode: string,
        }>(),

}, (bot:any) => ({
    // exchangeIdx: index('exchange_idx').on(bots.exchange),
    idIdx: index('id_idx').on(bot.id),
    urlSlugIdx: uniqueIndex('url_slug_idx').on(bot.urlSlug), // this is the same as the unique constraint above
    userIdIdx: index('user_id_idx').on(bot.userId),
    userEmailIdx: index('user_email_idx').on(bot.userEmail),
}));

// Each bot can have some jobs, each job can have some steps

export const jobs = sqliteTable("workflow_job", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

    type: text("type", {enum:['job_identity', 'repo_identity']}), // WorkflowEventType

    createdAt: integer('created_at', {mode: 'timestamp_ms'})
        .default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer('updated_at', {mode: 'timestamp_ms'})
        .default(sql`(cast (unixepoch () as int))`),

    repoName: text("repoName"),
    eventName: text("eventName"),


    conclusion: text("conclusion", {
        enum: ['success', 'failure', 'cancelled']
    }),

    startedAt: integer('started_at', {mode: 'timestamp_ms'}),
    completedAt: integer('completed_at', {mode: 'timestamp_ms'}),

    workflowName: text("workflowName"),
    status: text("status",{enum: ['completed' , 'in_progress' , 'queued' , 'requested' , 'waiting' , 'created']}),

    runAttempt: integer("runAttempt"),

    botId: text("botId")
        .references(() => bots.id, { onDelete: "cascade" }),

}, (job:any) => ({
    idIdx: index('job_id_idx').on(job.id),
    botIdIdx: index('job_bot_id_idx').on(job.botId),

    // index by startedAt
    startedAtIdx: index('job_started_at_idx').on(job.startedAt),
}));

export const steps = sqliteTable("workflow_step", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),

    jobId: text("jobId")
        .references(() => jobs.id, { onDelete: "cascade" }),

    name: text("name"),

    status: text("status", {
        enum: ["completed" , "in_progress" , "queued" , "requested" , "waiting" , "created"]
    }),

    conclusion: text("conclusion", {
        enum: ['success', 'failure', 'cancelled']
    }),

    number: integer("number"),

    startedAt: integer('started_at', {mode: 'timestamp_ms'}),
    completedAt: integer('completed_at', {mode: 'timestamp_ms'}),

    createdAt: integer('created_at', {mode: 'timestamp_ms'})
        .default(sql`(cast (unixepoch () as int))`),
    updatedAt: integer('updated_at', {mode: 'timestamp_ms'})
        .default(sql`(cast (unixepoch () as int))`),

}, (step:any) => ({
    idIdx: index('step_id_idx').on(step.id),
    jobIdIdx: index('step_job_id_idx').on(step.jobId),
    starterAtIdx: index('step_started_at_idx').on(step.startedAt),
}));