"use server";

import React from "react";
import {getCurrentUser} from "@/libs/auth/session";
import {showPricingTablePopup} from "@/app/dashboard/components/stripe-pricing-table-pop-up";

export async function CurrentCreditsButton() {
    const user = await getCurrentUser();

    return <div className="d-flex-hor">
        <span onClick={showPricingTablePopup} className="btn btn-ghost">
            <span className="font-bold italic">
                {
                    user?.credits ?? 0
                }
            </span>
            <img style={{width: "1.5rem"}} src="/images/icons/lightstrike.svg" alt="Credits icon"/>
        </span>
    </div>;
}