import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Screen } from "../data/projects";
import { useScrollSpy } from "../hooks/useScrollSpy";
import "./ScreenBrowser.css";

type ScreenBrowserProps = {
  idPrefix: string;
  title: string;
  screens: Screen[];
};

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
      <ul className="screen-list">
        {screens.map((screen) => {
          const itemId = `${idPrefix}-${screen.id}`;
          const isActive = activeId === itemId;
          return (
            <li key={screen.id} id={itemId} className="screen-list-item">
              <button
                type="button"
                className={`screen-list-btn ${isActive ? "screen-list-btn--active" : ""}`}
                onClick={() => handleSelect(itemId)}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${idPrefix}-active-pill`}
                    className="screen-list-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="screen-list-dot" />
                <span className="screen-list-label">{screen.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="screen-panel">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
