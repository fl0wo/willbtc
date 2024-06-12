import {sendWelcomeEmail} from "@/libs/email/templates/welcome.email";
import {sendPostPurchaseEmail} from "@/libs/email/templates/post-purchase.email";
import {sendCustomSuccessManagerEmail} from "@/libs/email/templates/onboarding-nopay-1.email";
import {sendGoodiesEmail} from "@/libs/email/templates/onboarding-nopay-2.email";
import {sendFailBusinessEmail} from "@/libs/email/templates/onboarding-nopay-3.email";
import {sendStoryEmail} from "@/libs/email/templates/onboarding-nopay-4.email";
import {sendGoogleBanEmail} from "@/libs/email/templates/onboarding-nopay-5.email";
import {sendLastEmail} from "@/libs/email/templates/onboarding-nopay-6.email";

export const sendEmailByTemplateId = async (templateId: string, args: {
    email: string;
    name?: string;
}) => {

    switch (templateId) {
        case "welcome":
            return await sendWelcomeEmail(args);
        case "post-purchase":
            return await sendPostPurchaseEmail(args, {});


        /**
         * Onboarding No Pay:
         * n1: Your Customer Success Manager
         * n2: Subject: Did you get your free goodies?
         * n3: 93% of businesses fail because of this
         * n4: The story behind BlogFAST
         * n5: Will Google ban you for AI content?
         * n6: Your last email from us
         */

        case "onboarding_nopay_1":
            return await sendCustomSuccessManagerEmail(args);
        case "onboarding_nopay_2":
            return await sendGoodiesEmail(args);
        case "onboarding_nopay_3":
            return await sendFailBusinessEmail(args);
        case "onboarding_nopay_4":
            return await sendStoryEmail(args);
        case "onboarding_nopay_5":
            return await sendGoogleBanEmail(args);
        case "onboarding_nopay_6":
            return await sendLastEmail(args);
        default:
            throw new Error(`Unknown templateId: ${templateId}`);
    }
}