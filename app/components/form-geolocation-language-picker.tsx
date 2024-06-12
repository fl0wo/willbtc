import React from "react";
import {countryList} from "@/app/model/languages/CountryType";

export function FormGeolocationLanguagePicker(props: {
    isOptional?: boolean,
    defaultValue?: string,
    onChange: (e: any) => void
}) {

    return <div className="card bg-primary radius-6 text-primary-content mt-3">
        <div className="card-body">

            {
                <img className="check-done-icon" src="/images/icons/check.svg" alt="check done"/>
            }

            <h2 className="card-title intensewhite">
                Geolocation of your audience
                {
                    props.isOptional && <span className="opacity-40">
                        <small>(Optional) </small>
                    </span>
                }
            </h2>
            <p>
            Where is your audience located? We'll scrape the same results of your audience's location.
            </p>

            <select
                onChange={props.onChange}
                value={props.defaultValue ?? 'ALL'}
                className="select select-bordered w-full whiteselect">

                <option value="ALL">Globally</option>
                {
                    countryList.map((location: {
                        country_code: string;
                        country_name: string;
                    }) => {
                        return <option
                            key={location.country_code}
                            value={location.country_code}>
                            {location.country_name}
                        </option>
                    })
                }
            </select>

        </div>
    </div>;
}