import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { IconArrowUpRight, IconGithub, IconLinkedin } from "../components/Icons";
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./Contact.css";

const EMAIL = "hello@example.com";
const cardStagger = staggerContainer(0.1);

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <SectionHeading index="03" eyebrow="Contact" title="Let's build something" />

      <motion.div
        className="contact-card glass glass-strong"
        initial="hidden"
        whileInView="show"
        viewport={fadeUpViewport}
        variants={cardStagger}
      >
        <motion.div className="contact-status" variants={fadeUpItem}>
          <span className="contact-status-dot" />
          Available for select freelance &amp; full-time roles
        </motion.div>

        <motion.p className="contact-copy" variants={fadeUpItem}>
          Have a project in mind, or just want to talk shop about the
          intersection of engineering and design? My inbox is open.
        </motion.p>

        <motion.div className="contact-actions" variants={fadeUpItem}>
          <button type="button" className="contact-email" onClick={handleCopy}>
            <span>{copied ? "Copied to clipboard" : EMAIL}</span>
            <IconArrowUpRight size={18} />
          </button>

          <div className="contact-socials">
            <a href="#" aria-label="GitHub" className="contact-social">
              <IconGithub size={19} />
            </a>
            <a href="#" aria-label="LinkedIn" className="contact-social">
              <IconLinkedin size={19} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
