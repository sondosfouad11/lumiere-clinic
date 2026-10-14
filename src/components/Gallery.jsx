import { useEffect, useRef, useState } from "react";
import { gallery } from "../data/siteData";
import { motionAllowed } from "../hooks/media";

/* A drag-to-compare card. A native range input sits on top, so it works with mouse, touch and keyboard. */
function CompareCard({ before, after, title }) {
  const [pos, setPos] = useState(50);
  const compareRef = useRef(null);
  const rangeRef = useRef(null);

  // One gentle sweep the first time the card scrolls into view, to show it can be dragged.
  useEffect(() => {
    const node = compareRef.current;
    if (!node || !motionAllowed() || !("IntersectionObserver" in window)) return;
    let raf;
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const dur = 1600;
        let start = null;
        const step = (t) => {
          if (start === null) start = t;
          const k = Math.min(1, (t - start) / dur);
          const v = 50 + Math.sin(k * Math.PI * 2) * 18 * (1 - k);
          if (document.activeElement !== rangeRef.current) setPos(Math.round(v));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        timer = setTimeout(() => { raf = requestAnimationFrame(step); }, 600);
      },
      { threshold: 0.6 }
    );
    io.observe(node);
    return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); };
  }, []);

  return (
    <li data-reveal="">
      <figure className="ba ba-example">
        <div ref={compareRef} className="ba-compare" style={{ "--pos": `${pos}%` }}>
          <img className="ba-after" src={after} alt={`Illustrative image (not a patient), after: ${title}`}
               loading="lazy" decoding="async" width="800" height="600" />
          <div className="ba-before">
            <img src={before} alt={`Illustrative image (not a patient), before: ${title}`}
                 loading="lazy" decoding="async" width="800" height="600" />
          </div>
          <span className="ba-tag ba-tag-before">Before</span>
          <span className="ba-tag ba-tag-after">After</span>
          <span className="ba-sample-tag">Illustrative</span>
          <span className="ba-handle" aria-hidden="true" />
          <input ref={rangeRef} className="ba-range" type="range" min="0" max="100" value={pos}
                 aria-label={`Compare before and after for ${title}`}
                 onChange={(e) => setPos(Number(e.target.value))} />
        </div>
        <figcaption className="ba-caption"><span className="ba-title">{title}</span></figcaption>
      </figure>
    </li>
  );
}

export default function Gallery() {
  if (!gallery.length) return null;
  return (
    <section className="section panel gallery" id="results" aria-labelledby="gallery-title">
      {/* Decorative editorial backdrop (CSS + inline SVG only) */}
      <div className="gallery-decor" aria-hidden="true">
        <span className="gd-glow gd-glow-1" />
        <span className="gd-glow gd-glow-2" />
        <span className="gd-glow gd-glow-3" />
        <svg className="gd-lines" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
          <path d="M-60 640 C 220 520, 420 760, 720 610 S 1180 420, 1500 560" />
          <path d="M-60 690 C 260 580, 460 820, 760 660 S 1200 470, 1500 610" />
          <path d="M-60 210 C 300 120, 520 300, 860 170 S 1260 60, 1500 140" />
        </svg>
        <span className="gd-arch" />
      </div>
      <div className="container">
        <div className="section-head gallery-head">
          <h2 id="gallery-title" className="section-title" data-reveal="rise">Before &amp; After</h2>
          <p className="section-intro" data-reveal="">Explore skin and hair transformations. Drag to compare.</p>
        </div>
        <div className="gallery-block gallery-examples">
          <ul className="gallery-list" data-stagger="">
            {gallery.map((g) => <CompareCard key={g.title} {...g} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
