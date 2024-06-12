import {createClient as createClientEdge} from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql"
import {orThrow} from "@/app/utils";
import {loadEnvs} from "@/load-env";
loadEnvs();
const client = createClientEdge({
    url: orThrow(process.env.TURSO_DB_URL,'Invalid/Missing environment variable: "TURSO_DB_URL"') as string,
    authToken: orThrow(process.env.TURSO_DB_AUTH_TOKEN, 'Invalid/Missing environment variable')
});
export const db = drizzle(client);