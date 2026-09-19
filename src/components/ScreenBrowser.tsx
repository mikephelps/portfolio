import { AnimatePresence, motion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { Screen } from "../data/projects";
import ScreenFrameMedia from "./ScreenFrameMedia";
import { easePremium, fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./ScreenBrowser.css";

const listStagger = staggerContainer(0.07);

type ScreenBrowserProps = {
  idPrefix: string;
  title: string;
  screens: Screen[];
  rawIndex: MotionValue<number>;
  activeIndex: number;
  onSelect: (index: number) => void;
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

export default function ScreenBrowser({ idPrefix, title, screens, rawIndex, activeIndex, onSelect }: ScreenBrowserProps) {
  const active = screens[activeIndex] ?? screens[0];

  return (
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
            onSelect={() => onSelect(index)}
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
                {title
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, "")
                  .trim()
                  .replace(/\s+/g, "-")}
                /{active.id}
              </span>
            </div>
            <div className="screen-frame-media">
              <ScreenFrameMedia screen={active} />
              {active.description && (
                <div className="screen-context-panel">
                  <div className="screen-context-inner">
                    <span className="eyebrow screen-context-eyebrow">Project Details</span>
                    <p className="screen-context-text">{active.description}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
