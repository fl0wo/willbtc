"use client";

import {useState, useEffect, useRef} from "react";
import type {JSX} from "react";

// List of features to display:
// - name: name of the feature
// - description: description of the feature (can be any JSX)
// - svg: icon of the feature
const features: {
    name: string;
    description: JSX.Element;
    svg: JSX.Element;
}[] = [
    {
        name: "Blogs",
        description: (
            <>
                <div className="flex-row justify-center align-middle">
                    <ul className="space-y-2">
                        {[
                            "AI content generated",
                            "SEO optimized",
                            "Multiple languages and tone of voice",
                            "Content scheduling",
                            "Trend/SERP following",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-[18px] h-[18px] inline shrink-0 opacity-80"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                {item}
                            </li>
                        ))}
                        <li className="flex items-center gap-3 text-accent font-medium">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-[18px] h-[18px] inline shrink-0"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Time saved: 2h (per blog)
                        </li>
                    </ul>
                </div>
            </>
        ),
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
            </svg>
        ),
    },
    {
        name: "Images",
        description: (
            <>
                <ul className="space-y-2">
                    {[
                        "AI generated images",
                        "Custom prompt generation",
                        "Presets of popular image types",
                    ].map(
                        (item) => (
                            <li key={item} className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-[18px] h-[18px] inline shrink-0 opacity-80"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                {item}
                            </li>
                        )
                    )}
                    <li className="flex items-center gap-3 text-accent font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-[18px] h-[18px] inline shrink-0"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Time saved: 20 minutes (per image)
                    </li>
                </ul>
            </>
        ),
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
            </svg>
        ),
    },
    {
        name: "Keywords & SEO",
        description: (
            <>
                <ul className="space-y-2">
                    {[
                        "SERP analysis & suggestions",
                        "Self SERP update",
                        "Trend following",
                        "Long/Short tail keyword focus",
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-[18px] h-[18px] inline shrink-0 opacity-80"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            {item}
                        </li>
                    ))}
                    <li className="flex items-center gap-3 text-accent font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-[18px] h-[18px] inline shrink-0"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Time saved: 6 hours (per blog)
                    </li>
                </ul>
            </>
        ),
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                />
            </svg>
        ),
    },
    {
        name: "Style",
        description: (
            <>
                <ul className="space-y-2">
                    {[
                        "Components, animations & sections",
                        "Light/Dark mode",
                        "Custom fonts",
                        "Many templates",
                        "Admin access to edit content using TinaCMS"
                    ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-[18px] h-[18px] inline shrink-0 opacity-80"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            {item}
                        </li>
                    ))}
                    <li className="flex items-center gap-3 text-accent font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-[18px] h-[18px] inline shrink-0"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Time saved: 5 hours
                    </li>
                </ul>
            </>
        ),
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                />
            </svg>
        ),
    },
    {
        name: "Web Hosting",
        description: (
            <>
              <ul className="space-y-1">
                {[
                  "Edge optimized web hosting",
                  "Automatic SSL certificate (https)",
                  "100 Google LightHouse score",
                  "Automatic CI/CD deployment",
                  "Access to GitHub repository (upon request)"
                ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-[18px] h-[18px] inline shrink-0 opacity-80"
                      >
                        <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                        />
                      </svg>
                      {item}
                    </li>
                ))}

                <li className="flex items-center gap-3 text-accent font-medium">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-[18px] h-[18px] inline shrink-0"
                  >
                    <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                    />
                  </svg>
                  Time saved: 5 hours
                </li>
              </ul>
            </>
        ),
      svg: (
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
          >
            <path
                strokeLinecap="round"
                d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
            />
          </svg>
      ),
    },

];

// A list of features with a listicle style.
// - Click on a feature to display its description.
// - Good to use when multiples features are available.
// - Autoscroll the list of features (optional).
const FeaturesListicle = () => {
    const featuresEndRef = useRef<null>(null);
    const [featureSelected, setFeatureSelected] = useState<string>(
        features[0].name
    );
    const [hasClicked, setHasClicked] = useState<boolean>(false);

    // (Optional) Autoscroll the list of features so user know it's interactive.
    // Stop scrolling when user scroll after the featuresEndRef element (end of section)
    // emove useEffect is not needed.
    useEffect(() => {
        const interval = setInterval(() => {
            if (!hasClicked) {
                const index = features.findIndex(
                    (feature) => feature.name === featureSelected
                );
                const nextIndex = (index + 1) % features.length;
                setFeatureSelected(features[nextIndex].name);
            }
        }, 5000);

        try {
            // stop the interval when the user scroll after the featuresRef element
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        console.log("STOP AUTO CHANGE");
                        clearInterval(interval);
                    }
                },
                {
                    root: null,
                    rootMargin: "0px",
                    threshold: 0.5,
                }
            );
            if (featuresEndRef.current) {
                observer.observe(featuresEndRef.current);
            }
        } catch (e) {
            console.error(e);
        }

        return () => clearInterval(interval);
    }, [featureSelected, hasClicked]);

    return (
        <section className="py-24 pb-0-forced" id="features">
            <div className="max-w-3xl mx-auto">
                <div className="bg-base-100 max-md:px-8 max-w-3xl">
                    <p className="text-accent font-medium text-sm font-mono mb-3">
                        {/* Pure decoration, you can remove it */}
                        {/*I want 1000 blogs now plz*/}
                    </p>
                    <h2 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-8">
                        {/* 💡 COPY TIP: Remind visitors about the value of your product. Why do they need it? */}
                        <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-1 md:ml-1.5 leading-relaxed whitespace-nowrap highlight-text">Supercharge</span> your traffic now, get leads, make $.
                    </h2>
                    <div className="text-base-content/80 leading-relaxed mb-8 lg:text-lg">
                        {/* 💡 COPY TIP: Explain how your product delivers what you promise in the headline. */}
                        SEO optimized blogs, focused on <span className="highlight-text-20">what your audience is searching for</span>. <br/>
                        BlogFast is the fastest way to get organic leads on your website.
                        {/*Login users, process payments and send emails at lightspeed. Spend*/}
                        {/*your time building your startup, not integrating APIs. ShipFast*/}
                        {/*provides you with the boilerplate code you need to launch, FAST.*/}
                    </div>
                </div>
            </div>

            <div>
                <div
                    className="grid grid-cols-4 md:flex justify-start gap-4 md:gap-12 max-md:px-8 max-w-3xl mx-auto mb-8">
                    {features.map((feature) => (
                        <span
                            key={feature.name}
                            onClick={() => {
                                if (!hasClicked) setHasClicked(true);
                                setFeatureSelected(feature.name);
                            }}
                            className={`flex flex-col items-center justify-center gap-3 select-none cursor-pointer p-2 duration-200 group`}
                        >
              <span
                  className={`duration-100 ${
                      featureSelected === feature.name
                          ? "text-primary"
                          : "text-base-content/30 group-hover:text-base-content/50"
                  }`}
              >
                {feature.svg}
              </span>
              <span
                  className={`font-semibold text-sm ${
                      featureSelected === feature.name
                          ? "text-primary"
                          : "text-base-content/50"
                  }`}
              >
                {feature.name}
              </span>
            </span>
                    ))}
                </div>
                <div className="bg-base-200">
                    <div
                        className="max-w-3xl mx-auto flex flex-col md:flex-row justify-center md:justify-start md:items-center gap-12">
                        <div
                            className="text-base-content/80 leading-relaxed space-y-4 px-12 md:px-0 py-12 max-w-2xl animate-opacity"
                            key={featureSelected}
                        >
                            <h3 className="font-semibold text-base-content text-lg">
                                {features.find((f) => f.name === featureSelected)?.["name"]}
                            </h3>

                            {features.find((f) => f.name === featureSelected)?.["description"]}
                        </div>
                    </div>
                </div>
            </div>
            {/* Just used to know it's the end of the autoscroll feature (optional, see useEffect) */}
            <p className="opacity-0" ref={featuresEndRef}></p>
        </section>
    );
};

export default FeaturesListicle;
