import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Logo from "../components/Logo";
import SkillsGrid from "../components/SkillsGrid";
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./About.css";

const stats = [
  { value: "15+", label: "Years in web design & strategy" },
  { value: "30+", label: "Shipped products" },
  { value: "2", label: "Disciplines, one craft" },
];

const rowStagger = staggerContainer(0.08);

export default function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading index="01" eyebrow="About" title="Design led, code fluent" />

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
              I'm a lead UX designer who still writes code — someone who
              cares as much about the research behind a flow as the easing
              curve on the transition that ships it.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="about-body">
              My work spans web and product strategy, interaction design, and
              the design systems that hold it together, and I partner closely
              with engineering so what ships matches the intent — prototyping
              in code, handing off systems that hold up under real
              constraints, and building the thing myself when that's faster
              than the round trip.
            </p>
          </Reveal>

          <motion.div
            className="about-stats"
            initial="hidden"
            whileInView="show"
            viewport={fadeUpViewport}
            variants={rowStagger}
          >
            {stats.map((stat) => (
              <motion.div className="about-stat" key={stat.label} variants={fadeUpItem}>
                <span className="about-stat-value">{stat.value}</span>
                <span className="about-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="about-skills">
        <Reveal>
          <span className="eyebrow about-skills-eyebrow">Skills &amp; tools</span>
        </Reveal>
        <SkillsGrid />
      </div>
    </section>
  );
}
