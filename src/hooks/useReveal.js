import { useEffect } from "react";
import { motionAllowed } from "./media";

/* Scroll-triggered reveals for every [data-reveal] element.
   Items inside a [data-stagger] container get an increasing delay. */
export default function useReveal() {
  useEffect(() => {
    const all = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    all("[data-stagger]").forEach((group) => {
      all("[data-reveal]", group).forEach((item, i) => item.style.setProperty("--d", i));
    });

    const items = all("[data-reveal]");
    if (!("IntersectionObserver" in window) || !motionAllowed()) {
      items.forEach((item) => item.classList.add("is-in"));
      return;
    }

    // "rise" and "mask" start fully clipped (never "intersecting"), so watch their parent instead.
    const watched = new Map();
    items.forEach((item) => {
      const clipped = /^(rise|mask)$/.test(item.getAttribute("data-reveal"));
      const target = clipped ? item.parentElement : item;
      if (!watched.has(target)) watched.set(target, []);
      watched.get(target).push(item);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          watched.get(entry.target).forEach((item) => item.classList.add("is-in"));
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    watched.forEach((_, target) => io.observe(target));
    return () => io.disconnect();
  }, []);
}
