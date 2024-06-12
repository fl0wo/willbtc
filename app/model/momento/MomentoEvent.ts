export interface MomentoEvent {
    cache?: string;
    topic?: string;
    event_timestamp?: number;
    publish_timestamp?: number;
    topic_sequence_number?: number;
    token_id?: string;

    // @Transform(({ value }) => JSON.parse(value), { toClassOnly: true })
    text?: string;

    // @Transform(({ value }) => {
    //     const decodedValue = atob(value);
    //     return JSON.parse(decodedValue);
    // }, { toClassOnly: true })
    binary?: string;
}