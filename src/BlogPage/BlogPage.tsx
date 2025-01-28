import * as React from "react";
import "./BlogPage.css";
import { BlogIcon } from "../Icons/BlogIcon";

export function BlogPage() {
    return <div className="fill start">
        <div id="blog-hero" className="hero">
            <BlogIcon/>
            <h1 className="inter-bold"> Blog </h1>
        </div>
    </div>
}