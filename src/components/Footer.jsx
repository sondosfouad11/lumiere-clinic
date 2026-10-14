import { clinic, links, navItems } from "../data/siteData";
import SocialList from "./SocialList";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a className="brand brand-light" href="#top" aria-label={`${clinic.name} – back to top`}>
            <img className="brand-logo" src={clinic.logo} alt="" width="56" height="56" loading="lazy" />
            <span className="brand-text">
              <span className="brand-name">{clinic.name}</span>
              <span className="brand-sub">{clinic.centerType}</span>
            </span>
          </a>
          <p className="footer-tagline">Where medical science meets luxury experience.</p>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Explore</p>
          <ul className="footer-links">
            {navItems.map((n) => <li key={n.id}><a href={`#${n.id}`}>{n.label}</a></li>)}
          </ul>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Visit us</p>
          <address>{clinic.address.line1}<br />{clinic.address.line2}</address>
          <a className="footer-link" href={links.maps} target="_blank" rel="noopener noreferrer">Get directions</a>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Follow us</p>
          <SocialList light />
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">{clinic.name}</p>
      <div className="container footer-base">
        <p>&copy; 2026 {clinic.name} – {clinic.tagline}. All rights reserved.</p>
      </div>
    </footer>
  );
}
