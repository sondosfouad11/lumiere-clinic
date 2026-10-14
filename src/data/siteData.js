/* =========================================================
   All site content lives here. Everything is DUMMY data made up
   for this portfolio project — no real person, clinic or contact.
   Edit this file to change the text; the UI picks it up automatically.
   ========================================================= */

export const clinic = {
  name: "Lumière",
  tagline: "Skin & Hair Care",
  centerType: "Cosmoceutical Center",
  founded: 2021,
  doctor: "Dr. Sara Mansour",
  doctorRole: "Pharmacist and founder",
  logo: "assets/images/logo.svg",
  portrait: "assets/images/doctor.webp", // drop your AI image here (falls back to doctor.svg)
  portraitFallback: "assets/images/doctor.svg",
  address: {
    line1: "Building No. 12, Garden Street, Office No. 4",
    line2: "New Cairo, Cairo, Egypt"
  },
  mapEmbed:
    "https://maps.google.com/maps?q=New%20Cairo%2C%20Egypt&z=13&output=embed"
};

export const booking = {
  phone: "+201000000000", // dummy number
  whatsapp: true
};

export const links = {
  facebook: "https://www.facebook.com/",
  messenger: "https://m.me/",
  instagram: "https://www.instagram.com/",
  instagramDM: "https://ig.me/",
  linkedin: "https://www.linkedin.com/",
  maps: "https://www.google.com/maps/place/New+Cairo"
};

export const navItems = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "results", label: "Results" },
  { id: "diploma", label: "Diploma" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" }
];

export const about = {
  title: "Meet Dr. Sara Mansour",
  lead: "Dr. Sara Mansour is a pharmacist and the founder of Lumière. She opened the center in 2021 to offer skin and hair care that is grounded in science and delivered with care.",
  body: "As a cosmoceutical center, Lumière focuses on non-surgical treatments and active, evidence-informed skincare, chosen for how they work on your skin and hair.",
  credentials: ["Pharmacist", "Founder of Lumière, 2021", "Member of the Demo Pharmacists Association"]
};

export const serviceGroups = [
  {
    title: "Skin care",
    icon: "i-lotus",
    items: [
      { name: "Skin assessment and consultation", text: "A one-to-one review of your skin type, concerns, and current routine." },
      { name: "Medical-grade facials", text: "Professional facials using cosmoceutical products selected for your skin." },
      { name: "Acne and blemish care", text: "In-clinic care and a home routine aimed at calming breakouts." },
      { name: "Pigmentation and uneven tone", text: "Treatment plans for dark spots, melasma, and dullness." },
      { name: "Personalised skincare routines", text: "Product guidance from a pharmacist, matched to your skin and budget." }
    ]
  },
  {
    title: "Hair and scalp care",
    icon: "i-leaf",
    items: [
      { name: "Hair and scalp assessment", text: "A review of your scalp health, hair density, and possible contributing factors." },
      { name: "Hair-loss support treatments", text: "Non-surgical in-clinic sessions paired with a home-care plan." },
      { name: "Scalp care treatments", text: "Care for dryness, oiliness, and flaking of the scalp." }
    ]
  }
];

export const gallery = [
  { before: "assets/images/gallery/demo-acne-before.webp", after: "assets/images/gallery/demo-acne-after.webp", title: "Skin texture and clarity" },
  { before: "assets/images/gallery/demo-hair-before.webp", after: "assets/images/gallery/demo-hair-after.webp", title: "Hair density at the parting" },
  { before: "assets/images/gallery/demo-pigmentation-before.webp", after: "assets/images/gallery/demo-pigmentation-after.webp", title: "Evenness of skin tone" }
];

export const diploma = {
  badge: "Certified diploma",
  title: "Non-Surgical Skincare Diploma",
  lead: "A structured course for anyone who wants to practise non-surgical skincare on a scientific foundation, taught at Lumière.",
  topics: [
    "Skin anatomy and physiology",
    "Cosmoceutical ingredients and how they work",
    "Skin analysis and client consultation",
    "Non-surgical treatment protocols and safety",
    "Hygiene, aftercare, and client care"
  ],
  note: "Dates, duration, and fees are shared on request."
};

// validUntil is an ISO date; the offer hides itself after that day. Empty array hides the section.
export const promotions = [
  { title: "First consultation offer", text: "Book a skin or hair assessment this season and get a complimentary home-care plan.", validUntil: "2030-12-31" }
];

export const reviews = [
  { quote: "The consultation was thorough and I never felt rushed. My skin routine finally makes sense.", name: "Mariam Ali", platform: "Facebook recommendation", date: "2024-03-14", url: "https://www.facebook.com/" },
  { quote: "Clear explanations, a calm clinic, and a plan that fit my budget.", name: "Nada Farouk", platform: "Google review", date: "2024-06-02", url: "https://www.google.com/maps" },
  { quote: "My scalp has been much healthier since I started the care plan. Highly recommended.", name: "Yasmin Hossam", platform: "Google review", date: "2024-09-21", url: "https://www.google.com/maps" },
  { quote: "Professional, kind, and genuinely knowledgeable about ingredients.", name: "Salma Khaled", platform: "Facebook recommendation", date: "2025-01-10", url: "https://www.facebook.com/" }
];

export const faqs = [
  { q: "How do I book an appointment?", a: "Use any \"Book an Appointment\" button on this page, fill in your name and phone number, and press Submit. We'll call you to confirm an appointment time.", id: "booking" },
  { q: "Are your treatments surgical?", a: "No. Lumière offers non-surgical skin and hair care only." },
  { q: "Who leads the center?", a: "Lumière was founded in 2021 and is led by Dr. Sara Mansour, a pharmacist." },
  { q: "How much do treatments cost?", a: "Pricing depends on the treatment plan agreed at your consultation. Contact us for current prices." },
  { q: "What are your opening hours?", a: "Please contact us to confirm current hours and book a time before visiting." },
  { q: "Where are you located?", id: "location" },
  { q: "How do I join the skincare diploma?", a: "Send us a message to ask about upcoming intakes, requirements, and fees." }
];

export const countryCodes = [
  ["20", "Egypt"], ["966", "Saudi Arabia"], ["971", "United Arab Emirates"], ["965", "Kuwait"],
  ["974", "Qatar"], ["973", "Bahrain"], ["968", "Oman"], ["962", "Jordan"], ["961", "Lebanon"],
  ["970", "Palestine"], ["963", "Syria"], ["964", "Iraq"], ["967", "Yemen"], ["218", "Libya"],
  ["249", "Sudan"], ["216", "Tunisia"], ["213", "Algeria"], ["212", "Morocco"], ["90", "Türkiye"],
  ["44", "United Kingdom"], ["1", "United States / Canada"], ["49", "Germany"], ["33", "France"],
  ["39", "Italy"], ["31", "Netherlands"], ["61", "Australia"]
];
