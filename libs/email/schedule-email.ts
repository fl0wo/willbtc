import {EmailTemplateId} from "@/libs/email/EmailTemplateId";
import {now, orThrow} from "@/app/utils";
import {Resource} from "sst";
import awsLite from '@aws-lite/client'
// @ts-ignore
import dynamodb from '@aws-lite/dynamodb'

export interface EmailRequest {
    email: string;
    name?: string;
    templateId: EmailTemplateId;
    sendAt: number; // seconds
}

function toScheduleEmailCmd(emailTemplateId: { emailId: EmailTemplateId; delayMs: number }, user: {
    name?: string;
    email?: string
}) {
    const unixTs = new Date(now() + emailTemplateId.delayMs).getTime() / 1000;

    const item: EmailRequest = {
        email: user?.email!,
        name: user?.name,
        templateId: emailTemplateId.emailId,
        sendAt: unixTs, // ttl in seconds
    }
    return item;
}

export async function scheduleEmail(emailTemplateId: { emailId: EmailTemplateId; delayMs: number }, user: {
    name?: string;
    email?: string
}) {
    // in seconds
    const item = toScheduleEmailCmd(emailTemplateId, user);

    const aws = await awsLite({
        region: 'us-east-1',
        plugins: [dynamodb as any],
        autoloadPlugins: false,
    });

    await aws.DynamoDB.PutItem({
        Item: {
            id: crypto.randomUUID(),
            ...item,
        }, // required
        TableName: orThrow(Resource.EmailSchedulerDb.name, 'EmailSchedulerDb missing'),
    });

    console.log(`Scheduling email ${emailTemplateId} for ${user?.email}`)
}