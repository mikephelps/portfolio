import { useEffect } from "react";
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

// A right-attached drawer for the fuller narrative behind a role — the tech
// chips and one-line description up top only ever summarize. Blurs the page
// behind it (same --blur-frost treatment as the project screenshots' hover
// panel) rather than just dimming, so the drawer reads as sitting on top of
// the page instead of a totally separate layer.
export default function RoleDetailsDrawer({ isOpen, title, role, paragraphs, onClose }: RoleDetailsDrawerProps) {
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
