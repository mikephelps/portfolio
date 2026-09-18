import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Screen } from "../data/projects";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
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
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <motion.li ref={ref} id={itemId} className="screen-list-item" variants={fadeUpItem}>
      <button
        type="button"
        className={`screen-list-btn ${isActive ? "screen-list-btn--active" : ""}`}
        onClick={() => onSelect(itemId)}
      >
        <motion.span className="screen-list-fill" style={{ width: fillWidth }} />
        {isActive && (
          <motion.span
            layoutId="screen-active-pill"
            className="screen-list-pill"
            transition={{ type: "spring", stiffness: 380, damping: 34 }}
          />
        )}
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
  const scrollSpyId = useScrollSpy(ids, {
    rootMargin: "-38% 0px -42% 0px",
    threshold: [0, 0.5, 1],
  });

  // A short list doesn't always shift the scroll-spy band enough for a
  // click to land back on the clicked item, so a manual override wins
  // immediately and hands control back once the scroll settles.
  const [override, setOverride] = useState<string | null>(null);
  const overrideTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const activeId = override ?? scrollSpyId;
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
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
      </div>
    </div>
  );
}
