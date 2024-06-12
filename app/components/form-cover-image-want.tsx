import React from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";

export class FormCoverImageWant extends React.Component<{
    form: FormBotConfigurationType,
    onChange: (e: any) => void
}> {
    render() {
        return <div className="card bg-primary radius-6 text-primary-content mt-3">
            <div className="card-body">

                <img className="check-done-icon" src="/images/icons/check.svg" alt="check done"/>

                <h2 className="card-title intensewhite">Cover Image</h2>
                <p>Do you want to add the cover image in your blog (it's free)?</p>
                <div className="card-actions justify-end align-middle items-center">
                  <span className={this.props.form.wantCoverImg ? "text-green-500" : "text-red-500"}>
                        {this.props.form.wantCoverImg ? "Yes please" : "No image"}
                    </span>
                    <input
                        checked={this.props.form.wantCoverImg}
                        onChange={this.props.onChange}
                        type="checkbox"
                        className="toggle toggle-lg toggle-accent"
                    />
                </div>

            </div>
        </div>;
    }
}