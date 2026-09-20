import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconClose } from "./Icons";
import { easePremium } from "../lib/motion";
import "./RoleDetailsDrawer.css";

type RoleDetailsDrawerProps = {
  isOpen: boolean;
  title: string;
  role: string;
  paragraphs: string[];
  onClose: () => void;
};

// How close to the bottom (in px) counts as "there", so the fade doesn't
// linger over the last pixel or two of scroll slack.
const BOTTOM_THRESHOLD = 24;

// A right-attached drawer for the fuller narrative behind a role — the tech
// chips and one-line description up top only ever summarize. Blurs the page
// behind it (same --blur-frost treatment as the project screenshots' hover
// panel) rather than just dimming, so the drawer reads as sitting on top of
// the page instead of a totally separate layer.
export default function RoleDetailsDrawer({ isOpen, title, role, paragraphs, onClose }: RoleDetailsDrawerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Whether there's more content below the fold right now — recomputed on
  // every scroll and on resize, since "at the bottom" depends on the
  // panel's actual height, which changes with viewport size. Starts false
  // so a short paragraph list never flashes a fade it doesn't need before
  // the first measurement runs.
  const [hasMoreBelow, setHasMoreBelow] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (!el) return;

    const updateFade = () => {
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
      setHasMoreBelow(distanceFromBottom > BOTTOM_THRESHOLD);
    };

    updateFade();
    el.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);
    return () => {
      el.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [isOpen, paragraphs]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="role-drawer-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} role details`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: easePremium }}
          onClick={onClose}
        >
          <motion.div
            className="role-drawer-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: easePremium }}
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="role-drawer-close" onClick={onClose} aria-label="Close role details">
              <IconClose size={18} />
            </button>
            <div className="role-drawer-scroll" ref={scrollRef}>
              <div className="role-drawer-body">
                <span className="eyebrow role-drawer-eyebrow">Role Notes</span>
                <h3 className="role-drawer-title">{title}</h3>
                <span className="role-drawer-role">{role}</span>
                {paragraphs.map((paragraph, index) => (
                  <p className="role-drawer-paragraph" key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className={`role-drawer-fade ${hasMoreBelow ? "role-drawer-fade--visible" : ""}`} aria-hidden="true" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
