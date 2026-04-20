import { useEffect, useRef, useState, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, FinTech Solutions",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    quote: "TechTide Studio transformed our digital presence. Their web development team delivered a platform that increased user engagement by 200%. Exceptional communication and technical expertise.",
    rating: 5,
    accent: "#089ff1",
    metric: "+200%",
    metricLabel: "Engagement",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director, Luxe Brands",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    quote: "The UI/UX design and digital marketing strategy from TechTide boosted our conversion rates dramatically. They're not just vendors – they're true partners in growth.",
    rating: 5,
    accent: "#fcce00",
    metric: "3.8x",
    metricLabel: "Conversions",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder, Creative Studio",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    quote: "Incredible attention to detail and creativity. The branding package they created perfectly captures our essence. Highly recommend for any creative business.",
    rating: 5,
    accent: "#02a1fe",
    metric: "12",
    metricLabel: "Brand Assets",
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO, HealthTech Inc.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote: "Their video editing and email marketing campaigns helped us launch successfully. Professional, on time, and results-driven. A top‑tier agency.",
    rating: 5,
    accent: "#089ff1",
    metric: "18K",
    metricLabel: "Day-1 Users",
  },
];

/* ── hooks ── */
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);
  const onMouseMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px,${(e.clientY - r.top - r.height / 2) * strength}px)`;
  }, [strength]);
  const onMouseLeave = useCallback(() => { if (ref.current) ref.current.style.transform = "translate(0,0)"; }, []);
  return { ref, onMouseMove, onMouseLeave };
};

/* ── Star row ── */
const Stars = ({ count, size = 14 }) => (
  <div className="flex gap-0.5">
    {[...Array(count)].map((_, i) => (
      <Star key={i} size={size} style={{ fill: "#fcce00", color: "#fcce00" }} />
    ))}
  </div>
);

/* ── Grid card (no cursor dependency) ── */
const GridCard = ({ t, idx, visible }) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setTilt({ x: -(y - r.height / 2) / 20, y: (x - r.width / 2) / 20 });
    setShine({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transitionDelay: `${idx * 100}ms`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px) scale(1.02)`
            : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)"
          : "translateY(32px)",
        transition: hovered
          ? "transform 0.1s ease-out, opacity 0.6s"
          : `transform 0.55s cubic-bezier(.23,1,.32,1), opacity 0.6s ${idx * 100}ms`,
      }}
      className="group relative rounded-2xl overflow-hidden"
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden p-6"
        style={{
          background: hovered
            ? `linear-gradient(145deg,${t.accent}14 0%,rgba(0,0,0,0.55) 100%)`
            : "linear-gradient(145deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
          border: `1px solid ${hovered ? t.accent + "55" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered ? `0 28px 70px ${t.accent}1a, 0 0 0 1px ${t.accent}22` : "none",
          backdropFilter: "blur(12px)",
          transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
        }}
      >
        {/* shine */}
        {hovered && (
          <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%,rgba(255,255,255,0.06) 0%,transparent 55%)` }} />
        )}

        {/* Top row: giant quote mark + metric badge */}
        <div className="flex items-start justify-between mb-5">
          <svg width="40" height="32" viewBox="0 0 40 32" fill="none">
            <path d="M0 32V19.2C0 8.533 5.6 2.133 16.8 0L18.4 3.2C13.067 4.8 9.867 8 8.8 12.8H16V32H0ZM24 32V19.2C24 8.533 29.6 2.133 40.8 0L42.4 3.2C37.067 4.8 33.867 8 32.8 12.8H40V32H24Z" style={{ fill: t.accent, opacity: 0.25 }} />
          </svg>

          {/* Metric badge */}
          <div
            className="flex flex-col items-end transition-all duration-400"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(-8px)" }}
          >
            <span className="text-xl font-black" style={{ color: t.accent }}>{t.metric}</span>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.accent, opacity: 0.6 }}>{t.metricLabel}</span>
          </div>
        </div>

        {/* Quote */}
        <p
          className="text-sm leading-relaxed mb-6 transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)" }}
        >
          "{t.quote}"
        </p>

        {/* Divider */}
        <div className="h-px mb-5 transition-all duration-500" style={{ background: `linear-gradient(90deg,${t.accent}${hovered ? "40" : "15"},transparent)` }} />

        {/* Avatar row */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-11 h-11 rounded-full object-cover"
              style={{
                border: `2px solid ${hovered ? t.accent : "rgba(255,255,255,0.1)"}`,
                boxShadow: hovered ? `0 0 16px ${t.accent}55` : "none",
                transition: "border 0.3s, box-shadow 0.3s",
              }}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black" style={{ background: "#22c55e" }} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-extrabold text-white text-sm leading-none mb-1">{t.name}</h4>
            <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.4)" }}>{t.role}</p>
            <div className="mt-1.5"><Stars count={t.rating} size={11} /></div>
          </div>
          <ArrowUpRight
            size={16}
            style={{
              color: t.accent,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translate(0,0)" : "translate(-4px,4px)",
              transition: "all 0.3s",
              flexShrink: 0,
            }}
          />
        </div>

        {/* bottom sweep line */}
        <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500" style={{ width: hovered ? "100%" : "0%", background: `linear-gradient(90deg,${t.accent},transparent)` }} />
      </div>
    </div>
  );
};

/* ── Cinematic carousel ── */
const Carousel = ({ visible }) => {
  const [cur, setCur] = useState(0);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((next, direction = 1) => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => { setCur(next); setAnimating(false); }, 420);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => go((next + 1) % testimonials.length, 1), 5500);
  }, [animating]);

  useEffect(() => {
    timerRef.current = setTimeout(() => go((cur + 1) % testimonials.length, 1), 5500);
    return () => clearTimeout(timerRef.current);
  }, []);

  const prev = () => go((cur - 1 + testimonials.length) % testimonials.length, -1);
  const next = () => go((cur + 1) % testimonials.length, 1);

  const t = testimonials[cur];
  const prevMag = useMagnetic(0.4);
  const nextMag = useMagnetic(0.4);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Main card */}
      <div
        className="relative rounded-2xl overflow-hidden p-8 sm:p-10"
        style={{
          background: `linear-gradient(145deg,${t.accent}12 0%,rgba(0,0,0,0.7) 100%)`,
          border: `1px solid ${t.accent}40`,
          boxShadow: `0 40px 100px ${t.accent}18`,
          backdropFilter: "blur(16px)",
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${dir * 40}px) scale(0.97)`
            : "translateX(0) scale(1)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(.23,1,.32,1), border 0.5s, box-shadow 0.5s",
        }}
      >
        {/* BG monogram */}
        <div
          className="absolute top-6 right-8 text-[120px] font-black leading-none select-none pointer-events-none"
          style={{ color: t.accent, opacity: 0.04, fontVariantNumeric: "tabular-nums" }}
        >
          "
        </div>

        {/* Stars */}
        <div className="mb-6"><Stars count={t.rating} size={16} /></div>

        {/* Quote */}
        <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-8 relative z-10">
          "{t.quote}"
        </p>

        {/* Divider */}
        <div className="h-px mb-7" style={{ background: `linear-gradient(90deg,${t.accent}50,transparent)` }} />

        {/* Author + metric */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-0 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-14 h-14 rounded-full object-cover"
                style={{ border: `2.5px solid ${t.accent}`, boxShadow: `0 0 20px ${t.accent}55` }}
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-black" style={{ background: "#22c55e" }} />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">{t.name}</h4>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{t.role}</p>
            </div>
          </div>

          {/* Metric */}
          <div
            className="sm:text-right px-5 py-3 rounded-xl"
            style={{ background: `${t.accent}15`, border: `1px solid ${t.accent}30` }}
          >
            <div className="text-2xl font-black" style={{ color: t.accent }}>{t.metric}</div>
            <div className="text-xs font-bold uppercase tracking-widest" style={{ color: t.accent, opacity: 0.6 }}>{t.metricLabel}</div>
          </div>
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between mt-8 px-2">
        {/* Prev */}
        <div {...prevMag} style={{ transition: "transform 0.3s cubic-bezier(.23,1,.32,1)", display: "inline-block" }}>
          <button
            onClick={prev}
            className="flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#089ff1"; e.currentTarget.style.borderColor = "#089ff1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((item, idx) => (
            <button
              key={idx}
              onClick={() => go(idx, idx > cur ? 1 : -1)}
              className="rounded-full transition-all duration-400"
              style={{
                width: idx === cur ? 28 : 8,
                height: 8,
                background: idx === cur ? item.accent : "rgba(255,255,255,0.2)",
                boxShadow: idx === cur ? `0 0 10px ${item.accent}` : "none",
              }}
            />
          ))}
        </div>

        {/* Next */}
        <div {...nextMag} style={{ transition: "transform 0.3s cubic-bezier(.23,1,.32,1)", display: "inline-block" }}>
          <button
            onClick={next}
            className="flex items-center justify-center w-11 h-11 rounded-full border transition-all duration-300 hover:scale-110"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#089ff1"; e.currentTarget.style.borderColor = "#089ff1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── View toggle ── */
const ViewToggle = ({ mode, setMode }) => {
  const options = ["Grid", "Carousel"];
  return (
    <div className="inline-flex rounded-full p-1" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => setMode(o.toLowerCase())}
          className="px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300"
          style={
            mode === o.toLowerCase()
              ? { background: "linear-gradient(135deg,#089ff1,#02a1fe)", color: "#fff", boxShadow: "0 0 16px #089ff155" }
              : { color: "rgba(255,255,255,0.4)" }
          }
        >
          {o}
        </button>
      ))}
    </div>
  );
};

/* ── Main Component with unified grid background and typography ── */
const Testimonials = () => {
  const [mode, setMode] = useState("grid");
  const [headerRef, headerVis] = useReveal(0.2);
  const [bodyRef, bodyVis] = useReveal(0.1);
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
      id="testimonials-premium"
      ref={sectionRef}
      className="section-grid-bg relative py-24 md:py-32 overflow-hidden"
    >
      {/* Grid fade mask (edge softening) */}
      <div className="grid-fade-mask" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Header with updated typography (matches About/Portfolio/Process) */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ${headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
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
              Testimonials
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
            What our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #089ff1, #02a1fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              clients
            </span>{" "}
            say about{" "}
            <span style={{ color: "#fcce00" }}>us</span>
          </h2>

          {/* Description paragraph */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto 2rem",
            }}
          >
            Don't just take our word for it — hear from the brands we've helped grow.
          </p>

          <ViewToggle mode={mode} setMode={setMode} />
        </div>

        {/* Content */}
        <div ref={bodyRef}>
          {mode === "grid" ? (
            <div className="grid sm:grid-cols-2 gap-5">
              {testimonials.map((t, idx) => (
                <GridCard key={t.id} t={t} idx={idx} visible={bodyVis} />
              ))}
            </div>
          ) : (
            <div className={`transition-all duration-700 ${bodyVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
              <Carousel visible={bodyVis} />
            </div>
          )}
        </div>
      </div>

      {/* Re-add pulse-dot animation */}
      <style>{`
        @keyframes pulse-dot {
          0% { transform: translate(-50%,-50%) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%,-50%) scale(2.5); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;