import Image from "next/image";

// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Hero: "ShipFast helps developers launch startups fast"
// - Problem Agitation: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)
// - Features: "ShipFast has user auth, Stripe, emails all set up for you"
const Solution = () => {
    return (
        <section className="bg-circle-green mt-20">

            {/*https://bitbo.io/how-many-bitcoin/*/}
            <div className="max-w-7xl mx-auto px-8 py-16 md:py-32 text-center">
                <h2 className="max-w-3xl mx-auto font-extrabold text-7xl md:text-7xl tracking-tight mb-6 md:mb-8">
                    <strong>Hibernate</strong> your BTC access, let your beloved ones inherit it.
                </h2>
                <p className="max-w-2xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20">
                    Do not let your BTC to be next, plan your inheritance now.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
                    <div>
                        <div className="d-flex-vert text-start font-bold">
                            <div className="text-primary">
                                <span className="text-7xl">100%</span>
                                <br/>
                                <small>to mine</small>
                            </div>
                            <div className="text-black">
                                <span className="text-7xl">100%</span>
                                <br/>
                                <small>owned</small>
                            </div>
                            <div className="text-red">
                                <span className="text-7xl">100%</span>
                                <br/>
                                <small>for ever lost</small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="pyramid-no-willbtc"></div>
                        <span>
                        *Stats from <a href="https://bitbo.io/how-many-bitcoin/" target="_blank"
                                       className="underline">Bitbo</a>
                    </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Solution;
