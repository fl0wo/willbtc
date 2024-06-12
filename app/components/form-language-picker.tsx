import React, {useEffect} from "react";

export function FormLanguagePicker(props: {
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
                Language
                {
                    props.isOptional && <span className="opacity-40">
                        <small>(Optional) </small>
                    </span>
                }
            </h2>
            <p>
                What language should the blog posts be written in?
            </p>

            <select
                onChange={props.onChange}
                value={props.defaultValue}
                className="select select-bordered w-full whiteselect">

                {
                    [
                        {
                            language_code: 'lang_en',
                            language_name: 'English'
                        },
                        {
                            language_code: 'lang_zh-CN',
                            language_name: 'Chinese (Mandarin)'
                        },
                        {
                            language_code: 'lang_es',
                            language_name: 'Spanish'
                        },
                        {
                            language_code: 'lang_fr',
                            language_name: 'French'
                        },
                        {
                            language_code: 'lang_de',
                            language_name: 'German'
                        },
                        {
                            language_code: 'lang_it',
                            language_name: 'Italian'
                        },
                        {
                            language_code: 'lang_pt',
                            language_name: 'Portuguese'
                        },
                        {
                            language_code: 'lang_ru',
                            language_name: 'Russian'
                        },
                        {
                            language_code: 'lang_ja',
                            language_name: 'Japanese'
                        },
                        {
                            language_code: 'lang_ko',
                            language_name: 'Korean'
                        },
                    ].map((location: {
                        language_code: string;
                        language_name: string;
                    }) => {
                        return <option
                            key={location.language_code}
                            value={location.language_code}>
                            {location.language_name}
                        </option>
                    })
                }
            </select>

            {/*<span>*/}
            {/*    Missing a language? Contact us!*/}
            {/*</span>*/}

        </div>
    </div>;
}