// Octokit.js
// https://github.com/octokit/core.js#readme
import {orThrow} from "@/app/utils";
import {Octokit} from "@octokit/core";

export const octokit = new Octokit({
    auth: orThrow(process.env.CUSTOM_GITHUB_PAT, 'missing CUSTOM_GITHUB_PAT')
});