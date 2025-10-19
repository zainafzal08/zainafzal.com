import adventureBuddy1 from "../../assets/adventure_buddy_1.svg";
import adventureBuddy2 from "../../assets/adventure_buddy_2.svg";
import adventureBuddy3 from "../../assets/adventure_buddy_3.svg";
import adventureBuddy4 from "../../assets/adventure_buddy_4.svg";
import adventureBuddy5 from "../../assets/adventure_buddy_5.svg";
import adventureBuddy6 from "../../assets/adventure_buddy_6.svg";
import adventureBuddy7 from "../../assets/adventure_buddy_7.svg";

import js1 from "../../assets/js_1.svg";
import js2 from "../../assets/js_2.svg";
import js3 from "../../assets/js_3.svg";
import js4 from "../../assets/js_4.svg";
import js5 from "../../assets/js_5.svg";
import js6 from "../../assets/js_6.svg";

import politico1 from "../../assets/politico_1.svg";
import politico2 from "../../assets/politico_2.svg";
import politico3 from "../../assets/politico_3.svg";
import politico4 from "../../assets/politico_4.svg";
import politico5 from "../../assets/politico_5.svg";

import stickers1 from "../../assets/stickers_1.svg";
import stickers2 from "../../assets/stickers_2.svg";
import stickers3 from "../../assets/stickers_3.svg";
import stickers4 from "../../assets/stickers_4.svg";
import stickers5 from "../../assets/stickers_5.svg";
import stickers6 from "../../assets/stickers_6.svg";
import stickers7 from "../../assets/stickers_7.svg";
import stickers8 from "../../assets/stickers_8.svg";
import stickers9 from "../../assets/stickers_9.svg";

import wallpaper1 from "../../assets/wallpaper_1.svg";
import wallpaper2 from "../../assets/wallpaper_2.svg";
import wallpaper3 from "../../assets/wallpaper_3.svg";
import wallpaper4 from "../../assets/wallpaper_4.svg";

export interface Project {
    name: string;
    description: string;
    images: string[];
}

export const projects: Project[] = [
    {
        name: "Adventure Buddy",
        description: "An app that helps users play DnD by handling the paperwork",
        images: [
            adventureBuddy1,
            adventureBuddy2,
            adventureBuddy3,
            adventureBuddy4,
            adventureBuddy5,
            adventureBuddy6,
            adventureBuddy7,
        ]
    },
    {
        name: 'JS Lecturing Slides',
        description: "Slide deck used to teach javascript fundamentals at UNSW",
        images: [
            js1,
            js2,
            js3,
            js4,
            js5,
            js6,
        ]
    },
    {
        name: 'Politico',
        description: "Web app which provides compariative information on australian political parties",
        images: [
            politico1,
            politico2,
            politico3,
            politico4,
            politico5,
        ]
    },
    {
        name: 'Stickers',
        description: "Some designs for fun stickers to put on your laptop",
        images: [
            stickers1,
            stickers2,
            stickers3,
            stickers4,
            stickers5,
            stickers6,
            stickers7,
            stickers8,
            stickers9,
        ]
    },
    {
        name: 'Wallpapers',
        description: "Desktop Wallpapers! For the wallpaper...on your desktop!",
        images: [
            wallpaper1,
            wallpaper2,
            wallpaper3,
            wallpaper4
        ]
    },

];