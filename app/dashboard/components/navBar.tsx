import React from "react";
import ButtonAccount from "@/components/ButtonAccount";
import {BackButton} from "@/app/dashboard/components/backButton";
import {SettingsButton} from "@/app/dashboard/components/settingsButton";
import {CurrentCreditsButton} from "@/app/dashboard/components/currentCreditsButton";

export const NavBar = () => {
    return <div className="navbar bg-base-100">
        <div className="navbar-start">
            {/*ADD GO BACK ONE PAGE BUTTON IF IT'S NOT IN THE DASHBOARD*/}
            <div className="d-flex-hor">
                <BackButton/>
                <ButtonAccount/>
            </div>

        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost text-xl">
                BlogFAST
            </a>
        </div>
        <div className="navbar-end">
            <CurrentCreditsButton/>
            <SettingsButton/>
        </div>
    </div>;
}