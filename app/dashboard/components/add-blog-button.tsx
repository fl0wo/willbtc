"use client";

import React, {useCallback} from "react";
import {useRouter} from "next/navigation";

export function AddBlogButton() {
    const router = useRouter();

    const handleClick = useCallback(() => {
        // redirect to /dashboard/configure
        router.push("/dashboard/configure");
    }, [router]);

    return <button
        onClick={handleClick}
        className="btn width-100">
                <span className="text-2xl">
                    +
                </span>
    </button>;
}