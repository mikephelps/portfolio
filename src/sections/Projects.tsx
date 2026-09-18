import SectionHeading from "../components/SectionHeading";
import ProjectBrowser from "../components/ProjectBrowser";

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <SectionHeading index="02" eyebrow="Selected work" title="Projects" />
      <ProjectBrowser />
    </section>
  );
}
