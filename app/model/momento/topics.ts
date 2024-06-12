export class MomentoFetcher {
    private readonly apiKey: string;
    private readonly baseurl: string;
    constructor(key: string, endpoint: string) {
        this.apiKey = key;
        if (!endpoint.startsWith('https://')) {
            this.baseurl = `https://${endpoint}`;
        } else {
            this.baseurl = `${endpoint}`;
        }
    }

    async get(cacheName: string, key: string) {
        const resp = await fetch(`${this.baseurl}/${cacheName}?key=${key}&token=${this.apiKey}`);
        if (resp.status < 300) {
            console.log(`successfully retrieved ${key} from cache`)
        } else {
            console.error(`failed to retrieve ${key} from cache. Message: ${resp.statusText}; Status: ${resp.status} cache: ${cacheName}`);
            throw new Error(`failed to retrieve item from cache: ${cacheName}`)
        }

        return await resp.text();
    }
    async set(cacheName: string, key: string, value: string, ttl_seconds: number = 30) {
        const resp = await fetch(`${this.baseurl}/${cacheName}?key=${key}&token=${this.apiKey}&&ttl_seconds=${ttl_seconds}`, {
            method: 'PUT',
            body: value
        });

        if (resp.status < 300) {
            console.log(`successfully set ${key} into cache`);
        } else {
            throw new Error(`failed to set item into cache message: ${resp.statusText} status: ${resp.status} cache: ${cacheName}`);
        }

        return;
    }
    async delete(cacheName: string, key: string) {
        const resp = await fetch(`${this.baseurl}/${cacheName}?key=${key}&token=${this.apiKey}`, {
            method: 'DELETE',
        });
        if (resp.status < 300) {
            console.log(`successfully deleted ${key} from cache`);
        } else {
            throw new Error(`failed to delete ${key} from cache. Message: ${resp.statusText}; Status: ${resp.status} cache: ${cacheName}`);
        }

        return resp;
    }

    async publishTopic(cacheName: string, topicName: string, message: string) {
        //{{baseUrl}}/topics/:cacheName/:topicName?token=<API Key>
        const resp = await fetch(`${this.baseurl}/topics/${cacheName}/${topicName}?token=${this.apiKey}`, {
            method: 'POST',
            body: message,
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });

        if (resp.status < 300) {
            console.log(`successfully published to topic ${topicName}`);
        } else {
            throw new Error(`failed to publish to topic ${topicName}. Message: ${resp.statusText}; Status: ${resp.status} cache: ${cacheName}`);
        }
    }
}
