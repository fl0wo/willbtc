import {Configurations, CredentialProvider, TopicClient, type TopicItem, TopicSubscribe,} from "@gomomento/sdk-web";
import {BehaviorSubject, map, Observable} from 'rxjs';

class SingletonTopicManager {
    private static instance: SingletonTopicManager;
    private topicClient: TopicClient;
    private subscription: TopicSubscribe.Subscription | undefined;
    private topicSubject: BehaviorSubject<TopicItem | null>;

    private constructor(
        private cacheName: string,
        private topicName: string,
        topicToken: string,
        onItem: (item: TopicItem) => void,
        onError: (
            error: TopicSubscribe.Error,
            subscription: TopicSubscribe.Subscription,
        ) => Promise<void>
    ) {
        this.topicClient = new TopicClient({
            configuration: Configurations.Browser.v1(),
            credentialProvider: CredentialProvider.fromString({
                apiKey: topicToken,
            })
        });

        this.topicSubject = new BehaviorSubject<TopicItem | null>(null);

        this.subscribeToTopic(onItem, onError)
            .then(r => console.log('[momento] connection established:', this.topicName));
    }

    public static getInstance(
        cacheName: string,
        topicName: string,
        topicToken: string,
        onItem: (item: TopicItem) => void,
        onError: (
            error: TopicSubscribe.Error,
            subscription: TopicSubscribe.Subscription,
        ) => Promise<void>
    ): SingletonTopicManager {
        if (!SingletonTopicManager.instance) {
            SingletonTopicManager.instance = new SingletonTopicManager(cacheName, topicName, topicToken, onItem, onError);
        }
        return SingletonTopicManager.instance;
    }

    private async subscribeToTopic(
        onItem: (item: TopicItem) => void,
        onError: (
            error: TopicSubscribe.Error,
            subscription: TopicSubscribe.Subscription,
        ) => Promise<void>
    ) {
        try {
            const resp = await this.topicClient.subscribe(this.cacheName, this.topicName, {
                onItem: (item: TopicItem) => {
                    onItem(item);
                    this.topicSubject.next(item);
                },
                onError: onError,
            });

            if (resp instanceof TopicSubscribe.Subscription) {
                this.subscription = resp;
            } else {
                throw new Error(`Unable to subscribe to topic: ${resp}`);
            }
        } catch (error) {
            console.error('Subscription error:', error);
        }
    }

    public clearCurrentClient() {
        this.subscription?.unsubscribe();
        this.subscription = undefined;
    }

    public getTopicSubject<T>():Observable<T> {
        return this.topicSubject
            .asObservable()
            .pipe(map((item) =>
                    SingletonTopicManager.decode(item?.value())
                )
            );
    }

    private static decode(val: string | Uint8Array | undefined) {
        if (typeof val === 'string') {
            return JSON.parse(val);
        }
        if (val instanceof Uint8Array) {
            return JSON.parse(new TextDecoder().decode(val));
        }
        return val;
    }
}

export default SingletonTopicManager;