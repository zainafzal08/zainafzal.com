import * as React from "react";
import "./SoftwarePage.css";
import { SoftwareIcon } from "../Icons/SoftwareIcon";
import { useState } from "react";
import { Project, projects } from "./Projects";

type OutputCell = {text: string, color: 'muted' | 'main', type?: 'normal' | 'link' | 'long'} | {type: 'empty'};
interface OutputLines {
    lines: OutputCell[][];
    numCols: number;
}

const HELP_OUTPUT: OutputLines = {
    lines: [
        [{text: "ls", color: 'muted'}, {text: "List projects", color: 'main'}],
        [{text: "describe [project]", color: 'muted'}, {text: "Describe a project", color: 'main'}],
        [{text: "help", color: 'muted'}, {text: "List commands", color: 'main'}],
    ],
    numCols: 2,
}
function constructProjectListOutput() {
    const allProjects = projects.map(project => project.name);
    const maxHeight = 4;

    const numRows = allProjects.length >= maxHeight ? maxHeight : allProjects.length;
    const numCols = Math.ceil(allProjects.length / maxHeight);
    const output:OutputLines = {
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
        output.lines[row][col] = {text: project, color: 'main'};
    }
    return output;
}

function constructProjectDescriptionOutput(project: Project): OutputLines {
    const lines: OutputCell[][] = [
        [{text: "Description", color: 'main'}, {text: project.description, color: 'muted', type: 'long'}],
        [{type: 'empty'}],
        ...project.links.map(link => [{text: link.text, color: 'main'}, {text: link.href, color: 'muted', type: 'link'}]) as OutputCell[][],
    ];
    return {
        lines: lines,
        numCols: Math.max(...lines.map(line => line.length)),
    };
}

function renderLine(line: OutputCell[], numCols: number) {
    const markup: React.ReactNode[] = [];
    for (let i = 0; i < numCols; i++) {
        const cell = line[i];
        if (cell.type === 'empty') {
            markup.push(<div key={i}/>)
        } else if (cell.type === 'link') {
            markup.push(<a key={cell.text} href={cell.text} className={cell.color}>{cell.text}</a>)
        } else if (cell.type === 'long') {
            markup.push(<pre key={cell.text} className={`${cell.color} long-form`}>{cell.text}</pre>)
        } else {
            markup.push(<pre key={cell.text} className={cell.color}>{cell.text}</pre>)
        }
    }
    return markup;
}

function constructOutput(lastLocation: string, lastCommand: string, output: OutputLines) {
    // Normalize.
    for (let i = 0; i < output.lines.length; i++) {
        const line = output.lines[i].filter(cell => !!cell);
        while (line.length < output.numCols) {
            line.push({type: 'empty'});
        }
        output.lines[i] = line;
    }
    let gridTemplateColumns;
    if (output.numCols < 3) {
        gridTemplateColumns = `min-content 1fr`;
    } else {
        gridTemplateColumns = `repeat(${output.numCols}, 1fr)`;
    }
    return <>
        <pre><span>~/{lastLocation}$</span>{lastCommand}</pre>
        <div className="terminal-grid" style={{gridTemplateColumns: gridTemplateColumns}}>
        {output.lines.map(line => renderLine(line, output.numCols))}
        </div>
    </>;
}

function constructErrorOutput(message: string): OutputLines {
    return {
        lines: [[{text: message, color: 'main'}]],
        numCols: 1,
    };
}

function Terminal({setCurrentProject, setLastCommand}: {setCurrentProject: (project: Project| null) => void, setLastCommand: (command: string) => void}) {
    // At some point it might be cute to let people actually navigate around the filesystem.
    // But for now, i ceebs so this will always be projects.
    const [location, setLocation] = useState("projects");
    const [query, setQuery] = useState("");
    const [output, setOutput] = useState(constructOutput(location, "ls", constructProjectListOutput()));
    
    const processQuery = React.useMemo(() => (query: string) => {
        const [command, arg] = query.split(" ").map(word => word.trim().toLowerCase());
        setLastCommand(command);
        if (command === "ls") {
            setOutput(constructOutput(location, query, constructProjectListOutput()));
        } else if (command === "describe") {
            if (projects.some(project => project.name === arg)) {
                const project = projects.find(project => project.name === arg);
                setOutput(constructOutput(location, query, constructProjectDescriptionOutput(project)));
                setCurrentProject(project);
            } else {
                setOutput(constructOutput(location, query, constructErrorOutput("Project not found, try 'ls' to see all projects")));
            }
        } else if (command === "help") {
            setOutput(constructOutput(location, query, HELP_OUTPUT));
        } else {
            setOutput(constructOutput(location, query, constructErrorOutput("Command not found")));
        }
    }, [setLocation]);
    const handleChange = React.useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.currentTarget.value);
    }, [location]);
    const handleKeyDown = React.useMemo(() => (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            processQuery(query);
            setQuery("");
        }
    }, [query]);

    return <div className="terminal">
        <div className="terminal-header">
            <div className="window-buttons"><div></div><div></div><div></div></div>
            <button className="terminal-header-button"> Simple View </button>
        </div>
        <div className="terminal-body">
            {output}
        </div>
        <div className="terminal-footer">
            <span>~/{location}$</span>
            <input type="text" onChange={handleChange} onKeyDown={handleKeyDown} value={query} placeholder="Try the 'help' command" />
        </div>
    </div>
}

export function SoftwarePage() {
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [isHidden, setIsHidden] = useState(true);
    const [lastCommand, setLastCommand] = useState<string | null>(null);

    React.useEffect(() => {
        if (currentProject && lastCommand === "describe") {
            setIsHidden(false);
        } else {
            setIsHidden(true);
        }
    }, [currentProject, lastCommand]);
    return <div className="fill start">
        <div id="software-hero" className="hero">
            <SoftwareIcon />
            <h1 className="inter-bold"> Software </h1>
        </div>
        <div className="software-projects">
            <div className="terminal-container">
                <div className={`images ${isHidden ? "hidden" : ""}`} data-num-images={currentProject?.images.length ?? 0}>
                   {currentProject?.images.map(image => (
                    <div style={{height: "200px", width: "200px", backgroundColor: "white", borderRadius: "8px", border: '1px solid var(--color-primary)'}}>
                        <img src={image}/>
                    </div>
                   ))}
                </div>
                <Terminal setCurrentProject={setCurrentProject} setLastCommand={setLastCommand}/>
            </div>
        </div>
    </div>
}