import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconArrowUpRight, IconGithub } from "./Icons";
import { projects } from "../data/projects";
import { useScrollSpy } from "../hooks/useScrollSpy";
import "./ProjectBrowser.css";

export default function ProjectBrowser() {
  const ids = projects.map((project) => `proj-${project.id}`);
  const scrollSpyId = useScrollSpy(ids, {
    rootMargin: "-38% 0px -42% 0px",
    threshold: [0, 0.5, 1],
  });

  // The list is short, so a small smooth-scroll from a click doesn't always
  // shift the scroll-spy band enough to land back on the clicked item.
  // A manual override wins immediately, then hands control back once the
  // scroll settles.
  const [override, setOverride] = useState<string | null>(null);
  const overrideTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activeId = override ?? scrollSpyId;
  const active = projects.find((project) => `proj-${project.id}` === activeId) ?? projects[0];

  const handleSelect = (id: string) => {
    setOverride(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    clearTimeout(overrideTimeout.current);
    overrideTimeout.current = setTimeout(() => setOverride(null), 800);
  };

  return (
    <div className="project-browser">
      <ul className="project-list">
        {projects.map((project) => {
          const itemId = `proj-${project.id}`;
          const isActive = activeId === itemId;
          return (
            <li key={project.id} id={itemId} className="project-list-item">
              <button
                type="button"
                className={`project-list-btn ${isActive ? "project-list-btn--active" : ""}`}
                onClick={() => handleSelect(itemId)}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-active-pill"
                    className="project-list-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="project-list-icon">
                  <project.Icon size={16} />
                </span>
                <span className="project-list-text">
                  <span className="project-list-title">{project.title}</span>
                  <span className="project-list-role">{project.role}</span>
                </span>
                <span className="project-list-year">{project.year}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="project-panel">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="project-panel-meta">
            <span className="project-panel-index">{active.index}</span>
            <span>{active.year}</span>
          </div>

          <p className="project-panel-description">{active.description}</p>

          <ul className="project-tech">
            {active.tech.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>

          <div className="project-frame glass">
            <div className="project-frame-bar">
              <span className="project-frame-dots">
                <span />
                <span />
                <span />
              </span>
              <span className="project-frame-label">
                {active.title.toLowerCase().replace(/\s+/g, "-")}
              </span>
            </div>
            <div className="project-frame-media">
              <span className="project-frame-caption">{active.image.caption}</span>
            </div>
          </div>

          <div className="project-links">
            {active.link && (
              <a href={active.link} className="project-link">
                <span>Live site</span>
                <IconArrowUpRight size={16} />
              </a>
            )}
            {active.repo && (
              <a href={active.repo} className="project-link">
                <IconGithub size={16} />
                <span>Source</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
