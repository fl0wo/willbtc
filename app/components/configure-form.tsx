"use client";

import React, {useCallback, useEffect, useState} from 'react';
import {ConfigureFormTitle} from "@/app/components/configure-form-title";
import {FormTextInput} from "@/app/components/form-text-input";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {useRouter, useSearchParams} from "next/navigation";
import {deleteBlog, requestNewBlog} from "@/app/actions";
import {useBot} from "@/app/calls/bot";
import {FormTextAreaInput} from "@/app/components/form-text-area-input";
import {FormAIModelPicker} from "@/app/components/form-aimodel-picker";
import {CTAConfigurationBlock} from "@/app/components/cta-configuration-block";
import {ToneAndStyleConfigurationBlock} from "@/app/components/tone-and-style-configuration-block";
import {TopicArgoumentConfigurationBlock} from "@/app/components/topic-argoument-configuration-block";
import {UrlSlugConfigurationBlock} from "@/app/components/url-slug-configuration-block";

const ConfigureForm = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const {data, isLoading, isError} = useBot(id);

    const [finishedForm, setFinishedForm] = useState(false);
    const [form, setFormInt] = useState(initialState);

    function setForm(value: FormBotConfigurationType) {
        setFormInt(value);
        setFinishedForm(isReadyToSubmit(value));
    }

    useEffect(() => {
        if (data) {
            setForm({
                ...form,
                ...data,

                // FIXME: this is a very bad design pattern, we should instead keep everything flat. (the .cta field should not exist in the db)
                ctaTitle: ((data as any)?.cta?.title) ?? form.ctaTitle,
                ctaDescription: ((data as any)?.cta?.description) ?? form.ctaDescription,
            });
        }
    }, [data]);

    const handleSubmit = useCallback(async () => {
        if (isReadyToSubmit(form)) {
            try {
                await requestNewBlog(form);
                router.push('/dashboard');
            } catch (e) {
                // TODO: show an anchored popup with the error message
                console.error(e);
            }
        } else {
            console.log('missing information', missingInformationLabels(form));
            // TODO: show an anchored popup with the error message
        }
    }, [form]);

    const handleCancel = useCallback(async () => {
        if (id) {
            try {
                await deleteBlog({
                    id: id,
                    ...form,
                });
                router.push('/dashboard');
            } catch (e) {
                console.error(e);
            }
        }
    }, [id]);

    const maxTones = 3;

    const isMaxTones = (tone?: string) => {
        if (!tone) {
            return (form?.tone?.length ?? 0) >= maxTones;
        }
        return (form?.tone?.length ?? 0) >= maxTones && !form?.tone?.includes(tone);
    }

    function pushToneOrRemove(tone: string) {
        if (isMaxTones(tone)) {
            return;
        }
        if (form?.tone?.includes(tone)) {
            setForm({...form, tone: form?.tone?.filter((t: any) => t !== tone)});
        } else {
            setForm({...form, tone: [...(form?.tone ?? []), tone]});
        }
    }

    function missingInformationLabels(form: FormBotConfigurationType) {
        try {
            return [
                {
                    val: form.googleSearch,
                    label: 'Google Search'
                },
                {
                    val: form.frequency,
                    label: 'Frequency'
                },
                {
                    val: form?.tone?.length,
                    label: 'Tone'
                },
                {
                    val: form.language,
                    label: 'Language'
                }
            ].filter((el) => !el.val)
                .map((el) => el.label);
        } catch (e) {
            return [];
        }

    }

    function isReadyToSubmit(form: FormBotConfigurationType) {
        try {
            return [
                form.googleSearch !== '',
                (form?.tone?.length ?? 0) > 0,
                !!form.language
            ].filter((el) => !el)?.length === 0;
        } catch (e) {
            return false;
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='max-w-7xl mx-auto card'>
            <TopicArgoumentConfigurationBlock
                form={form} onChange={(e) => setForm({...form, topic: e.target.value})}
                                              onChange1={(e) => setForm({...form, googleSearch: e.target.value})}
                                              onChange2={(e) => setForm({
                                                  ...form,
                                                  frequency: Number.parseInt(e.target.value)
                                              })}/>



            <UrlSlugConfigurationBlock
                alreadyPickedDomain={!!id}
                form={form}
                onChange={(e) => setForm({...form, urlSlug: e.target.value?.toLowerCase()})}/>




            <ToneAndStyleConfigurationBlock form={form} callbackfn={(tone) => {
                const toneEmojis: any = {
                    friendly: '😊',      // smiling face
                    professional: '💼',  // briefcase
                    informative: '📚',   // books
                    passionate: '❤️',   // red heart
                    funny: '🤣',         // rolling on the floor laughing
                    sarcastic: '😏',     // smirking face
                    serious: '🧐',       // face with monocle
                    casual: '👕',        // t-shirt
                    formal: '🎩'         // top hat
                };
                return <label key={tone} className="cursor-pointer label">
                <span
                    className={`text-l btn btn-primary ${form?.tone?.includes(tone) ? 'btn-active' : ''}`}>
                    {`${toneEmojis[tone]} ${tone}`}
                    <input type="checkbox"
                           checked={form?.tone?.includes(tone)}
                           disabled={isMaxTones(tone) && !form?.tone?.includes(tone)}
                           onChange={() => {
                               pushToneOrRemove(tone)
                           }}
                           className="checkbox checkbox-secondary whitecheckbox"
                    />
                </span>
                </label>
            }} b={isMaxTones()} maxTones={maxTones}
                                            onChange={(e) => setForm({...form, language: e.target.value})}
                                            onChangeGeoLocation={(e) => setForm({...form, country: e.target.value})}
                                            onChange1={(e) => setForm({...form, wantCoverImg: e.target.checked})}/>


            <CTAConfigurationBlock
                form={form}
                onChange={(e) => setForm({...form, ctaTitle: e.target.value})}
                onChange1={(e) => setForm({...form, ctaDescription: e.target.value})}
                onChange2={(e) => setForm({...form, ctaRedirect: e.target.value})}
                onChange3={(e) => setForm({...form, ctaRedirectUrl: e.target.value})}/>

            <ConfigureFormTitle
                title="Stealth Leads"
                tooltip="By specifying your business name and description, you let the AI know more about your business, and it can generate more relevant blog posts."
                description="Provide a brief description of what your main company/page does.
 Our AI will incorporate subtle mentions and hints about
 your business within the blog posts. This approach ensures the content
 remains engaging and appealing without coming across as overly promotional. By
doing so, your business will gain a natural and attractive presence in the content
, enhancing its appeal to readers."
            />
            <div className='card-body'>
                <FormTextInput
                    labelText="Business title"
                    label="businessName"
                    placeHolder={`My Awesome Business`}
                    tooltipTitle="Your business title, what should the reader know about your business?"
                    type="text"
                    form={form}
                    onChange={(e) => setForm({...form, businessName: e.target.value})}/>

                <FormTextAreaInput
                    labelText="Business description"
                    label="businessDescription"
                    placeHolder={`My business is an online store that sells only blue flowers:
- We grow our flowers in our own garden in Japan
- We have sold +3000 flowers last month
- We have happy customers from US, EU and China
- Our flowers are known because are last longing
- The delivery is free, safe and fast`}
                    height="15rem"
                    tooltipTitle="Your business description, why should the reader sign up? *Add bullet points if possible."
                    toolTip="Your business description, why should the reader sign up? *Add bullet points if possible."
                    type="text"
                    form={form}
                    subDescription="* Talk about the PROs of your business and say why the readers should signup."
                    onChange={(e) => setForm({...form, businessDescription: e.target.value})}/>
            </div>

            <ConfigureFormTitle
                title="Advanced Options"
                tooltip=""
                description="Want to go deeper? Here are some advanced options."
            />
            <div className='card-body'>
                <FormAIModelPicker

                    onChange={(e) => setForm({...form, gptModel: e.target.value})}/>
            </div>

            <ConfigureFormTitle
                title={finishedForm ? "Done!" : "Complete the form to get started!"}
                tooltip={finishedForm ? "You're ready to start generating blog posts!" : "Complete the form to get started!"}
                description={finishedForm ? "You're ready to start generating blog posts!" : "Complete the form to get started! Still missing: " + missingInformationLabels(form).join(', ') + "."}
            />
            <div className='card-body'>
                {/*START LOADING ANIMATION WHEN CLICKED*/}
                <button
                    onClick={(e) => handleSubmit()}
                    disabled={!finishedForm}
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">
                    {id ? 'EDIT' : 'START'} AI BLOG GENERATOR
                </button>

                {id && <button
                    onClick={(E) => handleCancel()}
                    className="btn btn-xs btn-error sm:btn-sm md:btn-md lg:btn-lg intensewhite">
                    DELETE BLOG
                </button>
                }
            </div>
        </div>
    )
}


let initialState: FormBotConfigurationType = {
    frequency: 3, // 3/day
    tone: [],
    imgGpt: 'Create a photo-realistic image suitable for a blog post cover. The central theme is \'TOPIC_PLACEHOLDER\', captured in a style that is professional and inviting. The image should have vibrant colors and a clean composition that reflects the subject\'s freshness and appeal. Focus on the central element and its presentation, conveying the essence and attractiveness of the subject. Please do not attempt to generate any text within the image.',
    wantCoverImg: true,
    length: "Long",
    type: "Article or Blog Post",
    task: "Informative or Educational",
    topic: "",
    country: undefined,
    language: "lang_en",

    skill: "beginner",

    businessName: ``,
    businessDescription: ``,

    gptModel: 'gpt-4o',

    ctaTitle: "Looking for something extra?",
    ctaDescription: "Your search ends here! Click to see more..",
    ctaRedirect: "Click here!",
};


export default ConfigureForm;