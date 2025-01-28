
import * as React from "react";
import { App } from "./App";
import { createRoot } from 'react-dom/client';

function init() {
    createRoot(document.body).render(<App/>);
}

window.addEventListener('DOMContentLoaded', init);