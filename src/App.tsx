import * as React from "react";
import { Background } from "./Background/Background";
import "./App.css";
import { ALL_PAGES, Page } from "./Pages";

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
    let currentPage = ALL_PAGES[path.substring(1)] ? path.substring(1) as Page : 'home';
    return <>
        <Background>
            {ALL_PAGES[currentPage].page}
            {currentPage !== 'home' && <BackButton></BackButton>}
        </Background>
    </>
}