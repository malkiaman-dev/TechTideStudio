import { useEffect, useRef, useState, useCallback } from "react";
import {
  Code2,
  Palette,
  Megaphone,
  Layout,
  Video,
  Mail,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Custom websites, web apps, and e-commerce platforms built for speed, scalability, and seamless user experience.",
    tags: ["React", "Node.js", "WordPress"],
    color: "#089ff1",
    stat: "150+ sites shipped",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description:
      "Visual identity, branding, print materials, and digital assets that capture attention and communicate your story.",
    tags: ["Logo", "Branding", "Illustration"],
    color: "#02a1fe",
    stat: "300+ brand assets",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    description:
      "Data-driven strategies including SEO, PPC, social media, and content marketing to grow your online presence.",
    tags: ["SEO", "PPC", "Social Media"],
    color: "#fcce00",
    stat: "3× avg. ROI",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    description:
      "User-centric interfaces, wireframes, prototypes, and usability testing to create intuitive digital experiences.",
    tags: ["Wireframing", "Prototyping", "Testing"],
    color: "#089ff1",
    stat: "98% usability score",
  },
  {
    icon: Video,
    title: "Video Editing",
    description:
      "Professional video production, editing, motion graphics, and post-production for marketing and storytelling.",
    tags: ["Editing", "Motion", "Color Grading"],
    color: "#02a1fe",
    stat: "500+ videos produced",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    description:
      "Automated campaigns, newsletters, segmentation, and analytics that drive engagement and conversions.",
    tags: ["Automation", "Newsletters", "Analytics"],
    color: "#fcce00",
    stat: "42% avg. open rate",
  },
];

const Services = () => {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const [headerVisible, setHeaderVisible] = useState(false);
  const [gridVisible, setGridVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [ripples, setRipples] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const makeObs = (setter, threshold = 0.15) =>
      new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) setter(true);
        },
        { threshold }
      );

    const h = makeObs(setHeaderVisible, 0.2);
    const g = makeObs(setGridVisible, 0.1);
    const c = makeObs(setCtaVisible, 0.2);

    if (headerRef.current) h.observe(headerRef.current);
    if (gridRef.current) g.observe(gridRef.current);
    if (ctaRef.current) c.observe(ctaRef.current);

    return () => {
      h.disconnect();
      g.disconnect();
      c.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      document.querySelectorAll("[data-svc-card]").forEach((card) => {
        const r = card.getBoundingClientRect();
        const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
        const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const triggerRipple = useCallback((e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => ({ ...prev, [idx]: { x, y, id } }));

    setTimeout(() => {
      setRipples((prev) => {
        const next = { ...prev };
        if (next[idx]?.id === id) delete next[idx];
        return next;
      });
    }, 750);
  }, []);

  const handleCardClick = useCallback(
    (e, idx) => {
      triggerRipple(e, idx);
      setActiveCard((prev) => (prev === idx ? null : idx));
    },
    [triggerRipple]
  );

  const liftIn = (e) => {
    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
  };

  const liftOut = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rippleOut {
          0%   { transform: scale(0); opacity: 0.45; }
          100% { transform: scale(5); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes tagPop {
          0%   { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .svc-fade-in { opacity: 0; }
        .svc-fade-in.visible { animation: fadeUp 0.7s ease forwards; }

        .svc-card {
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(10px);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 1.6rem;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2),
                      border-color 0.3s, box-shadow 0.35s, background 0.3s;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .svc-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), var(--card-glow, rgba(8,159,241,0.12)) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .svc-card:hover::before,
        .svc-card.active::before {
          opacity: 1;
        }

        .svc-card:hover {
          box-shadow: 0 18px 42px rgba(8,159,241,0.08);
        }

        .svc-card.active {
          background: rgba(255,255,255,0.04);
        }

        .svc-card:hover .svc-icon-wrap,
        .svc-card.active .svc-icon-wrap {
          transform: scale(1.12) rotate(-5deg);
        }

        .svc-card:hover .svc-title,
        .svc-card.active .svc-title {
          color: var(--card-color, #089ff1);
        }

        .svc-card:hover .svc-arrow {
          stroke: var(--card-color, #089ff1);
          transform: translate(3px,-3px);
        }

        .svc-card.active .svc-arrow {
          stroke: var(--card-color, #089ff1);
        }

        .svc-icon-wrap { transition: transform 0.3s ease; }
        .svc-title { transition: color 0.25s; color: #fff; }
        .svc-arrow { transition: stroke 0.25s, transform 0.25s; }

        .svc-card.active .svc-icon-bg {
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }

        .svc-card.active .svc-tag {
          animation: tagPop 0.3s ease forwards;
        }

        .svc-card.active .svc-tag:nth-child(1) { animation-delay: 0.05s; }
        .svc-card.active .svc-tag:nth-child(2) { animation-delay: 0.10s; }
        .svc-card.active .svc-tag:nth-child(3) { animation-delay: 0.15s; }

        .svc-stat {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 999px;
          border: 0.5px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.05);
          color: rgba(255,255,255,0.55);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s, transform 0.3s;
          pointer-events: none;
        }

        .svc-card:hover .svc-stat,
        .svc-card.active .svc-stat {
          opacity: 1;
          transform: translateY(0);
          color: var(--card-color, #089ff1);
          border-color: var(--card-color, #089ff1);
          background: rgba(8,159,241,0.06);
        }

        .svc-ripple {
          position: absolute;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          transform: scale(0);
          pointer-events: none;
          animation: rippleOut 0.75s ease-out forwards;
        }

        .svc-cta {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem 2rem;
          border-radius: 20px;
          border: 0.5px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(10px);
          transition: border-color 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }

        .svc-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(8,159,241,0.08) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .svc-cta:hover::before { opacity: 1; }

        .svc-cta:hover {
          border-color: rgba(8,159,241,0.25);
          box-shadow: 0 16px 36px rgba(8,159,241,0.08);
        }

        @media (min-width: 560px) {
          .svc-cta { flex-direction: row; }
        }

        .svc-cta-btn {
          display: inline-block;
          padding: 0.55rem 1.5rem;
          border-radius: 999px;
          background: #089ff1;
          color: #000;
          font-weight: 700;
          font-size: 0.875rem;
          text-decoration: none;
          transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
          white-space: nowrap;
        }

        .svc-cta-btn:hover {
          background: #02a1fe;
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(8,159,241,0.28);
        }

        @media (prefers-reduced-motion: reduce) {
          .svc-card, .svc-cta-btn { transition: none !important; animation: none !important; }
        }
      `}</style>

      <section
        id="services"
        style={{
          position: "relative",
          padding: "6rem 1.5rem",
          overflow: "hidden",
          background: "transparent",
        }}
      >
        {/* Grid background overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              repeating-linear-gradient(transparent, transparent 39px, rgba(8, 159, 241, 0.08) 39px, rgba(8, 159, 241, 0.08) 40px),
              repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(8, 159, 241, 0.08) 39px, rgba(8, 159, 241, 0.08) 40px)
            `,
            backgroundSize: "40px 40px",
            opacity: 0.35,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        
        {/* Subtle radial gradient to fade grid edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 30%, transparent 40%, rgba(0,0,0,0.6) 90%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ maxWidth: 1120, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            ref={headerRef}
            className={`svc-fade-in${headerVisible ? " visible" : ""}`}
            style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 4rem", animationDelay: "0.05s" }}
          >
            <span
              style={{
                display: "inline-block",
                color: "#089ff1",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: 11,
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              What We Offer
            </span>

            <h2
              style={{
                fontSize: "clamp(2rem,5vw,3.4rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#fff",
                margin: "0 0 1rem",
              }}
            >
              Premium{" "}
              <span
                style={{
                  background: "linear-gradient(90deg,#089ff1,#02a1fe)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                digital services
              </span>
              <br />
              <span style={{ color: "#fcce00" }}>tailored for growth</span>
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "1rem",
                lineHeight: 1.75,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              From concept to execution, we provide end-to-end solutions that elevate your brand and deliver measurable results.
            </p>
          </div>

          <div
            ref={gridRef}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              gap: 16,
              marginBottom: "4rem",
            }}
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isActive = activeCard === idx;
              const ripple = ripples[idx];
              const isYellow = service.color === "#fcce00";
              const glowColor = isYellow
                ? "rgba(252,206,0,0.10)"
                : service.color === "#02a1fe"
                ? "rgba(2,161,254,0.10)"
                : "rgba(8,159,241,0.10)";

              return (
                <div
                  key={service.title}
                  data-svc-card
                  className={`svc-card svc-fade-in${gridVisible ? " visible" : ""}${isActive ? " active" : ""}`}
                  style={{
                    animationDelay: `${0.05 + idx * 0.07}s`,
                    "--card-color": service.color,
                    "--card-glow": glowColor,
                    borderColor: isActive ? `${service.color}44` : undefined,
                    boxShadow: isActive ? `0 18px 40px ${service.color}14` : undefined,
                  }}
                  onClick={(e) => handleCardClick(e, idx)}
                  onTouchStart={(e) => handleCardClick(e, idx)}
                  onMouseEnter={(e) => {
                    setHoveredCard(idx);
                    liftIn(e);
                  }}
                  onMouseLeave={(e) => {
                    setHoveredCard(null);
                    liftOut(e);
                  }}
                >
                  {ripple && (
                    <span
                      key={ripple.id}
                      className="svc-ripple"
                      style={{
                        left: ripple.x - 40,
                        top: ripple.y - 40,
                        background: isYellow ? "rgba(252,206,0,0.18)" : "rgba(8,159,241,0.18)",
                      }}
                    />
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <div className="svc-icon-wrap" style={{ position: "relative" }}>
                      <div
                        className="svc-icon-bg"
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          background: isActive
                            ? `linear-gradient(135deg, ${service.color}22, ${service.color}0f)`
                            : "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.3s",
                        }}
                      >
                        <Icon
                          size={26}
                          strokeWidth={1.5}
                          color={isActive || hoveredCard === idx ? service.color : "rgba(255,255,255,0.7)"}
                          style={{ transition: "color 0.25s" }}
                        />
                      </div>
                    </div>

                    <div className="svc-stat">
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "currentColor",
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
                      {service.stat}
                    </div>
                  </div>

                  <h3 className="svc-title" style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                      color: "rgba(255,255,255,0.62)",
                      marginBottom: "1rem",
                    }}
                  >
                    {service.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "1.1rem" }}>
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="svc-tag"
                        style={{
                          fontSize: 11,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: isActive ? `${service.color}14` : "rgba(255,255,255,0.05)",
                          color: isActive ? service.color : "rgba(255,255,255,0.50)",
                          border: `0.5px solid ${isActive ? service.color + "33" : "rgba(255,255,255,0.08)"}`,
                          transition: "background 0.25s, color 0.25s, border-color 0.25s",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      textDecoration: "none",
                      transition: "color 0.25s, gap 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = service.color;
                      e.currentTarget.style.gap = "8px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.gap = "4px";
                    }}
                  >
                    Learn More
                    <svg
                      className="svc-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width={14}
                      height={14}
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>

                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: service.color,
                        boxShadow: `0 0 8px ${service.color}`,
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            ref={ctaRef}
            className={`svc-fade-in${ctaVisible ? " visible" : ""}`}
            style={{ textAlign: "center", animationDelay: "0.3s" }}
          >
            <div className="svc-cta" data-svc-card style={{ display: "inline-flex" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Sparkles size={18} color="#fcce00" />
                <span style={{ color: "rgba(255,255,255,0.80)", fontSize: "0.9rem" }}>
                  Ready to transform your digital presence?
                </span>
              </div>

              <a href="#contact" className="svc-cta-btn">
                Start a Project
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;