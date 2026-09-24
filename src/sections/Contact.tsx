import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { IconArrowUpRight, IconLinkedin } from "../components/Icons";
// IconGithub import removed along with the commented-out GitHub link below —
// re-add both if the icon comes back.
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./Contact.css";

// Stored reversed so the real address never sits as a contiguous literal
// anywhere — not in the rendered DOM text (flipped back to normal reading
// order by .contact-email-text's CSS bidi-override below) and not in the
// built JS bundle (a minifier can constant-fold a template literal built
// from string parts, but not a runtime split/reverse/join). Only
// reassembled in memory when actually needed for clipboard/mailto.
const EMAIL_REVERSED = "moc.liamg@splehpeekim";
const EMAIL = EMAIL_REVERSED.split("").reverse().join("");
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
          <button
            type="button"
            className="contact-email"
            onClick={handleCopy}
            aria-label={copied ? "Email copied to clipboard" : "Copy email address to clipboard"}
          >
            {copied ? (
              <span>Copied to clipboard</span>
            ) : (
              <span className="contact-email-text" aria-hidden="true">
                {EMAIL_REVERSED}
              </span>
            )}
            <IconArrowUpRight size={18} />
          </button>

          <div className="contact-socials">
            {/* Commented out for now, may add back later.
            <a href="#" aria-label="GitHub" className="contact-social">
              <IconGithub size={19} />
            </a>
            */}
            <a
              href="https://www.linkedin.com/in/mikephelps/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="contact-social"
            >
              <IconLinkedin size={19} />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
