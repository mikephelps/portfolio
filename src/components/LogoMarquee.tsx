import niuLogo from "../assets/logos/niu.svg";
import q2Logo from "../assets/logos/q2.svg";
import northwesternLogo from "../assets/logos/northwestern.svg";
import linkedinLogo from "../assets/logos/linkedin.svg";
import visierLogo from "../assets/logos/visier.svg";
import ranaLogo from "../assets/logos/rana.svg";
import ctuLogo from "../assets/logos/ctu.svg";
import "./LogoMarquee.css";

const logos = [
  { id: "niu", name: "Northern Illinois University", src: niuLogo },
  { id: "q2", name: "Q2", src: q2Logo },
  { id: "northwestern", name: "Northwestern", src: northwesternLogo },
  { id: "linkedin", name: "LinkedIn", src: linkedinLogo },
  { id: "visier", name: "Visier", src: visierLogo },
  { id: "rana", name: "Gavin Rana", src: ranaLogo },
  { id: "ctu", name: "Colorado Technical University", src: ctuLogo },
];

export default function LogoMarquee() {
  return (
    <div className="logo-marquee" role="region" aria-label="Companies and clients I've worked with">
      <div className="logo-marquee-fade logo-marquee-fade--left" aria-hidden="true" />
      <div className="logo-marquee-fade logo-marquee-fade--right" aria-hidden="true" />
      <div className="logo-marquee-track">
        {[0, 1].map((copy) => (
          <div className="logo-marquee-set" aria-hidden={copy === 1} key={copy}>
            {logos.map((logo) => (
              <img key={`${copy}-${logo.id}`} className="logo-marquee-logo" src={logo.src} alt={logo.name} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
