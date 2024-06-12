import {orThrow} from "@/app/utils";
import {sendEmail} from "@/libs/resend";

export const sendFailBusinessEmail = async (user: { name?: string, email?: string }) => {
    const settings = {
        to: orThrow(user?.email,'No email provided'), // 'to' is the email address of the recipient
        subject: "93% of businesses fail because of this...",
        html:
        /*
      Hi _name_
Do you know why many businesses fail?
Because less than <1% of businesses appear in the first result page of Google.
If you aren’t talking about the right content you’re missing on thousands of leads.
You MUST know what people in your niche are looking for.
And you can start capturing those organic leads with BlogFAST in minutes: Start
generating content (<-link)
If you have any questions regarding this, you can reach out to me on Slack :)
Best,
Luca
Customer Success Manager - BlogFAST
         */

            `<p>Hi ${user.name},</p>
<p>Do you know why many businesses fail?</p>
<p>Because less than <1% of businesses appear in the first result page of Google.</p>

<p>If you aren’t talking about the right content you’re missing on thousands of leads.</p>
<p>You MUST know what people in your niche are looking for.</p>

<p>And you can start capturing those organic leads with BlogFAST in minutes: Start
generating content (<a href="https://blogfa.st/dashboard">link</a>)</p>

<p>If you have any questions regarding this, you can reach out to me on Slack :)</p>
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