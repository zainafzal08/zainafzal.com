import * as React from "react";
import "./SoftwarePage.css";
import { SoftwareIcon } from "../Icons/SoftwareIcon";

// Ideas
//   worry jornal
//   idle game
//   sortify
//   paper todo
//   Pull out just the 3d part from old website. 
export function SoftwarePage() {
    return <div className="fill start">
        <div id="software-hero" className="hero">
            <SoftwareIcon />
            <h1 className="inter-bold"> Software </h1>
        </div>
    </div>
}