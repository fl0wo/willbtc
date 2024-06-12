import {orThrow} from "@/app/utils";
import {sendEmail} from "@/libs/resend";

export const sendStoryEmail = async (user: { name?: string, email?: string }) => {
    const settings = {
        to: orThrow(user?.email,'No email provided'), // 'to' is the email address of the recipient
        subject: "The story behind BlogFAST",
        html:
        /*
     Hi _name_,
Have you wondered where BlogFAST comes from?
BlogFAST was built because my business partner and I, wanted to 2,3,4x our organic
leads for a cool startup we launched.
Well, that “cool” startup now makes close to 6 figures per month thanks to the
algorithm behind BlogFAST.
We managed to caputre thousands of Organic Leads by creating blog content that
answered questions people had and you can do the same for your own business.
Best,
Luca
Customer Success Manager - BlogFAST
         */

            `<p>Hi ${user.name},</p>
<p>Have you wondered where BlogFAST comes from?</p>
<p>BlogFAST was built because my business partner and I, wanted to 2,3,4x our organic
leads for a cool startup we launched.</p>

<p>Well, that “cool” startup now makes close to 6 figures per month thanks to the
algorithm behind BlogFAST.</p>

<p>We managed to capture thousands of Organic Leads by creating blog content that
answered questions people had, and you can do the same for your own business.</p>

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