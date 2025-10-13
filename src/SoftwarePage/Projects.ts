export interface Project {
    name: string;
    description: string;
    links: Array<{text: string, href: string}>;
}

// Ideas
//   worry jornal
//   idle game
//   sortify
//   paper todo
//   Pull out just the 3d part from old website. 
export const projects: Project[] = [
    {
        name: 'Worry Journal',
        description: 'PWA that allow you to jot down worries and refute them. Only stores to local storage and encrypts the data at rest.',
        links: []
    }
];