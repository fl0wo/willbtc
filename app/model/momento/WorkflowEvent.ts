import {GHEventRepository, GHEventWorkflowJob} from "@/app/model/github/GHEvent";
import {logGH} from "@/app/utils";

export interface WorkflowEvent {
    id?: string;

    type: WorkflowEventType;
    createdAt: Date | string | number;
    updatedAt?: Date | string | number;
    repoName: string;
    eventName?: string;

    conclusion?: "success" | "failure";
    startedAt?: Date | string | number;
    completedAt?: Date | string | number;

    workflowName?: string;
    status?: "completed" | "in_progress" | "queued" | "requested" | "waiting" | "created";
    runAttempt?: number;

    steps: Array<{
        name: string
        status: string
        conclusion?: string
        number: number
        started_at: string
        completed_at?: string
    }>
}

export enum WorkflowEventType {
    REPO_IDENTITY = 'repo_identity',         // Tells you something about this repo
    JOB_IDENTITY = 'job_identity',           // Tells you something about this job
}

export class WorkflowEventDispatcher {
    constructor() {}

    static createRepoEvent(event: GHEventRepository):WorkflowEvent {
        logGH(`sending momento event ${WorkflowEventType.REPO_IDENTITY} for ${event.repository.name}`)
        return {
            id: String(event.repository?.id),

            type: WorkflowEventType.REPO_IDENTITY,
            createdAt: new Date(event.repository.created_at),
            updatedAt: new Date(event.repository.updated_at),

            status: "completed",
            conclusion: "success",

            repoName: event.repository.name,
            eventName: "repository",
            steps: []
        }
    }


    static upsertJobEvent(event: GHEventWorkflowJob & GHEventRepository):WorkflowEvent {
        logGH(`sending momento event ${WorkflowEventType.JOB_IDENTITY} for ${event.workflow_job.name}`)

        return {
            id: String(event.workflow_job.id),

            type: WorkflowEventType.JOB_IDENTITY,
            createdAt: new Date(event.workflow_job.created_at),

            startedAt: new Date(event.workflow_job.started_at),
            completedAt: new Date(event.workflow_job.completed_at),

            repoName: event.repository.name,
            eventName: event.workflow_job.name,
            workflowName: event.workflow_job.workflow_name,

            conclusion: event.workflow_job.conclusion,
            status: event.workflow_job.status,
            runAttempt: event.workflow_job.run_attempt,

            steps: event.workflow_job.steps,
        }
    }
}