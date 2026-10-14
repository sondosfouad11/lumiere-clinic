# Lumière Skin & Hair Clinic — React portfolio version

A React + Vite rebuild of a real clinic website. Design, colours and animations are unchanged;
**all content is dummy data** (fictional clinic, doctor, phone, reviews). The booking form is a demo and sends nothing.

## Run
```
npm install
npm run dev      # development
npm run build    # production build -> dist/
```

## Structure
- `src/data/siteData.js` — all text, links, services, reviews, FAQ (edit here)
- `src/components/` — one component per section (Hero, About, Services, Gallery, Reviews, Faq, Contact, BookingDialog...)
- `src/hooks/` — `useReveal` (scroll reveals), `usePointerScene` (parallax/tilt), media helpers
- `src/context.jsx` — shared state for the booking dialog and toast
- `src/styles/style.css` — original stylesheet, untouched

## Deploy
Push to GitHub, then Netlify / Vercel / GitHub Pages (`dist/` is the output; `base: "./"` is already set).

## Author & License
Designed and developed by **Sondos Lasheen** (UI/UX & Front-end). This is a personal portfolio project.
Copyright (c) 2026 Sondos Lasheen. All rights reserved. The code is public for viewing only; see `LICENSE`.
