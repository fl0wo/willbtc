import {sendEmail} from "@/libs/resend";
import {orThrow} from "@/app/utils";

export const sendCustomSuccessManagerEmail = async (user: { name?: string, email?: string }) => {

    const settings = {
        to: orThrow(user?.email,'No email provided'), // 'to' is the email address of the recipient
        subject: "Your Customer Success Manager | BlogFAST",
        html:
        /*
        Hi _name_,
My name is Luca, and I'm your customer success manager with BlogFAST. You should
have received the welcome email with the details on how to get started.
It will take you 2 minutes to set it up. If you have any questions, you can find me directly
on Slack with the name “Support”: https://join.slack.com/t/blogfast/shared_invite/zt2it2hyp9g-N6RaAQuKFDTh3so6ruocyA
Best,
Luca
Customer Success Manager - BlogFAST
         */

        `<p>Hi ${user.name},</p>
<p>My name is Luca, and I'm your customer success manager with BlogFAST. You should
have received the welcome email with the details on how to get started.

It will take you 2 minutes to set it up. If you have any questions, you can find me directly
on Slack with the name “Support”: <a href="https://join.slack.com/t/blogfast/shared_invite/zt2it2hyp9g-N6RaAQuKFDTh3so6ruocyA">Slack</a></p>
<p>Best,</p>
<p>Luca</p>
<p>Customer Success Manager - BlogFAST</p>`,
    };


    try {
        await sendEmail(settings);
    } catch (e) {
        console.error("Email issue:" + e?.message);
    }
}
