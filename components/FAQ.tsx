"use client";

import {useRef, useState} from "react";
import type {JSX} from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
    question: string;
    answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
    {
        question: "What do I get exactly?",
        answer: <div className="space-y-2 leading-relaxed">
            <p>A Website https://your-topic.blogsfast.com/[blogs] (or with your custom domain).
                In this website, a trained AI will write articles for you, with your preferences.
                Each article will have CTAs that sends traffic to your website.
            </p>
        </div>,
    },
    {
        question: "Do I have to host the website?",
        answer: (
            <div className="space-y-2 leading-relaxed">
                No need to host the website. We will host it for you.
            </div>
        ),
    },
    {
        question: "Can I get a refund?",
        answer: (
            <p>
                Yes! You can request a refund within 7 days of your purchase. Reach out
                by email.
            </p>
        ),
    },
    {
        question: "What does Google think about AI content?",
        answer: (
            <p>
                When contents are generated to be useful to users, Google is happy.
                Does not matter if it is AI generated or not, google ranks the content based on its usefulness.
                BlogFast AI generates content that replies to users' questions and is useful to them.
            </p>
        )
    },
    {
        question: "Why doesn't Google Search ban AI content?",
        answer: (
            <div className="space-y-2 leading-relaxed">
                Automation has long been used in publishing to create useful content. AI can assist with and generate useful content in exciting new ways.
            </div>
        ),
    },
    // {
    //     question: "Will my sub-domain be punished if other are posting spam?",
    //     answer: (
    //         <div className="space-y-2 leading-relaxed">
    //             https://x.com/gfiorelli1/status/840141001830285313
    //         </div>
    //     ),
    // },
    {
        question: "I have another question",
        answer: (
            <div className="space-y-2 leading-relaxed">
                Cool, contact us by email or on Slack.
            </div>
        ),
    },
];

const FaqItem = ({item}: { item: FAQItemProps }) => {
    const accordion = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <button
                className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                aria-expanded={isOpen}
            >
        <span
            className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
                <svg
                    className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${
                            isOpen && "rotate-180"
                        }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                            isOpen && "rotate-180 hidden"
                        }`}
                    />
                </svg>
            </button>

            <div
                ref={accordion}
                className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
                style={
                    isOpen
                        ? {maxHeight: (accordion?.current!.scrollHeight), opacity: 1}
                        : {maxHeight: 0, opacity: 0}
                }
            >
                <div className="pb-5 leading-relaxed">{item?.answer}</div>
            </div>
        </li>
    );
};

const FAQ = () => {
    return (
        <section className="bg-base-200" id="faq">
            <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
                <div className="flex flex-col text-left basis-1/2">
                    <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
                    <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
                        Frequently Asked Questions
                    </p>
                </div>

                <ul className="basis-1/2">
                    {faqList.map((item, i) => (
                        <FaqItem key={i} item={item}/>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FAQ;
