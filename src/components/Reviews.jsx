import { useCallback, useEffect, useRef, useState } from "react";
import { links, reviews } from "../data/siteData";
import { motionAllowed } from "../hooks/media";
import { formatDate } from "../utils";
import Icon from "./Icon";

function ReviewCard({ review }) {
  const initials = review.name.split(/\s+/).map((w) => w.charAt(0)).join("").slice(0, 2).toUpperCase();
  const platformName = review.platform ? review.platform.split(" ")[0] : "the source page";

  return (
    <li data-reveal="">
      <figure className="review review-public">
        <div className="review-top">
          <span className="review-quote" aria-hidden="true">“</span>
          {review.platform && <span className="review-tag">{review.platform}</span>}
        </div>
        <blockquote>{review.quote}</blockquote>
        <figcaption className="review-by">
          <span className="review-avatar" aria-hidden="true">{initials}</span>
          <span className="review-who">
            <span className="review-name">{review.name}</span>
            {review.date && (
              <span className="review-detail">{formatDate(review.date, { month: "long", year: "numeric" })}</span>
            )}
          </span>
          {review.url && (
            <a className="review-source" href={review.url} target="_blank" rel="noopener noreferrer"
               aria-label={`View ${review.name}'s original review on ${platformName}`}>
              View original
            </a>
          )}
        </figcaption>
      </figure>
    </li>
  );
}

// Two or more reviews: a swipeable scroll-snap row with arrows and dots. One review: a single featured card.
export default function Reviews() {
  const listRef = useRef(null);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false, idle: false });
  const multi = reviews.length > 1;

  const step = useCallback(() => {
    const cards = listRef.current.children;
    return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : listRef.current.clientWidth;
  }, []);

  const sync = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const max = list.scrollWidth - list.clientWidth - 2;
    setState({
      index: Math.round(list.scrollLeft / step()),
      atStart: list.scrollLeft <= 2,
      atEnd: list.scrollLeft >= max,
      idle: max <= 0 // every card already fits
    });
  }, [step]);

  useEffect(() => {
    if (!multi) return;
    const list = listRef.current;
    let queued = false;
    const onScroll = () => {
      if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; sync(); }); }
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    sync();
    return () => {
      list.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, [multi, sync]);

  const behavior = () => (motionAllowed() ? "smooth" : "auto");
  const goTo = (i) => listRef.current.scrollTo({ left: i * step(), behavior: behavior() });
  const by = (dir) => listRef.current.scrollBy({ left: dir * step(), behavior: behavior() });

  return (
    <section className="section testimonials" id="reviews" aria-labelledby="reviews-title">
      <div className="container reviews-inner">
        <svg className="reviews-mark" viewBox="0 0 64 48" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M0 48V28C0 12 8 3 24 0l3 6c-9 3-13 8-13 16h12v26zm36 0V28c0-16 8-25 24-28l3 6c-9 3-13 8-13 16h12v26z" />
        </svg>
        <h2 id="reviews-title" className="section-title" data-reveal="rise">Client Reviews</h2>
        <div className="review-carousel">
          <ul
            ref={listRef}
            className={`review-list ${multi ? "review-list-carousel" : "review-list-single"}`}
            data-stagger=""
            tabIndex={multi ? 0 : -1}
            aria-label="Client reviews"
          >
            {reviews.map((r) => <ReviewCard key={r.name} review={r} />)}
          </ul>
          {multi && (
            <div className={`review-nav${state.idle ? " is-idle" : ""}`}>
              <button type="button" className="review-arrow review-prev" aria-label="Previous review"
                      disabled={state.atStart} onClick={() => by(-1)}>
                <Icon id="i-arrow-up" />
              </button>
              <div className="review-dots">
                {reviews.map((r, i) => (
                  <button key={r.name} type="button" className="review-dot"
                          aria-label={`Show review ${i + 1} of ${reviews.length}`}
                          aria-current={String(i === state.index)} onClick={() => goTo(i)} />
                ))}
              </div>
              <button type="button" className="review-arrow review-next" aria-label="Next review"
                      disabled={state.atEnd} onClick={() => by(1)}>
                <Icon id="i-arrow-up" />
              </button>
            </div>
          )}
        </div>
        <div className="review-links" data-reveal="">
          <a className="btn btn-ghost" href={links.maps} target="_blank" rel="noopener noreferrer">
            <Icon id="i-pin" /><span>Reviews on Google Maps</span>
          </a>
          <a className="btn btn-ghost" href={links.facebook} target="_blank" rel="noopener noreferrer">
            <Icon id="i-facebook" /><span>Our Facebook page</span>
          </a>
        </div>
      </div>
    </section>
  );
}
