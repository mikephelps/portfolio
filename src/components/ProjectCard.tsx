import Reveal from "./Reveal";
import { IconArrowUpRight, IconGithub } from "./Icons";
import type { Project } from "../data/projects";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
  reversed?: boolean;
};

export default function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  return (
    <Reveal className={`project-card ${reversed ? "project-card--reversed" : ""}`}>
      <div className="project-media">
        <div className="project-image-grid">
          {project.images.map((image, i) => (
            <div className="project-image" key={image.caption} data-hue={i % 4}>
              <span className="project-image-caption">{image.caption}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="project-info">
        <div className="project-info-top">
          <span className="project-index">{project.index}</span>
          <span className="project-year">{project.year}</span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <span className="project-role">{project.role}</span>

        <p className="project-description">{project.description}</p>

        <ul className="project-tech">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="project-links">
          {project.link && (
            <a href={project.link} className="project-link">
              <span>Live site</span>
              <IconArrowUpRight size={16} />
            </a>
          )}
          {project.repo && (
            <a href={project.repo} className="project-link">
              <IconGithub size={16} />
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}
