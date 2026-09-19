import { motion } from "framer-motion";
import type { Screen } from "../data/projects";
import ScreenFrameMedia from "./ScreenFrameMedia";
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
          <div className="screen-frame glass">
            <div className="screen-frame-media">
              <ScreenFrameMedia screen={screen} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
