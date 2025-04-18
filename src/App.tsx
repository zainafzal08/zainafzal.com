import * as React from "react";
import { Background } from "./Background/Background";
import { HomePage } from "./HomePage/HomePage";
import { AboutPage } from "./AboutPage/AboutPage";
import { ToolsPage } from "./ToolsPage/ToolsPage";
import { SoftwarePage } from "./SoftwarePage/SoftwarePage";
import { VisualDesignPage } from "./VisualDesignPage/VisualDesignPage";
import "./App.css";

const validPages = ['about', 'tools', 'software', 'visual-design', 'home'] as const;
type Page = typeof validPages[number];

function pathToPage(path: string) {
    if (path === '/') return 'home';

    const index = validPages.indexOf(path.substring(1) as Page);
    if (index === -1) return 'home';
    return validPages[index];
}

function getPage(currentPage: Page) {
    if (currentPage === 'about') return <AboutPage/>
    else if (currentPage === 'tools') return <ToolsPage/>
    else if (currentPage === 'software') return <SoftwarePage/>
    else if (currentPage === 'visual-design') return <VisualDesignPage/>
    return <HomePage></HomePage>
}

function BackButton() {
  const src = new URL('../assets/face.svg', import.meta.url);
  return <a href="/">
    <div className="back-button">
        <div className="back-button-bg">
            <p className="inter-bold"> Home </p>
        </div>
        <img src={src.href}/>
    </div>
</a>
}

export function App() {
    const path = location.pathname;
    let currentPage = pathToPage(path);
    return <>
        <Background>
            {getPage(currentPage)}
            {currentPage !== 'home' && <BackButton></BackButton>}
        </Background>
    </>
}