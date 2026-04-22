import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import CTASection from "./components/CTASection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LegalModal from "./components/LegalModal";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

export default function App() {
  const [legalModal, setLegalModal] = useState(null);

  const openPrivacyModal = () => setLegalModal("privacy");
  const openTermsModal = () => setLegalModal("terms");
  const closeLegalModal = () => setLegalModal(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-white">
      <Navbar />

      <main>
        <Hero />

        <div className="section-bg">
          <About />
          <Services />
          <Portfolio />
          <Process />
          <Testimonials />
          <Stats />
          <CTASection />
          <Contact />
          <Footer
            onOpenPrivacy={openPrivacyModal}
            onOpenTerms={openTermsModal}
          />
        </div>
      </main>

      <BackToTop />

      <LegalModal
        isOpen={legalModal === "privacy"}
        title="Privacy Policy"
        onClose={closeLegalModal}
      >
        <PrivacyPolicy />
      </LegalModal>

      <LegalModal
        isOpen={legalModal === "terms"}
        title="Terms of Service"
        onClose={closeLegalModal}
      >
        <TermsOfService />
      </LegalModal>
    </div>
  );
}