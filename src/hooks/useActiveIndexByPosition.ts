import { useEffect, useState } from "react";

// IntersectionObserver reports batched, threshold-crossing entries — under a
// fast scroll it can skip an item's brief pass through a narrow trigger band
// entirely, leaving the activeId stuck on whatever was last seen. Reading
// live positions on every scroll tick instead can't miss: it always picks
// the last item whose top has crossed the trigger line, so a fast scroll
// that blows past several items still lands on the correct (last) one.
export function useActiveIndexByPosition(itemIds: string[], triggerFraction = 0.65) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handle = () => {
      const triggerY = window.innerHeight * triggerFraction;
      let bestIndex = 0;
      for (let i = 0; i < itemIds.length; i++) {
        const el = document.getElementById(itemIds[i]);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerY) {
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
