import React from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {countWords, isNotEmpty} from "@/app/utils";


export class FormTextInput extends React.Component<{
    tooltipTitle: string;
    label: keyof FormBotConfigurationType;
    labelText?: string;
    placeHolder?: string;
    subDescription?: any;
    toolTip?: string;
    type?: string;
    form: FormBotConfigurationType,
    validator?: (value: string) => boolean,
    alphanumericValidator?: boolean,
    onChange: (e: any) => void,
    minWords?: number,
    maxWords?: number,
    isOptional?: boolean,
    disabled?: boolean,
    loading?: boolean
}> {

    handleInputChange = (event: any) => {
        const {value, name} = event.target;

        if (this.props.validator && !this.props.validator(value)) {
            return;
        }

        if (!this.props.alphanumericValidator) {
            this.props.onChange(event);
            return;
        }

        // Regex to check for non-alphanumeric characters
        if (/^[a-z0-9-]+$/i.test(value) || value === "") {
            // Only update the state if the input is alphanumeric or empty
            this.props.onChange(event);
        } else {
            // if it's a space substitute it with a dash
            if (value.includes(" ")) {
                const newValue = value.replace(/ /g, "-");
                this.props.onChange({target: {value: newValue, name: name}});
            } else {
                // Optionally handle the error, e.g., show an error message
                console.log("Invalid input: only alphanumeric characters are allowed.");
            }
        }
    }

    render() {
        return <div>
            <div className="card bg-primary radius-6 text-primary-content mt-3 radius-6">
                <div className={`card-body`}>

                    {
                        (isNotEmpty(this.props.form?.[this.props.label])) &&
                        <img className="check-done-icon" src="/images/icons/check.svg" alt="check done"/>
                    }

                    <h2 className="card-title intensewhite">

                        {this.props.loading &&
                            <span className="loading loading-spinner loading-md"></span>
                        }

                        {this.props.labelText}
                        {
                            this.props.isOptional && <span className="opacity-40">
                        <small>(Optional) </small>
                    </span>
                        }

                        <span className="tooltip" data-tip={this.props.tooltipTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                 viewBox="0 0 24 24">
                                <path fill="white"
                                      d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M12,17L12,17c-0.552,0-1-0.448-1-1v-4 c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v4C13,16.552,12.552,17,12,17z M12.5,9h-1C11.224,9,11,8.776,11,8.5v-1 C11,7.224,11.224,7,11.5,7h1C12.776,7,13,7.224,13,7.5v1C13,8.776,12.776,9,12.5,9z"></path>
                            </svg>
                        </span>
                    </h2>

                    <label
                        style={{"borderRadius": "10rem"} as any}
                        className={`input input-bordered flex items-center gap-2 ${(this.props.disabled || this.props.loading) && 'disabled pointer-events-none opacity-40'}`}>
                        <input
                            type={this.props.type}
                            name={this.props.label}
                            value={this.props?.form?.[this.props.label] as any}
                            onChange={this.handleInputChange}
                            className="w-full input-transparent"
                            placeholder={this.props.placeHolder ?? ""}/>

                        {this.props.toolTip &&
                            <span className="tooltip" data-tip={this.props.toolTip}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"><path
                    d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M12,17L12,17c-0.552,0-1-0.448-1-1v-4 c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v4C13,16.552,12.552,17,12,17z M12.5,9h-1C11.224,9,11,8.776,11,8.5v-1 C11,7.224,11.224,7,11.5,7h1C12.776,7,13,7.224,13,7.5v1C13,8.776,12.776,9,12.5,9z"></path></svg>
            </span>
                        }
                    </label>

                    {
                        this.props.minWords && countWords(this.props.form?.[this.props.label] as string) < this.props.minWords && (this.props.form?.[this.props.label] as string).length > 0 &&
                        <span style={{color: "red", fontSize: "1rem"}}>
                                    (min {this.props.minWords} words)
                                </span>
                    }
                    {
                        this.props.maxWords && countWords(this.props.form?.[this.props.label] as string) > this.props.maxWords && (this.props.form?.[this.props.label] as string).length > 0 &&
                        <span style={{color: "red", fontSize: "1rem"}}>
                                    (max {this.props.maxWords} words)
                                </span>
                    }
                    {
                        this.props.subDescription &&
                        <span className="text-xs text-gray-100">{this.props.subDescription}</span>
                    }

                    {/*<div className="card-actions justify-end">*/}
                    {/*    <button className="btn">Buy Now</button>*/}
                    {/*</div>*/}
                </div>
            </div>

        </div>
    }
}