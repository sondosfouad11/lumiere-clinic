import { promotions } from "../data/siteData";
import { formatDate, isActiveOffer } from "../utils";

// Hidden automatically when there is no active offer
export default function Offers() {
  const offers = promotions.filter(isActiveOffer);
  if (!offers.length) return null;

  return (
    <section className="section promotions" id="offers" aria-labelledby="offers-title">
      <div className="container">
        <h2 id="offers-title" className="section-title">Current offers</h2>
        <ul className="offer-list">
          {offers.map((o) => (
            <li className="offer" key={o.title}>
              <h3>{o.title}</h3>
              {o.text && <p>{o.text}</p>}
              {o.validUntil && (
                <p className="offer-dates">
                  Valid until {formatDate(o.validUntil, { day: "numeric", month: "long", year: "numeric" })}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
