import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { skills, type Skill } from "../data/skills";
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./SkillsGrid.css";

const gridStagger = staggerContainer(0.02, 0.1);

// One-time reveal: each chip first appears already flipped to its colorful
// category side, holds there, then flips to its real name — after which it
// falls back to the plain hover-flip chip. Driven with plain CSS transitions
// (not Framer Motion's rotateX tweening), because Motion's own 3D transform
// handling doesn't compose with the backface-visibility trick the same way
// a CSS `transform` change does — verified: the hover flip works perfectly,
// a Motion-tweened rotateX on the same markup showed the front face's
// backface leaking through, mirrored.
const REVEAL_FADE_MS = 350;
const REVEAL_HOLD_MS = 1000;
const REVEAL_FLIP_MS = 500;
// Gap between each chip's reveal start, applied in shuffled order below —
// this is what makes chips resolve in a scattered order rather than
// sweeping left-to-right/top-to-bottom.
const REVEAL_STAGGER_STEP_MS = 35;

function shuffledOrder(count: number) {
  const order = Array.from({ length: count }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

type RevealChipProps = {
  skill: Skill;
  delayMs: number;
  introStarted: boolean;
  onRevealed: () => void;
};

function RevealChip({ skill, delayMs, introStarted, onRevealed }: RevealChipProps) {
  const [phase, setPhase] = useState<"pending" | "visible" | "flipping">("pending");

  useEffect(() => {
    if (!introStarted) return;
    const toVisible = setTimeout(() => setPhase("visible"), delayMs);
    const toFlipping = setTimeout(() => setPhase("flipping"), delayMs + REVEAL_FADE_MS + REVEAL_HOLD_MS);
    const toRevealed = setTimeout(
      onRevealed,
      delayMs + REVEAL_FADE_MS + REVEAL_HOLD_MS + REVEAL_FLIP_MS,
    );
    return () => {
      clearTimeout(toVisible);
      clearTimeout(toFlipping);
      clearTimeout(toRevealed);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introStarted]);

  const style: CSSProperties = {
    opacity: phase === "pending" ? 0 : 1,
    transform: `rotateX(${phase === "flipping" ? 0 : -180}deg)`,
    pointerEvents: "none",
  };

  return (
    <div className="skill-tile-card skill-tile-card--reveal" style={style}>
      <span className="skill-tile-face skill-tile-face--front">{skill.name}</span>
      <span className="skill-tile-face skill-tile-face--back" style={{ background: skill.color }}>
        {skill.category}
      </span>
    </div>
  );
}

export default function SkillsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  // once:true — this plays the very first time the section is scrolled
  // into view and never again for the life of the page.
  const introStarted = useInView(gridRef, { once: true, margin: "-10% 0px -10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const revealOrder = useMemo(() => shuffledOrder(skills.length), []);
  const [revealed, setRevealed] = useState<boolean[]>(() => skills.map(() => Boolean(prefersReducedMotion)));

  const markRevealed = (index: number) => {
    setRevealed((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <motion.div
      className="skills-grid"
      ref={gridRef}
      initial="hidden"
      whileInView="show"
      viewport={fadeUpViewport}
      variants={gridStagger}
    >
      {skills.map((skill, index) => (
        <motion.div className="skill-tile" key={skill.name} variants={fadeUpItem}>
          {revealed[index] ? (
            <div className="skill-tile-card">
              <span className="skill-tile-face skill-tile-face--front">{skill.name}</span>
              <span className="skill-tile-face skill-tile-face--back" style={{ background: skill.color }}>
                {skill.category}
              </span>
            </div>
          ) : (
            <RevealChip
              skill={skill}
              delayMs={revealOrder[index] * REVEAL_STAGGER_STEP_MS}
              introStarted={introStarted}
              onRevealed={() => markRevealed(index)}
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
