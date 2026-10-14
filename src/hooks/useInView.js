import { useEffect } from "react";

/* Calls onChange(isIntersecting) whenever the element enters or leaves the viewport. */
export default function useInView(ref, onChange, options) {
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => onChange(entries[0].isIntersecting), options);
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}
