import {sendEmail} from "@/libs/resend";

export const sendWelcomeEmail = async (user: { name?: string, email?: string }) => {
    const subject = "Welcome to BlogFAST";
    const html =
        `
<p>Hi ${user?.name ?? 'there'}!</p>
<p>Thanks for signing up to BlogFAST. We're excited to have you on board.</p>
<p>Let us know if you have any questions!</p>
<p>Best, The BlogFAST team</p>
`;

    return await sendEmail({
        to: user?.email!,
        subject,
        html,
    });
}