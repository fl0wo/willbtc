import React from "react";
import {availableGPTs} from "@/app/model/FormBotConfigurationType";

export class FormAIModelPicker extends React.Component<{ onChange: (e: any) => any }> {
    render() {
        return <div className="card bg-primary radius-6 text-primary-content mt-3">
            <div className="card-body">

                {
                    <img className="check-done-icon" src="/images/icons/check.svg" alt="check done"/>
                }

                <h2 className="card-title intensewhite">
                    GPT Model
                    {
                        <span className="opacity-40">
                        <small>(Optional) </small>
                    </span>
                    }
                </h2>
                <p>
                    What GPT model should be used for generating the blog posts?
                </p>

                <select
                    defaultValue="gpt-4o"
                    onChange={this.props.onChange}
                    className="select select-bordered w-full whiteselect">

                    {availableGPTs.map((model:string) => {
                        return <option
                            key={model}
                            value={model}>{model}</option>
                    })}
                </select>

            </div>
        </div>;
    }
}