import { useEffect } from "react";
import { AppProvider, useApp } from "./context";
import useReveal from "./hooks/useReveal";
import About from "./components/About";
import BookingDialog from "./components/BookingDialog";
import Contact from "./components/Contact";
import Diploma from "./components/Diploma";
import Faq from "./components/Faq";
import FloatingUI from "./components/FloatingUI";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Offers from "./components/Offers";
import Reviews from "./components/Reviews";
import Services from "./components/Services";
import Sprite from "./components/Sprite";

function Toast() {
  const { toastText, toastVisible } = useApp();
  return (
    <div className={`toast${toastVisible ? " is-visible" : ""}`} role="status" aria-live="polite">{toastText}</div>
  );
}

function Page() {
  useReveal();

  // Hero entrance starts once web fonts are ready, so headline lines don't reflow mid-animation.
  useEffect(() => {
    const root = document.documentElement;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      requestAnimationFrame(() => root.classList.add("is-ready"));
    };
    document.fonts?.ready.then(start);
    const t = setTimeout(start, 1200);
    // Hard fallback (no rAF) so the hero always appears, even if animation frames are throttled
    const hard = setTimeout(() => root.classList.add("is-ready"), 3000);
    return () => { clearTimeout(t); clearTimeout(hard); };
  }, []);

  return (
    <>
      <Sprite />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Diploma />
        <Offers />
        <Reviews />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingUI />
      <BookingDialog />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Page />
    </AppProvider>
  );
}
