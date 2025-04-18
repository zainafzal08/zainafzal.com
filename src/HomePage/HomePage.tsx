import * as React from "react";
import "./HomePage.css";
import { AboutIcon } from "../Icons/AboutIcon";
import { VisualDesignIcon } from "../Icons/VisualDesignIcon";
import { SoftwareIcon } from "../Icons/SoftwareIcon";
import { ToolsIcon } from "../Icons/ToolsIcon";

export function HomePage() {
    const src = new URL('../../assets/zain.svg', import.meta.url);
    return <div className="fill center">
        <div id="home-hero" className="hero">
            <img src={src.href}></img>
            <h1 className="inter-bold"> Zain </h1>
        </div>
        <nav>
            <a href="/about" id="about"><AboutIcon/> <span>About</span></a>
            <a href="/visual-design" id="visual-design"><VisualDesignIcon/><span>Visual Design</span></a>
            <a href="/software" id="software"><SoftwareIcon/><span>Software</span></a>
            <a href="/tools" id="tools"><ToolsIcon/><span>Tools</span></a>
        </nav>
    </div>
}