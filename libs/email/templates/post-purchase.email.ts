import {sendEmail} from "@/libs/resend";
import configFile from "@/config";

export const sendPostPurchaseEmail = async (user: any, plan: any) => {
    try {
        await sendEmail({
            to: user?.email,
            subject: "BlogFAST Purchase Confirmation",
            html:
                `<p>Hi ${user.name},</p>
<p>My name is Florian, and I'm the co-founder of BlogFAST. I wanted to personally thank you for joining us.</p>
<p>You can now access the product <a href="${configFile.appUrl}">here</a>.</p>
<p>Best,</p>
Florian</p>`,
        });
    } catch (e) {
        console.error("Email issue:" + e?.message);
    }
}