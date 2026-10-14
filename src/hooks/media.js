import { useEffect, useState } from "react";

const query = (q) => window.matchMedia(q);

export const motionAllowed = () => !query("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () => query("(hover: hover) and (pointer: fine)").matches;
export const pointerEffectsAllowed = () => finePointer() && motionAllowed();

// Re-renders when a media query flips
export function useMediaQuery(q) {
  const [matches, setMatches] = useState(() => query(q).matches);
  useEffect(() => {
    const mql = query(q);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [q]);
  return matches;
}
