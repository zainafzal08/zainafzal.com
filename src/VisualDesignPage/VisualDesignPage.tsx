import * as React from "react";
import "./VisualDesignPage.css";
import { VisualDesignIcon } from "../Icons/VisualDesignIcon";
import { Project, projects } from "./Projects";
import { toUrl } from "../helpers";
import Rand from "rand-seed";

function ProjectImage({src, index, count}: {src: string, index: number, count: number}) {
    const rotation = (new Rand(index)).rand() * 10; 
    return <div className="project-image" style={{backgroundImage: `url(${src})`, transform: `rotate(${rotation}deg)`}}>
        <p className="inter-light">{index + 1} / {count}</p>
    </div>
}

function Project({project}: {project: Project}) {
    const images = Array.from({length: project.imageCount}, (_, index) => toUrl(`../../assets/${project.imagePrefix}${index + 1}.png`));
    return <div className="project-container">
        <div className="project-images">
            {images.map((image, index) => (
                <ProjectImage src={image} index={index} count={project.imageCount} />
            ))}
        </div>
        <div className="project-description card">
            <h2 className="inter-bold">{project.name}</h2>
            <p className="inter-light">{project.description}</p>
        </div>
    </div>
}

export function VisualDesignPage() {
    return <div className="fill start">
        <div className="hero">
            <VisualDesignIcon/>
            <h1 className="inter-bold"> Visual Design </h1>
        </div>
        <div className="content">
            {projects.map((project) => <Project project={project}/>)}
        </div>
    </div>
}