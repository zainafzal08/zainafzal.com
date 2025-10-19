
import * as React from "react";
import { App } from "./App";
import { createRoot } from 'react-dom/client';
import { QUICK_LINKS } from "./quickLinks";

function redirectToQuickLink() {
    const url = new URL(window.location.href);
    const target = url.searchParams.get("ql")?.toLowerCase();
    if (target && target in QUICK_LINKS) {
        window.location.href = QUICK_LINKS[target];
    }
}

function init() {
    createRoot(document.body).render(<App/>);
}

redirectToQuickLink();
window.addEventListener('DOMContentLoaded', init);