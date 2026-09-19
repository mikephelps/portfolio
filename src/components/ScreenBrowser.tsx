import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Screen } from "../data/projects";
import { easePremium, fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./ScreenBrowser.css";

const listStagger = staggerContainer(0.07);

// How much extra scroll distance (in viewport-heights) each screen gets
// while the browser is pinned in place. Larger = a slower, more deliberate
// scrub through the screens before the page is allowed to continue scrolling.
const VH_PER_SCREEN = 90;

type ScreenBrowserProps = {
  idPrefix: string;
  title: string;
  screens: Screen[];
};

type ScreenListItemProps = {
  screen: Screen;
  itemId: string;
  index: number;
  rawIndex: MotionValue<number>;
  isCompleted: boolean;
  onSelect: () => void;
};

function ScreenListItem({ screen, itemId, index, rawIndex, isCompleted, onSelect }: ScreenListItemProps) {
  // The fill is a direct, continuous transform of scroll position — not a
  // tween, not a discrete state. It grows and shrinks in lockstep with the
  // user's own scroll, in either direction, with zero handoff logic.
  const fillWidth = useTransform(rawIndex, (v) => `${Math.min(1, Math.max(0, v - index)) * 100}%`);

  return (
    <motion.li id={itemId} className="screen-zone" variants={fadeUpItem}>
      <button type="button" className="screen-zone-hit" onClick={onSelect}>
        <span className={`screen-list-row ${isCompleted ? "screen-list-row--completed" : ""}`}>
          <motion.span
            className={`screen-list-highlight ${isCompleted ? "screen-list-highlight--completed" : ""}`}
            style={{ width: fillWidth }}
          />
          <span className="screen-list-icon">
            <screen.Icon size={15} />
          </span>
          <span className="screen-list-label">{screen.label}</span>
        </span>
      </button>
    </motion.li>
  );
}

export default function ScreenBrowser({ idPrefix, title, screens }: ScreenBrowserProps) {
  // The frame is a tall spacer; the browser itself sits inside it pinned via
  // `position: sticky`. Scrolling through the frame's extra height holds the
  // browser in place — CSS handles the pin/release for free — while
  // scrollYProgress (measured against the frame, not the sticky content,
  // since the content itself never moves) drives every item's fill. The
  // page is only released to scroll further once the frame's bottom — i.e.
  // the last screen's fill reaching 100% — comes up to the viewport bottom.
  const frameRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end end"],
  });
  const rawIndex = useTransform(scrollYProgress, (p) => p * screens.length);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(rawIndex, "change", (v) => {
    setActiveIndex(Math.min(screens.length - 1, Math.max(0, Math.floor(v))));
  });

  const active = screens[activeIndex] ?? screens[0];

  const handleSelect = (index: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const frameTop = rect.top + window.scrollY;
    const scrollRange = el.offsetHeight - window.innerHeight;
    const desiredProgress = (index + 0.5) / screens.length;
    window.scrollTo({ top: frameTop + desiredProgress * scrollRange, behavior: "smooth" });
  };

  return (
    <div
      ref={frameRef}
      className="screen-browser-frame"
      style={{ height: `calc(100vh + ${screens.length * VH_PER_SCREEN}vh)` }}
    >
      <div className="screen-browser-sticky">
        <div className="screen-browser">
          <motion.ul
            className="screen-list"
            initial="hidden"
            whileInView="show"
            viewport={fadeUpViewport}
            variants={listStagger}
          >
            {screens.map((screen, index) => (
              <ScreenListItem
                key={screen.id}
                screen={screen}
                itemId={`${idPrefix}-${screen.id}`}
                index={index}
                rawIndex={rawIndex}
                isCompleted={index < activeIndex}
                onSelect={() => handleSelect(index)}
              />
            ))}
          </motion.ul>

          <div className="screen-panel">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: easePremium }}
                className="screen-frame glass"
              >
                <div className="screen-frame-bar">
                  <span className="screen-frame-dots">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="screen-frame-label">
                    {title.toLowerCase().replace(/\s+/g, "-")}/{active.id}
                  </span>
                </div>
                <div className="screen-frame-media">
                  <span className="screen-frame-caption">{active.label}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
