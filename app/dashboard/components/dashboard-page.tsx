import React from "react";
import {NavBar} from "@/app/dashboard/components/navBar";
import {orThrow} from "@/app/utils";
import {UserType} from "@/libs/drizzle/models/UserType";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
        }
    }
}

export const DashboardPage = (props: {
    user: UserType,
}) => {

    const stripePricingTableId = orThrow(process.env.STRIPE_PRICING_TABLE_ID, 'Missing stripe pricing table id');
    const stripePublishableKey = orThrow(process.env.STRIPE_PUBLISHABLE_KEY, 'Missing stripe publishable key');
    const cacheName = orThrow(process.env.MOMENTO_CACHE_GH_EVENTS_CACHE_NAME, 'Missing cache name');
    const apiKey = orThrow(process.env.MOMENTO_CACHE_GH_EVENTS_API_KEY_SUBSCRIBE_ONLY, 'Missing topic token');

    return <main className="min-h-screen p-8 pb-24">
        <NavBar/>
        <section className="max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl md:text-4xl font-extrabold">
                Admin Dashboard
            </h1>
            <p className="text-base-content/80">
                Welcome back, {props.user.name}!
            </p>

        </section>
    </main>;
}