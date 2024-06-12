import React from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {ConfigureFormTitle} from "@/app/components/configure-form-title";
import {FormTextInput} from "@/app/components/form-text-input";
import {FormSliderInput} from "@/app/components/form-slider-input";

export function TopicArgoumentConfigurationBlock(props: {
    form: FormBotConfigurationType,
    onChange: (e:any) => void,
    onChange1: (e:any) => void,
    onChange2: (e:any) => void
}) {

    return <>
        <ConfigureFormTitle
            title="Article Generation"
            tooltip=""
            description="The initial minimum information required to start auto-generating blog posts."
        />
        <div className="card-body">
            <FormTextInput
                tooltipTitle="What is the topic of your blog posts?"
                labelText="Topic"
                label="topic"
                placeHolder="Japan culture, travel, food, tradition and nature."
                toolTip="The topic of your blog posts."
                type="text"
                form={props.form}
                minWords={5}
                subDescription="* This will help me understand the context of your blog posts."
                onChange={props.onChange}/>

            <FormTextInput
                tooltipTitle="What would client search be to find us?"
                labelText="Initial Google Search"
                label="googleSearch"
                placeHolder="best 10 places to visit in Japan"
                toolTip="The initial google search that will be used to generate the first blog post."
                type="text"
                form={props.form}
                subDescription="* The Initial Google Search is like a seed that will blossom into a tree. Start with a specific topic and it will automatically adapt to which topics users are interested in your niche"
                onChange={props.onChange1}/>
            <FormSliderInput
                tooltipTitle="Blogs are published at 00:00. How many blogs do you want to generate?"
                subDescription="* Blogs are published at 00:00. How many blogs do you want to generate?"
                form={props.form}
                onChange={props.onChange2}/>
        </div>
    </>;
}