import { useRef } from "react";
import { clinic, diploma } from "../data/siteData";
import usePointerScene from "../hooks/usePointerScene";

export default function Diploma() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  usePointerScene(sceneRef, sectionRef);

  return (
    <section ref={sectionRef} className="section diploma" id="diploma" aria-labelledby="diploma-title">
      <div className="diploma-panel">
        <div className="diploma-texture" aria-hidden="true">
          <svg viewBox="0 0 200 140" focusable="false"><use href="#i-lotus" /></svg>
        </div>
        <div className="container diploma-grid">
          <div className="diploma-copy">
            <p className="diploma-badge" data-reveal="">{diploma.badge}</p>
            <h2 id="diploma-title" className="section-title" data-reveal="rise">{diploma.title}</h2>
            <p className="lead" data-reveal="">{diploma.lead}</p>
          </div>

          {/* Decorative certificate (illustration only, not a real certificate) */}
          <div ref={sceneRef} className="cert-scene" data-scene="tilt" aria-hidden="true">
            <div className="layer cert cert-back" style={{ "--depth": -0.8 }} />
            <div className="layer cert cert-front" style={{ "--depth": 0.6 }}>
              <span className="cert-border" />
              <img className="cert-logo" src={clinic.logo} alt="" width="64" height="64" loading="lazy" />
              <p className="cert-label">Certificate</p>
              <p className="cert-title">{diploma.title}</p>
              <span className="cert-rule" />
              <p className="cert-issuer">{clinic.name} – {clinic.centerType}</p>
              <span className="cert-sheen" />
            </div>
            <div className="layer cert-seal" style={{ "--depth": 1.8 }}>
              <svg viewBox="0 0 200 140" focusable="false"><use href="#i-lotus" /></svg>
            </div>
          </div>

          <div className="diploma-detail">
            <h3 className="group-title" data-reveal="">What the course covers</h3>
            <ul className="topic-list" data-stagger="">
              {diploma.topics.map((t) => <li key={t} data-reveal="">{t}</li>)}
            </ul>
            <p className="diploma-note" data-reveal="">{diploma.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
