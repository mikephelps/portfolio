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
    return <span className="screen-frame-caption">{screen.label}</span>;
  }

  const style = { objectFit: media.fit ?? "cover", objectPosition: media.position ?? "center" } as const;

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
