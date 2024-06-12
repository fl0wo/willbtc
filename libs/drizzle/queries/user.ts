import {buildTursoClientEdge} from "@/libs/turso";
import {eq, sql} from "drizzle-orm";
import {users} from "@/libs/drizzle/schema";
import {orThrow, removeId} from "@/app/utils";
import {CreateNewUser, InsertUserSchema} from "@/libs/drizzle/zod";
import {UserType} from "@/libs/drizzle/models/UserType";

export default {
    query: {
        get: {
            byId: async (id: string) => {
                return buildTursoClientEdge()
                    .query
                    .users
                    .findFirst({
                        where: eq(users.id, id)
                    })
                    .prepare()
                    .get()
            },
            byEmail: async (email: string) => {
                return buildTursoClientEdge()
                    .query
                    .users
                    .findFirst({
                        where: eq(users.email, email)
                    })
                    .prepare()
                    .get()
            },
            byCustomerId: async (customerId: string) => {
                return buildTursoClientEdge()
                    .query
                    .users
                    .findFirst({
                        where: eq(users.customerId, customerId)
                    })
                    .prepare()
                    .get()
            },
            me: async (session: {
                user: {
                    id: string
                }
            }):Promise<UserType> => {
                return await buildTursoClientEdge()
                    .query
                    .users
                    .findFirst({
                        where: eq(users.id, orThrow(session?.user?.id, `User ID is required, but session is ${session}`))
                    })
                    .prepare()
                    .get() as any;
            }
        },
    },
    mutations: {
        create: async (user: CreateNewUser) => {
            return buildTursoClientEdge()
                .insert(users)
                .values(InsertUserSchema.parse(user) as any)
                .returning();
        },
        upsert: async (user: CreateNewUser) => {
            return buildTursoClientEdge()
                .insert(users)
                .values(InsertUserSchema.parse(user) as any)
                .onConflictDoUpdate({
                    target: [
                        users.id,
                    ],
                    set: {
                        hasAccess: user.hasAccess,
                        name: user.name,
                        priceId: user.priceId,
                        customerId: user.customerId,
                    },
                })
                .returning();
        },
        update: {
            byId: {
                removeCredits: async (id: string, removeAmount: number) => {
                    return buildTursoClientEdge()
                        .update(users)
                        .set({
                            credits: sql`${users.credits} - ${removeAmount}`
                        })
                        .where(eq(users.id, id))
                }
            },
            byCustomerId: async (customerId: string, user: CreateNewUser) => {
                return buildTursoClientEdge()
                    .update(users)
                    .set(removeId(user))
                    .where(eq(users.customerId, customerId))
                    .returning();
            }
        },
    }
}