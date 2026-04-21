import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  Code2,
  Megaphone,
  MonitorSmartphone,
  PencilRuler,
} from "lucide-react";
import Button from "./ui/Button";
import HeroCanvas from "./HeroCanvas";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    text: "Fast scalable digital platforms built for growth.",
  },
  {
    icon: PencilRuler,
    title: "Logo Design",
    text: "Creative and memorable brand identities that help your business stand out.",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    text: "Strategic content and campaigns that grow your audience and engagement.",
  },
  {
    icon: MonitorSmartphone,
    title: "Search Engine Optimization",
    text: "Improve visibility on Google and attract more customers organically.",
  },
];

export default function Hero() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.to(cardRef.current, {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-32"
    >
      <div className="absolute inset-0 bg-[#060b16]" />

      <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-brand-blue/10 blur-[140px]" />
      <div className="absolute right-0 top-0 h-[380px] w-[380px] rounded-full bg-brand-yellow/10 blur-[120px]" />

      <HeroCanvas />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:gap-20 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            {/* REMOVED: the "TechTide Studio" badge entirely */}
            <h1
              data-hero
              className="mt-8 text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[70px]"
            >
              Digital solutions
              <br />
              built for
              <span className="text-brand-blue"> modern businesses</span>
            </h1>

            <p
              data-hero
              className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg"
            >
              We help businesses grow online with professional branding, modern websites, social media marketing, and SEO solutions built for visibility, trust, and results.
            </p>

            <div
              data-hero
              className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <Button href="#contact" variant="yellow">
                Start Your Project
              </Button>

              <Button href="#portfolio-premium" variant="secondary">
                View Our Work
              </Button>
            </div>

            <div
              data-hero
              className="mt-10 text-center text-sm text-white/50 lg:text-left"
            >
              Logo Design • Website Development • Social Media Marketing • SEO
            </div>
          </div>

          {/* RIGHT SIDE PANEL */}
          <div
            ref={cardRef}
            data-hero
            className="relative mx-auto w-full max-w-lg mb-8"
          >
            <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-brand-blue/20 to-brand-yellow/10 blur-3xl" />

            <div className="relative rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  What we build
                </h3>

                <span className="text-xs uppercase tracking-[0.2em] text-brand-yellow">
                  Services
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {services.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-brand-blue/40"
                    >
                      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-blue">
                        <Icon size={18} />
                      </div>

                      <h4 className="text-sm font-semibold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-xs leading-relaxed text-white/60">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/60">
                Built with modern design, smart strategy, and growth-focused marketing.
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 z-20 pointer-events-auto"
      >
        Scroll
        <ArrowDown size={14} />
      </a>
    </section>
  );
}