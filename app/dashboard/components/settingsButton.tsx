import React from "react";

export function SettingsButton() {
    return <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
        <div tabIndex={0} role="button" className="btn-link btn ml-3 cursor-pointer">
            <img style={{"width": "1.8rem"}} src="/images/icons/gear.svg" alt="Settings icon"/>
        </div>
        <div
            tabIndex={0}
            className="dropdown-content z-[1] card card-compact md:w-96 lg:w-96 p-2 shadow bg-primary settings-block">
            <div className="card-body">
                <h3 className="card-title">
                    Settings
                </h3>
                <div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <input type="checkbox" defaultChecked className="checkbox checkbox-primary mr-4"/>
                            <span className="label-text">
                                Send me an email on new blog post publication
                            </span>
                        </label>
                    </div>
                </div>

            </div>
        </div>
    </div>;
}