import * as React from "react";
import "./VisualDesignPage.css";
import { VisualDesignIcon } from "../Icons/VisualDesignIcon";
import { Project, projects } from "./Projects";

function ProjectImage({src, index, count, selected}: {src: string, index: number, count: number, selected: boolean}) {
    const spread = 3;
    return <div className="project-image" style={{zIndex: selected ? 1 : 0}}>
        <img src={src} />
        <p className="inter-light">{index + 1} / {count}</p>
    </div>
}

function Project({project}: {project: Project}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const imageCount = project.images.length;
    return <div className="project-container">
        <div className="project-images" onClick={() => setSelectedIndex(((selectedIndex + 1) % imageCount))}>
            {project.images.map((image, index) => (
                <ProjectImage key={index} src={image} index={index} count={imageCount} selected={index === selectedIndex} />
            ))}
        </div>
        <div className="project-description card">
            <h2 className="inter-bold">{project.name}</h2>
            <p className="inter-light">{project.description}</p>
        </div>
    </div>
}

export function VisualDesignPage() {
    return <div className="fill start wider">
        <div className="hero">
            <VisualDesignIcon/>
            <h1 className="inter-bold"> Visual Design </h1>
        </div>
        <div className="content card-list">
            {projects.map((project) => <Project key={project.name} project={project}/>)}
        </div>
    </div>
}