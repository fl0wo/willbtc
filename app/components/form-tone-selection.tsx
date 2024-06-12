import React from "react";
import {isNotEmpty} from "@/app/utils";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";

export class FormToneSelection extends React.Component<{
    callbackfn: (tone: any) => React.JSX.Element,
    b: boolean,
    maxTones: number,
    form: FormBotConfigurationType,
}> {
    render() {
        return <div className="card bg-primary radius-6 text-primary-content mt-3">
            <div className="card-body">

                {
                    (isNotEmpty(this.props.form?.tone)) &&
                    <img className="check-done-icon" src="/images/icons/check.svg" alt="check done"/>
                }


                <h2 className="card-title intensewhite">
                    Tone
                </h2>
                <p>
                    Pick up to 3 tones you want the blogs to be generated with.
                </p>

                {/*selectable spans with emoji and text for each category tone*/}
                {/*AND ALSO THE EMOJI AS WELL*/}

                <div className="flex flex-wrap">
                    {
                        [
                            "friendly",
                            "serious",
                            "casual",
                            "formal",
                            "funny",
                            "professional",
                            "informative",
                            "passionate",
                            "sarcastic",

                        ].map(this.props.callbackfn)
                    }

                    {this.props.b && <span
                        className="text-xs text-gray-500">You can only select up to {this.props.maxTones} tones.</span>}
                </div>


            </div>
        </div>;
    }
}