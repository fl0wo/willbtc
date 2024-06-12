// Problem Agitation: A crucial, yet overlooked, component for a landing page that sells.
// It goes under your Hero section, and above your Features section.
// Your Hero section makes a promise to the customer: "Our product will help you achieve XYZ".
// Your Problem section explains what happens to the customer if its problem isn't solved.
// The copy should NEVER mention your product. Instead, it should dig the emotional outcome of not fixing a problem.
// For instance:
// - Hero: "ShipFast helps developers launch startups fast"
// - Problem Agitation: "Developers spend too much time adding features, get overwhelmed, and quit." (not about ShipFast at all)

export function ClickHereComponent(props:{
    clickText:string,
    labelA:string,
    labelB:string,
    onClick:(val:boolean) => void
}) {
    return <>
        <div className="h-4"></div>
        <div className="mx-auto w-72 text-start"><span
            className="text-base-content/70 inline-block -translate-y-2 -rotate-12">
            {props.clickText}
        </span>
            <svg className="text-base-content/20 inline-block h-8 w-20 rtl:[transform:rotateY(180deg)]"
                 viewBox="0 0 45 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 1.50244C23.4 -1.69756 38.3333 11.1691 43 18.0024M43 18.0024L38 17.0024M43 18.0024V13.0024"
                    stroke="currentColor"></path>
            </svg>
        </div>
        <div className="flex justify-center pb-10 pt-4">

            <label
                className="flex cursor-pointer items-center gap-3">
                {props.labelA}

                <div className="relative">
                    <div
                        className="pointer-events-none absolute start-1/2 top-1/2 grid h-20 w-60 -translate-x-1/2 -translate-y-1/2">
                        <div
                            className="bg-primary/30 col-start-1 row-start-1 scale-[2] rounded-full blur-[5rem] [transform:translate3d(0,0,0)]"></div>
                    </div>
                    <input
                        onClick={(e) => props.onClick(e.currentTarget.checked)}
                        name="tailwind-va-daisyui"
                        type="checkbox"
                        color={"#7BEC9E"}
                        className="toggle toggle-lg toggle-primary relative z-[2]"/></div>
                {
                    props.labelB
                }
            </label>
        </div>
    </>;
}