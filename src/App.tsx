import * as React from "react";
import { Background } from "./Background/Background";
import { HomePage } from "./HomePage/HomePage";
import { AboutPage } from "./AboutPage/AboutPage";
import { BlogPage } from "./BlogPage/BlogPage";
import { ToolsPage } from "./ToolsPage/ToolsPage";
import { SoftwarePage } from "./SoftwarePage/SoftwarePage";
import { VisualDesignPage } from "./VisualDesignPage/VisualDesignPage";

function getCurrentPage() {
    const path = location.pathname;
    if (path === '/about') return <AboutPage/>
    else if (path === '/blog') return <BlogPage/>
    else if (path === '/tools') return <ToolsPage/>
    else if (path === '/software') return <SoftwarePage/>
    else if (path === '/visual-design') return <VisualDesignPage/>
    return <HomePage></HomePage>
}

export function App() {
    return <>
        <Background>
            {getCurrentPage()}
        </Background>
    </>
}