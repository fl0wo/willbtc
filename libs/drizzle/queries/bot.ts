import {buildTursoClientEdge} from "@/libs/turso";
import {desc, eq, getTableColumns, SQL, sql} from "drizzle-orm";
import {bots, jobs, steps} from "@/libs/drizzle/schema";
import {CreateNewBot, CreateNewJob, CreateNewStep, InsertJobSchema, InsertStepSchema} from "@/libs/drizzle/zod";
import {removeId} from "@/app/utils";
import {WorkflowEvent} from "@/app/model/momento/WorkflowEvent";
import {PgTable} from 'drizzle-orm/pg-core';
import {SQLiteTable} from 'drizzle-orm/sqlite-core';
import {BotType} from "@/libs/drizzle/models/BotType";
import {BotJobType} from "@/libs/drizzle/models/BotJobType";

export default {
    query: {
        get: {
            byId: async (id: string) => {
                return buildTursoClientEdge()
                    .query
                    .bots
                    .findFirst({
                        where: eq(bots.id, id)
                    })
                    .prepare()
                    .get();
            },
            async byUrlSlug(urlSlug: string) {
                return await buildTursoClientEdge()
                    .query
                    .bots
                    .findFirst({
                        where: eq(bots.urlSlug, urlSlug)
                    })
                    .prepare()
                    .get()
            }
        },
        list: {
            ofUserId: async (userId: string):Promise<BotType[]> => {
                return await buildTursoClientEdge()
                    .query
                    .bots
                    .findMany({
                        where: eq(bots.userId, userId)
                    })
                    .prepare()
                    .get() as any;
            },
            ofUserIdJoinLatestJob: async (userId: string):Promise<BotType[]> => {
                const userBots:BotType[] = await buildTursoClientEdge()
                    .query
                    .bots
                    .findMany({
                        where: eq(bots.userId, userId)
                    })
                    .prepare()
                    .get() as any;

                if(!userBots || userBots.length === 0) {
                    return [];
                }

                // For each bot get 1 latest job
                const botWithJobs = await Promise.all(userBots.map(async bot => {
                    const job = await buildTursoClientEdge()
                        .query
                        .jobs
                        .findFirst({
                            where: eq(jobs.botId, bot.id),
                            orderBy: [desc(jobs.createdAt)]
                        })
                        .prepare()
                        .get();
                    return {
                        ...bot,
                        lastJob: job as any as BotJobType
                    }
                })) as any as BotType[];

                return botWithJobs;
            }
        }
    },

    mutations: {
        workflows: {
            upsert: async (botId: string, message: WorkflowEvent) => {

                const upsertJobEvent:CreateNewJob = InsertJobSchema.parse({
                    ...message,
                    botId
                });

                const stepsCmds:CreateNewStep[] = message.steps.map(step => InsertStepSchema.parse({
                    ...step,
                    botId,
                    jobId: upsertJobEvent.id
                }));

                // Job is inserted first
                await buildTursoClientEdge()
                    .insert(jobs)
                    .values({
                        ...upsertJobEvent,
                        botId
                    })
                    .onConflictDoUpdate({
                        set: {
                            ...upsertJobEvent,
                        },
                        target: [
                            jobs.id,
                        ]
                    })
                    .execute();

                // All steps are inserted in one go https://orm.drizzle.team/learn/guides/upsert
                if(stepsCmds.length > 0) {
                    await buildTursoClientEdge()
                        .insert(steps)
                        .values(stepsCmds)
                        .onConflictDoUpdate({
                            target: steps.id,
                            set: buildConflictUpdateColumns(steps, [
                                'conclusion',
                                'completedAt',
                                'status',
                                'startedAt',
                                'number',
                                'name'
                            ]),
                        })
                        .execute();
                }

                return message;
            }
        },
        create: async (bot: CreateNewBot) => {
            return buildTursoClientEdge()
                .insert(bots)
                .values(bot)
                .returning();
        },
        upsert: async (bot: CreateNewBot) => {
            return buildTursoClientEdge()
                .insert(bots)
                .values(bot)
                .onConflictDoUpdate({
                    target: [
                        bots.id,
                    ],
                    set: {
                        ...bot,
                    },
                })
                .returning();
        },
        update: {
            byId: async (id: string, bot: Partial<CreateNewBot>) => {
                return buildTursoClientEdge()
                    .update(bots)
                    .set(removeId(bot))
                    .where(eq(bots.id, id))
                    .returning();
            },
        }
    }
}


const buildConflictUpdateColumns = <
    T extends PgTable | SQLiteTable,
    Q extends keyof T['_']['columns']
>(
    table: T,
    columns: Q[],
) => {
    const cls = getTableColumns(table);
    return columns.reduce((acc, column) => {
        const colName = cls[column].name;
        acc[column] = sql.raw(`excluded.${colName}`);
        return acc;
    }, {} as Record<Q, SQL>);
};