import * as React from "react";
import "./SoftwarePage.css";
import { SoftwareIcon } from "../Icons/SoftwareIcon";
import { Project, projects } from "./Projects";

function Project({data}: {data: Project}) {
    return <div className="software-project card">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <div className="links">
            <a className="link"></a>
        </div>
    </div>
}

export function SoftwarePage() {
    return <div className="fill start">
        <div id="software-hero" className="hero">
            <SoftwareIcon />
            <h1 className="inter-bold"> Software </h1>
        </div>
        <div className="software-projects">
            {projects.map((p, i) => <Project key={i} data={p}/>)}
        </div>
    </div>
}