import { useEffect, useRef } from "react";
import "./ScrollManifesto.css";

const BEATS = [
  "who I really am.",
  "I am resilient.",
  "I am extremely resourceful.",
  "I dream past my skills.",
  "So I find a way.",
  "AI is my unlock.",
];

const CLOSING_PARAGRAPH =
  "These aren't just words — they're how I work. When the brief runs out, I keep going. When the tools don't exist yet, I build them. That's the throughline from every brand I've launched to every system I've shipped, and it's why I lean into AI as a craft partner, not a shortcut.";

// 6 headline beats + 1 segment for the closing paragraph reveal.
const SEGMENT_COUNT = BEATS.length + 1;
const LAST_BEAT_INDEX = BEATS.length - 1;

// Within a beat's own segment: first 40% letters enter, middle 20% hold,
// last 40% letters exit (except the final beat, which just holds).
const ENTER_END = 0.4;
const HOLD_END = 0.6;
// Each letter's own reveal/exit takes 60% of its phase's width, with the
// remaining 40% spread out as inter-letter stagger — fast per-letter
// timing (the "30-40ms" feel) inside an overall envelope that always
// completes by the end of the phase, regardless of scroll speed.
const LETTER_DURATION = 0.6;

type LetterMode = "hidden" | "in" | "hold" | "out";

function splitIntoWords(text: string) {
  return text.split(" ");
}

export default function ScrollManifesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const beatLetterRefs = useRef<HTMLSpanElement[][]>(BEATS.map(() => []));
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let frame: number | null = null;

    const applyBeat = (beatIndex: number, segmentIndex: number, localT: number) => {
      const letters = beatLetterRefs.current[beatIndex];
      const n = letters.length;
      if (!n) return;

      let mode: LetterMode;
      let t = 0;

      if (beatIndex < segmentIndex) {
        // The last beat never exits — it's still meant to be on screen,
        // pinned, while the closing paragraph fades in beneath it.
        mode = beatIndex === LAST_BEAT_INDEX ? "hold" : "hidden";
      } else if (beatIndex > segmentIndex) {
        mode = "hidden";
      } else if (localT < ENTER_END) {
        mode = "in";
        t = localT / ENTER_END;
      } else if (localT < HOLD_END || beatIndex === LAST_BEAT_INDEX) {
        mode = "hold";
      } else {
        mode = "out";
        t = (localT - HOLD_END) / (1 - HOLD_END);
      }

      const stagger = n > 1 ? (1 - LETTER_DURATION) / (n - 1) : 0;

      for (let i = 0; i < n; i++) {
        const el = letters[i];
        if (mode === "hidden") {
          el.style.opacity = "0";
          el.style.transform = "translateY(0.4em)";
        } else if (mode === "hold") {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        } else if (mode === "in") {
          const start = i * stagger;
          const p = Math.min(1, Math.max(0, (t - start) / LETTER_DURATION));
          el.style.opacity = String(p);
          el.style.transform = `translateY(${0.4 * (1 - p)}em)`;
        } else {
          // Exiting, letters reverse order — the last letter goes first.
          const reversedIndex = n - 1 - i;
          const start = reversedIndex * stagger;
          const p = Math.min(1, Math.max(0, (t - start) / LETTER_DURATION));
          el.style.opacity = String(1 - p);
          el.style.transform = `translateY(${-0.3 * p}em)`;
        }
      }
    };

    const update = () => {
      frame = null;
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      const raw = scrollableHeight > 0 ? -rect.top / scrollableHeight : 0;
      const progress = Math.min(1, Math.max(0, raw));

      const rawSegment = progress * SEGMENT_COUNT;
      const segmentIndex = Math.min(SEGMENT_COUNT - 1, Math.floor(rawSegment));
      const localT = rawSegment - segmentIndex;

      for (let b = 0; b < BEATS.length; b++) {
        applyBeat(b, segmentIndex, b === segmentIndex ? localT : 0);
      }

      const paragraph = paragraphRef.current;
      if (paragraph) {
        if (segmentIndex < BEATS.length) {
          paragraph.style.opacity = "0";
          paragraph.style.transform = "translateY(1.1em)";
        } else {
          const p = Math.min(1, localT / 0.6);
          paragraph.style.opacity = String(p);
          paragraph.style.transform = `translateY(${1.1 * (1 - p)}em)`;
        }
      }
    };

    const onScroll = () => {
      if (frame == null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="manifesto-wrapper">
      <div className="manifesto-sticky">
        <div className="manifesto-headline" aria-hidden="true">
          {BEATS.map((beat, beatIndex) => {
            let letterCounter = 0;
            return (
              <span className="manifesto-beat" key={beat}>
                {splitIntoWords(beat).map((word, wordIndex) => (
                  <span className="manifesto-word" key={wordIndex}>
                    {word.split("").map((char, charIndex) => {
                      const letterIndex = letterCounter++;
                      return (
                        <span
                          className="manifesto-letter"
                          key={charIndex}
                          ref={(node) => {
                            if (node) beatLetterRefs.current[beatIndex][letterIndex] = node;
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                ))}
              </span>
            );
          })}
        </div>
        <p ref={paragraphRef} className="manifesto-paragraph">
          {CLOSING_PARAGRAPH}
        </p>
      </div>

      <span className="visually-hidden">
        {BEATS.join(" ")} {CLOSING_PARAGRAPH}
      </span>
    </div>
  );
}
