import {LanguageType} from "@/app/model/languages/LanguagesType";
import {CountryType} from "@/app/model/languages/CountryType";

export type FormBotConfigurationType = {
    id?: string;
    userId?: string;
    userEmail?:string;

    urlSlug?: string;

    // CTA
    ctaRedirectUrl?: string;  // THE URL
    ctaTitle?: string; // TITLE
    ctaDescription?: string; // DESCRIPTION
    ctaRedirect: string;  // BTN TEXT

    task: string;
    tone: Array<string>
    imgGpt: string;
    wantCoverImg: boolean;
    googleSearch?: string;
    skill: string;
    name?: string;
    length: string;
    topic: string;
    type: string;

    language: LanguageType;
    country?: CountryType;

    frequency: number;

    businessName: string;
    businessDescription: string;

    siteTitle?: string;
    siteDescription?: string;

    gptModel: GPTChatType;

    createdAt?: Date | string | number;
    updatedAt?: Date | string | number;

};


export type GPTChatType =
    | 'gpt-4o'
    | 'gpt-4o-2024-05-13'
    | 'gpt-4-turbo'
    | 'gpt-4-turbo-2024-04-09'
    | 'gpt-4-0125-preview'
    | 'gpt-4-turbo-preview'
    | 'gpt-4-1106-preview'
    | 'gpt-4-vision-preview'
    | 'gpt-4'
    | 'gpt-4-0314'
    | 'gpt-4-0613'
    | 'gpt-4-32k'
    | 'gpt-4-32k-0314'
    | 'gpt-4-32k-0613'
    | 'gpt-3.5-turbo'
    | 'gpt-3.5-turbo-16k'
    | 'gpt-3.5-turbo-0301'
    | 'gpt-3.5-turbo-0613'
    | 'gpt-3.5-turbo-1106'
    | 'gpt-3.5-turbo-0125'
    | 'gpt-3.5-turbo-16k-0613';

export const availableGPTs = [
    'gpt-4o',
    'gpt-4o-2024-05-13',
    'gpt-4-turbo',
    'gpt-4-turbo-2024-04-09',
    'gpt-4-0125-preview',
    'gpt-4-turbo-preview',
    'gpt-4-1106-preview',
    'gpt-4-vision-preview',
    'gpt-4',
    'gpt-4-0314',
    'gpt-4-0613',
    'gpt-4-32k',
    'gpt-4-32k-0314',
    'gpt-4-32k-0613',
    'gpt-3.5-turbo',
    'gpt-3.5-turbo-16k',
    'gpt-3.5-turbo-0301',
    'gpt-3.5-turbo-0613',
    'gpt-3.5-turbo-1106',
    'gpt-3.5-turbo-0125',
    'gpt-3.5-turbo-16k-0613'
]