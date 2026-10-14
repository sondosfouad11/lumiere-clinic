import { useApp } from "../context";
import { pointerEffectsAllowed } from "../hooks/media";

/* A link that opens the booking dialog (falls back to #contact without JS).
   `magnetic` makes it lean gently toward the pointer. */
export default function BookLink({ topic, magnetic, className, children, onClick }) {
  const { openBooking } = useApp();

  const move = (e) => {
    if (!magnetic || !pointerEffectsAllowed()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mag-x", `${((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1)}px`);
    el.style.setProperty("--mag-y", `${((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1)}px`);
  };
  const leave = (e) => {
    if (!magnetic) return;
    e.currentTarget.style.removeProperty("--mag-x");
    e.currentTarget.style.removeProperty("--mag-y");
  };

  return (
    <a
      className={className}
      href="#contact"
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        openBooking(topic);
      }}
    >
      {children}
    </a>
  );
}
