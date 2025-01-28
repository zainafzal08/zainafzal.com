import * as React from "react";
import "./SoftwarePage.css";
import { SoftwareIcon } from "../Icons/SoftwareIcon";

export function SoftwarePage() {
    return <div className="fill start">
        <div id="software-hero" className="hero">
            <SoftwareIcon />
            <h1 className="inter-bold"> Software </h1>
        </div>
    </div>
}