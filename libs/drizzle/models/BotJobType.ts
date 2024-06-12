import {WorkflowEventType} from "@/app/model/momento/WorkflowEvent";

export type BotJobType = {
    id: string
    type: WorkflowEventType
    repoName: string

    status: "completed" | "in_progress" | "queued" | "requested" | "waiting" | "created" | undefined
    eventName: string
    workflowName: string

    botId: string
    conclusion: "success" | "failure" | undefined

    startedAt: number
    completedAt: number

    createdAt: number
    updatedAt: number,

    steps?: BotJobStepType[]
}

export type BotJobStepType = {
    id: string
    jobId: string

    name: string

    status: string
    conclusion: string

    number: number

    startedAt: number
    completedAt: number

    createdAt: number
}