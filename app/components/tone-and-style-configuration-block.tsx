import React from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {ConfigureFormTitle} from "@/app/components/configure-form-title";
import {FormToneSelection} from "@/app/components/form-tone-selection";
import {FormLanguagePicker} from "@/app/components/form-language-picker";
import {FormCoverImageWant} from "@/app/components/form-cover-image-want";
import {FormGeolocationLanguagePicker} from "@/app/components/form-geolocation-language-picker";

export function ToneAndStyleConfigurationBlock(props: {
    form: FormBotConfigurationType,
    callbackfn: (tone: any) => React.JSX.Element,
    b: boolean,
    maxTones: number,
    onChange: (e: any) => void,
    onChangeGeoLocation: (e: any) => void,
    onChange1: (e: any) => void
}) {


    return <>
        <ConfigureFormTitle
            title="Tone & Style"
            tooltip="Which tone and style should your blog posts have."
            description="Define the tone and attitude the AI should use when writing your blog posts."
        />
        <div className="card-body">
            <FormToneSelection
                form={props.form}
                callbackfn={props.callbackfn} b={props.b} maxTones={props.maxTones}/>

            <div className="flex-row flex justify-between items-center align-middle gap-1 w-full">

                <FormLanguagePicker
                    defaultValue={props.form.language}
                    isOptional={true}
                    onChange={props.onChange}/>
                <FormGeolocationLanguagePicker
                    defaultValue={props.form.country}
                    isOptional={true}
                    onChange={props.onChangeGeoLocation}/>
            </div>

            <FormCoverImageWant form={props.form} onChange={props.onChange1}/>
        </div>
    </>;
}