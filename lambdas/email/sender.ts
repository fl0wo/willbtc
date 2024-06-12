import {DynamoEmailRequestRemovedEvent} from "@/lambdas/email/DynamoEmalRequestRemovedEvent";
import {sendEmailByTemplateId} from "@/libs/email/emails";

export const handler = async (event:{
    Records: Array<DynamoEmailRequestRemovedEvent>
}) => {
    // Time to send the gaddeam email

    for(const record of event.Records){
        const email = record.dynamodb.OldImage.email.S;
        const emailId = record.dynamodb.OldImage.templateId.S;
        const name = record.dynamodb.OldImage.name.S;
        console.log(`Sending email ${emailId} to ${email}`);

        // TODO: if user has already paid, and this is a "no_pay" email, skip it

        // 1. fetch the user by email from turso

        await sendEmailByTemplateId(emailId, {
            email,
            name
        });
    }

    return true;
}