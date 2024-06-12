import {EmailTemplateId} from "@/libs/email/EmailTemplateId";
import {days} from "@/app/utils";
import {scheduleEmail} from "@/libs/email/schedule-email";

export const scheduleOnboardingEmails = async (user: { name?:string,email?:string }) => {

    const onboardingEmails:Array<{
        emailId: EmailTemplateId,
        delayMs: number
    }> = [
        {
            emailId: "onboarding_nopay_1",
            delayMs: days(3),
        },
        {
            emailId: "onboarding_nopay_2",
            delayMs: days(7),
        },
        {
            emailId: "onboarding_nopay_3",
            delayMs: days(10),
        },
        {
            emailId: "onboarding_nopay_4",
            delayMs: days(15),
        },
        {
            emailId: "onboarding_nopay_5",
            delayMs: days(20),
        }
    ];

    return await Promise.all(onboardingEmails.map(async (emailTemplateId: {
        emailId: EmailTemplateId,
        delayMs: number
    }) => {
        await scheduleEmail(emailTemplateId, user);
    }));
}