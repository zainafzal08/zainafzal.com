import * as React from "react";
import "./HomePage.css";
import { AboutIcon } from "../Icons/AboutIcon";
import { VisualDesignIcon } from "../Icons/VisualDesignIcon";
import { SoftwareIcon } from "../Icons/SoftwareIcon";
import { ToolsIcon } from "../Icons/ToolsIcon";
import { ALL_PAGES } from "../Pages";

export function HomePage() {
    const src = new URL('../../assets/zain.svg', import.meta.url);
    return <div className="fill center">
        <div id="home-hero" className="hero">
            <img src={src.href}></img>
            <h1 className="inter-bold"> Zain </h1>
        </div>
        <nav>
            {Object.entries(ALL_PAGES).map(([id, page]) => {
                if (!page.inNav) return null;
                const {icon, title} = page;
                return <a href={`/${id}`} id={id}>{icon} <span>{title}</span></a>
            })}
        </nav>
    </div>
}