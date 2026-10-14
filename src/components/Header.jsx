import { useEffect, useRef, useState } from "react";
import { clinic, links, navItems } from "../data/siteData";
import { motionAllowed, useMediaQuery } from "../hooks/media";
import BookLink from "./BookLink";
import Icon from "./Icon";
import SocialList from "./SocialList";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const btnRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 960px)");

  const toggle = (next, returnFocus) => {
    if (next && btnRef.current) {
      // The menu opens as a circle growing from the toggle button.
      const r = btnRef.current.getBoundingClientRect();
      navRef.current.style.setProperty("--ox", `${r.left + r.width / 2}px`);
      navRef.current.style.setProperty("--oy", `${r.top + r.height / 2}px`);
    }
    setOpen(next);
    if (next) navRef.current.querySelector("a, button")?.focus({ preventScroll: true });
    else if (returnFocus) btnRef.current?.focus();
  };

  // Close the menu when the viewport grows past the mobile breakpoint
  useEffect(() => { if (!isMobile && open) setOpen(false); }, [isMobile, open]);

  useEffect(() => { document.body.classList.toggle("menu-open", open); }, [open]);

  // Escape closes the menu; Tab stays inside it
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") toggle(false, true);
      if (e.key === "Tab") {
        const items = [btnRef.current, ...navRef.current.querySelectorAll("a, button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Header state, scroll progress line and hero scroll parallax (one rAF-throttled handler)
  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 8);
      headerRef.current?.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : "0");
      const hero = document.querySelector("[data-hero]");
      const stage = document.querySelector("[data-scene='hero']");
      if (hero && stage && motionAllowed()) {
        stage.style.setProperty("--scroll", Math.max(0, Math.min(1, y / hero.offsetHeight)).toFixed(4));
      }
    };
    const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((cur) => (cur === entry.target.id && entry.boundingClientRect.top > 0 ? null : cur));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const s = document.getElementById(id);
      if (s) io.observe(s);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}`} id="top">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label={`${clinic.name} – home`}>
          <img className="brand-logo" src={clinic.logo} alt="" width="44" height="44" />
          <span className="brand-text">
            <span className="brand-name">{clinic.name}</span>
            <span className="brand-sub">{clinic.tagline}</span>
          </span>
        </a>

        <nav
          ref={navRef}
          className={`primary-nav${open ? " is-open" : ""}`}
          id="primary-nav"
          aria-label="Main"
          onClick={(e) => { if (e.target.closest("a") && open) toggle(false, false); }}
        >
          <ul className="nav-list">
            {navItems.map((item, i) => (
              <li key={item.id} style={{ "--i": i }}>
                <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <BookLink className="btn btn-primary btn-sm">
              <Icon id="i-calendar" /><span>Book an Appointment</span>
            </BookLink>
          </div>
          <div className="nav-extra">
            <p className="nav-extra-address">{clinic.address.line1}<br />{clinic.address.line2}</p>
            <a className="link-inline" href={links.maps} target="_blank" rel="noopener noreferrer">
              <Icon id="i-pin" /><span>Get directions</span>
            </a>
            <SocialList />
          </div>
        </nav>

        <button
          ref={btnRef}
          type="button"
          className="menu-toggle"
          aria-controls="primary-nav"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => toggle(!open, true)}
        >
          <span className="menu-toggle-lines" aria-hidden="true"><span /><span /></span>
        </button>
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
