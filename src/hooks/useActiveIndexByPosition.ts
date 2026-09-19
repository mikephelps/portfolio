import { useEffect, useState } from "react";

// Shared with any code that needs to scroll an item to exactly where this
// hook considers it "active" (see ScreenBrowser's click handler) — keeping
// one source of truth avoids the two drifting out of sync.
export const ACTIVE_TRIGGER_FRACTION = 0.65;

// IntersectionObserver reports batched, threshold-crossing entries — under a
// fast scroll it can skip an item's brief pass through a narrow trigger band
// entirely, leaving the activeId stuck on whatever was last seen. Reading
// live positions on every scroll tick instead can't miss: it picks whichever
// item's vertical center is closest to the trigger line.
//
// "Closest to the line" (rather than "last item whose top has crossed it")
// matters for short lists: scrollIntoView({block:"center"}) on a clicked
// item can leave every item's top above a trigger line that isn't at 50%,
// which would make a "last one past the line" rule always resolve to the
// final item regardless of which one was actually clicked. Distance-based
// picking still degrades correctly at the extremes — scrolled past
// everything lands on the last item, scrolled before everything lands on
// the first — without that failure mode.
export function useActiveIndexByPosition(itemIds: string[], triggerFraction = ACTIVE_TRIGGER_FRACTION) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handle = () => {
      const triggerY = window.innerHeight * triggerFraction;
      let bestIndex = 0;
      let bestDistance = Infinity;
      for (let i = 0; i < itemIds.length; i++) {
        const el = document.getElementById(itemIds[i]);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const center = (rect.top + rect.bottom) / 2;
        const distance = Math.abs(center - triggerY);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = i;
        }
      }
      setActiveIndex(bestIndex);
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [itemIds, triggerFraction]);

  return activeIndex;
}
