import { useEffect, useRef, useState } from "react";
import { Carousel } from "bootstrap";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import AdoptionReadiness from "./components/AdoptionReadiness";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function App() {
  const readinessSectionRef = useRef(null);
  const [showReadiness, setShowReadiness] = useState(false);

  const openReadiness = () => {
    setShowReadiness(true);
  };

  const closeReadiness = () => {
    setShowReadiness(false);
  };

  useEffect(() => {
    const carouselEl = document.getElementById("testimonial-carousel");
    if (!carouselEl) {
      return undefined;
    }

    const carousel = new Carousel(carouselEl, {
      interval: 4000,
      ride: "carousel",
      pause: false,
      wrap: true,
    });

    return () => {
      carousel.dispose();
    };
  }, []);

  useEffect(() => {
    if (!showReadiness || !readinessSectionRef.current) {
      return;
    }

    const sectionTop =
      readinessSectionRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(sectionTop - 24, 0),
      behavior: "smooth",
    });
  }, [showReadiness]);

  return (
    <>
      <section id="title">
        <div className="container-fluid">
          <Navbar onAdoptClick={openReadiness} />
          <Hero />
        </div>
      </section>

      <section id="features">
        <Features />
      </section>

      <section id="testimonial">
        <Testimonials />
      </section>

      {showReadiness && (
        <section ref={readinessSectionRef}>
          <AdoptionReadiness onClose={closeReadiness} />
        </section>
      )}

      <section id="pricing">
        <Pricing />
      </section>

      <section id="cta">
        <CTA onGetStarted={openReadiness} />
      </section>

      <Footer />
    </>
  );
}

export default App;
