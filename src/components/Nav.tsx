import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { IconClose, IconDownload, IconMenu } from "./Icons";
import { navItems } from "../data/navigation";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useScrolled } from "../hooks/useScrolled";
import "./Nav.css";

const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

export default function Nav() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(navItems.map((item) => item.id));
  const scrolled = useScrolled();

  return (
    <>
      <header className={`nav-wrap ${scrolled ? "nav-wrap--scrolled" : ""}`}>
        <nav className="nav glass glass-strong" aria-label="Primary">
          <a href="#top" className="nav-mark" aria-label="Back to top">
            <Logo size={22} />
          </a>

          <ul className="nav-links" onMouseLeave={() => setHoveredId(null)}>
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="nav-link-item">
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                    onMouseEnter={() => setHoveredId(item.id)}
                  >
                    {hoveredId === item.id && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        className="nav-link-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="nav-link-icon">
                      <item.Icon size={15} />
                    </span>
                    <span className="nav-link-label">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <a href={resumeHref} download target="_blank" rel="noopener noreferrer" className="nav-resume">
            <span className="nav-resume-label">Resume</span>
            <span className="nav-resume-icon">
              <IconDownload size={15} />
            </span>
          </a>

          <button
            type="button"
            className="nav-burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile glass"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="nav-mobile-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={item.href} onClick={() => setMenuOpen(false)}>
                    <item.Icon size={18} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={resumeHref}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="nav-resume nav-resume--mobile"
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-resume-label">Download resume</span>
              <IconDownload size={16} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
