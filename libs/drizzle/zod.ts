import {createInsertSchema, createSelectSchema} from "drizzle-zod";
import {bots, jobs, steps, users} from "@/libs/drizzle/schema";
import {SQLiteTable} from "drizzle-orm/sqlite-core";
import {InferInsertModel, InferSelectModel} from "drizzle-orm";

export const InsertUserSchema = createInsertSchema(users as SQLiteTable);
export const SelectUserSchema = createSelectSchema(users as SQLiteTable);
export type CreateNewUser = InferInsertModel<typeof users>;
export type SelectUser = InferSelectModel<typeof users>;

export const InsertBotSchema = createInsertSchema(bots as SQLiteTable);
export const SelectBotSchema = createSelectSchema(bots as SQLiteTable);
export type CreateNewBot = InferInsertModel<typeof bots>;
export type SelectBot = InferSelectModel<typeof bots>;

export const InsertJobSchema = createInsertSchema(jobs as SQLiteTable);
export const SelectJobSchema = createSelectSchema(jobs as SQLiteTable);

export type CreateNewJob = InferInsertModel<typeof jobs>;
export type SelectJob = InferSelectModel<typeof jobs>;

export const InsertStepSchema = createInsertSchema(steps as SQLiteTable);
export const SelectStepSchema = createSelectSchema(steps as SQLiteTable);

export type CreateNewStep = InferInsertModel<typeof steps>;
export type SelectStep = InferSelectModel<typeof steps>;