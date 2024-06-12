import {WorkflowEvent, WorkflowEventType} from "@/app/model/momento/WorkflowEvent";

export type FixedStep = {
    emoji: string,
    title: string,
    titlePast?: string,
    titleFuture?: string,
    criteria: {
        completed: (ev: WorkflowEvent) => boolean | undefined,
    },
    noSubSteps?: boolean,
    fakeStep?: boolean,
}

export const fixedSteps = [
    {
        emoji: '🔍',
        title: 'Validating',
        titleFuture: 'Validate',
        titlePast: 'Validated',
        noSubSteps: true,
        fakeStep: true,
        criteria: {
            completed: (ev: WorkflowEvent) => ev.type === WorkflowEventType.REPO_IDENTITY &&
                ev.status === 'waiting' &&
                ev.eventName === 'validated_repo'
        }
    },
    {
        emoji: '📦',
        title: 'Preparing',
        titleFuture: 'Prepare',
        titlePast: 'Prepared',
        criteria: {
            completed: (ev: WorkflowEvent) =>
                // The repo has been initialized
                ev.type === WorkflowEventType.REPO_IDENTITY &&
                ev.status === 'completed'
                ||
                // or the blog is asked to be generated
                ev.type === WorkflowEventType.JOB_IDENTITY &&
                (ev.status === 'queued' || ev.status === 'waiting' || ev.status==='in_progress') &&
                ev.workflowName?.toLowerCase()?.includes('blog generation') // .workflows/gen-blgos-and-push.yml

        }
    },
    {
        emoji: '📈',
        title: 'Building',
        titleFuture: 'Build',
        titlePast: 'Built',
        criteria: {
            completed: (ev: WorkflowEvent) =>
                // the blog has been generated
                ev.type === WorkflowEventType.JOB_IDENTITY &&
                ev.status === 'completed' &&
                ev.conclusion === 'success' &&
                ev.workflowName?.toLowerCase()?.includes('blog generation') // .workflows/gen-blgos-and-push.yml

                ||
                // or the deploy has been requested
                ev.type === WorkflowEventType.JOB_IDENTITY &&
                (ev.status === 'queued' || ev.status === 'waiting' || ev.status==='in_progress') &&
                ev.workflowName?.toLowerCase()?.includes('deploy changes') //.workflows/after-push-deploy-sst-astro.yml
        }
    },
    {
        emoji: '🚀',
        title: 'Publishing',
        titleFuture: 'Publish',
        titlePast: 'Published',
        criteria: {
            completed: (ev: WorkflowEvent) =>
                ev.type === WorkflowEventType.JOB_IDENTITY &&
                ev.status === 'completed' &&
                ev.conclusion === 'success' &&
                ev.workflowName?.toLowerCase()?.includes('deploy changes') //.workflows/after-push-deploy-sst-astro.yml
        }
    }
];


export const isThisJobStillRunning = (job: WorkflowEvent | undefined, steps: FixedStep[]) => {
    if (!job) {
        return false;
    }

    const actualSteps = steps
        .filter(step => !step.fakeStep);

    const indexOfMatchingJob = actualSteps
        .findLastIndex(step => step.criteria.completed(job));

    const isInBetween = indexOfMatchingJob >= 0 &&
        indexOfMatchingJob < actualSteps.length - 1;

    return isInBetween;
}