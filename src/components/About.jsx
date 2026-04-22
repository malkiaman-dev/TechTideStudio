import { useEffect, useRef, useState, useCallback } from "react";

const About = () => {
  const statsRef = useRef(null);
  const [counted, setCounted] = useState(false);
  const [counts, setCounts] = useState({ projects: 0, retention: 0, awards: 0 });
  const [activeStats, setActiveStats] = useState({});
  const [ripples, setRipples] = useState({});

  const stats = [
    {
      id: "projects",
      target: 50,
      suffix: "+",
      label: "Projects Delivered",
      detail: "Every project is designed to strengthen your business identity",
      color: "#089ff1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
        </svg>
      ),
    },
    {
      id: "retention",
      target: 98,
      suffix: "%",
      label: "Client Retention",
      detail: "Clients stay because results speak for themselves",
      color: "#02a1fe",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      id: "support",
      target: null,
      display: "24/7",
      label: "Support Available",
      detail: "Round-the-clock help across every time zone",
      color: "#fcce00",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
    },
    {
      id: "awards",
      target: 12,
      suffix: "",
      label: "Industry Awards",
      detail: "Recognised by Awwwards, FWA & Webby Awards",
      color: "#089ff1",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={28} height={28}>
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
    },
  ];

 const capabilities = [
  {
    title: "Web Development",
    desc: "Modern, responsive websites built to represent your business and perform across every screen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#089ff1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Logo Design",
    desc: "Distinctive and professional brand identities that help businesses stand out with confidence.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#089ff1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <circle cx="13.5" cy="6.5" r="2.5" />
        <circle cx="18.5" cy="11.5" r="2.5" />
        <circle cx="13.5" cy="17.5" r="2.5" />
        <circle cx="6.5" cy="13.5" r="2.5" />
        <path d="M8 21c3 0 5-2 5-5" />
      </svg>
    ),
  },
  {
    title: "Social Media Marketing",
    desc: "Creative and strategic content that helps your brand connect, engage, and grow online.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#089ff1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <path d="M3 11l18-8v18l-18-8z" />
        <path d="M11 13l3 3" />
      </svg>
    ),
  },
  {
    title: "SEO Solutions",
    desc: "Improve visibility on Google and attract more customers organically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#089ff1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={22} height={22}>
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
];

  // Handle mouse move for grid glow and card effects
  useEffect(() => {
    const handleMove = (e) => {
      const section = document.getElementById("about");
      if (section) {
        const r = section.getBoundingClientRect();
        const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
        const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
        section.style.setProperty("--mx", x + "%");
        section.style.setProperty("--my", y + "%");
      }

      document.querySelectorAll("[data-mouse-card]").forEach((card) => {
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

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          const duration = 1200;
          const targets = { projects: 150, retention: 98, awards: 12 };

          Object.entries(targets).forEach(([key, target]) => {
            let current = 0;
            const step = target / (duration / 16);

            const timer = setInterval(() => {
              current = Math.min(current + step, target);
              setCounts((prev) => ({ ...prev, [key]: Math.round(current) }));
              if (current >= target) clearInterval(timer);
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [counted]);

  const getStatDisplay = (stat) => {
    if (stat.display) return stat.display;
    return counts[stat.id] + stat.suffix;
  };

  const handleStatInteract = useCallback((e, id) => {
    setActiveStats((prev) => ({ ...prev, [id]: !prev[id] }));

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rippleId = Date.now();

    setRipples((prev) => ({ ...prev, [id]: { x, y, id: rippleId } }));

    setTimeout(() => {
      setRipples((prev) => {
        const next = { ...prev };
        if (next[id]?.id === rippleId) delete next[id];
        return next;
      });
    }, 700);
  }, []);

  const liftIn = (e) => {
    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
  };

  const liftOut = (e) => {
    e.currentTarget.style.transform = "translateY(0) scale(1)";
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes rippleOut {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(4); opacity: 0; }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(8,159,241,0.4); }
          70% { box-shadow: 0 0 0 10px rgba(8,159,241,0); }
          100% { box-shadow: 0 0 0 0 rgba(8,159,241,0); }
        }

        /* --- GRID BACKGROUND STYLES (added without changing existing bg) --- */
        .about-grid-bg {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(transparent, transparent 39px, rgba(8, 159, 241, 0.08) 39px, rgba(8, 159, 241, 0.08) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(8, 159, 241, 0.08) 39px, rgba(8, 159, 241, 0.08) 40px);
          background-size: 40px 40px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        /* Mouse-follow glow for the grid */
        .about-grid-bg::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(8, 159, 241, 0.15), transparent 60%);
          pointer-events: none;
        }

        /* Radial fade to soften grid edges (matching Services) */
        .about-grid-fade {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 30%, transparent 40%, rgba(0,0,0,0.6) 90%);
          pointer-events: none;
          z-index: 0;
        }

        .tt-fade { opacity: 0; animation: fadeUp 0.7s ease forwards; }
        .tt-float { animation: float 3.6s ease-in-out infinite; }
        .tt-float2 { animation: float2 4.2s ease-in-out 0.4s infinite; }

        .tt-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 640px) {
          .tt-stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 14px;
          }
        }

        .tt-stat {
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(10px);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.4rem 0.9rem;
          text-align: center;
          cursor: pointer;
          transition:
            transform 0.35s cubic-bezier(.22,.68,0,1.2),
            border-color 0.3s,
            box-shadow 0.35s,
            background 0.3s;
          position: relative;
          overflow: hidden;
          -webkit-tap-highlight-color: transparent;
          user-select: none;
        }

        .tt-stat::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(8,159,241,0.16) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .tt-stat:hover::before { opacity: 1; }

        .tt-stat:hover {
          border-color: rgba(8,159,241,0.55);
          box-shadow: 0 18px 44px rgba(8,159,241,0.15);
        }

        .tt-stat.active {
          border-color: rgba(8,159,241,0.6);
          background: rgba(8,159,241,0.08);
          animation: pulseRing 0.6s ease-out;
        }

        .tt-stat.active-yellow {
          border-color: rgba(252,206,0,0.6);
          background: rgba(252,206,0,0.06);
          box-shadow: 0 18px 44px rgba(252,206,0,0.10);
        }

        .tt-stat:hover .tt-stat-icon { transform: scale(1.18) rotate(-6deg); }
        .tt-stat.active .tt-stat-icon { transform: scale(1.2) rotate(-8deg); }
        .tt-stat-icon { transition: transform 0.3s ease; }

        .tt-stat-inner {
          transition: opacity 0.2s, transform 0.3s;
        }

        .tt-stat-detail {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.25s, transform 0.3s;
          pointer-events: none;
          font-size: 11px;
          line-height: 1.5;
          color: rgba(255,255,255,0.85);
          font-weight: 500;
        }

        .tt-stat.active .tt-stat-inner {
          opacity: 0;
          transform: scale(0.85);
        }

        .tt-stat.active .tt-stat-detail {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .tt-ripple {
          position: absolute;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          transform: scale(0);
          background: rgba(255,255,255,0.2);
          pointer-events: none;
          animation: rippleOut 0.7s ease-out forwards;
        }

        .tt-mv {
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 0.5px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 1.8rem;
          cursor: default;
          transition:
            transform 0.35s cubic-bezier(.22,.68,0,1.2),
            border-color 0.3s,
            box-shadow 0.35s;
          position: relative;
          overflow: hidden;
        }

        .tt-mv::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(8,159,241,0.12) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .tt-mv.yellow::after {
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(252,206,0,0.13) 0%, transparent 60%);
        }

        .tt-mv:hover::after { opacity: 1; }
        .tt-mv:hover { border-color: rgba(8,159,241,0.45); box-shadow: 0 20px 50px rgba(8,159,241,0.13); }
        .tt-mv.yellow:hover { border-color: rgba(252,206,0,0.45); box-shadow: 0 20px 50px rgba(252,206,0,0.10); }
        .tt-mv:hover .tt-mv-icon { transform: scale(1.12) rotate(-4deg); }
        .tt-mv-icon { transition: transform 0.3s ease; }

        .tt-cap {
          background: rgba(255,255,255,0.025);
          backdrop-filter: blur(10px);
          border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.4rem;
          cursor: default;
          transition:
            transform 0.35s cubic-bezier(.22,.68,0,1.2),
            border-color 0.3s,
            box-shadow 0.35s;
          position: relative;
          overflow: hidden;
        }

        .tt-cap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(8,159,241,0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .tt-cap:hover::before { opacity: 1; }

        .tt-cap:hover {
          border-color: rgba(8,159,241,0.5);
          box-shadow: 0 16px 38px rgba(8,159,241,0.15);
        }

        .tt-cap:hover .tt-cap-icon { transform: scale(1.15) rotate(-5deg); }
        .tt-cap:hover .tt-cap-title { color: #089ff1; }
        .tt-cap:hover .tt-cap-arrow { stroke: #089ff1; transform: translate(3px,-3px); }
        .tt-cap-icon { transition: transform 0.3s ease; }
        .tt-cap-title { transition: color 0.25s; color: #fff; }
        .tt-cap-arrow { transition: stroke 0.25s, transform 0.25s; }

        @media (prefers-reduced-motion: reduce) {
          .tt-float, .tt-float2 { animation: none !important; }
        }
      `}</style>

      <section
        id="about"
        className="relative py-24 section-transparent"
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* --- GRID BACKGROUND (added without changing existing bg) --- */}
        <div className="about-grid-bg" />
        <div className="about-grid-fade" />

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="tt-fade" style={{ textAlign: "center", marginBottom: "3.5rem", animationDelay: "0.05s" }}>
            <span style={{ display: "inline-block", color: "#089ff1", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 11, fontWeight: 600, marginBottom: "1rem" }}>
              About Us
            </span>

            <h2 style={{ fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 700, lineHeight: 1.15, color: "#ffffff", margin: "0 0 1rem" }}>
              Where{" "}
              <span style={{ background: "linear-gradient(90deg,#089ff1,#02a1fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Creative
              </span>{" "}
              ideas meet
              <br />
              <span style={{ color: "#fcce00" }}>Digital Growth</span>
            </h2>

            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1rem", lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>
              At TechTide Studio, we help businesses grow through smart branding, modern websites, social media marketing, and SEO. Our goal is to create digital solutions that not only look professional, but also support real business results.
            </p>
          </div>

          <div ref={statsRef} className="tt-stats-grid tt-fade" style={{ animationDelay: "0.15s" }}>
            {stats.map((stat) => {
              const isActive = !!activeStats[stat.id];
              const ripple = ripples[stat.id];
              const isYellow = stat.color === "#fcce00";

              return (
                <div
                  key={stat.id}
                  className={`tt-stat${isActive ? (isYellow ? " active-yellow" : " active") : ""}`}
                  data-mouse-card
                  onClick={(e) => handleStatInteract(e, stat.id)}
                  onMouseEnter={liftIn}
                  onMouseLeave={liftOut}
                  style={{ minHeight: 140 }}
                >
                  {ripple && (
                    <span
                      key={ripple.id}
                      className="tt-ripple"
                      style={{
                        left: ripple.x - 30,
                        top: ripple.y - 30,
                        background: isYellow ? "rgba(252,206,0,0.25)" : "rgba(8,159,241,0.25)",
                      }}
                    />
                  )}

                  <div className="tt-stat-inner">
                    <div
                      className="tt-stat-icon"
                      style={{ marginBottom: 10, color: stat.color, display: "flex", justifyContent: "center" }}
                    >
                      {stat.icon}
                    </div>

                    <div style={{ fontSize: "clamp(1.6rem,4vw,2rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1 }}>
                      {getStatDisplay(stat)}
                    </div>

                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.3 }}>
                      {stat.label}
                    </div>

                    <div style={{ fontSize: 9, color: isYellow ? "rgba(252,206,0,0.4)" : "rgba(8,159,241,0.5)", marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      tap to learn more
                    </div>
                  </div>

                  <div className="tt-stat-detail" style={{ color: isYellow ? "#fcce00" : "#089ff1" }}>
                    <span>{stat.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="tt-fade"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16, marginBottom: "3.5rem", animationDelay: "0.25s" }}
          >
            <div className="tt-mv tt-float" data-mouse-card onMouseEnter={liftIn} onMouseLeave={liftOut}>
              <div className="tt-mv-icon" style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(8,159,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#089ff1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="12" y1="2" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="22" y2="12" />
                </svg>
              </div>

              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>Mission</h3>

              <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>
                To help businesses build a strong and professional digital presence through logo design, modern websites, social media marketing, and SEO services that support long-term growth.
              </p>
            </div>

            <div className="tt-mv yellow tt-float2" data-mouse-card onMouseEnter={liftIn} onMouseLeave={liftOut}>
              <div className="tt-mv-icon" style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(252,206,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fcce00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={24} height={24}>
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", marginBottom: 8 }}>Vision</h3>

              <p style={{ fontSize: "0.875rem", lineHeight: 1.75, color: "rgba(255,255,255,0.65)" }}>
                To become a trusted digital growth partner for businesses that want creative branding, stronger online visibility, and practical digital solutions that make a real difference.
              </p>
            </div>
          </div>

          <div className="tt-fade" style={{ animationDelay: "0.35s" }}>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <span style={{ color: "#fcce00", textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 11, fontWeight: 600, display: "block", marginBottom: 6 }}>
                Core Capabilities
              </span>

              <h3 style={{ fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, color: "#ffffff" }}>
                What we do best
              </h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14 }}>
              {capabilities.map((cap) => (
                <div key={cap.title} className="tt-cap" data-mouse-card onMouseEnter={liftIn} onMouseLeave={liftOut}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div className="tt-cap-icon" style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(8,159,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {cap.icon}
                    </div>

                    <svg className="tt-cap-arrow" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>

                  <div className="tt-cap-title" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4 }}>
                    {cap.title}
                  </div>

                  <div style={{ fontSize: "0.8rem", lineHeight: 1.65, color: "rgba(255,255,255,0.55)" }}>
                    {cap.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;