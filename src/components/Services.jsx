import { serviceGroups } from "../data/siteData";
import { finePointer } from "../hooks/media";
import BookLink from "./BookLink";
import Icon from "./Icon";

// The hover wash follows the pointer
function ServiceRow({ name, text }) {
  const move = (e) => {
    if (!finePointer()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <li className="service" data-reveal="" onPointerMove={move}>
      <h4>{name}</h4>
      <p>{text}</p>
    </li>
  );
}

export default function Services() {
  return (
    <section className="section panel services" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <h2 id="services-title" className="section-title" data-reveal="rise">Skin and hair care</h2>
          <p className="section-intro" data-reveal="">Every plan starts with an assessment of your skin or scalp. Your treatment options, timeline, and pricing are discussed at your consultation.</p>
        </div>

        <div className="service-groups">
          {serviceGroups.map((group, gi) => (
            <div className="service-group" key={group.title}>
              <h3 className="group-title" data-reveal=""><Icon id={group.icon} /><span>{group.title}</span></h3>
              <ul className="service-list" data-stagger="">
                {group.items.map((s) => <ServiceRow key={s.name} {...s} />)}
              </ul>
              {gi === serviceGroups.length - 1 && (
                <div className="services-cta" data-reveal="">
                  <p>Not sure which treatment fits? Start with a consultation.</p>
                  <BookLink className="btn btn-primary" topic="Not sure yet">
                    <Icon id="i-calendar" /><span>Book an Appointment</span>
                  </BookLink>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
