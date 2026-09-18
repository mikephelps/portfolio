import { motion } from "framer-motion";
import ScreenBrowser from "./ScreenBrowser";
import { IconArrowUpRight, IconGithub } from "./Icons";
import type { ClientProject } from "../data/projects";
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./ClientCase.css";

type ClientCaseProps = {
  project: ClientProject;
};

const headerStagger = staggerContainer(0.09);
const chipStagger = staggerContainer(0.045);

export default function ClientCase({ project }: ClientCaseProps) {
  return (
    <article className="client-case">
      <motion.div
        className="client-case-header"
        initial="hidden"
        whileInView="show"
        viewport={fadeUpViewport}
        variants={headerStagger}
      >
        <motion.div className="client-case-meta" variants={fadeUpItem}>
          <span className="client-case-icon">
            <project.Icon size={16} />
          </span>
          <span className="client-case-index">{project.index}</span>
          <span>{project.year}</span>
        </motion.div>

        <motion.h3 className="client-case-title" variants={fadeUpItem}>
          {project.title}
        </motion.h3>
        <motion.span className="client-case-role" variants={fadeUpItem}>
          {project.role}
        </motion.span>

        <motion.p className="client-case-description" variants={fadeUpItem}>
          {project.description}
        </motion.p>

        <motion.ul className="client-case-tech" variants={chipStagger}>
          {project.tech.map((tech) => (
            <motion.li key={tech} variants={fadeUpItem}>
              {tech}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="client-case-links" variants={fadeUpItem}>
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
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={fadeUpViewport}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <ScreenBrowser idPrefix={project.id} title={project.title} screens={project.screens} />
      </motion.div>
    </article>
  );
}
