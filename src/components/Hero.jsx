import { useRef } from "react";
import { booking, clinic, links } from "../data/siteData";
import usePointerScene from "../hooks/usePointerScene";
import BookLink from "./BookLink";
import Icon from "./Icon";

export default function Hero() {
  const heroRef = useRef(null);
  const stageRef = useRef(null);
  usePointerScene(stageRef, heroRef);

  const channels = booking.whatsapp ? "WhatsApp or phone" : "Phone or message";

  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-title" data-hero>
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-glow hero-glow-1" />
        <span className="hero-glow hero-glow-2" />
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">{clinic.name} · {clinic.tagline}</p>
          <h1 id="hero-title" className="hero-title">
            <span className="line"><span>Your Skin.</span></span>{" "}
            <span className="line"><span>Your Glow.</span></span>{" "}
            <span className="line line-accent"><span>Elevated.</span></span>
          </h1>
          <p className="hero-lede">Discover personalized skin and hair care guided by science, delivered with a touch of luxury.</p>
          <div className="hero-actions">
            <BookLink className="btn btn-primary btn-lg" magnetic>
              <span className="btn-icon" aria-hidden="true"><Icon id="i-calendar" /></span>
              <span>Book an Appointment</span>
            </BookLink>
            <a className="btn btn-ghost btn-lg" href="#services">Discover Our Treatments</a>
          </div>
          <a className="hero-directions link-inline" href={links.maps} target="_blank" rel="noopener noreferrer">
            <Icon id="i-pin" /><span>Get directions to the clinic</span>
          </a>
        </div>

        {/* Layered portrait stage. Each .layer moves by its --depth with the pointer and on scroll. */}
        <div ref={stageRef} className="hero-stage" data-scene="hero">
          <div className="layer stage-arch" style={{ "--depth": 0.35 }} aria-hidden="true">
            <svg className="lotus-draw" viewBox="0 0 200 140" focusable="false"><use href="#i-lotus" /></svg>
          </div>
          <div className="layer stage-outline" style={{ "--depth": 0.7 }} aria-hidden="true" />
          <div className="layer stage-orb-back" style={{ "--depth": 0.55 }} aria-hidden="true"><span className="orb orb-sage" /></div>
          <div className="layer stage-portrait" style={{ "--depth": 1 }}>
            <img src={clinic.portrait} width="900" height="1031" fetchpriority="high"
                 onError={(e) => { if (!e.currentTarget.src.endsWith(".svg")) e.currentTarget.src = clinic.portraitFallback; }}
                 alt={`${clinic.doctor}, founder of ${clinic.name} (illustrated placeholder)`} />
          </div>
          <div className="layer stage-orb-front" style={{ "--depth": 1.9 }} aria-hidden="true"><span className="orb orb-pearl" /></div>
          <div className="layer stage-orb-gold" style={{ "--depth": 2.4 }} aria-hidden="true"><span className="orb orb-gold" /></div>
          <div className="layer stage-leaf" style={{ "--depth": 1.6 }} aria-hidden="true"><Icon id="i-leaf" /></div>
          <div className="layer stage-ring" style={{ "--depth": 1.3 }} aria-hidden="true">
            <svg className="ring-text" viewBox="0 0 200 200" focusable="false">
              <defs><path id="ring-path" d="M100 100m-78 0a78 78 0 1 1 156 0a78 78 0 1 1-156 0" /></defs>
              <text><textPath href="#ring-path" textLength="488">{`LUMIERE • SKIN & HAIR CARE • EST. ${clinic.founded} •`}</textPath></text>
            </svg>
            <img src={clinic.logo} alt="" width="72" height="72" />
          </div>
          <div className="layer stage-card" style={{ "--depth": 2 }}>
            <p className="stage-card-name">{clinic.doctor}</p>
            <p className="stage-card-role">{clinic.doctorRole}</p>
          </div>
        </div>
      </div>

      {/* Trust strip: the four things visitors check first */}
      <div className="container">
        <ul className="trust-strip">
          <li>
            <span className="trust-icon" aria-hidden="true"><Icon id="i-pin" /></span>
            <span className="trust-label">Location</span>
            <a className="trust-value" href={links.maps} target="_blank" rel="noopener noreferrer">New Cairo, Egypt</a>
          </li>
          <li>
            <span className="trust-icon" aria-hidden="true"><Icon id="i-shield" /></span>
            <span className="trust-label">Care</span>
            <span className="trust-value">Pharmacist-led, non-surgical</span>
          </li>
          <li>
            <span className="trust-icon" aria-hidden="true"><Icon id="i-sparkle" /></span>
            <span className="trust-label">Established</span>
            <span className="trust-value">Since {clinic.founded}</span>
          </li>
          <li>
            <span className="trust-icon" aria-hidden="true"><Icon id="i-chat" /></span>
            <span className="trust-label">Book by</span>
            <span className="trust-value">{channels}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
