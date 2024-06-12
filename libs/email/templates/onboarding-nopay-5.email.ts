import {orThrow} from "@/app/utils";
import {sendEmail} from "@/libs/resend";

export const sendGoogleBanEmail = async (user: { name?: string, email?: string }) => {
    const settings = {
        to: orThrow(user?.email,'No email provided'), // 'to' is the email address of the recipient
        subject: "The story behind BlogFAST",
        html:
        /*
     Hi _name_,
You may have read some comments about AI content being punished from Google.
But here’s the real deal:
Will Google ban you for AI generated content?
No.
*Inhales in shock*
What?!!
When the content is generated to be useful to users, Google is happy. It doesn’t matter
if it’s AI generated or written by Shakespeare, google ranks the content based on its
usefulness. BlogFAST’s AI generates content that replies to users' questions and is
useful to them meaning that all of your blogs will make Google happy.
You can start your blog generation here: blogfa.st/dashboard
         */

            `<p>Hi ${user.name},</p>
<p>You may have read some comments about AI content being punished from Google.</p>
<p>But here’s the real deal:</p>
<p>Will Google ban you for AI generated content?</p>
<p>No.</p>

<p>*Inhales in shock*</p>

<p>What?!!</p>

<p>When the content is generated to be useful to users, Google is happy. It doesn’t matter
if it’s AI generated or written by Shakespeare, google ranks the content based on its
usefulness. BlogFAST’s AI generates content that replies to users' questions and is
useful to them meaning that all of your blogs will make Google happy.</p>

<p>You can start your blog generation here: <a href="https://blogfa.st/dashboard">Dashboard</a></p>`,

    };


    try {
        await sendEmail(settings);
    } catch (e) {
        console.error("Email issue:" + e?.message);
    }
}