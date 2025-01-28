import * as React from "react";
import "./AboutPage.css";
import { AboutIcon } from "../Icons/AboutIcon";

export function AboutPage() {
    return <div className="fill start">
        <div className="hero" id="about-hero">
            <AboutIcon/>
            <h1 className="inter-bold bump-up"> About </h1>
        </div>
    </div>
}