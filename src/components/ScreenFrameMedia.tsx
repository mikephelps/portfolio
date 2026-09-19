import type { Screen } from "../data/projects";

type ScreenFrameMediaProps = {
  screen: Screen;
};

// Renders whatever a screen actually has: a real image/video if provided,
// otherwise the placeholder caption. Shared between the desktop tabbed
// browser and the mobile stack so both stay in sync automatically once
// real assets are dropped in — nothing else in either component needs to
// change.
export default function ScreenFrameMedia({ screen }: ScreenFrameMediaProps) {
  const media = screen.media;
  if (!media) {
    return (
      <span className="screen-frame-empty">
        <span className="screen-frame-caption">{screen.label}</span>
      </span>
    );
  }

  // Images render at their natural size by default (see .screen-frame-asset)
  // — nothing is ever cropped. fit/position are only meaningful as an
  // override for the rare oversized asset that hits the pinned-viewport
  // safety cap; leave them unset and the CSS default (contain/center) applies.
  const style = {
    ...(media.fit && { objectFit: media.fit }),
    ...(media.position && { objectPosition: media.position }),
  };

  if (media.type === "video") {
    return (
      <video
        className="screen-frame-asset"
        style={style}
        src={media.src}
        autoPlay
        loop
        muted
        playsInline
      />
    );
  }

  return <img className="screen-frame-asset" style={style} src={media.src} alt={screen.label} />;
}
