import { useEffect, useRef, useState } from "react";
import { booking, clinic, links } from "../data/siteData";
import { useApp } from "../context";
import { motionAllowed } from "../hooks/media";
import { whatsappUrl } from "../utils";
import BookLink from "./BookLink";
import Icon from "./Icon";

/* Floating "Message us" menu + back-to-top (left), WhatsApp (right), and the mobile action bar.
   The mobile bar and back-to-top appear once the hero is out of view. */
export default function FloatingUI() {
  const { bookingTopic } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);
  const wrapRef = useRef(null);
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  const showBar = !heroVisible && !contactVisible;

  useEffect(() => {
    document.body.classList.toggle("has-mobile-bar", showBar);
  }, [showBar]);

  useEffect(() => {
    document.body.classList.toggle("has-whatsapp", booking.whatsapp);
  }, []);

  // Opening the booking dialog closes the menu
  useEffect(() => { if (bookingTopic !== null) setMenuOpen(false); }, [bookingTopic]);

  // Visibility observers on the hero and contact sections
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.querySelector("[data-hero]");
    const contact = document.getElementById("contact");
    const ios = [];
    if (hero) {
      const io = new IntersectionObserver((e) => setHeroVisible(e[0].isIntersecting), { rootMargin: "-30% 0px 0px 0px" });
      io.observe(hero);
      ios.push(io);
    }
    if (contact) {
      const io = new IntersectionObserver((e) => setContactVisible(e[0].isIntersecting), { rootMargin: "0px 0px -20% 0px" });
      io.observe(contact);
      ios.push(io);
    }
    return () => ios.forEach((io) => io.disconnect());
  }, []);

  // Click outside / Escape closes the menu
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => { if (!wrapRef.current.contains(e.target)) setMenuOpen(false); };
    const onKey = (e) => {
      if (e.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    if (next) requestAnimationFrame(() => menuRef.current?.querySelector("a")?.focus());
  };

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: motionAllowed() ? "smooth" : "auto" });
    document.querySelector(".site-header .brand")?.focus({ preventScroll: true });
  };

  const waLink = whatsappUrl(booking.phone);

  return (
    <>
      <div ref={wrapRef} className="float-contact float-left">
        <button type="button" className={`to-top${!heroVisible ? " is-visible" : ""}`} aria-label="Back to top"
                tabIndex={heroVisible ? -1 : 0} onClick={toTop}>
          <Icon id="i-arrow-up" />
        </button>
        <div ref={menuRef} className="float-menu" id="float-menu" hidden={!menuOpen}>
          <p className="float-menu-title">Message {clinic.name}</p>
          <a href={links.messenger} target="_blank" rel="noopener noreferrer"><Icon id="i-messenger" /><span>Facebook Messenger</span></a>
          <a href={links.instagramDM} target="_blank" rel="noopener noreferrer"><Icon id="i-instagram" /><span>Instagram</span></a>
        </div>
        <button ref={toggleRef} type="button" className={`float-btn float-btn-chat${menuOpen ? " is-open" : ""}`}
                aria-expanded={menuOpen} aria-controls="float-menu" aria-label="Message us" onClick={toggleMenu}>
          <Icon id="i-chat" className="icon icon-open" />
          <Icon id="i-close" className="icon icon-close" />
          <span className="float-tip" aria-hidden="true">Message us</span>
        </button>
      </div>

      <div className="float-contact float-right">
        {booking.whatsapp && (
          <a className="float-btn float-btn-whatsapp" href={waLink} target="_blank" rel="noopener noreferrer"
             aria-label={`Chat with ${clinic.name} on WhatsApp`}>
            <Icon id="i-whatsapp" />
            <span className="float-tip" aria-hidden="true">Chat on WhatsApp</span>
          </a>
        )}
      </div>

      <nav className={`mobile-bar${showBar ? " is-visible" : ""}`} aria-label="Quick contact" inert={!showBar ? "" : undefined}>
        <BookLink className="mobile-bar-book">
          <Icon id="i-calendar" /><span>Book</span>
        </BookLink>
        <a className={`mobile-bar-icon${booking.whatsapp ? " is-whatsapp" : ""}`}
           href={booking.whatsapp ? waLink : links.messenger} target="_blank" rel="noopener noreferrer"
           aria-label={booking.whatsapp ? "WhatsApp us" : "Message us"}>
          <Icon id={booking.whatsapp ? "i-whatsapp" : "i-messenger"} />
        </a>
        <a className="mobile-bar-icon" href={`tel:${booking.phone}`} aria-label="Call the clinic">
          <Icon id="i-phone" />
        </a>
        <a className="mobile-bar-icon" href={links.maps} target="_blank" rel="noopener noreferrer" aria-label="Get directions">
          <Icon id="i-pin" />
        </a>
      </nav>
    </>
  );
}
