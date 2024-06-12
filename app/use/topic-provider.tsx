"use client";

import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';
import {TopicItem, TopicSubscribe} from '@gomomento/sdk-web';
import { Observable } from 'rxjs';
import SingletonTopicManager from "@/libs/momento/subscribe";
import {WorkflowEvent} from "@/app/model/momento/WorkflowEvent";

interface TopicContextType {
    topic$: Observable<any | null>;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

interface TopicProviderProps {
    cacheName: string;
    topicName: string;
    apiKey: string;
    onItem: (item: TopicItem) => void;
    onError: (
        error: TopicSubscribe.Error,
        subscription: any,
    ) => Promise<void>;
    children: ReactNode;
}

export const TopicProvider: FC<TopicProviderProps> = ({ cacheName,apiKey, topicName, onItem, onError, children }: TopicProviderProps) => {
    const [topicManager, setTopicManager] = useState<SingletonTopicManager | null>(null);

    useEffect(() => {
        const manager = SingletonTopicManager.getInstance(
            cacheName,
            topicName,
            apiKey,
            onItem,
            onError
        );
        setTopicManager(manager);
    }, [cacheName, topicName,apiKey, onItem, onError]);

    if (!topicManager) {
        return null; // Or a loading spinner or some placeholder
    }

    return (
        <TopicContext.Provider value={{ topic$: topicManager.getTopicSubject<WorkflowEvent>() }}>
            {children}
        </TopicContext.Provider>
    );
};

export const useTopic = () => {
    const context = useContext(TopicContext);
    if (!context) {
        throw new Error('useTopic must be used within a TopicProvider');
    }
    return context.topic$;
};
