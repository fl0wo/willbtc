"use client";

import React from "react";

export const showPricingTablePopup = () => (document?.getElementById?.('stripe_pricing_table_modal') as any)?.showModal?.()

export class StripePricingTablePopUp extends React.Component<{
    stripePricingTableId: string,
    stripePublishableKey: string,
}> {


    render() {

        // TODO: if stripePricingTableId and stripePublishableKey are not set
        // redirect them to /pricings

        return <>

            {/*<button*/}
            {/*    className="btn"*/}
            {/*    onClick={*/}
            {/*        () => (document?.getElementById?.('stripe_pricing_table_modal') as any)?.showModal?.()*/}
            {/*    }>open modal*/}
            {/*</button>*/}

            <dialog id="stripe_pricing_table_modal" className="modal">
                <div className="modal-box max-w-4xl">
                    <div className="popup-diag">
                        <h2 className="font-bold text-lg">
                            Purchase a Credit Pack
                        </h2>
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="p-3" autoFocus={false}>
                                <img style={{width:'1rem'}} src="/images/icons/cancel.svg" alt="back"/>
                            </button>
                        </form>
                    </div>

                    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
                    <stripe-pricing-table
                        pricing-table-id={this.props.stripePricingTableId}
                        publishable-key={this.props.stripePublishableKey}>
                    </stripe-pricing-table>
                </div>
            </dialog>
        </>;
    }
}