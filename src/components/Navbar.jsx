import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./ui/Button";
import logo from "../assets/techtide-logo.png";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Portfolio", href: "#portfolio-premium", id: "portfolio-premium" },
  { label: "Process", href: "#process-premium", id: "process-premium" },
  { label: "Testimonials", href: "#testimonials-premium", id: "testimonials-premium" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        let bestMatch = null;
        let bestRatio = 0;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestMatch = entry.target.id;
          }
        }

        if (bestMatch) {
          setActiveSection(bestMatch);
        }
      },
      {
        threshold: [0.2, 0.5, 0.8],
        rootMargin: "0px 0px -20% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  // Handle mobile link click – update active section immediately and close menu
  const handleMobileLinkClick = (linkId) => {
    setActiveSection(linkId);
    setMobileOpen(false);
  };

  // For desktop or any other click that doesn't need to close menu
  const handleDesktopLinkClick = (linkId) => {
    setActiveSection(linkId);
  };

  const isActive = (linkId) => activeSection === linkId;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 pointer-events-none">
      <div className="mx-auto max-w-7xl relative">
        <div
          className={`
            pointer-events-auto
            rounded-full border border-white/10 px-4 py-3 sm:px-6
            transition-all duration-300 ease-out
            ${
              scrolled
                ? "bg-[#0a0f1a]/90 backdrop-blur-xl shadow-2xl border-white/20"
                : "bg-transparent"
            }
          `}
        >
          <div className="flex items-center justify-between gap-4">
            <a href="#home" className="flex items-center gap-3 group" onClick={() => handleDesktopLinkClick("home")}>
              <img
                src={logo}
                alt="TechTide Studio"
                className="h-8 w-auto rounded-md object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => handleDesktopLinkClick(link.id)}
                  className={`group relative text-sm font-medium transition-colors duration-300 ${
                    isActive(link.id)
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-px bg-[#fcce00] transition-all duration-300 ${
                      isActive(link.id) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Button
                href="#contact"
                variant="yellow"
                className="px-5 py-3 text-[13px]"
                onClick={() => handleDesktopLinkClick("contact")}
              >
                Get Started
              </Button>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <div
          className={`
            lg:hidden absolute left-0 right-0 top-[calc(100%+12px)]
            transition-all duration-300 ease-in-out
            ${
              mobileOpen
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }
          `}
        >
          <div className="rounded-[28px] border border-white/10 bg-[#08101c]/95 backdrop-blur-xl shadow-2xl">
            <div className="max-h-[calc(100vh-120px)] overflow-y-auto overscroll-contain">
              <div className="flex flex-col p-5">
                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => handleMobileLinkClick(link.id)}
                      className={`rounded-2xl px-4 py-3 text-base font-medium transition-all hover:bg-white/5 hover:text-white hover:pl-6 ${
                        isActive(link.id)
                          ? "bg-white/10 text-white pl-6"
                          : "text-white/80"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                <div className="my-4 h-px bg-white/10" />

                <Button
                  href="#contact"
                  variant="yellow"
                  onClick={() => handleMobileLinkClick("contact")}
                  className="w-full justify-center py-3 text-base font-semibold"
                >
                  Get Started
                </Button>

                <div className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}