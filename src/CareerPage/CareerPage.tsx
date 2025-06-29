import * as React from "react";
import "./CareerPage.css";
import { ToolsIcon } from "../Icons/ToolsIcon";
import { MailIcon } from "../Icons/MailIcon";
import { career, Entry } from "./Career";

function Link({icon, text, url}: Entry["links"][number]) {
    return <a href={url}>
        <div className="card-link">
            {icon}
            <span>{text}</span>
        </div>
    </a>    
}

function CareerCard({e}: {e: Entry}) {
    return <div className="career-card">
        <div className="card image-container">
            <img src={e.image}></img>
        </div>
        <div className="card">
            <h1>{e.title}</h1>
            <p className="subtitle">{e.subtitle}</p>
            <p className="content">{e.description}</p>
            <div className="links">
                {e.links.map(l => <Link {...l}></Link>)}
            </div>
        </div>
    </div>
}

export function CareerPage() {
    const jobs = career.filter(e => !!e.yearsSpent);

    return <div className="fill start">
        <div id="career-hero" className="hero">
            <ToolsIcon />
            <h1 className="inter-bold"> Career </h1>
        </div>
        <a href="mailto:zain.afz@gmail.com">
            <div className="resume-hint">
                <MailIcon/>
                <span>Want a full Resumè? Get in touch!</span>
            </div>
        </a>
        <div className="summary">
            <div className="bar-container">
                {jobs.map(j => <div className="bar" style={{flexGrow: j.yearsSpent}}>
                    <img src={j.image}/>
                </div>)}
            </div>
            <div className="labels">
                <span>2016</span>
                <span>Today</span>
            </div>
        </div>
        <div className="career-cards">
            {career.toReversed().map(e => <CareerCard e={e}/> )}
        </div>
    </div>
}