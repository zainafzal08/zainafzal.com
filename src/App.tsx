import * as React from "react";
import { Background } from "./Background/Background";
import "./App.css";
import { ALL_PAGES } from "./Pages";
import { HomeIcon } from "./Icons/HomeIcon";

function BackButton({ variant }: { variant: 'normal' | 'compact' }) {
  const src = new URL('../assets/face.svg', import.meta.url);
  if (variant === 'compact') {
    return <a href="/" className="compact-back-button">
      <HomeIcon/>
    </a>
  }

  return <a href="/">
    <div className={`back-button`}>
        <div className="back-button-bg">
            <p className="inter-bold"> Home </p>
        </div>
        <img src={src.href}/>
    </div>
</a>
}

export function App() {
    const path = location.pathname;
    let currentPage = ALL_PAGES[path.substring(1)] || ALL_PAGES['home'];
    return <>
        <Background>
            {currentPage.page}
            {currentPage.inNav && <BackButton variant={currentPage.homeButtonVariant}></BackButton>}
        </Background>
    </>
}