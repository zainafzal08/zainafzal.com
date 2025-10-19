import { getQuickLink } from "../quickLinks";

import worryJournal1 from "../../assets/worry_journal_1.png";
import worryJournal2 from "../../assets/worry_journal_2.png";
import worryJournal3 from "../../assets/worry_journal_3.png";

export interface Project {
    name: string;
    description: string;
    links: Array<{text: string, href: string}>;
    images: Array<string>;
}

export const projects: Project[] = [
    {
        name: 'worry-journal',
        description: 'PWA that allow you to jot down worries and refute them. Only stores to local storage and encrypts the data at rest.',
        links: [
            {text: 'Github', href: getQuickLink('g:wj')},
        ],
        images: [
            worryJournal1,
            worryJournal2,
            worryJournal3,
        ]
    },
    {
        name: 'kitty-font',
        description: 'A font containing a pixel art cat sprites made as part of a conference talk on how fonts works.',
        links: [
            {
                text: 'Website',
                href: getQuickLink('kf'),
            },
        ],
        images: []
    },
    {
        name: 'sortify',
        description: 'A web app that lets you sort songs into playlists with a tinder style swipe.',
        links: [],
        images: []
    },
    {
        name: 'paper-todo',
        description: 'A infinite canvas on which you can make sprawling dependent todo trees.',
        links: [],
        images: []
    },
    {
        name: 'idle-game',
        description: 'A simple exploration of some ideas for an idle farming game that lives in your new tab page.',
        links: [],
        images: []
    },
    {
        name: 'point-cloud-viewer',
        description: 'Some experiments around rendering a point cloud that can be rearranged into various shapes.',
        links: [],
        images: []
    },
    {
        name: 'codon-encoder',
        description: 'A tool that allows you to encode text into a DNA sequences to help demonstrate the basics of genetic encoding.',
        links: [],
        images: []
    }
];