// A useful component when your product is challenging the status quo.
// Highlight the current pain points (left) and how your product is solving them (right)
// Try to match the lines from left to right, so the user can easily compare the two columns

const WithWithout = () => {
    return (
        <section className="bg-base-100">
            <div className="max-w-5xl mx-auto px-8 py-16 md:py-32 ">
                <h2 className="text-center font-extrabold text-3xl md:text-5xl tracking-tight mb-12 md:mb-20">
                    If you don't <span className=" bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap highlight-text">rank on google</span>,<br/>
                    you're <span className="fried-text">fried</span>.
                </h2>

                <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-12">


                    <div className="bg-error/20 text-error p-8 md:p-12 rounded-lg w-full bg-error-flo ">
                        <h3 className="font-bold text-lg mb-4">
                            Your business without BlogFAST
                        </h3>

                        <ul className="list-disc list-inside space-y-1.5 ">
                            {/* Pains the user is experiencing by not using your product */}
                            {[
                                "$$$$ wasted on ads",
                                "Zero organic traffic",
                                "999h lost in content creation",
                                "Inconsistent posting",
                                "Targeting wrong keywords",
                                "Missing out on trends",
                            ].map((item, index) => (
                                <li key={index} className="flex gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4 shrink-0 opacity-75"
                                    >
                                        <path
                                            d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z"/>
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <img
                            className="flo-sad-img"
                            src="/images/flo-sad-red_800.png"
                            alt="Doubt customer face"/>

                    </div>

                    <div className="bg-success/20 text-success p-8 md:p-12 rounded-lg w-full bg-success-flo">
                        <h3 className="font-bold text-lg mb-4">
                        Your business + BlogFAST
                        </h3>

                        <img
                            className="flo-happy-img"
                            src="/images/flo_happy3_800.png"
                            alt="Happy customer face"/>

                        <ul className="list-disc list-inside space-y-1.5 ">
                            {/* Features of your product fixing the pain (try to match each with/withot lines) */}
                            {[
                                "$$$$ saved on ads",
                                "Unlimited organic traffic",
                                "5 minutes setup",
                                "Auto-published SE0 blogs every day",
                                "Self sustaining content machine",
                                "SERP focused content to rank on keywords",
                                "100 Google Lighthouse score",
                            ].map((item, index) => (
                                <li key={index} className="flex gap-2 items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="currentColor"
                                        className="w-4 h-4 shrink-0 opacity-75"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>

                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WithWithout;
