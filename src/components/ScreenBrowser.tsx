import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import type { Screen } from "../data/projects";
import { easePremium, fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./ScreenBrowser.css";

const listStagger = staggerContainer(0.07);

// Where in the viewport a zone "activates" — the same fraction is used by
// both the passive scroll listener and the click handler's scroll target,
// so the two can never disagree about which zone is current.
const TRIGGER_FRACTION = 0.5;

type ScreenBrowserProps = {
  idPrefix: string;
  title: string;
  screens: Screen[];
};

type ItemState = "upcoming" | "active" | "completed";

type ScreenListItemProps = {
  screen: Screen;
  itemId: string;
  state: ItemState;
  onSelect: () => void;
};

function ScreenListItem({ screen, itemId, state, onSelect }: ScreenListItemProps) {
  const width = useMotionValue(state === "completed" ? 1 : 0);

  // The active item always plays the same deliberate ~1.5s sweep, entirely
  // decoupled from how fast the user scrolled to reach it. Anything else
  // just snaps to its resting value (full gray once passed, invisible
  // until reached) — no continuous scroll-tracking, no partial states to
  // get stuck.
  useEffect(() => {
    if (state === "active") {
      const controls = animate(width, 1, { duration: 1.5, ease: easePremium });
      return () => controls.stop();
    }
    width.set(state === "completed" ? 1 : 0);
  }, [state, width]);

  const fillWidth = useTransform(width, (v) => `${v * 100}%`);

  return (
    <motion.li id={itemId} className="screen-zone" variants={fadeUpItem}>
      <button type="button" className="screen-zone-hit" onClick={onSelect}>
        <span className={`screen-list-row ${state === "completed" ? "screen-list-row--completed" : ""}`}>
          <motion.span
            className={`screen-list-highlight ${state === "completed" ? "screen-list-highlight--completed" : ""}`}
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
  const zonesRef = useRef<HTMLUListElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [override, setOverride] = useState<number | null>(null);
  // Mirrors `override` but updates synchronously at click-time, independent
  // of React's render/commit cycle. The scroll listener reads this ref
  // (never the closed-over `override` state) so there is no window, however
  // brief, where a stale listener still sees the pre-click value and lets a
  // scroll event sneak in a transient scrollIndex update that flips the
  // active item's state and resets its in-flight sweep animation.
  const overrideRef = useRef<number | null>(null);
  const overrideCleanup = useRef<() => void>(undefined);

  // Measures the rendered zone height straight off the DOM (so it always
  // matches whatever the CSS actually sets, including the mobile
  // breakpoint) and derives a single index from it. Used both by the
  // passive scroll listener and to resync immediately once a click-jump's
  // override clears — scrolling has already stopped by then, so no future
  // "scroll" event exists to do that resync for us.
  const measureIndex = () => {
    const el = zonesRef.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const zoneHeight = rect.height / screens.length;
    const triggerY = window.innerHeight * TRIGGER_FRACTION;
    const relative = triggerY - rect.top;
    return Math.min(screens.length - 1, Math.max(0, Math.floor(relative / zoneHeight)));
  };

  // One scroll listener for the whole zone stack instead of N independent
  // per-item trackers.
  useEffect(() => {
    const handle = () => {
      if (overrideRef.current !== null) return;
      setScrollIndex(measureIndex());
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screens.length]);

  const activeIndex = override ?? scrollIndex;
  const active = screens[activeIndex] ?? screens[0];

  const handleSelect = (index: number) => {
    overrideCleanup.current?.();
    overrideRef.current = index;
    setOverride(index);

    const el = zonesRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const zoneHeight = rect.height / screens.length;
      const targetCenter = rect.top + index * zoneHeight + zoneHeight / 2;
      const triggerY = window.innerHeight * TRIGGER_FRACTION;
      window.scrollTo({ top: window.scrollY + (targetCenter - triggerY), behavior: "smooth" });
    }

    const timeout = setTimeout(clear, 1600);
    function clear() {
      overrideRef.current = null;
      setOverride(null);
      setScrollIndex(measureIndex());
      clearTimeout(timeout);
      window.removeEventListener("scrollend", clear);
    }
    window.addEventListener("scrollend", clear);
    overrideCleanup.current = clear;
  };

  return (
    <div className="screen-browser">
      <motion.ul
        ref={zonesRef}
        className="screen-list"
        initial="hidden"
        whileInView="show"
        viewport={fadeUpViewport}
        variants={listStagger}
      >
        {screens.map((screen, index) => {
          const state: ItemState =
            index < activeIndex ? "completed" : index === activeIndex ? "active" : "upcoming";
          return (
            <ScreenListItem
              key={screen.id}
              screen={screen}
              itemId={`${idPrefix}-${screen.id}`}
              state={state}
              onSelect={() => handleSelect(index)}
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
  );
}
