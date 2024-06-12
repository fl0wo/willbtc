import {orThrow} from "@/app/utils";
import {sendEmail} from "@/libs/resend";

export const sendLastEmail = async (user: { name?: string, email?: string }) => {
    const settings = {
        to: orThrow(user?.email,'No email provided'), // 'to' is the email address of the recipient
        subject: "Your last email…",
        html:
        /*
    Hi _name_,
I guess it wasn’t meant to be.
It’s been 5 days since you signed-up and you still haven’t tried BlogFAST.
Because we give out freebies and tips I’ll have to remove you from our email list.
I remain available on Slack for any question.
Thank you again for considering BlogFAST.
Your last chance to grab some credits and remain in the loop: blofa.st/dashboard
Best,
Luca
Customer Success Manager – BlogFAST
         */

            `<p>Hi ${user.name},</p>
<p>I guess it wasn’t meant to be.</p>

<p>It’s been 5 days since you signed-up and you still haven’t tried BlogFAST.</p>
<p>Because we give out freebies and tips I’ll have to remove you from our email list.</p>
<p>I remain available on Slack for any question.</p>
<p>Thank you again for considering BlogFAST.</p>
<p>Your last chance to grab some credits and remain in the loop: <a href="https://blofa.st/dashboard">Dashboard</a></p>

<p>Best,</p>
<p>Luca</p>
<p>Customer Success Manager – BlogFAST</p>`,

    };


    try {
        await sendEmail(settings);
    } catch (e) {
        console.error("Email issue:" + e?.message);
    }
}