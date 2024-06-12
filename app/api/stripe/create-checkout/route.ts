import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/libs/next-auth";
import {createCheckout} from "@/libs/stripe";
import userClient from "@/libs/drizzle/queries/user"

// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
async function getUserIfLogged() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return undefined;
    }
    return await userClient
        .query
        .get
        .me(session);
}

// By default, it doesn't force users to be authenticated. But if they are, it will prefill the Checkout data with their email and/or credit card
export async function POST(req: NextRequest) {
    const body = await req.json();

    if (!body.priceId) {
        return NextResponse.json(
            {error: "Price ID is required"},
            {status: 400}
        );
    } else if (!body.successUrl || !body.cancelUrl) {
        return NextResponse.json(
            {error: "Success and cancel URLs are required"},
            {status: 400}
        );
    } else if (!body.mode) {
        return NextResponse.json(
            {
                error:
                    "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
            },
            {status: 400}
        );
    }

    try {
        const user = await getUserIfLogged();
        // If you want to force users to be authenticated to create a Checkout Session, you can uncomment the following lines
        // if (!user) {
        //     return NextResponse.json("Unauthorized", {status: 401});
        // }

        const {priceId, mode, successUrl, cancelUrl} = body;

        const stripeSessionURL = await createCheckout({
            priceId,
            mode,
            successUrl,
            cancelUrl,
            // If user is logged in, it will pass the user ID to the Stripe Session so it can be retrieved in the webhook later
            clientReferenceId: user?.id,
            // If user is logged in, this will automatically prefill Checkout data like email and/or credit card for faster checkout
            user: user as any,
            // If you send coupons from the frontend, you can pass it here
            // couponId: body.couponId,
        });

        return NextResponse.json({url: stripeSessionURL});
    } catch (e) {
        console.error(e);
        return NextResponse.json({error: e?.message}, {status: 500});
    }
}
