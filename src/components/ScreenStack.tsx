import { useState } from "react";
import { motion } from "framer-motion";
import type { Screen } from "../data/projects";
import ScreenFrameMedia from "./ScreenFrameMedia";
import ImageLightbox from "./ImageLightbox";
import { IconSearch } from "./Icons";
import { fadeUpItem, fadeUpViewport, staggerContainer } from "../lib/motion";
import "./ScreenStack.css";

const stackStagger = staggerContainer(0.08);

type ScreenStackProps = {
  idPrefix: string;
  screens: Screen[];
};

// The mobile counterpart to ScreenBrowser: no tabs, no scroll-pinning, no
// scrubbing — just every screen's label and image, in order, so the whole
// experience on a phone is "scroll and see everything."
export default function ScreenStack({ idPrefix, screens }: ScreenStackProps) {
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  const zoomedScreen = screens.find((screen) => screen.id === zoomedId);

  return (
    <motion.div
      className="screen-stack"
      initial="hidden"
      whileInView="show"
      viewport={fadeUpViewport}
      variants={stackStagger}
    >
      {screens.map((screen) => (
        <motion.div
          className="screen-stack-item"
          id={`${idPrefix}-${screen.id}`}
          key={screen.id}
          variants={fadeUpItem}
        >
          <div className="screen-stack-label">
            <span className="screen-stack-icon">
              <screen.Icon size={15} />
            </span>
            <span>{screen.label}</span>
          </div>
          {screen.description && <p className="screen-stack-description">{screen.description}</p>}
          <div className="screen-frame glass">
            <div
              className={`screen-frame-media ${screen.media ? "screen-frame-media--zoomable" : ""}`}
              onClick={() => screen.media && setZoomedId(screen.id)}
            >
              <ScreenFrameMedia screen={screen} />
              {screen.media && (
                <button
                  type="button"
                  className="screen-zoom-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setZoomedId(screen.id);
                  }}
                  aria-label={`Enlarge ${screen.label}`}
                >
                  <IconSearch size={17} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      <ImageLightbox
        media={zoomedScreen?.media ?? null}
        alt={zoomedScreen?.label ?? ""}
        onClose={() => setZoomedId(null)}
      />
    </motion.div>
  );
}
