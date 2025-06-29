import * as React from "react";
import { ReactElement } from "react";
import { PythonIcon } from "../Icons/PythonIcon";
import { NewsIcon } from "../Icons/NewsIcon";

import unsw from "url:../../assets/unsw.png";
import akuna from "url:../../assets/akuna.svg";
import relume from "url:../../assets/relume.png";
import qwilr from "url:../../assets/qwilr.png";
import google from "url:../../assets/google.png";

export interface Entry {
    title: string;
    subtitle: string;
    yearsSpent?: number;
    image: string;
    description: string;
    links: Array<{text: string, url: string, icon: ReactElement}>;
}

export const career: Entry[] = [
    {
        title: 'Education',
        subtitle: 'Bachelors in Computer Science & Molecular and Cell Biology',
        description: `
            Double degree at UNSW in Computer Science and Molecular and Cell Biology.
            Graduated on the Dean's honor list, was the wellbeing head for the
            computer security society and particpated in a summer research
            project at the School of Biomedical Sciences on HIV-1 capsid binding.
        `,
        image: unsw,
        links: []
    },
    {
        title: 'UNSW',
        subtitle: 'Course Admin & Tutor',
        description: `
            Taught computing topics such as compiler design, data structures, web security, algorithms and web development.
            Helped write lectures, assignments and course content for basic to advanced computer science courses and helped run a course on web security called COMP6443.
        `,
        yearsSpent: 3,
        image: unsw,
        links: [
            {text: "Pycon Talk", url: "https://www.youtube.com/watch?v=l0Sazyzs1IY", icon: <PythonIcon/>}
        ]
    },
        {
        title: 'UNSW',
        subtitle: 'Lecturer',
        description: `
            Repeat guest lecturer for UNSW COMP6080, focusing on lectures on
            javascript debugging with dev tools & asynchronous programming.
        `,
        yearsSpent: 1,
        image: unsw,
        links: []
    },
    {
        title: 'Akuna Capital',
        subtitle: 'Intern & Python Developer',
        description: `
            Completed an internship and then began fulltime designing and
            developing internal tooling to parse terabytes of logs.
        `,
        yearsSpent: 1,
        image: akuna,
        links: []
    },
    {
        title: 'Google',
        subtitle: 'Senior Software Engineer',
        description: `
          Worked on the chromeOS team to launch light/dark mode, material you,
          as well as several other high impact features.
        `,
        yearsSpent: 5,
        image: google,
        links: [
            {text: "ChromeOS Material You", url: "https://www.androidpolice.com/chromebooks-chrome-os-117-material-you-more-like-android/", icon: <NewsIcon/>},
            {text: "ChromeOS Light/Dark Mode", url: "https://chromeunboxed.com/chrome-os-radiance-wallpaper-collection", icon: <NewsIcon/>}
        ]
    },
    {
        title: 'Relume',
        subtitle: 'Senior Software Engineer',
        description: `Senior software engineer working on the development of the Relume Site Builder, working with font management, dynamic coloring and performance optimization.`,
        yearsSpent: 1,
        image: relume,
        links: []
    },
    {
        title: 'Qwilr',
        subtitle: 'Senior Software Engineer',
        description: `Senior software engineer working on the Qwilr editor, working on development of new features and performance optimization.`,
        yearsSpent: 1,
        image: qwilr,
        links: []
    },
];