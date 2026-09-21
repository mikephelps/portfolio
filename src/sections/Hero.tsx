import { motion, type Variants } from "framer-motion";
import { IconArrowUpRight } from "../components/Icons";
import { easePremium, fadeUpItem, staggerContainer } from "../lib/motion";
import heroPortraitImg from "../assets/hero-portrait.webp";
import "./Hero.css";

const headline = ["Mike", "Phelps"];

const container = staggerContainer(0.09, 0.15);

const lineVariant: Variants = {
  hidden: { y: "115%" },
  show: {
    y: "0%",
    transition: { duration: 1.1, ease: easePremium },
  },
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
        <motion.span className="eyebrow hero-eyebrow" variants={fadeUpItem}>
          Lead UX Designer
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

        <motion.p className="hero-sub" variants={fadeUpItem}>
          I lead end-to-end web & product design, do the research, build
          systems with interface craft, and build the front end myself when
          it counts, so nothing gets lost in translation.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUpItem}>
          <a href="#projects" className="hero-cta hero-cta--primary">
            <span>View projects</span>
            <IconArrowUpRight size={17} />
          </a>
          <a href="#contact" className="hero-cta hero-cta--ghost">
            <span>Get in touch</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-portrait glass"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: easePremium }}
      >
        <img src={heroPortraitImg} alt="Portrait of Mike Phelps" className="hero-portrait-photo" />
        <div className="hero-portrait-glow" aria-hidden="true" />
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
