import Reveal from "./Reveal";
import ScreenBrowser from "./ScreenBrowser";
import { IconArrowUpRight, IconGithub } from "./Icons";
import type { ClientProject } from "../data/projects";
import "./ClientCase.css";

type ClientCaseProps = {
  project: ClientProject;
};

export default function ClientCase({ project }: ClientCaseProps) {
  return (
    <article className="client-case">
      <Reveal className="client-case-header">
        <div className="client-case-meta">
          <span className="client-case-icon">
            <project.Icon size={16} />
          </span>
          <span className="client-case-index">{project.index}</span>
          <span>{project.year}</span>
        </div>

        <h3 className="client-case-title">{project.title}</h3>
        <span className="client-case-role">{project.role}</span>

        <p className="client-case-description">{project.description}</p>

        <ul className="client-case-tech">
          {project.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="client-case-links">
          {project.link && (
            <a href={project.link} className="client-case-link">
              <span>Live site</span>
              <IconArrowUpRight size={16} />
            </a>
          )}
          {project.repo && (
            <a href={project.repo} className="client-case-link">
              <IconGithub size={16} />
              <span>Source</span>
            </a>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <ScreenBrowser idPrefix={project.id} title={project.title} screens={project.screens} />
      </Reveal>
    </article>
  );
}
