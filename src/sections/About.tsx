import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Logo from "../components/Logo";
import { skillGroups } from "../data/skills";
import "./About.css";

const stats = [
  { value: "7+", label: "Years building products" },
  { value: "30+", label: "Shipped projects" },
  { value: "2", label: "Disciplines, one craft" },
];

export default function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading index="01" eyebrow="About" title="Where code meets craft" />

      <div className="about-grid">
        <Reveal className="about-portrait glass" delay={0.05}>
          <div className="about-portrait-mark">
            <Logo size={72} />
          </div>
          <div className="about-portrait-glow" aria-hidden="true" />
        </Reveal>

        <div className="about-content">
          <Reveal delay={0.1}>
            <p className="about-lede">
              I'm a developer with a designer's eye — someone who cares as
              much about the easing curve on a hover state as the query plan
              behind the API it calls.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="about-body">
              My work sits at the intersection of engineering rigor and
              visual polish. I've spent years shipping production systems
              and just as many hours obsessing over type scales, motion
              timing, and the small details that make an interface feel
              premium rather than merely functional. I like building things
              end to end — from data model to the last pixel of easing.
            </p>
          </Reveal>

          <Reveal delay={0.24} className="about-stats">
            {stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1} className="about-skills">
        {skillGroups.map((group) => (
          <div className="about-skill-group glass" key={group.label}>
            <span className="about-skill-group-label">{group.label}</span>
            <ul className="about-skill-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
