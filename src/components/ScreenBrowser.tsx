import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Screen } from "../data/projects";
import { useActiveIndexByPosition } from "../hooks/useActiveIndexByPosition";
import { easePremium, fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./ScreenBrowser.css";

const listStagger = staggerContainer(0.07);

type ScreenBrowserProps = {
  idPrefix: string;
  title: string;
  screens: Screen[];
};

type ScreenListItemProps = {
  screen: Screen;
  itemId: string;
  isActive: boolean;
  onSelect: (id: string) => void;
};

function ScreenListItem({ screen, itemId, isActive, onSelect }: ScreenListItemProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.65"] });
  const progress = useMotionValue(0);
  const [visited, setVisited] = useState(false);

  // Width tracks the real scroll position while this item isn't the active
  // one — that's the "highlighter sweeping across as you scroll" effect.
  // Once it becomes active (by scroll or by a click jump), spring it to a
  // full sweep so the highlight always reads as complete for the current
  // item, then hand control back to the scroll position when it isn't.
  useEffect(() => {
    if (isActive) {
      const controls = animate(progress, 1, { type: "spring", stiffness: 300, damping: 32 });
      return () => controls.stop();
    }
    const unsubscribe = scrollYProgress.on("change", (v) => progress.set(v));
    return unsubscribe;
  }, [isActive, progress, scrollYProgress]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => setVisited(v >= 0.96));
    return unsubscribe;
  }, [progress]);

  const fillWidth = useTransform(progress, (v) => `${v * 100}%`);
  // The lit-up copy of the label is clipped to exactly the swept width, so
  // the text itself brightens left-to-right in sync with the highlighter
  // bar underneath it, instead of snapping bright the instant it's active.
  const labelClip = useTransform(progress, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`);
  const isCompleted = visited && !isActive;

  return (
    <motion.li ref={ref} id={itemId} className="screen-list-item" variants={fadeUpItem}>
      <button
        type="button"
        className={`screen-list-btn ${isActive ? "screen-list-btn--active" : ""} ${
          isCompleted ? "screen-list-btn--completed" : ""
        }`}
        onClick={() => onSelect(itemId)}
      >
        <motion.span
          className={`screen-list-highlight ${isCompleted ? "screen-list-highlight--completed" : ""}`}
          style={{ width: fillWidth }}
        />
        <span className="screen-list-icon">
          <screen.Icon size={15} />
        </span>
        <span className="screen-list-label-wrap">
          <span className="screen-list-label">{screen.label}</span>
          <motion.span className="screen-list-label screen-list-label--lit" style={{ clipPath: labelClip }}>
            {screen.label}
          </motion.span>
        </span>
      </button>
    </motion.li>
  );
}

export default function ScreenBrowser({ idPrefix, title, screens }: ScreenBrowserProps) {
  const ids = screens.map((screen) => `${idPrefix}-${screen.id}`);
  const activeIndex = useActiveIndexByPosition(ids);
  const scrollSpyId = ids[activeIndex];

  // A fast scroll ticks the position-based index quickly as it passes
  // several items; settling the value before it drives the (expensive,
  // image-swapping) panel keeps that from ever flashing through them.
  const [settledSpyId, setSettledSpyId] = useState(scrollSpyId);
  useEffect(() => {
    const timeout = setTimeout(() => setSettledSpyId(scrollSpyId), 140);
    return () => clearTimeout(timeout);
  }, [scrollSpyId]);

  // A click still wins immediately rather than waiting on the debounce or
  // on the scroll it triggers to settle.
  const [override, setOverride] = useState<string | null>(null);
  const overrideTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activeId = override ?? settledSpyId;
  const active = screens.find((screen) => `${idPrefix}-${screen.id}` === activeId) ?? screens[0];

  const handleSelect = (id: string) => {
    setOverride(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    clearTimeout(overrideTimeout.current);
    overrideTimeout.current = setTimeout(() => setOverride(null), 800);
  };

  return (
    <div className="screen-browser">
      <motion.ul
        className="screen-list"
        initial="hidden"
        whileInView="show"
        viewport={fadeUpViewport}
        variants={listStagger}
      >
        {screens.map((screen) => {
          const itemId = `${idPrefix}-${screen.id}`;
          return (
            <ScreenListItem
              key={screen.id}
              screen={screen}
              itemId={itemId}
              isActive={activeId === itemId}
              onSelect={handleSelect}
            />
          );
        })}
      </motion.ul>

      <div className="screen-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: easePremium }}
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
  );
}
