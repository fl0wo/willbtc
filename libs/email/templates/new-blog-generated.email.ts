import {sendEmail} from "@/libs/resend";
import {orThrow} from "@/app/utils";
import {BotType} from "@/libs/drizzle/models/BotType";

export const sendNewBlogGeneratedEmail = async (user: {
    name?: string,
    email?: string
}, bot:BotType
) => {

    const url = `https://${bot.urlSlug}.blogsfast.com`
    return await sendEmail({
        to: orThrow(user.email,'No email provided'),
        subject: "New blog published",
        html: `You have a new blog for <a href="${url}">${bot.urlSlug}</a>`,
    });
}