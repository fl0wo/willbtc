import React, {useEffect, useState} from "react";
import {FormBotConfigurationType} from "@/app/model/FormBotConfigurationType";
import {ConfigureFormTitle} from "@/app/components/configure-form-title";
import {FormTextInput} from "@/app/components/form-text-input";
import useDebounce from "@/app/use/debounce";
import {askForDomain} from "@/app/actions";
import { toast } from "react-hot-toast";

export function UrlSlugConfigurationBlock(props: {
    alreadyPickedDomain: boolean,
    form: FormBotConfigurationType,
    onChange: (e: any) => void
}) {

    if (props.alreadyPickedDomain) {
        return null;
    }

    // listen for changes in the form and call the backend to get information about the picked domain
    const debouncedSearch = useDebounce(props.form.urlSlug, 1500);
    const [loading, setLoading] = useState(false);
    const [lastVerifiedDomain, setLastVerifiedDomain] = useState<string | null>(null);

    const setDesiredDomain = (e: any) => {
        props.onChange(e);
    }

    useEffect(() => {
        if (debouncedSearch) {
            // set loading to true
            setLoading(true)

            askForDomain(debouncedSearch)
                .then((data:any) => {
                    if (!data?.available) {
                        toast.error("This domain is already taken. Please choose another one.");
                        props.form.urlSlug = lastVerifiedDomain ?? props.form.urlSlug;
                    } else {
                        if(data.domain != lastVerifiedDomain){
                            setLastVerifiedDomain(data.domain);
                        }
                    }
                })
                .catch((error) => {
                  console.log('Error:', error)
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [debouncedSearch]);

    // when lastVerifiedDomain changes, update the form
    useEffect(() => {
        if(lastVerifiedDomain){
            props.onChange({target: {value: lastVerifiedDomain, name: "urlSlug"}});
        }
    }, [lastVerifiedDomain]);

    return <>
        <ConfigureFormTitle
            title="Domain"
            tooltip="The domain of your blog posts."
            description={<div>Your website will look like: https://<span
                className={!props.form.urlSlug ? "text-red-500" : "text-green-300"}>{props.form.urlSlug ?? "japan-journey"}</span>.blogsfast.com
            </div>}
        />
        <div className="card-body">
            <FormTextInput
                alphanumericValidator={true}
                tooltipTitle="The Slug that will be used as sub-domain hosting."
                labelText="URL Slug"
                label="urlSlug"
                placeHolder="japan-journey"
                toolTip="The Slug that will be used as sub-domain hosting."
                type="text"
                form={props.form}
                loading={loading}

                disabled={props.alreadyPickedDomain}
                subDescription="Want to use your custom domain? Send us an email! "
                onChange={setDesiredDomain}/>
        </div>
    </>;
}