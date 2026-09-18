import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <SectionHeading index="02" eyebrow="Selected work" title="Projects" />

      <div className="project-list">
        {projects.map((project, i) => (
          <ProjectCard project={project} reversed={i % 2 === 1} key={project.id} />
        ))}
      </div>
    </section>
  );
}
