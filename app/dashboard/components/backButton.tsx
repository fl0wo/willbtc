"use client";

import React from "react";

export function BackButton() {
    return <div
        onClick={() => {
            window.history.back();
        }}
        className="mr-3 cursor-pointer">
        <span className="btn btn-ghost">
            <img style={{"width": "1.5rem"}} src="/images/icons/back.svg" alt="back arrow"/>
        </span>
    </div>;
}