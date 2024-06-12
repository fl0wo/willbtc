import * as schema from "./drizzle/schema";
import {drizzle} from "drizzle-orm/libsql";
import {createClient as createClientEdge} from "@libsql/client/web";

export interface TursoDbEnv {
    TURSO_DB_AUTH_TOKEN?: string;
    TURSO_DB_URL?: string;
}

function buildClient(context?: TursoDbEnv) {
    const url = (context?.TURSO_DB_URL?.trim()) ?? (process.env.TURSO_DB_URL?.trim());
    const authToken = (context?.TURSO_DB_AUTH_TOKEN?.trim()) ?? (process.env.TURSO_DB_AUTH_TOKEN?.trim());
    if (!authToken) {
        throw new Error("TURSO_DB_AUTH_TOKEN is not defined");
    }
    if (!url) {
        throw new Error("TURSO_DB_URL is not defined");
    }
    return {
        url,
        authToken
    };
}

export function buildTursoClientEdge(context?: TursoDbEnv) {
    const {url, authToken} = buildClient(context);
    const tursoClient = createClientEdge({url, authToken});
    return drizzle(tursoClient, {schema});
}