import roboroPricingImg from "../assets/carousel/roboro-pricing.webp";
import roboroStatesImg from "../assets/carousel/roboro-states.webp";
import linkedinTokensImg from "../assets/carousel/linkedin-color-tokens.webp";
import atlanticCardsImg from "../assets/carousel/atlantic-cards.webp";
import sharedBeginningsImg from "../assets/carousel/shared-beginnings-hero.webp";
import visierResignationImg from "../assets/carousel/visier-resignation-risk.webp";

const tiles = [
  roboroPricingImg,
  roboroStatesImg,
  linkedinTokensImg,
  atlanticCardsImg,
  sharedBeginningsImg,
  visierResignationImg,
];

export default function HeroCarousel() {
  return (
    <div className="hero-carousel" aria-hidden="true">
      <div className="hero-carousel-glow" />
      <div className="hero-carousel-viewport">
        <div className="hero-carousel-tilt">
          <div className="hero-carousel-ring">
            {tiles.map((src, index) => (
              <div
                className="hc-orbit-position"
                key={src}
                style={{ ["--angle" as string]: `${index * 60}deg` }}
              >
                <div className="hc-orbit-face">
                  <div className="hc-tile">
                    <img src={src} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
