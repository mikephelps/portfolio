import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconClose } from "./Icons";
import type { ScreenMedia } from "../data/projects";
import { easePremium } from "../lib/motion";
import "./ImageLightbox.css";

type ImageLightboxProps = {
  media: ScreenMedia | null;
  alt: string;
  onClose: () => void;
};

// Enlarges whatever screen image/video is passed in, full-viewport, until
// dismissed. media is null when nothing is zoomed — AnimatePresence handles
// the mount/unmount so this can just live rendered-but-empty in the tree.
export default function ImageLightbox({ media, alt, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (!media) return;
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
  }, [media, onClose]);

  return (
    <AnimatePresence>
      {media && (
        <motion.div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easePremium }}
          onClick={onClose}
        >
          <motion.div
            className="image-lightbox-frame"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: easePremium }}
            onClick={(event) => event.stopPropagation()}
          >
            {media.type === "video" ? (
              <video className="image-lightbox-media" src={media.src} autoPlay loop muted playsInline controls />
            ) : (
              <img className="image-lightbox-media" src={media.src} alt={alt} />
            )}
          </motion.div>
          <button type="button" className="image-lightbox-close" onClick={onClose} aria-label="Close enlarged image">
            <IconClose size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
