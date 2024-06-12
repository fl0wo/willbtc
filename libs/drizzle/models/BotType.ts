import {GithubRepo} from "@/libs/drizzle/models/GithubRepo";
import {WorkflowEvent} from "@/app/model/momento/WorkflowEvent";
import {LanguageType} from "@/app/model/languages/LanguagesType";

export type BotType = {
    id: string
    name: any
    userId: string
    userEmail: any
    urlSlug: string
    ctaRedirect: string
    ctaRedirectUrl: string
    googleSearch: string
    frequency: number
    tone: Array<string>
    imgGpt: string
    wantCoverImg: boolean
    length: string
    type: string
    task: string
    topic: string

    language: LanguageType

    skill: string
    hasAccess: any
    turnOn: number
    alreadyTurnedOn: number
    businessDescription: string
    businessName: string
    createdAt: string
    updatedAt: string
    github: GithubRepo
    cta: {
        title: string,
        description: string,
        url: string,
        text: string,
        stealthMode: boolean,
    },

    lastJob?: WorkflowEvent,

    customDomain?: CustomDomainBotType,

    analytics?: {
        gTagCode: string,
    }
}

export type CustomDomainBotType = {
    domain: string, // rv-living.org
    nameSevers: string[], // ns1.dnsimple.com
    isVerified: boolean,
    hostedZoneId: string, // Z1Z1Z1Z1Z1Z1Z1
}