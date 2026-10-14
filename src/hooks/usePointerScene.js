import { useEffect } from "react";
import { pointerEffectsAllowed } from "./media";

/* Pointer-driven depth: sets --px / --py (-1..1, eased) on the scene element.
   `areaRef` is the larger element whose pointer movement drives it (hero or section). */
export default function usePointerScene(sceneRef, areaRef) {
  useEffect(() => {
    const scene = sceneRef.current;
    const area = areaRef.current;
    if (!scene || !area) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = null;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      scene.style.setProperty("--px", current.x.toFixed(4));
      scene.style.setProperty("--py", current.y.toFixed(4));
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      frame = settled ? null : requestAnimationFrame(tick);
    };
    const kick = () => { if (!frame) frame = requestAnimationFrame(tick); };

    const onMove = (e) => {
      if (!pointerEffectsAllowed()) return;
      const r = area.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      kick();
    };
    const onLeave = () => { target.x = 0; target.y = 0; kick(); };

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sceneRef, areaRef]);
}
