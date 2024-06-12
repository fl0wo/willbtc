import {config} from "dotenv";
import {orThrow} from "@/app/utils";

export function loadEnvs() {
    try {
        const env = orThrow(process.env.ENV, "Invalid/Missing environment variable: 'ENV'");
        // Load environment variables from .env file

        const vars:any = config({
            path: `.env.${env}`, // .env.development or .env.production
        })?.parsed;

        return {
            ...vars,
            env,
        }
    } catch(e) {
        console.error('Error loading environment variables', e)
        throw e;
    }
}