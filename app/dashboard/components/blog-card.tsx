"use client";

// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
import React, {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import {showPricingTablePopup} from "@/app/dashboard/components/stripe-pricing-table-pop-up";
import {BotType} from "@/libs/drizzle/models/BotType";
import {UserType} from "@/libs/drizzle/models/UserType";

import {switchBotFn,} from "@/app/server-actions";
import {BlogCardOneGeneration} from "@/app/dashboard/components/blog-card-one-generation";

const formatHumanlyReadable = (date: Date) => {
    // Aug 15, 12:00
    const timePart = `${date.getHours()}:${date.getMinutes()}`;
    const datePart = `${date.toLocaleString('default', {month: 'short'})} ${date.getDate()}`;
    return `${datePart}, ${timePart}`;
}

const nextPostDate = (_: any) => {
    const tomorrowAtMidnight = new Date();
    tomorrowAtMidnight.setHours(24, 30, 0, 0);
    return formatHumanlyReadable(tomorrowAtMidnight);
}

export function BlogStatCard(props: {
    user: UserType,
    bot: BotType,

    cacheName: string,
    apiKey: string,
}) {

    const router = useRouter();

    const [bot, setBot] = useState(props.bot);

    const redirectToConfigurePrefilled = useCallback(async () => {
        router.push(`/dashboard/configure?id=${bot.id}`);
    }, [bot]);

    const topicName = props.bot.userId; // in my case I have 1 topic stream per user
    const hasAtLeastOneBlog = !!bot.lastJob;

    const requestTurnOnOffBot = async () => {
        return switchBotFn(bot)
            .then((res) => {
                if (!res) {
                    setBot({
                        ...bot,
                        turnOn: 0
                    });
                    showPricingTablePopup();
                    return;
                }
                const turnOn = res.turnOn;
                setBot({
                    ...bot,
                    ...res,
                    turnOn: turnOn,
                });
                if (turnOn) toast.success(`Your bot is turned on!`);
                else toast.error(`Your bot is turned off!`);
            })
            .catch((e) => {
                console.error('Error turning on bot:', e);
                toast.error('Error turning on bot');
            });
    }

    return <div>
        <div className="card bg-primary text-primary-content radius-6">

            <div className="card-body pb-0 pt-4">
                <div className="card-title justify-between">

                    {
                        !hasAtLeastOneBlog && <div>
                            <img src="/images/icons/lock.svg" style={{width:"2rem", position:"absolute", zIndex:"1000"}} alt="lock"/>
                        </div>
                    }

                    <div className={`${hasAtLeastOneBlog ? "" : "pointer-events-none disabled"}`}>
                        <a href={`https://${bot.urlSlug}.blogsfast.com`} className={`text-2xl white-40 ${hasAtLeastOneBlog && "on-hover-link"}`}>
                            https://<span className={`${hasAtLeastOneBlog && "intensewhite" }`}>{bot.urlSlug}</span>.blogsfast.com
                        </a>
                    </div>

                    <label className="flex cursor-pointer gap-2">
                        <input
                            disabled={!hasAtLeastOneBlog}
                            checked={bot.turnOn === 1}
                            onChange={requestTurnOnOffBot}
                            type="checkbox"
                            className="toggle toggle-lg toggle-accent"
                        />
                    </label>
                </div>
                {
                    !!bot.lastJob && <div>
                        <div className="stats bg-primary text-primary-content mt-3">
                            <div className="stat">
                                <div className="stat-title intensewhite">
                                    Clicks
                                </div>
                                <div className="stat-value intensewhite text-xl">
                                    0
                                </div>
                                <div className="stat-actions">
                                    <button
                                        className="btn btn-sm btn-ghost">
                                        Search Console
                                    </button>
                                </div>
                            </div>
                            <div className="stat">
                                <div className="stat-title intensewhite">
                                    Visits
                                </div>
                                <div className="stat-value text-xl">
                                    0
                                </div>
                                <div className="stat-actions">
                                    <button className="btn btn-sm btn-ghost">
                                        Google Analytics
                                    </button>
                                </div>

                            </div>

                            <div className="stat">
                                <div className="stat-title intensewhite">
                                    Next post at
                                </div>
                                <div className="stat-value text-xl">
                                    {nextPostDate(bot)}
                                </div>
                                <div className="stat-actions">
                                    <button
                                        onClick={() => redirectToConfigurePrefilled()}
                                        className="btn btn-sm btn-ghost ">
                                        Edit Config
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <BlogCardOneGeneration
                cacheName={props.cacheName}
                topicName={topicName}
                apiKey={props.apiKey}
                bot={bot}
                user={props.user}/>
        </div>
    </div>;
}