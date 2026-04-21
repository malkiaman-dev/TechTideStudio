import { useEffect, useRef, useState } from "react";
import { Trophy, Users, Zap, Award, Globe2, Clock } from "lucide-react";

const statsData = [
  {
    icon: Trophy,
    value: 60,
    suffix: "+",
    label: "Projects Completed",
    description: "Websites, branding, and marketing work delivered",
    accent: "#089ff1",
    detail: "Across multiple industries",
  },
  {
    icon: Users,
    value: 100,
    suffix: "%",
    label: "Client Satisfaction",
    description: "Businesses satisfied with our work",
    accent: "#fcce00",
    detail: "Positive feedback from clients",
  },
  {
    icon: Zap,
    value: 24,
    suffix: "/7",
    label: "Support Availability",
    description: "Reliable support when you need it",
    accent: "#02a1fe",
    detail: "Quick response and guidance",
  },
  {
    icon: Globe2,
    value: 20,
    suffix: "+",
    label: "Websites Delivered",
    description: "Business websites built and launched",
    accent: "#089ff1",
    detail: "Responsive and optimized",
  },
  {
    icon: Award,
    value: 80,
    suffix: "+",
    label: "Brand Assets Created",
    description: "Logos and branding materials designed",
    accent: "#fcce00",
    detail: "For growing businesses",
  },
  {
    icon: Clock,
    value: 4,
    suffix: "+",
    label: "Years Experience",
    description: "Designing and building digital solutions",
    accent: "#02a1fe",
    detail: "Continuous learning and growth",
  },
];

/* ── Scroll reveal ── */
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

/* ── Animated counter ── */
const AnimatedCounter = ({ target, suffix, accent, started }) => {
  const [count, setCount] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!started || done.current) return;
    done.current = true;
    const duration = 1800;
    const startTime = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCount(Math.round(ease(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target]);

  return (
    <div className="flex items-end justify-center gap-0.5 leading-none mb-1 sm:mb-2">
      <span
        className="font-black text-4xl sm:text-5xl lg:text-6xl tabular-nums"
        style={{ color: accent, textShadow: `0 0 40px ${accent}55` }}
      >
        {count}
      </span>
      <span
        className="font-black text-2xl sm:text-3xl lg:text-4xl mb-0.5 sm:mb-1"
        style={{ color: accent, opacity: 0.7 }}
      >
        {suffix}
      </span>
    </div>
  );
};

/* ── Radial ring decoration ── */
const RadialRing = ({ accent, hovered }) => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid meet"
  >
    <circle
      cx="50" cy="50" r="44"
      fill="none"
      stroke={accent}
      strokeWidth="0.4"
      strokeDasharray="4 6"
      style={{
        opacity: hovered ? 0.35 : 0.1,
        transition: "opacity 0.4s",
        transformOrigin: "50% 50%",
        animation: "spinRing 18s linear infinite",
      }}
    />
    <circle
      cx="50" cy="50" r="36"
      fill="none"
      stroke={accent}
      strokeWidth="0.3"
      strokeDasharray="2 8"
      style={{
        opacity: hovered ? 0.2 : 0.06,
        transition: "opacity 0.4s",
        transformOrigin: "50% 50%",
        animation: "spinRing 12s linear infinite reverse",
      }}
    />
  </svg>
);

/* ── Stat card ── */
const StatCard = ({ stat, idx, visible }) => {
  const Icon = stat.icon;
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    if (window.innerWidth < 768) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setTilt({ x: -(y - r.height / 2) / 18, y: (x - r.width / 2) / 18 });
    setShine({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transitionDelay: `${idx * 90}ms`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered && window.innerWidth >= 768
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-12px) scale(1.03)`
            : "perspective(900px) rotateX(0) rotateY(0) translateY(0) scale(1)"
          : "translateY(36px)",
        transition: hovered && window.innerWidth >= 768
          ? "transform 0.1s ease-out, opacity 0.6s"
          : `transform 0.55s cubic-bezier(.23,1,.32,1), opacity 0.6s ${idx * 90}ms`,
      }}
      className="group relative rounded-2xl overflow-hidden"
    >
      {/* Card shell */}
      <div
        className="relative rounded-2xl overflow-hidden p-4 sm:p-7 text-center h-full flex flex-col items-center justify-center"
        style={{
          background: hovered
            ? `linear-gradient(145deg,${stat.accent}14 0%,rgba(0,0,0,0.6) 100%)`
            : "linear-gradient(145deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
          border: `1px solid ${hovered ? stat.accent + "55" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered
            ? `0 28px 72px ${stat.accent}1c, 0 0 0 1px ${stat.accent}22, inset 0 1px 0 ${stat.accent}20`
            : "none",
          backdropFilter: "blur(14px)",
          transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Radial rings */}
        <RadialRing accent={stat.accent} hovered={hovered} />

        {/* Shine */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl hidden md:block"
            style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%,rgba(255,255,255,0.07) 0%,transparent 55%)` }}
          />
        )}

        {/* Icon */}
        <div className="relative z-10 flex justify-center mb-3 sm:mb-5">
          <div
            className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl transition-all duration-400"
            style={{
              background: hovered ? `${stat.accent}22` : "rgba(255,255,255,0.05)",
              border: `1px solid ${hovered ? stat.accent + "44" : "rgba(255,255,255,0.08)"}`,
              boxShadow: hovered ? `0 0 32px ${stat.accent}44` : "none",
            }}
          >
            <Icon
              className="w-6 h-6 sm:w-7 sm:h-7"
              strokeWidth={1.5}
              style={{
                color: hovered ? stat.accent : "rgba(255,255,255,0.45)",
                transform: hovered ? "scale(1.2) rotate(-6deg)" : "scale(1) rotate(0)",
                transition: "color 0.35s, transform 0.45s cubic-bezier(.23,1,.32,1)",
              }}
            />
            {hovered && (
              <div
                className="absolute inset-0 rounded-xl sm:rounded-2xl"
                style={{
                  background: `${stat.accent}18`,
                  animation: "iconPulse 1.6s ease-in-out infinite",
                }}
              />
            )}
          </div>
        </div>

        {/* Counter */}
        <div className="relative z-10">
          <AnimatedCounter
            target={stat.value}
            suffix={stat.suffix}
            accent={stat.accent}
            started={visible}
          />
        </div>

        {/* Label */}
        <h3
          className="relative z-10 text-xs sm:text-base font-extrabold tracking-tight mb-1 transition-colors duration-300"
          style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.85)" }}
        >
          {stat.label}
        </h3>

        {/* Description */}
        <p
          className="relative z-10 text-[10px] sm:text-sm mb-2 sm:mb-3 transition-colors duration-300 leading-tight"
          style={{ color: hovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.35)" }}
        >
          {stat.description}
        </p>

        {/* Detail line — slides up on hover */}
        <p
          className="relative z-10 text-[9px] sm:text-xs font-semibold transition-all duration-400 hidden sm:block"
          style={{
            color: stat.accent,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
          }}
        >
          {stat.detail}
        </p>

        {/* Bottom bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-500"
          style={{
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg,${stat.accent},transparent)`,
          }}
        />

        {/* Corner accent dot */}
        <div
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full transition-all duration-400"
          style={{
            background: stat.accent,
            opacity: hovered ? 1 : 0.25,
            boxShadow: hovered ? `0 0 8px ${stat.accent}` : "none",
          }}
        />
      </div>
    </div>
  );
};

/* ── Marquee trust bar ── */
const trusts = [
  "✓ Client-Focused Approach",
  "✓ Clear Communication",
  "✓ Reliable Project Delivery",
  "✓ Dedicated Support",
  "✓ Flexible Pricing Options",
  "✓ Long-Term Growth Support",
];
const TrustMarquee = ({ visible }) => (
  <div
    className="relative overflow-hidden mt-10 sm:mt-14 rounded-full border py-2.5 sm:py-3"
    style={{
      borderColor: "rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.02)",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(16px)",
      transition: "opacity 0.7s 0.5s, transform 0.7s 0.5s",
    }}
  >
    <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg,#000,transparent)" }} />
    <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg,#000,transparent)" }} />

    <div className="flex gap-6 sm:gap-10 w-max" style={{ animation: "marquee 22s linear infinite" }}>
      {[...trusts, ...trusts].map((t, i) => (
        <span key={i} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-nowrap font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
          <span style={{ color: i % 3 === 0 ? "#089ff1" : i % 3 === 1 ? "#fcce00" : "#02a1fe", fontSize: 10 }}>●</span>
          {t}
        </span>
      ))}
    </div>
  </div>
);

/* ── Main Stats component with unified grid background and updated typography ── */
const Stats = () => {
  const [headerRef, headerVis] = useReveal(0.2);
  const [gridRef, gridVis] = useReveal(0.1);
  const sectionRef = useRef(null);

  // Mouse move handler for grid glow (same as About/Services)
  useEffect(() => {
    const handleMove = (e) => {
      const section = sectionRef.current;
      if (section) {
        const r = section.getBoundingClientRect();
        const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
        const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);
        section.style.setProperty("--mx", x + "%");
        section.style.setProperty("--my", y + "%");
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="stats-premium"
      ref={sectionRef}
      className="section-grid-bg relative py-20 md:py-36 overflow-hidden"
    >
      {/* Grid fade mask (edge softening) */}
      <div className="grid-fade-mask" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
        {/* ── Header with updated typography (matches About/Portfolio/Process) ── */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700 ${headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#089ff1]" />
              <div className="absolute w-2 h-2 rounded-full bg-[#089ff1]" style={{ top: 0, left: 0, animation: "pulse-dot 1.8s ease-out infinite" }} />
            </div>
            <span
              style={{
                display: "inline-block",
                color: "#089ff1",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                fontSize: "11px",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              By the Numbers
            </span>
          </div>

          {/* Main heading */}
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 1rem",
              color: "#ffffff",
            }}
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #089ff1, #02a1fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              impact
            </span>{" "}
            in{" "}
            <span style={{ color: "#fcce00" }}>numbers</span>
          </h2>

          {/* Description paragraph */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Metrics that reflect our commitment to quality, innovation, and client success.
          </p>
        </div>

        {/* ── Grid (2 columns on mobile, 3 on desktop) ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6"
        >
          {statsData.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} idx={idx} visible={gridVis} />
          ))}
        </div>

        {/* ── Marquee ── */}
        <TrustMarquee visible={gridVis} />
      </div>

      {/* Required keyframes (preserve animations) */}
      <style>{`
        @keyframes spinRing { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes iconPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes pulse-dot { 0%{transform:translate(-50%,-50%) scale(1);opacity:.7} 100%{transform:translate(-50%,-50%) scale(2.5);opacity:0} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </section>
  );
};

export default Stats;