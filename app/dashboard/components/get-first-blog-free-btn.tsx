import React from "react";

export function GetFirstBlogFreeBtn(props: { onClick: () => void, tryingFirstBlog: boolean }) {
    return <button style={{borderRadius: "16px"}}
                   onClick={props.onClick}
                   className="btn btn-block">
        {props.tryingFirstBlog ?
            <span className="loading loading-spinner"></span> :
            <div className="d-flex-hor">
                1 <img style={{width: "1rem"}} src="/images/icons/lightstrike.svg" alt="lightstrike"/>
                <span> Generate blog for free</span>
            </div>
        }
    </button>;
}