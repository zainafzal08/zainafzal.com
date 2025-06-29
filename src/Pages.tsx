import * as React from "react";
import { AboutPage } from "./AboutPage/AboutPage";
import { CareerPage } from "./CareerPage/CareerPage";
import { HomePage } from "./HomePage/HomePage";
import { SoftwarePage } from "./SoftwarePage/SoftwarePage";
import { VisualDesignPage } from "./VisualDesignPage/VisualDesignPage";
import { AboutIcon } from "./Icons/AboutIcon";
import { ToolsIcon } from "./Icons/ToolsIcon";
import { SoftwareIcon } from "./Icons/SoftwareIcon";
import { VisualDesignIcon } from "./Icons/VisualDesignIcon";

type PageMetadata = {
    inNav: true,
    title: string,
    icon: React.ReactElement,
    page: React.ReactElement
} | {inNav: false, page: React.ReactElement};

export const ALL_PAGES:Record<string, PageMetadata> = {
    'about': {
        inNav: true, 
        title: 'About',
        icon: <AboutIcon/>,
        page: <AboutPage/>,
    },
    'career': {
        inNav: true, 
        title: 'Career',
        icon: <ToolsIcon/>,
        page: <CareerPage />,
    },
    'software': {
        inNav: true,
        title: 'Software',
        icon: <SoftwareIcon/>,
        page: <SoftwarePage/>,
    },
    'visual-design': {
        inNav: true, 
        title: 'Visual Design',
        icon: <VisualDesignIcon/>,
        page: <VisualDesignPage/>,        
    },
    'home': {
        inNav: false, 
        page: <HomePage/>
    }
} as const;
export type Page = keyof typeof ALL_PAGES;