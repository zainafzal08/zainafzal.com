import * as React from "react"
import "./Link.css";

export interface LinkDescriptor {
    icon: React.ReactNode;
    text: string;
    url: string;
}

export function Link({icon, text, url}: LinkDescriptor) {
    return <a className="link" href={url}>
        <div className="highlight"/>
        {icon}
        <span>{text}</span>
        <div className="underline"></div>
    </a>    
}