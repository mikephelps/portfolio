import Logo from "./Logo";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <a href="#top" className="footer-mark" aria-label="Back to top">
        <Logo size={20} />
      </a>
      <p className="footer-copy">&copy; {year} — Built with React, Three.js &amp; care.</p>
      <a href="#top" className="footer-top">
        Back to top
      </a>
    </footer>
  );
}
