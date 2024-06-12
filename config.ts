import themes from "daisyui/src/theming/themes.js";
import { ConfigProps } from "@/types";

const config = {
    // REQUIRED
    appName: "WillBTC",
    // REQUIRED: a short description of your app for SEO tags (can be overwritten)
    appDescription: "Securely store your BTC secret keys and plan your Bitcoin inheritance.",
    // REQUIRED (no https://, not trailing slash at the end, just the naked domain)
    domainName: "willbtc.com",
    appUrl: "https://willbtc.com/dashboard",
    stripe: {
        // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
        plans: [
            {
                // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
                priceId:
                    process.env.ENV === "development"
                        ? "price_1PBxJRRr2UXZ47sNwfH86rI5"
                        : "price_1PG066Rr2UXZ47sNcVFFV6gA",
                mode: 'subscription',
                //  REQUIRED - Name of the plan, displayed on the pricing page
                name: "Basic",
                // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
                description: "Ideal for individuals who want to securely store and manage their BTC inheritance plans.",
                price: 199,
                // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
                priceAnchor: 299,
                features: [
                    {name: "Secure BTC key storage"},
                    {name: "Basic inheritance planning"},
                    {name: "Email support"},
                ],
            },
            {
                priceId:
                    process.env.ENV === "development"
                        ? "price_1PBxtDRr2UXZ47sNXLPAcIv1"
                        : "price_1PD4J5Rr2UXZ47sNXh63f6kw",
                isFeatured: true,
                name: "Premium",
                description: "For those seeking advanced features and enhanced security for their BTC inheritance planning.",
                price: 399,
                // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
                priceAnchor: 499,
                features: [
                    {name: "Everything in Basic"},
                    {name: "Advanced inheritance planning"},
                    {name: "Multi-factor authentication"},
                    {name: "Priority email support"},
                    {name: "Family access"},
                ],
            },
        ],
        suggestPlanIndex: 1,
    },
    aws: {
        bucket: "willbtc-content",
        bucketUrl: `https://willbtc-content.s3.amazonaws.com/`,
        cdn: "https://d1234x5678.cloudfront.net/",
    },
    email: {
        subdomain: "mg",
        fromNoReply: `WillBTC Team`,
        fromAdmin: `Support Team at WillBTC`,
        supportEmail: "support@willbtc.com",
        forwardRepliesTo: "support@willbtc.com",
    },
    colors: {
        theme: "emerald",
        main: themes[`[data-theme=emerald]`]["primary"],
    },
    auth: {
        loginUrl: "/api/auth/signin",
        callbackUrl: "/dashboard",
    },
} as ConfigProps;

export default config;
