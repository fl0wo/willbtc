import {MomentoFetcher} from "./topics";
import {orThrow} from "@/app/utils";
import botClient from "@/libs/drizzle/queries/bot";
import {WorkflowEvent} from "@/app/model/momento/WorkflowEvent";

export const publishWorkflowEvent = async (args: {
    cacheName?: string,
    topicName?: string,
    message: WorkflowEvent,
    secret?: string,
    endpoint?: string,
    botId: string,
}) => {

    await botClient
        .mutations
        .workflows
        .upsert(
            args.botId,
            args.message
        );

    await pushToMomento(args);
}


function pushToMomento(args: {
    cacheName?: string;
    topicName?: string;
    message: any;
    secret?: string;
    endpoint?: string;
    botId: string
}) {
    args.cacheName = args.cacheName ?? orThrow(process.env.MOMENTO_CACHE_GH_EVENTS_CACHE_NAME, 'Missing cache name');
    args.topicName = args.topicName ?? orThrow(process.env.MOMENTO_CACHE_GH_EVENTS_TOPIC_NAME, 'Missing topic name');
    args.secret = args.secret ?? orThrow(process.env.MOMENTO_CACHE_GH_EVENTS_API_KEY, 'Missing API key');
    args.endpoint = args.endpoint ?? orThrow(process.env.MOMENTO_CACHE_GH_EVENTS_TOPIC_BASE_URL, 'Missing base URL');

    if (!args.message) {
        throw new Error('Missing message to publish');
    }

    // stringify the message if it's an object
    if (typeof args.message === 'object') {
        args.message = JSON.stringify(args.message);
    }

    const cache = new MomentoFetcher(
        args.secret,
        args.endpoint
    );
    return cache.publishTopic(args.cacheName, args.topicName, args.message);
}

export const putInCache = (args: {
    key: string,
    value: string,
    cacheName: string,
    endpoint: string,
    secret: string,
    tts_seconds?: number
}) => {
    const cache = new MomentoFetcher(
        args.secret,
        args.endpoint
    );
    return cache.set(args.cacheName, args.key, args.value, args.tts_seconds ?? 24 * 60 * 60); // 1 day in seconds
}

export const getFromCache = (args: {
    key: string,
    cacheName: string,
    endpoint: string,
    secret: string
}) => {
    const cache = new MomentoFetcher(
        args.secret,
        args.endpoint
    );
    return cache.get(args.cacheName, args.key);
}