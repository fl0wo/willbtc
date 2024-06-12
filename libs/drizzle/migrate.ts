import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import {createClient as createClientEdge} from "@libsql/client/web";
import {orThrow} from "@/app/utils";
import {loadEnvs} from "@/load-env";

const {env} = loadEnvs();

export const client = createClientEdge({
    url: orThrow(process.env.TURSO_DB_URL, 'Invalid/Missing environment variable: "TURSO_DB_URL"') as string,
    authToken: orThrow(process.env.TURSO_DB_AUTH_TOKEN as string,'Invalid/Missing environment variable')
});

const db = drizzle(client);

async function main() {
    try {
        await migrate(db, {
            migrationsFolder: `./libs/drizzle/migrations/${env}`,
        });
        console.log("Tables migrated!");
        process.exit(0);
    } catch (error) {
        console.error("Error performing migration: ", error);
        process.exit(1);
    }
}

main();