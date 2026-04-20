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

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-white">
      <Navbar />

      <main>
        <Hero />

        {/* All main content sections share the same background style */}
        <div className="section-bg">
          <About />
          <Services />
          <Portfolio />
          <Process />
          <Testimonials />
          <Stats />
          <CTASection />
          <Contact />
          <Footer />
        </div>
      </main>

      {/* Back to Top button – fixed position, independent of content background */}
      <BackToTop />
    </div>
  );
}