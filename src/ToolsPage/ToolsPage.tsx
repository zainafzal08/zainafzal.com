import * as React from "react";
import "./ToolsPage.css";
import { ToolsIcon } from "../Icons/ToolsIcon";

export function ToolsPage() {
    return <div className="fill start">
        <div id="tools-hero" className="hero">
            <ToolsIcon/>
            <h1 className="inter-bold"> Tools </h1>
        </div>
    </div>
}