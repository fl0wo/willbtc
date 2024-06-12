import type {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

import config from "@/config";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {accounts, sessions, users, verificationTokens} from "@/libs/drizzle/schema";
import {orThrow} from "@/app/utils";
import {db} from "@/libs/drizzle/db";
import {scheduleOnboardingEmails} from "@/libs/email/schedule-onboarding";
import {sendWelcomeEmail} from "@/libs/email/templates/welcome.email";

interface NextAuthOptionsExtended extends NextAuthOptions {
    adapter?: any;
}

const dbAuthAdapter = DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
});

export const authOptions: NextAuthOptionsExtended = {
    // Set any random key in .env.local
    secret: orThrow(process.env.NEXTAUTH_SECRET,'Invalid/Missing environment variable: "NEXTAUTH_SECRET"'),
    providers: [
        GoogleProvider({
            allowDangerousEmailAccountLinking: true,
            // Follow the "Login with Google" tutorial to get your credentials
            clientId: orThrow(process.env.GOOGLE_ID!, 'Invalid/Missing environment variable: "GOOGLE_ID"'),
            clientSecret: orThrow(process.env.GOOGLE_SECRET!,'Invalid/Missing environment variable: "GOOGLE_SECRET"'),

            async profile(profile) {
                console.log('The profile:',profile)
                return {
                    id: profile.sub,
                    name: profile.given_name ? profile.given_name : profile.name,
                    email: profile.email,
                    image: profile.picture,
                    createdAt: new Date(),
                };
            },
        }),
        EmailProvider({
            server: {
                host: orThrow(process.env.EMAIL_SERVER_HOST, 'Invalid/Missing environment variable: "EMAIL_SERVER_HOST"'),
                port: Number.parseInt(orThrow(process.env.EMAIL_SERVER_PORT, 'Invalid/Missing environment variable: "EMAIL_SERVER_PORT"')),
                auth: {
                    user: orThrow(process.env.EMAIL_SERVER_USER, 'Invalid/Missing environment variable: "EMAIL_SERVER_USER"'),
                    pass: orThrow(process.env.RESEND_API_KEY, 'Invalid/Missing environment variable: "RESEND_API_KEY"'),
                },
            },
            from: orThrow(process.env.EMAIL_FROM, 'Invalid/Missing environment variable: "EMAIL_FROM"'),
        }),
    ],
    adapter: {
        ...dbAuthAdapter,
        createUser: async (user:any) => {
            // Using non-null assertion as according to NextAuth this method is requried.
            const createdUser = await dbAuthAdapter
                ?.createUser
                ?.(user!);

            try {
                await sendWelcomeEmail({
                    name: createdUser?.name!,
                    email: createdUser?.email,
                });

                await scheduleOnboardingEmails({
                    name: createdUser?.name!,
                    email: createdUser?.email,
                });
            } catch (e) {
                console.error('Error scheduling emails:', e);
            }


            return createdUser;
        }
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('Log in')
            return true;
        },
        session({ token, session }:any) {
            // console.log('token is', token)
            if (token) {
                if(!session.user) {
                    session.user = {}
                }
                session.user.id = token.id ?? token.sub;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            // console.log('now session is', session)
            return session;
        },
        // async jwt({ token, user }) {
        //     const [dbUser] = await db
        //         .select()
        //         .from(users)
        //         .where(eq(users.email, token.email || ''))
        //         .limit(1);
        //
        //     if (!dbUser) {
        //         if (user) {
        //             token.id = user?.id;
        //         }
        //         return token;
        //     }
        //
        //     return {
        //         id: dbUser.id,
        //         name: dbUser.name,
        //         email: dbUser.email,
        //         picture: dbUser.image,
        //     };
        // },
    },

    session: {
        strategy: "jwt",
    },
    theme: {
        brandColor: config.colors.main,
        // Add you own logo below. Recommended size is rectangle (i.e. 200x50px) and show your logo + name.
        // It will be used in the login flow to display your logo. If you don't add it, it will look faded.
        logo: `https://${config.domainName}/images/icons/logo.png`,
    }
}