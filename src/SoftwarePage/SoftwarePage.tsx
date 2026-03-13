import * as React from "react";
import "./SoftwarePage.css";
import { SoftwareIcon } from "../Icons/SoftwareIcon";
import { useEffect, useState } from "react";
import { Project, projects } from "./Projects";
import { useIsMobile } from "../helpers";

type CellColor = 'muted' | 'main';
type OutputCell =
    { text: string, color: CellColor, type: 'normal' | 'link' | 'long'}
    | { text: string, color: CellColor, type: 'shortcut', command: string}
    | { type: 'empty' };
interface OutputLines {
    lines: OutputCell[][];
    numCols: number;
}

const HELP_OUTPUT: OutputLines = {
    lines: [
        [
            {text: "ls", color: 'muted', type: 'normal'},
            {text: "List projects", color: 'main', type: 'normal'}
        ],
        [
            {text: "describe [project]", color: 'muted', type: 'normal'},
            {text: "Describe a project", color: 'main', type: 'normal'}
        ],
        [
            {text: "help", color: 'muted', type: 'normal'},
            {text: "List commands", color: 'main', type: 'normal'}
        ],
    ],
    numCols: 2,
}

function constructProjectListOutput() {
    const allProjects = projects.map(project => project.name);
    const maxHeight = 4;

    const numRows = allProjects.length >= maxHeight ? maxHeight : allProjects.length;
    const numCols = Math.ceil(allProjects.length / maxHeight);
    const output: OutputLines = {
        lines: [],
        numCols: numCols,
    };
    for (let i = 0; i < numRows; i++) {
        output.lines.push(new Array(numCols));
    }
    for (let i = 0; i < allProjects.length; i++) {
        const project = allProjects[i];
        const row = i % numRows;
        const col = Math.floor(i / maxHeight);
        output.lines[row][col] = {
            text: project,
            color: 'main',
            type: "shortcut",
            command: `describe ${project}`
        };
    }
    return output;
}

function constructProjectDescriptionOutput(projectName: string): OutputLines {
    if (!projects.some(p => p.name === projectName)) {
        return constructErrorOutput("Project not found, try 'ls' to see all projects");
    }
    const project = projects.find(p => p.name === projectName)!;
    const lines: OutputCell[][] = [
        [
            {text: "Description", color: 'main', type: 'normal'},
            {text: project.description, color: 'muted', type: 'long'}
        ],
        [
            {type: 'empty'}
        ],
        ...project.links.map(link => [
            {text: link.text, color: 'main'}, {text: link.href, color: 'muted', type: 'link'}
        ]) as OutputCell[][],
    ];
    return {
        lines: lines,
        numCols: Math.max(...lines.map(line => line.length)),
    };
}

function constructErrorOutput(message: string): OutputLines {
    return {
        lines: [[{text: message, color: 'main', type: 'normal'}]],
        numCols: 1,
    };
}

function TerminalLine(props: {line: OutputCell[], numCols: number, setCommand: (c: string) => void}) {
    const {line, numCols, setCommand} = props;
    const markup: React.ReactNode[] = [];
    for (let i = 0; i < numCols; i++) {
        const cell = line[i];
        if (cell.type === 'empty') {
            markup.push(<div key={i}/>)
        } else if (cell.type === 'link') {
            markup.push(<a key={cell.text} href={cell.text} className={cell.color}>{cell.text}</a>)
        } else if (cell.type === 'long') {
            markup.push(<pre key={cell.text} className={`${cell.color} long-form`}>{cell.text}</pre>)
        } else if (cell.type === 'shortcut') {
            markup.push(<pre key={cell.text} className={cell.color} onClick={() => setCommand(cell.command)}>{cell.text}</pre>)
        } else {
            markup.push(<pre key={cell.text} className={cell.color}>{cell.text}</pre>)
        }
    }
    return markup;
}

function parseCommand(command: string) {
    const [program, arg] = command.split(" ").map(word => word.trim().toLowerCase());
    
    switch (program) {
        case "ls":
            return constructProjectListOutput();
        case "describe":
            return constructProjectDescriptionOutput(arg);
        case "help":
            return HELP_OUTPUT;
        default:
            return constructErrorOutput("Command not found");
    }
}

function TerminalOutput(props: {lastLocation: string, lastCommand: string, setCommand: (c: string) => void}) {
    const {lastLocation, lastCommand, setCommand} = props;
    const data = parseCommand(lastCommand);
    for (let i = 0; i < data.lines.length; i++) {
        const line = data.lines[i].filter(cell => !!cell);
        while (line.length < data.numCols) {
            line.push({type: 'empty'});
        }
        data.lines[i] = line;
    }
    let gridTemplateColumns: string;
    if (data.numCols < 3) {
        gridTemplateColumns = `min-content 1fr`;
    } else {
        gridTemplateColumns = `repeat(${data.numCols}, 1fr)`;
    }
    return <>
        <pre><span>~/{lastLocation}$</span>{lastCommand}</pre>
        <div className="terminal-grid" style={{gridTemplateColumns: gridTemplateColumns}}>
        {data.lines.map(line => <TerminalLine line={line} numCols={data.numCols} setCommand={setCommand}/>)}
        </div>
    </>;
}

function TerminalFooter(props: {location: string, setCommand: (c: string) => void, prevProject: Project, nextProject: Project}) {
    const [query, setQuery] = useState("");
    const isMobile = useIsMobile();
    const {location, setCommand, prevProject, nextProject} = props;
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };
    const handleKeyDown = React.useMemo(() => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setCommand(query);
            setQuery("");
        }
    }, [query]);

    React.useEffect(() => {
        if (isMobile) {
            setCommand("describe " + projects[0].name);
        }
    }, [isMobile]);

    if (!isMobile) {
        return <div className="terminal-footer">
            <span>~/{location}$</span>
            <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={query} placeholder="Try the 'help' command" />
        </div>;
    }
    return <div className="terminal-footer mobile">
        <button className="mobile-terminal-button" onClick={() => setCommand("describe " + prevProject.name)}> Prev </button>
        <button className="mobile-terminal-button" onClick={() => setCommand("describe " + nextProject.name)}> Next </button>
    </div>;
}

function Terminal({currentProject, setCurrentProject}: {currentProject: Project, setCurrentProject: (project: Project| null) => void}) {
    // At some point it might be cute to let people actually navigate around the filesystem.
    // But for now, i ceebs so this will always be projects.
    const [location, setLocation] = useState("projects");
    const [command, setCommand] = useState("ls");

    useEffect(() => {
        const [program, arg] = command.split(" ").map(word => word.trim().toLowerCase());
        if (program !== 'describe') {
            setCurrentProject(null);
            return;
        }
        const p = projects.find(p => p.name === arg);
        if (!p) {
            setCurrentProject(null);
            return;
        }
        setCurrentProject(p);
    }, [command, setCurrentProject]);

    const projectIndex = projects.findIndex(project => project.name === currentProject?.name);
    const nextProject = projects[(projectIndex + 1) % projects.length];
    const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
    return <div className="terminal">
        <div className="terminal-header">
            <div className="window-buttons">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div className="terminal-body">
            <TerminalOutput
                lastLocation={location}
                lastCommand={command}
                setCommand={setCommand}
            >
            </TerminalOutput> 
        </div>
        <TerminalFooter
            location={location}
            setCommand={setCommand}
            prevProject={prevProject}
            nextProject={nextProject}
        ></TerminalFooter>
    </div>
}

function BgImages({currentProject}: {currentProject: Project|null}) {
    const [imagesHidden, setImagesHidden] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        if (currentProject === null) {
            setImagesHidden(true);
            setTimeout(() => {
                setImages([]);
            }, 400);
        } else if (images.length === 0) {
            setImages(currentProject.images);
            setTimeout(() => {
                setImagesHidden(false);
            }, 10);
        } else {
            setImagesHidden(true);
            setTimeout(() => {
                setImages(currentProject.images);
            }, 400);
            setTimeout(() => {
                setImagesHidden(false);
            }, 410);
        }
    }, [currentProject]);

    const imageStyles = {height: "200px", width: "200px", backgroundColor: "white", borderRadius: "8px", border: '1px solid var(--color-primary)'};
    return <div
        className={`images ${imagesHidden ? "hidden" : ""}`}
        data-num-images={images.length ?? 0}>
        {images.map(image => (
            <div style={imageStyles}>
                <img src={image}/>
            </div>
        ))}
    </div>
}

export function SoftwarePage() {
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    return <div className="fill start" id="extra-padding">
        <div id="software-hero" className="hero">
            <SoftwareIcon />
            <h1 className="inter-bold"> Software </h1>
        </div>
        <div className="software-projects">
            <div className="terminal-container">
                <BgImages currentProject={currentProject}></BgImages>
                <Terminal currentProject={currentProject} setCurrentProject={setCurrentProject}/>
            </div>
        </div>
    </div>
}