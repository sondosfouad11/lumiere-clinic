import { useRef } from "react";
import { about, clinic, links } from "../data/siteData";
import usePointerScene from "../hooks/usePointerScene";
import Icon from "./Icon";

export default function About() {
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  usePointerScene(sceneRef, sectionRef);

  return (
    <section ref={sectionRef} className="section panel about" id="about" aria-labelledby="about-title">
      <div className="container about-grid">
        <div ref={sceneRef} className="about-visual" data-scene="tilt">
          <div className="layer about-backplate" style={{ "--depth": -0.6 }} aria-hidden="true" />
          <div className="layer about-emblem" style={{ "--depth": 0.4 }} data-reveal="mask" aria-hidden="true">
            <svg className="about-lotus" viewBox="0 0 200 140" focusable="false"><use href="#i-lotus" /></svg>
            <span className="about-emblem-name">{clinic.name}</span>
            <span className="about-emblem-sub">{clinic.centerType} since {clinic.founded}</span>
          </div>
          <span className="layer about-chip about-chip-1" style={{ "--depth": 1.2 }} aria-hidden="true">Skin care</span>
          <span className="layer about-chip about-chip-2" style={{ "--depth": 1.5 }} aria-hidden="true">Hair &amp; scalp</span>
          <span className="layer about-chip about-chip-3" style={{ "--depth": 1.1 }} aria-hidden="true">Cosmoceuticals</span>
          <div className="layer about-orb" style={{ "--depth": 1.8 }} aria-hidden="true"><span className="orb orb-pearl" /></div>
          <div className="layer about-medal" style={{ "--depth": 1.6 }} aria-hidden="true">
            <img src={clinic.logo} alt="" width="88" height="88" loading="lazy" />
          </div>
        </div>
        <div className="about-copy">
          <h2 id="about-title" className="section-title" data-reveal="rise">{about.title}</h2>
          <p className="lead" data-reveal="">{about.lead}</p>
          <p className="muted" data-reveal="">{about.body}</p>
          <ul className="credentials" data-reveal="" data-stagger="">
            {about.credentials.map((c) => (
              <li key={c}><Icon id="i-leaf" /><span>{c}</span></li>
            ))}
          </ul>
          <div className="about-actions" data-reveal="">
            <a className="link-inline" href={links.linkedin} target="_blank" rel="noopener noreferrer">
              <Icon id="i-linkedin" /><span>Profile on LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
