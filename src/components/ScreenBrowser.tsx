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
import { ACTIVE_TRIGGER_FRACTION, useActiveIndexByPosition } from "../hooks/useActiveIndexByPosition";
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
  // Once it becomes active (by scroll or by a click jump), animate it to a
  // full, deliberate ~1.5s sweep — not an instant snap — then hand control
  // back to the scroll position once it isn't active any more.
  useEffect(() => {
    if (isActive) {
      const controls = animate(progress, 1, { duration: 1.5, ease: easePremium });
      return () => controls.stop();
    }
    // Resync immediately rather than waiting for the next scroll event —
    // otherwise an item that just went from active to inactive stays stuck
    // showing a full purple (not yet-recomputed) sweep until something
    // happens to nudge scrollYProgress again.
    progress.set(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", (v) => progress.set(v));
    return unsubscribe;
  }, [isActive, progress, scrollYProgress]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => setVisited(v >= 0.96));
    return unsubscribe;
  }, [progress]);

  const fillWidth = useTransform(progress, (v) => `${v * 100}%`);
  const isCompleted = visited && !isActive;

  return (
    <motion.li ref={ref} id={itemId} className="screen-list-item" variants={fadeUpItem}>
      <button
        type="button"
        className={`screen-list-btn ${isCompleted ? "screen-list-btn--completed" : ""}`}
        onClick={() => onSelect(itemId)}
      >
        <motion.span
          className={`screen-list-highlight ${isCompleted ? "screen-list-highlight--completed" : ""}`}
          style={{ width: fillWidth }}
        />
        <span className="screen-list-icon">
          <screen.Icon size={15} />
        </span>
        <span className="screen-list-label">{screen.label}</span>
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

  // A click wins immediately rather than waiting on the debounce. It has to
  // stay in charge until the smooth scroll it triggers actually finishes —
  // clearing on a fixed timeout let the position-based hook recompute mid
  // -scroll (still settling toward the target) and occasionally land on
  // the wrong item. `scrollend` clears it precisely; the timeout is only a
  // fallback for browsers that don't support that event.
  const [override, setOverride] = useState<string | null>(null);
  const overrideCleanup = useRef<() => void>(undefined);
  const activeId = override ?? settledSpyId;
  const active = screens.find((screen) => `${idPrefix}-${screen.id}` === activeId) ?? screens[0];

  const handleSelect = (id: string) => {
    overrideCleanup.current?.();
    setOverride(id);

    // scrollIntoView's block:"center" targets 50% of the viewport, but the
    // active-position hook's trigger line sits at ACTIVE_TRIGGER_FRACTION —
    // for a short list that mismatch can leave every item's center closer
    // to a later item than the one actually clicked once the scroll
    // settles. Scroll to the exact position that lands this item's center
    // on the trigger line instead, so it's unambiguously the closest one.
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const triggerY = window.innerHeight * ACTIVE_TRIGGER_FRACTION;
      window.scrollTo({ top: window.scrollY + (elCenter - triggerY), behavior: "smooth" });
    }

    const timeout = setTimeout(clear, 1600);
    function clear() {
      setOverride(null);
      clearTimeout(timeout);
      window.removeEventListener("scrollend", clear);
    }
    window.addEventListener("scrollend", clear);
    overrideCleanup.current = clear;
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
            transition={{ duration: 0.55, ease: easePremium }}
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
