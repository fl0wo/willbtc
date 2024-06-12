import {CreateNewRepoFromTemplate} from "./CreateNewRepoFromTemplate";
import {RepoGitHubType} from "@/_one_time/repo-gh-type";
import {orThrow} from "@/app/utils";
// import sodium from 'sodium-native';
import sodium from 'libsodium-wrappers';
import {octokit} from "@/libs/gh/octokit";

const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

async function createRepoIfNotExists(args:CreateNewRepoFromTemplate):Promise<RepoGitHubType> {

    const { organization, repo,template_owner,template_repo } = args;

    let response;
    try {
        response = await octokit.request(`GET /repos/${organization}/${repo}`, {
            owner: organization,
            repo: `${repo}.git`,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    } catch (e) {
        console.log('Error:', e);
    }

    if(200 === response?.status && response?.data) {
        return response?.data;
    } else {
        const res = await octokit.request(`POST /repos/${template_owner}/${template_repo}/generate`, {
            owner: organization,
            name: repo,
            description: `${repo} repo created from template ${template_repo}`,
            include_all_branches: false,
            private: true,

            // I think those settings are auto fetched from the Template repo as well.
            // homepage: `https://${repo}.blogfa.st`,
            // has_issues: false,
            // has_projects: false,
            // has_wiki: false,
            // allow_auto_merge: true,

            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        return res.data;
    }
}

async function getPubkey(organization: string, repo: string) {
    return (await octokit.request(`GET /repos/${organization}/${repo}/actions/secrets/public-key`, {
        owner: organization,
        repo: `${repo}.git`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })).data;
}

function encriptWithPubKey(pubkey: {
    key: string;
    key_id: string;
}, value: string) {
    // I think we should use sodium-native instead of crypto
    const message = Buffer.from(value)
    const key = Buffer.from(pubkey.key, 'base64')
    const uint8Array =  sodium.crypto_box_seal(
        message,
        key,
    );
    return Buffer.from(uint8Array).toString('base64');
}

async function addSecrets(args: CreateNewRepoFromTemplate, organization: string, repo: string) {
    const secrets = args.secrets;
    const pubkey = await getPubkey(organization, repo);

    // TODO: find a way to add the secrets in parallel
    for (const [name, value] of Object.entries(secrets)) {
        const res = await octokit.request(`PUT /repos/${organization}/${repo}/actions/secrets/${name}`, {
            owner: organization,
            repo: repo,
            secret_name: name,
            encrypted_value: encriptWithPubKey(pubkey, value),
            key_id: pubkey.key_id,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        console.log('[github]: secret');
        await sleep(10);
    }
}

/**
 * Create a new repository from a template repository and inject the AWS credentials and the source repo path.
 */
export const createRepoFromTemplate = async (args: CreateNewRepoFromTemplate) => {
    // https://github.com/BlogFast/template
    const {
        organization,
        template_owner,
        template_repo,
        repo
    } = args;

    const newRepository:RepoGitHubType = await createRepoIfNotExists(args);

    // Instead what we do is having 1 Organization Webhook that listens to all the repositories (works only for events in production)
    // await createWebhookForRepo(repo, organization);
    await addSecrets(args, organization, repo);

    return newRepository;
};
