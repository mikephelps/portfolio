import { motion, type Variants } from "framer-motion";
import { IconArrowUpRight } from "../components/Icons";
import "./Hero.css";

const headline = ["Mike", "Phelps"];

const premiumEase = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const lineVariant: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 1.1, ease: premiumEase },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } },
};

export default function Hero() {
  return (
    <section id="top" className="hero">
      <motion.div
        className="hero-inner"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.span className="eyebrow hero-eyebrow" variants={fadeUp}>
          Developer &amp; Designer
        </motion.span>

        <h1 className="hero-title">
          {headline.map((word) => (
            <span className="hero-title-line" key={word}>
              <motion.span className="hero-title-word" variants={lineVariant}>
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p className="hero-sub" variants={fadeUp}>
          I build fast, considered products — where clean engineering and
          careful visual craft are the same discipline, not two separate jobs.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUp}>
          <a href="#projects" className="hero-cta hero-cta--primary">
            <span>View projects</span>
            <IconArrowUpRight size={17} />
          </a>
          <a href="#contact" className="hero-cta hero-cta--ghost">
            <span>Get in touch</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="hero-scroll-cue"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="hero-scroll-track">
          <span className="hero-scroll-dot" />
        </span>
        <span className="hero-scroll-label">Scroll</span>
      </motion.a>
    </section>
  );
}
