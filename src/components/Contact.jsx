import { useState } from "react";
import { booking, clinic, links } from "../data/siteData";
import { useApp } from "../context";
import { copyText, formatPhone, whatsappUrl } from "../utils";
import BookLink from "./BookLink";
import Icon from "./Icon";
import SocialList from "./SocialList";

function CopyAddress() {
  const { toast } = useApp();
  const [done, setDone] = useState(false);
  const full = `${clinic.address.line1}, ${clinic.address.line2}`;

  const copy = async () => {
    if (await copyText(full)) {
      setDone(true);
      toast("Address copied");
      setTimeout(() => setDone(false), 2200);
    } else {
      toast("Couldn't copy. Select the address to copy it.");
    }
  };

  return (
    <button type="button" className={`btn btn-ghost btn-sm${done ? " is-done" : ""}`} onClick={copy}>
      <Icon id={done ? "i-check" : "i-copy"} /><span>{done ? "Copied" : "Copy address"}</span>
    </button>
  );
}

export default function Contact() {
  return (
    <section className="section panel contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <h2 id="contact-title" className="section-title" data-reveal="rise">Book an Appointment</h2>
          <p className="lead" data-reveal="">Tell us what you'd like help with and when suits you. We'll reply to confirm an appointment time.</p>

          <div className="booking-actions" data-reveal="">
            <BookLink className="btn btn-primary btn-lg" magnetic>
              <span className="btn-icon" aria-hidden="true"><Icon id="i-calendar" /></span><span>Start a booking request</span>
            </BookLink>
            <a className="btn btn-ghost" href={`tel:${booking.phone}`}>
              <Icon id="i-phone" /><span>Call to book</span>
            </a>
            {booking.whatsapp && (
              <a className="btn btn-ghost" href={whatsappUrl(booking.phone)} target="_blank" rel="noopener noreferrer">
                <Icon id="i-whatsapp" /><span>WhatsApp</span>
              </a>
            )}
            <a className="btn btn-ghost" href={links.messenger} target="_blank" rel="noopener noreferrer">
              <Icon id="i-messenger" /><span>Messenger</span>
            </a>
            <a className="btn btn-ghost" href={links.instagramDM} target="_blank" rel="noopener noreferrer">
              <Icon id="i-instagram" /><span>Instagram</span>
            </a>
          </div>
          <p className="booking-phone">
            Booking number: <a href={`tel:${booking.phone}`}>{formatPhone(booking.phone)}</a>
          </p>

          <div className="find-card" data-reveal="">
            <div className="find-head">
              <span className="trust-icon" aria-hidden="true"><Icon id="i-pin" /></span>
              <div>
                <h3 className="find-title">Find us</h3>
                <address id="clinic-address">{clinic.address.line1}<br />{clinic.address.line2}</address>
              </div>
            </div>
            <div className="find-actions">
              <a className="btn btn-primary btn-sm" href={links.maps} target="_blank" rel="noopener noreferrer">
                <Icon id="i-pin" /><span>Get directions</span>
              </a>
              <CopyAddress />
            </div>
            <div className="find-social">
              <span>Follow us</span>
              <SocialList />
            </div>
          </div>
        </div>

        <div className="map-frame" data-reveal="mask">
          {/* Shown behind the map; visible only if the embed is blocked or fails to load */}
          <a className="map-fallback" href={links.maps} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
            <Icon id="i-pin" /><span>Open in Google Maps</span>
          </a>
          <iframe title={`Map showing ${clinic.name} in New Cairo`} src={clinic.mapEmbed}
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}
