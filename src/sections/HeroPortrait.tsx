import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { easePremium } from "../lib/motion";
import portraitImg from "../assets/portrait.webp";

// How far (in px) the portrait "magnetically" shifts toward the cursor.
const SHIFT_RANGE = 14;

export default function HeroPortrait() {
  const frameRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  // A spring (not a direct 1:1 follow) is what sells "magnetic" — the
  // portrait chases the cursor with a little weight and settle, rather
  // than snapping to it.
  const shiftX = useSpring(rawX, { stiffness: 150, damping: 15, mass: 0.4 });
  const shiftY = useSpring(rawY, { stiffness: 150, damping: 15, mass: 0.4 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (event.clientX - rect.left) / rect.width;
    const relY = (event.clientY - rect.top) / rect.height;
    rawX.set((relX - 0.5) * SHIFT_RANGE);
    rawY.set((relY - 0.5) * SHIFT_RANGE);
    // The spotlight mask reads these directly off the DOM (no React state)
    // so it can track every pointer event at full precision.
    el.style.setProperty("--spot-x", `${relX * 100}%`);
    el.style.setProperty("--spot-y", `${relY * 100}%`);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      className="hero-portrait"
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: easePremium }}
    >
      <div
        ref={frameRef}
        className="hero-portrait-frame"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div className="hero-portrait-shift" style={{ x: shiftX, y: shiftY }}>
          <img src={portraitImg} alt="Portrait of Mike Phelps" className="hero-portrait-img" />
          <img src={portraitImg} alt="" aria-hidden="true" className="hero-portrait-img hero-portrait-img--bright" />
        </motion.div>
        <div className="hero-portrait-overlay" aria-hidden="true" />
      </div>
      {/* Comes after the frame in the DOM (z-index:-1 keeps it rendering
          behind) so a plain sibling selector can bloom it on frame hover,
          no extra hover-state JS needed. */}
      <div className="hero-portrait-glow" aria-hidden="true" />
    </motion.div>
  );
}
