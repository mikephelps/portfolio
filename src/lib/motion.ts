import type { Variants } from "framer-motion";

export const easePremium = [0.16, 1, 0.3, 1] as const;

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easePremium } },
};

export const fadeUpViewport = {
  once: true,
  margin: "-10% 0px -10% 0px",
} as const;
