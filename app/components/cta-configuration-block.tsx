import React from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {ConfigureFormTitle} from "@/app/components/configure-form-title";
import {FormTextInput} from "@/app/components/form-text-input";

export function CTAConfigurationBlock(props: {
    form: FormBotConfigurationType,
    onChange: (e: any) => void,
    onChange1: (e: any) => void,
    onChange2: (e: any) => void,
    onChange3: (e: any) => void
}) {
    return <>
        <ConfigureFormTitle
            title="Call to Action"
            tooltip="The CTA is a button that invites the reader to take action."
            description="This button will appear across the blogs, make sure to customize it to your needs, this can be changed anytime, even for past blogs"
        />
        <div className="d-flex-hor">
            <div className="card-body w-full">
                <FormTextInput
                    isOptional={true}

                    tooltipTitle="The text displayed in the CTA button."
                    labelText="Title"
                    label="ctaTitle"
                    placeHolder="Looking for something extra?"
                    toolTip="The text displayed in the CTA button."
                    type="text"
                    maxWords={4}
                    subDescription="* This should be inviting and engaging, keep 3-4 words max."
                    form={props.form}
                    onChange={props.onChange}/>

                <FormTextInput
                    isOptional={true}

                    tooltipTitle="Description"
                    labelText="Description"
                    label="ctaDescription"
                    placeHolder="Your search ends here! Click to see more.."
                    toolTip="CTA description"
                    type="text"
                    subDescription="* This should be eye-catching and curious, keep it short and sweet."
                    form={props.form}
                    onChange={props.onChange1}/>

                <FormTextInput
                    isOptional={true}

                    tooltipTitle="The text displayed in the CTA button."
                    labelText="Button Text"
                    label="ctaRedirect"
                    placeHolder="Click here!"
                    toolTip="The text displayed in the CTA button."
                    type="text"
                    subDescription="* This should be inviting and engaging."
                    form={props.form}
                    onChange={props.onChange2}/>

                <FormTextInput
                    tooltipTitle="What should the user do after reading the blog post?"
                    labelText="CTA URL"
                    label="ctaRedirectUrl"
                    placeHolder="https://your-awesome-website.com"
                    toolTip="The URL the user should be redirected to after reading the blog post."
                    type="text"
                    subDescription="* This can be an YouTube Channel, Instagram Page, Website, Your Linkedin, etc."
                    form={props.form}
                    onChange={props.onChange3}/>

            </div>

            <div>
                <span>
                👀 This call to action block, will be displayed at the end of each blog post:
            </span>
                <div className="max-w-2xl mt-4 text-white dark:bg-white dark:text-black mb-10 bg-indigo-600"
                     style={{borderRadius: "3rem", background: "#000"}}>
                    <div className="block p-4 ml-1 mr-1">
                        <div className="mt-2"><span className="font-bold text-4xl mb-2 text-white">
                        {
                            props.form.ctaTitle
                        }
                    </span> <span
                            className="block text-md opacity-70 mb-8 text-white">
                        {props.form.ctaDescription}
                    </span>
                        </div>
                        <div className="flex-row align-middle justify-center flex"><a
                            href={props.form.ctaRedirectUrl}
                            target="_blank"
                            className="rounded-full text-2xl py-2 pl-8 pr-8 mb-3 text-indigo-600 bg-white font-bold align-middle justify-center items-center flex flex-row cursor-pointer hover:animate-pulse">
                        <span>
                            {props.form.ctaRedirect}
                        </span> </a></div>
                    </div>
                </div>
            </div>
        </div>

    </>;
}