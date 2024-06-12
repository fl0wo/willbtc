import {NextResponse, NextRequest} from "next/server";
import {headers} from "next/headers";
import Stripe from "stripe";
import configFile from "@/config";
import {findCheckoutSession} from "@/libs/stripe";
import {orThrow} from "@/app/utils";


import userClient from "@/libs/drizzle/queries/user";
import {CreateNewUser} from "@/libs/drizzle/zod";
import {sendPostPurchaseEmail} from "@/libs/email/templates/post-purchase.email";


// This is where we receive Stripe webhook events
// It used to update the user data, send emails, etc...
// By default, it'll store the user in the database
// See more: https://blogfa.st/docs/features/payments
export async function POST(req: NextRequest) {

    const stripeSecretKey = orThrow(process.env.STRIPE_SECRET_KEY, "Missing Stripe secret key");
    const stripeWebhookSecret = orThrow(process.env.STRIPE_WEBHOOK_SECRET, "Missing Stripe webhook secret");
    const signature = orThrow(headers().get("stripe-signature"), "Missing Stripe signature");

    const body = await req.text();
    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: "2023-08-16",
        typescript: true,
    });

    let eventType;
    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            stripeWebhookSecret
        );
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({error: err.message}, {status: 400});
    }

    eventType = event.type;

    console.log('Event type is: ', eventType)
    console.log('Event is: ', event)

    try {
        switch (eventType) {
            case "checkout.session.completed": {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                const stripeObject: Stripe.Checkout.Session = event.data
                    .object as Stripe.Checkout.Session;

                const userEmail = stripeObject
                    ?.customer_details
                    ?.email
                 ??
                    stripeObject?.customer_email;

                const session = await findCheckoutSession(stripeObject.id);

                const customerId = session?.customer;
                const priceId = session
                    ?.line_items
                    ?.data
                    ?.[0]
                    ?.price
                    ?.id;

                const userId = stripeObject.client_reference_id;
                const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);

                if (!plan) break;

                const customer = (await stripe.customers.retrieve(
                    customerId as string
                )) as Stripe.Customer;

                let user: any;

                const customerEmail = customer?.email ?? userEmail;

                console.log("customerEmail is: ", customerEmail);

                if(!customerEmail) {
                    console.error("No customer email found");
                    console.log("event is: ", event);
                    throw new Error("No customer email found");
                }

                if (userId) {
                    user = await userClient
                        .query
                        .get
                        .byId(userId);
                } else if (customerEmail) {
                    user = await userClient
                        .query
                        .get
                        .byEmail(customerEmail);

                    if (!user) {
                        console.log(`Creating user ${customerEmail}`)
                        const cmd:CreateNewUser = {
                            email: customerEmail,
                            name: customer?.name,

                            priceId: priceId as string,
                            customerId: customerId as string,
                            hasAccess: true
                        };
                        console.log("Creating user cmd: ", cmd)
                        user = await userClient
                            .mutations
                            .create(cmd);

                        console.log("Created user: ", user)
                    }
                } else {
                    console.error("No user found");
                    throw new Error("No user found");
                }

                if(!!customerEmail) {
                    console.log(`Upserting user ${customerEmail}`)

                    const res = await userClient
                        .mutations
                        .upsert({
                            id: user?.id,
                            name: customer?.name,
                            email: customerEmail,
                            priceId: priceId as string,
                            customerId: customerId as string,
                            hasAccess: true
                        });
                    console.log("Upserted user: ", res)

                    // Extra: send email with user link, product page, etc...
                    await sendPostPurchaseEmail({
                        email: customerEmail,
                        name: customer?.name,
                    }, plan);
                }

                break;
            }

            case "checkout.session.expired": {
                // User didn't complete the transaction
                // You don't need to do anything here, by you can send an email to the user to remind him to complete the transaction, for instance
                break;
            }

            case "customer.subscription.updated": {
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                // You don't need to do anything here, because Stripe will let us know when the subscription is canceled for good (at the end of the billing cycle) in the "customer.subscription.deleted" event
                // You can update the user data to show a "Cancel soon" badge for instance
                break;
            }

            case "customer.subscription.deleted": {
                // The customer subscription stopped
                // ❌ Revoke access to the product
                const stripeObject: Stripe.Subscription = event.data
                    .object as Stripe.Subscription;

                const subscription = await stripe.subscriptions.retrieve(
                    stripeObject.id
                );
                // const user = await User.findOne({customerId: subscription.customer});


                await userClient
                    .mutations
                    .update
                    .byCustomerId(
                        subscription.customer as string, {
                            hasAccess: false
                        } as any
                    );

                break;
            }

            case "invoice.paid": {
                // Customer just paid an invoice (for instance, a recurring payment for a subscription)
                // ✅ Grant access to the product

                const stripeObject: Stripe.Invoice = event.data
                    .object as Stripe.Invoice;

                const priceId = stripeObject
                    ?.lines
                    ?.data
                    ?.[0]
                    ?.price
                    ?.id;

                const customerId = stripeObject.customer;

                const user = await userClient
                    .query
                    .get
                    .byCustomerId(customerId as string);

                // Make sure the invoice is for the same plan (priceId) the user subscribed to
                if (user?.priceId !== priceId) break;

                // Grant user access to your product. It's a boolean in the database, but could be a number of credits, etc...
                await userClient
                    .mutations
                    .update
                    .byCustomerId(
                        customerId as string, {
                            hasAccess: true
                        } as any
                    );

                break;
            }

            case "invoice.payment_failed":
                // A payment failed (for instance the customer does not have a valid payment method)
                // ❌ Revoke access to the product
                // ⏳ OR wait for the customer to pay (more friendly):
                //      - Stripe will automatically email the customer (Smart Retries)
                //      - We will receive a "customer.subscription.deleted" when all retries were made and the subscription has expired

                break;

            default:
            // Unhandled event type
        }
    } catch (e) {
        console.error("stripe error: ", e.message);
    }

    return NextResponse.json({});
}
