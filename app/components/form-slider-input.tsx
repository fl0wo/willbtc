import React from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";

function formatFrequencyToHumanlyReadable(frequency: number | undefined) {
    if (frequency === undefined) return '6 hours';
    if (frequency < 24) return `${frequency} hours`;
    const days = Math.floor(frequency / 24);
    const hours = frequency % 24;
    const daysOrDay = days === 1 ? 'day' : 'days';
    const hoursOrHour = hours === 1 ? 'hour' : 'hours';
    const hoursString = hours === 0 ? '' : `${hours} ${hoursOrHour}`;

    if(days > 0 && hours > 0) {
        return `${days} ${daysOrDay} and ${hoursString}`;
    }

    if(days === 0) {
        return hoursString;
    }

    if(hours === 0) {
        return `${days} ${daysOrDay}`;
    }

    return `${days} ${daysOrDay} ${hoursString}`;
}

export class FormSliderInput extends React.Component<{tooltipTitle:string,subDescription?:string, form: FormBotConfigurationType, onChange: (e: any) => void }> {
    render() {
        return <div className="pt-3">
            <div className="card bg-primary radius-6 text-primary-content">
                <div className="card-body">

                    {
                        (!!this.props.form?.frequency) &&
                        <img className="check-done-icon" src="/images/icons/check.svg" alt="check done"/>
                    }


                    <h2 className="card-title intensewhite">Posting {this.props.form.frequency} blog every day
                        <span className="tooltip" data-tip={this.props.tooltipTitle}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                 viewBox="0 0 24 24">
                                <path
                                    fill="white"
                                    d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M12,17L12,17c-0.552,0-1-0.448-1-1v-4 c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v4C13,16.552,12.552,17,12,17z M12.5,9h-1C11.224,9,11,8.776,11,8.5v-1 C11,7.224,11.224,7,11.5,7h1C12.776,7,13,7.224,13,7.5v1C13,8.776,12.776,9,12.5,9z"></path>
                            </svg>
                        </span>

                    </h2>

                    <div>
                        <input
                            type="range"
                            min={1}
                            max={12}
                            value={this.props.form.frequency}
                            onChange={this.props.onChange}
                            className="range"
                            style={{"--range-shdw": "0 0% 100%"} as any}
                            step="1"/>

                        <div className="w-full flex justify-between text-xs px-2">
                            <span className="red-color">1/day</span>
                            <span>6/day</span>
                            <span className="red-color">12/day</span>
                        </div>

                        {this.props.subDescription &&
                            <div>
                                <span className="text-xs text-white">{this.props.subDescription}</span>
                                <br/>
                            </div>

                        }

                        {this.props.form.frequency > 6 &&
                            <span className="red-color text-xs text-gray-500">Posting too frequently can be spammy and the crawler might not index some of your posts.</span>}
                        {this.props.form.frequency < 3 &&
                            <span className="red-color text-xs text-gray-500">Posting too infrequently can make your blog look abandoned.</span>}


                    </div>

                </div>
            </div>
        </div>;
    }
}