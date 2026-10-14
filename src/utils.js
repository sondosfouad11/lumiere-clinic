export function formatPhone(p) {
  // +201000000000 -> +20 10 0000 0000
  const m = p.match(/^\+20(\d{2})(\d{4})(\d{4})$/);
  return m ? `+20 ${m[1]} ${m[2]} ${m[3]}` : p;
}

export function whatsappUrl(phone, message) {
  return `https://wa.me/${phone.replace("+", "")}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export async function copyText(value) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch { /* fall through to legacy copy */ }
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "");
  area.style.cssText = "position:fixed;opacity:0;pointer-events:none";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand("copy"); } catch { ok = false; }
  area.remove();
  return ok;
}

export function isActiveOffer(offer) {
  if (!offer || !offer.title) return false;
  if (!offer.validUntil) return true;
  const end = new Date(`${offer.validUntil}T23:59:59`);
  return !isNaN(end) && end >= new Date();
}

export const formatDate = (iso, opts) => new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", opts);
