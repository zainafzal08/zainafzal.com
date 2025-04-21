export interface Project {
    name: string;
    description: string;
    imagePrefix: string;
    imageCount: number;
}

export const projects: Project[] = [
    {
        name: "Adventure Buddy",
        description: "An app that helps users play DnD by handling the paperwork",
        imagePrefix: "adventure_buddy_",
        imageCount: 9,
    },
];