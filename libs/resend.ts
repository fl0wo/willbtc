import { Resend } from 'resend';

export const sendEmail = async (args: {
    to: string;
    subject: string;
    text?: string;
    html: string;
    replyTo?: string;
}): Promise<any> => {
    const apiKey = process.env.RESEND_API_KEY;
    const domain = process.env.RESEND_DOMAIN;
    if(!apiKey || !domain) {
        console.error("RESEND_API_KEY or RESEND_DOMAIN is missing from .env");
        return;
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
        from: domain,
        to: args.to,
        subject: args.subject,
        html: args.html,
        text: args.text,
    });

    if (error) {
        return console.log(error);
    }

    return data;
}