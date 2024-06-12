import {sendEmail} from "@/libs/resend";
import {orThrow} from "@/app/utils";

export const sendGoodiesEmail = async (user: { name?: string, email?: string }) => {

    const settings = {
        to: orThrow(user?.email,'No email provided'), // 'to' is the email address of the recipient
        subject: "Did you get your free goodies?",
        html:
        /*
      Hi _name_,
It’s me again, Luca from BlogFAST.
When you signed up, I made sure you received a reward from us.
In case you missed it: I sent you 5-free credits so you can generate your first quality blog
with your custom setup and with just 1 click. (yes, it’s free)
I’ll link you up: https://blogfa.st/dashboard
         */

            `<p>Hi ${user.name},</p>
<p>It’s me again, Luca from BlogFAST.</p>

<p>When you signed up, I made sure you received a reward from us.</p>
<p>In case you missed it: I sent you 5-free credits so you can generate your first quality blog
with your custom setup and with just 1 click. (yes, it’s free)</p>

<p>I’ll link you up: <a href="https://blogfa.st/dashboard">Dashboard</a></p>`,
    };


    try {
        await sendEmail(settings);
    } catch (e) {
        console.error("Email issue:" + e?.message);
    }
}
