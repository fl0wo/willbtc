import React from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {isNotEmpty} from "@/app/utils";


export class FormTextAreaInput extends React.Component<{
    tooltipTitle: string;
    label: keyof FormBotConfigurationType;
    labelText?: string;
    placeHolder?: string;
    subDescription?: any;
    toolTip?: string;
    type?: string;
    form: FormBotConfigurationType,
    height?: string;
    onChange: (e: any) => void
}> {

    handleInputChange = (event:any) => {
        this.props.onChange(event);
    }

    render() {
        return <div>
            <div className="card bg-primary radius-6 text-primary-content mt-3 radius-6">
                <div className="card-body">

                    {
                        (isNotEmpty(this.props.form?.[this.props.label])) &&
                        <img className="check-done-icon" src="/images/icons/check.svg" alt="check done"/>
                    }

                    <h2 className="card-title intensewhite">
                        {this.props.labelText}
                        <span className="tooltip" data-tip={this.props.tooltipTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                 viewBox="0 0 24 24">
                                <path fill="white" d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M12,17L12,17c-0.552,0-1-0.448-1-1v-4 c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v4C13,16.552,12.552,17,12,17z M12.5,9h-1C11.224,9,11,8.776,11,8.5v-1 C11,7.224,11.224,7,11.5,7h1C12.776,7,13,7.224,13,7.5v1C13,8.776,12.776,9,12.5,9z"></path>
                            </svg>
                        </span>
                    </h2>

                    <label

                        style={{"borderRadius": "1.5rem",height: this.props.height ?? "20rem"} as any}
                        className="input input-bordered flex items-center gap-2">
                        <textarea
                            name={this.props.label}
                            value={this.props?.form?.[this.props.label] as any}
                            onChange={this.handleInputChange}
                            readOnly={false}
                            maxLength={400}
                            contentEditable={true}
                            className="w-full input-transparent pt-4 bg-transparent/0"
                            style={{height: this.props.height ?? "20rem",resize:'none'} as any}
                            placeholder={this.props.placeHolder ?? ""}/>

                        {this.props.toolTip &&
                            <span className="tooltip" data-tip={this.props.toolTip}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"><path
                    d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M12,17L12,17c-0.552,0-1-0.448-1-1v-4 c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v4C13,16.552,12.552,17,12,17z M12.5,9h-1C11.224,9,11,8.776,11,8.5v-1 C11,7.224,11.224,7,11.5,7h1C12.776,7,13,7.224,13,7.5v1C13,8.776,12.776,9,12.5,9z"></path></svg>
            </span>
                        }
                    </label>

                    {this.props.subDescription &&
                        <span className="text-xs text-gray-100">
                {this.props.subDescription}
            </span>
                    }

                    {/*<div className="card-actions justify-end">*/}
                    {/*    <button className="btn">Buy Now</button>*/}
                    {/*</div>*/}
                </div>
            </div>

        </div>
    }
}