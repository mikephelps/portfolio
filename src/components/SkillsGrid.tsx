import { motion } from "framer-motion";
import { skills } from "../data/skills";
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./SkillsGrid.css";

const gridStagger = staggerContainer(0.02, 0.1);

export default function SkillsGrid() {
  return (
    <motion.div
      className="skills-grid"
      initial="hidden"
      whileInView="show"
      viewport={fadeUpViewport}
      variants={gridStagger}
    >
      {skills.map((skill) => (
        <motion.div className="skill-tile" key={skill.name} variants={fadeUpItem}>
          <div className="skill-tile-card">
            <span className="skill-tile-face skill-tile-face--front">{skill.name}</span>
            <span
              className="skill-tile-face skill-tile-face--back"
              style={{ background: skill.color }}
            >
              {skill.category}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
