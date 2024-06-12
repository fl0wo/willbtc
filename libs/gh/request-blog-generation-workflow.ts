import {RepoGitHubType} from "@/_one_time/repo-gh-type";
import {octokit} from "@/libs/gh/octokit";

export async function requestGithubWorkflowDispatch(
    repo:RepoGitHubType,
    workflow:"Blog Generation"
) {

    const workFlowNameToFileMap = {
        "Blog Generation": "gen-blgos-and-push.yml",
    }

    const workflowId = workFlowNameToFileMap[workflow];

    const response = await octokit.request(`POST /repos/${repo.owner.login}/${repo.name}/actions/workflows/${workflowId}/dispatches`, {
        ref: 'main',
        inputs: {},
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    console.log('Dispatched workflow:', response);

    return response?.status > 200 && response?.status < 300;
}

export const requestTemplateSyncWorkflowForRepo = async (repo: RepoGitHubType) => {

    const fileName = 'template-sync.yml';

    // invoke the workflow
    const response = await octokit.request(`POST /repos/${repo.owner.login}/${repo.name}/actions/workflows/${fileName}/dispatches`, {
        ref: 'main',
        inputs: {},
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    console.log('Dispatched workflow:', response);

    return response?.status > 200 && response?.status < 300;
}