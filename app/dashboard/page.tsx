import React from "react";
import {getCurrentUser} from "@/libs/auth/session";
import {DashboardPage} from "@/app/dashboard/components/dashboard-page";
import {getBotsWithLatestJobByUserId} from "@/app/server-actions";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
    const user = await getCurrentUser();

    if(!user) {
        // redirect to login
        console.log('User not found');
        return 'User not found';
    }

    // Disable cache from this page on refresh!
    const bots = await getBotsWithLatestJobByUserId(user);

    return (
        <DashboardPage user={user} bots={bots}/>
    );
}
