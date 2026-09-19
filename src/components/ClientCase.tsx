import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import ScreenBrowser from "./ScreenBrowser";
import { IconArrowUpRight, IconGithub } from "./Icons";
import type { ClientProject } from "../data/projects";
import { easePremium, fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./ClientCase.css";

type ClientCaseProps = {
  project: ClientProject;
};

const headerStagger = staggerContainer(0.09);
const chipStagger = staggerContainer(0.045);

// How much extra scroll distance (in viewport-heights) each screen gets
// while the case is pinned. Larger = a slower, more deliberate scrub
// through the screens before the page is allowed to continue scrolling.
const VH_PER_SCREEN = 90;

// Pinning (scroll-jacking) a whole card is a desktop pattern — on a phone
// there usually isn't room for header + tech chips + a 4-item list + panel
// to all fit on-screen at once no matter how compact, and stacking that
// tall content inside a hidden spacer without pinning it would just leave
// a dead scroll gap. So on narrow viewports the case renders in normal
// flow (no spacer, no sticky) and the highlight still tracks scroll — just
// over the content's own natural height instead of a held scrub zone.
function useCompactLayout() {
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 860px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const handler = () => setCompact(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return compact;
}

export default function ClientCase({ project }: ClientCaseProps) {
  // The whole case — header, tech chips, links, and the screen browser —
  // pins together via CSS position:sticky inside this tall spacer, so none
  // of that context (which client, what it was, its stack) disappears
  // while scrubbing through the screens. scrollYProgress is measured
  // against the spacer itself, not the pinned content (which never moves
  // while stuck), and drives every screen's fill directly.
  const compact = useCompactLayout();
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end end"],
  });
  const rawIndexScroll = useTransform(scrollYProgress, (p) => p * project.screens.length);
  // Compact/mobile has no pin and no held scrub zone to derive a scroll
  // fraction from, so the highlight there is driven directly by taps
  // instead — this motion value is just animated to the tapped index.
  const rawIndexManual = useMotionValue(0);
  const rawIndex = compact ? rawIndexManual : rawIndexScroll;

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(rawIndex, "change", (v) => {
    setActiveIndex(Math.min(project.screens.length - 1, Math.max(0, Math.floor(v))));
  });

  const handleSelect = (index: number) => {
    if (compact) {
      // Land just under the next integer so this item reads as "active"
      // (fully filled) rather than "completed" (which needs activeIndex
      // to have advanced past it) — see the isCompleted check below.
      animate(rawIndexManual, index + 0.999, { duration: 0.6, ease: easePremium });
      return;
    }
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const frameTop = rect.top + window.scrollY;
    const scrollRange = el.offsetHeight - window.innerHeight;
    const desiredProgress = (index + 0.5) / project.screens.length;
    window.scrollTo({ top: frameTop + desiredProgress * scrollRange, behavior: "smooth" });
  };

  return (
    <article
      ref={frameRef}
      className="client-case-frame"
      style={compact ? undefined : { height: `calc(100vh + ${project.screens.length * VH_PER_SCREEN}vh)` }}
    >
      <div className="client-case-sticky">
        <div className="client-case">
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

          <ScreenBrowser
            idPrefix={project.id}
            title={project.title}
            screens={project.screens}
            rawIndex={rawIndex}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        </div>
      </div>
    </article>
  );
}
