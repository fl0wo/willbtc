"use client";

import Image from "next/image";
import {ClickHereComponent} from "@/components/ClickHereComponent";
import {useEffect, useState} from "react";

// - Features: "ShipFast has user auth, Stripe, emails all set up for you"
const Problem = () => {

    const [hasClicked, setHasClicked] = useState(false);

    const [toMineBTC, setToMineBTC] = useState(5);
    const [ownedBTC, setOwnedBTC] = useState(65);
    const [foreverLostBTC, setForeverLostBTC] = useState(30);

    const total = toMineBTC + ownedBTC + foreverLostBTC;
    const toMinePercentage = (toMineBTC / total) * 100;
    const ownedPercentage = (ownedBTC / total) * 100;
    const foreverLostPercentage = (foreverLostBTC / total) * 100;

    const labelMap = {
        toMine: 'to mine',
        owned: 'owned',
        foreverLost: 'forever lost'
    }

    useEffect(() => {
        if (hasClicked) {
            setToMineBTC(100);
            setOwnedBTC(0);
            setForeverLostBTC(0);
        } else {
            setToMineBTC(5);
            setOwnedBTC(65);
            setForeverLostBTC(30);
        }
    }, [hasClicked]);

    return (
        <section className="mt-20">
            {/*https://bitbo.io/how-many-bitcoin/*/}
            <div
                className="max-w-7xl mx-auto px-8 py-16 md:py-32 text-center">

                <div className="text-center">
                    <h2 className="font-title relative z-[2] mx-auto text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none">

                        {
                            !hasClicked && <div>
                                <strong>1/3</strong> of BTC are <span className="fried-text">forever lost</span>.
                            </div>
                        }
                        {
                            hasClicked && <div>
                                <strong>All</strong> of your BTC <span className="text-primary">will be retained</span>.
                            </div>
                        }
                    </h2>
                    {/*<p className="max-w-2xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20 pt-10">*/}
                    {/*    {!hasClicked?'... and your BTC could be next.':'to your beloved ones, generation after generation.'}*/}
                    {/*</p>*/}

                    <div className="mt-10">
                        <ClickHereComponent
                            onClick={(val: boolean) => setHasClicked(val)}
                            clickText="Click"
                            labelA="No succession plan"
                            labelB="DeFi Wallet + WillBTC*"
                        />
                    </div>

                </div>


                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6">

                    <div>
                        {/*TODO: https://www.npmjs.com/package/react-countup*/}

                        <div className="d-flex-vert text-start font-bold">
                            {toMineBTC && <div className="text-primary">
                                <span className="text-7xl">{toMineBTC}%</span>
                                <br/>
                                <small>{
                                    hasClicked ? 'next wealth retained' : 'to mine'
                                }</small>
                            </div>}
                            {ownedBTC>0 && <div className="text-black">
                                <span className="text-7xl">{ownedBTC}%</span>
                                <br/>
                                <small>
                                    {hasClicked ? 'retained' : 'owned'}
                                </small>
                            </div>}
                            {foreverLostBTC>0 &&<div className="text-red">
                                <span className="text-7xl">{foreverLostBTC}%</span>
                                <br/>
                                <small>
                                    {hasClicked ? 'retained' : 'forever lost'}
                                </small>
                            </div>}
                        </div>
                    </div>
                    <div>
                        <div
                            style={{
                                '--to-mine': `${toMinePercentage}%`,
                                '--owned': `${ownedPercentage}%`,
                                '--forever-lost': `${foreverLostPercentage}%`
                            } as any}
                            className="pyramid-no-willbtc">
                        </div>
                        {!hasClicked && <span>*Stats from <a href="https://bitbo.io/how-many-bitcoin/" target="_blank" className="underline">Bitbo</a></span>}
                        {hasClicked && <span>*Your btc will be propagated to your beloved ones,<br/>generation after generation.</span>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
