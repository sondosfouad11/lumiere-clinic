import { useEffect, useRef, useState } from "react";
import { clinic, countryCodes, serviceGroups } from "../data/siteData";
import { useApp } from "../context";
import Icon from "./Icon";

const EMPTY = { name: "", country: "20", phone: "", topic: "Not sure yet", date: "", time: "", note: "", website: "" };

const todayISO = () => {
  const t = new Date();
  return new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

// A leading 0 (local trunk prefix) is dropped, so "0101…" with Egypt (+20) becomes +20101…
function nationalDigits(raw, code) {
  let digits = raw.trim().replace(/[\s\-().]/g, "");
  if (digits.charAt(0) === "+") {
    digits = digits.slice(1);
    if (digits.indexOf(code) === 0) digits = digits.slice(code.length);
  }
  return digits.replace(/^0+/, "");
}
const fullPhone = (f) => `+${f.country}${nationalDigits(f.phone, f.country)}`;
const validPhone = (f) => /^\d{6,14}$/.test(nationalDigits(f.phone, f.country)) && /^\+\d{8,15}$/.test(fullPhone(f));
const validName = (f) => f.name.trim().length >= 2;

/* Booking form in a native <dialog>. DEMO: nothing is sent anywhere — the "server" is a short fake delay. */
export default function BookingDialog() {
  const { bookingTopic, closeBooking } = useApp();
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const doneRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({ name: false, phone: false });
  const [step, setStep] = useState("form");
  const [sending, setSending] = useState(false);
  const [doneText, setDoneText] = useState("");

  // Open / close the native dialog when the shared state changes
  useEffect(() => {
    const dialog = dialogRef.current;
    if (bookingTopic === null) {
      if (dialog.open) dialog.close();
      return;
    }
    setForm({ ...EMPTY, topic: bookingTopic || "Not sure yet" });
    setErrors({ name: false, phone: false });
    setStep("form");
    setSending(false);
    if (!dialog.open) dialog.showModal();
    document.body.classList.add("dialog-open");
    nameRef.current?.focus();
  }, [bookingTopic]);

  const set = (key) => (e) => {
    const next = { ...form, [key]: e.target.value };
    setForm(next);
    // Clear a field's error as soon as it becomes valid
    if ((key === "name") && validName(next)) setErrors((er) => ({ ...er, name: false }));
    if ((key === "phone" || key === "country") && validPhone(next)) setErrors((er) => ({ ...er, phone: false }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (sending) return;
    const nameBad = !validName(form);
    const phoneBad = !validPhone(form);
    setErrors({ name: nameBad, phone: phoneBad });
    if (nameBad) return nameRef.current.focus();
    if (phoneBad) return phoneRef.current.focus();

    setSending(true);
    setTimeout(() => {
      setDoneText(
        `Thank you, ${form.name.trim().split(/\s+/)[0]}. This is a demo site, so nothing was actually sent — in a real deployment we'd call you on ${fullPhone(form)} to confirm your appointment time.`
      );
      setSending(false);
      setStep("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 900);
  };

  const topicGroups = serviceGroups;

  return (
    <dialog
      ref={dialogRef}
      className="book-dialog"
      id="book-dialog"
      aria-labelledby="book-title"
      onClick={(e) => { if (e.target === dialogRef.current && !sending) closeBooking(); }}
      onCancel={(e) => { if (sending) e.preventDefault(); else closeBooking(); }}
      onClose={() => { document.body.classList.remove("dialog-open"); closeBooking(); }}
    >
      <form className="book-form" onSubmit={submit} noValidate aria-busy={sending}>
        <button type="button" className="book-close" aria-label="Close" onClick={closeBooking}>
          <Icon id="i-close" />
        </button>
        <div className="book-head">
          <img src={clinic.logo} alt="" width="48" height="48" loading="lazy" />
          <div>
            <h2 id="book-title">Book an Appointment</h2>
            <p>Leave your details and we'll call you to confirm a time.</p>
          </div>
        </div>

        <div className="book-step" hidden={step !== "form"}>
          <div className="field">
            <label htmlFor="bk-name">Your name</label>
            <input ref={nameRef} id="bk-name" type="text" autoComplete="name" maxLength={100}
                   placeholder="Your full name" required value={form.name} onChange={set("name")}
                   aria-invalid={errors.name ? "true" : undefined} aria-describedby="bk-name-error" />
            <p className="field-error" id="bk-name-error" hidden={!errors.name}>Enter your name so we know who's booking.</p>
          </div>
          <div className="field">
            <label htmlFor="bk-phone">Phone number</label>
            <div className="phone-field">
              <label className="visually-hidden" htmlFor="bk-country">Country code</label>
              <select id="bk-country" autoComplete="tel-country-code" value={form.country} onChange={set("country")}>
                {countryCodes.map(([code, name]) => <option key={code} value={code}>+{code} {name}</option>)}
              </select>
              <input ref={phoneRef} id="bk-phone" type="tel" inputMode="tel" autoComplete="tel-national" maxLength={20}
                     placeholder="Phone number" required value={form.phone} onChange={set("phone")}
                     aria-invalid={errors.phone ? "true" : undefined} aria-describedby="bk-phone-error" />
            </div>
            <p className="field-error" id="bk-phone-error" hidden={!errors.phone}>Enter a valid phone number for the selected country.</p>
          </div>
          <div className="field">
            <label htmlFor="bk-topic">What would you like help with?</label>
            <select id="bk-topic" className={form.topic === "Not sure yet" ? "is-placeholder" : ""} value={form.topic} onChange={set("topic")}>
              <option>Not sure yet</option>
              {topicGroups.map((g) => (
                <optgroup key={g.title} label={g.title}>
                  {g.items.map((s) => <option key={s.name}>{s.name}</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="bk-date">Preferred day <span className="optional">(optional)</span></label>
              <input id="bk-date" type="date" min={todayISO()} className={form.date ? "" : "is-empty"} value={form.date} onChange={set("date")} />
            </div>
            <div className="field">
              <label htmlFor="bk-time">Preferred time <span className="optional">(optional)</span></label>
              <select id="bk-time" className={form.time === "" ? "is-placeholder" : ""} value={form.time} onChange={set("time")}>
                <option value="">Any time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="bk-note">Anything we should know? <span className="optional">(optional)</span></label>
            <textarea id="bk-note" rows={3} maxLength={1000} value={form.note} onChange={set("note")} />
          </div>
          {/* Spam trap: hidden from people, bots tend to fill it */}
          <div className="hp-field" aria-hidden="true">
            <label htmlFor="bk-website">Website</label>
            <input id="bk-website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
          </div>

          <div className="book-submit">
            <button type="submit" className={`btn btn-primary${sending ? " is-loading" : ""}`} disabled={sending}>
              <span>{sending ? "Sending…" : "Submit"}</span>
            </button>
          </div>
        </div>

        <div ref={doneRef} className="book-step book-done" hidden={step !== "done"} tabIndex={-1}>
          <span className="book-done-icon" aria-hidden="true"><Icon id="i-check" /></span>
          <h3>Request received</h3>
          <p>{doneText}</p>
          <button type="button" className="btn btn-primary btn-sm" onClick={closeBooking}>Close</button>
        </div>
      </form>
    </dialog>
  );
}
