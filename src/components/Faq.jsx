import { useRef } from "react";
import { booking, clinic, faqs, links } from "../data/siteData";
import { motionAllowed } from "../hooks/media";
import Icon from "./Icon";

// Native <details>, with the open/close height animated instead of snapping.
function FaqItem({ q, children }) {
  const detailsRef = useRef(null);
  const bodyRef = useRef(null);
  const anim = useRef(null);

  const onSummaryClick = (e) => {
    const details = detailsRef.current;
    const body = bodyRef.current;
    if (!motionAllowed() || !body.animate) return;
    e.preventDefault();
    anim.current?.cancel();

    if (details.open && !details.classList.contains("is-closing")) {
      details.classList.add("is-closing");
      anim.current = body.animate(
        [{ height: `${body.offsetHeight}px`, opacity: 1 }, { height: "0px", opacity: 0 }],
        { duration: 320, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }
      );
      anim.current.onfinish = () => {
        details.open = false;
        details.classList.remove("is-closing");
        anim.current = null;
      };
    } else {
      details.classList.remove("is-closing");
      details.open = true;
      anim.current = body.animate(
        [{ height: "0px", opacity: 0 }, { height: `${body.offsetHeight}px`, opacity: 1 }],
        { duration: 460, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
      anim.current.onfinish = () => { anim.current = null; };
    }
  };

  return (
    <details ref={detailsRef} data-reveal="">
      <summary onClick={onSummaryClick}>
        <span>{q}</span>
        <span className="faq-icon" aria-hidden="true"><Icon id="i-plus" /></span>
      </summary>
      <div ref={bodyRef} className="faq-answer">{children}</div>
    </details>
  );
}

function answer(item) {
  if (item.id === "location") {
    return (
      <p>
        {clinic.address.line1}, {clinic.address.line2}.{" "}
        <a href={links.maps} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>.
      </p>
    );
  }
  if (item.id === "booking") {
    return <p>{item.a}{booking.whatsapp ? " You can also message us on WhatsApp." : ""}</p>;
  }
  return <p>{item.a}</p>;
}

export default function Faq() {
  return (
    <section className="section panel faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="section-head">
          <h2 id="faq-title" className="section-title" data-reveal="rise">Questions</h2>
          <p className="section-intro" data-reveal="">Can't find your answer? Send us a message and we'll reply.</p>
          <a className="btn btn-ghost" data-reveal="" href={links.messenger} target="_blank" rel="noopener noreferrer">
            <Icon id="i-messenger" /><span>Message us</span>
          </a>
        </div>
        <div className="faq-list" data-stagger="">
          {faqs.map((f) => <FaqItem key={f.q} q={f.q}>{answer(f)}</FaqItem>)}
        </div>
      </div>
    </section>
  );
}
