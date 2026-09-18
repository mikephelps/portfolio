import { useState } from "react";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { IconArrowUpRight, IconGithub, IconLinkedin } from "../components/Icons";
import "./Contact.css";

const EMAIL = "hello@example.com";

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

      <Reveal className="contact-card glass glass-strong">
        <div className="contact-status">
          <span className="contact-status-dot" />
          Available for select freelance &amp; full-time roles
        </div>

        <p className="contact-copy">
          Have a project in mind, or just want to talk shop about the
          intersection of engineering and design? My inbox is open.
        </p>

        <div className="contact-actions">
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
        </div>
      </Reveal>
    </section>
  );
}
