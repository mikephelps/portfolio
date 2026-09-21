import { motion, type Variants } from "framer-motion";
import { IconArrowUpRight } from "../components/Icons";
import { easePremium, fadeUpItem, staggerContainer } from "../lib/motion";
import HeroPortrait from "./HeroPortrait";
import HeroCarousel from "./HeroCarousel";
import "./Hero.css";
import "./HeroCarousel.css";

// Trying the 3D screenshot carousel in place of the interactive headshot.
// Flip this back to false to roll back to HeroPortrait instantly.
const USE_HERO_CAROUSEL = true;

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

      {USE_HERO_CAROUSEL ? <HeroCarousel /> : <HeroPortrait />}

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
