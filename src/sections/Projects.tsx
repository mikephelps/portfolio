import SectionHeading from "../components/SectionHeading";
import ClientCase from "../components/ClientCase";
import { clientProjects } from "../data/projects";
import "./Projects.css";

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <SectionHeading index="02" eyebrow="Selected work" title="Projects" />

      <div className="client-case-list">
        {clientProjects.map((project) => (
          <ClientCase key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
