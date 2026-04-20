import { useEffect, useRef, useState, useCallback } from "react";
import { Search, PenTool, Code2, Rocket, BarChart3, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery",
    description: "We dive deep into your business goals, target audience, and competition to create a tailored strategy.",
    duration: "1–2 weeks",
    accent: "#089ff1",
    detail: "Stakeholder interviews, competitor audit, KPI mapping",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    description: "Our designers craft wireframes, prototypes, and visual identities that align with your brand.",
    duration: "2–3 weeks",
    accent: "#fcce00",
    detail: "Wireframes, style guide, interactive prototype",
  },
  {
    number: "03",
    icon: Code2,
    title: "Development",
    description: "Agile development with regular updates – we build scalable, fast, and secure digital products.",
    duration: "4–8 weeks",
    accent: "#02a1fe",
    detail: "Sprint reviews, CI/CD pipeline, QA cycles",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    description: "Rigorous testing, deployment, and a smooth go‑live with post‑launch support.",
    duration: "1 week",
    accent: "#089ff1",
    detail: "Load testing, zero-downtime deploy, live monitoring",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Growth",
    description: "Data‑driven optimisation, marketing, and continuous improvement for long‑term success.",
    duration: "Ongoing",
    accent: "#fcce00",
    detail: "A/B testing, SEO, monthly reporting",
  },
];

/* ── Scroll reveal ── */
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

/* ── Magnetic hook ── */
const useMagnetic = (strength = 0.3) => {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${dx}px,${dy}px)`;
  }, [strength]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
};

/* ── Animated progress line (desktop) ── */
const ProgressLine = ({ visible }) => {
  return (
    <div className="absolute top-[72px] left-[10%] w-[80%] h-px hidden lg:block overflow-hidden">
      {/* Track */}
      <div className="absolute inset-0" style={{ background: "rgba(255,255,255,0.07)" }} />
      {/* Fill */}
      <div
        className="absolute inset-y-0 left-0 transition-all duration-[2200ms] ease-out"
        style={{
          width: visible ? "100%" : "0%",
          background: "linear-gradient(90deg,#089ff1,#02a1fe,#fcce00)",
          boxShadow: "0 0 12px #089ff1aa",
        }}
      />
      {/* Travelling dot */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-black transition-all duration-[2200ms] ease-out"
        style={{
          left: visible ? "calc(100% - 6px)" : "0%",
          background: "#fcce00",
          boxShadow: "0 0 10px #fcce00",
        }}
      />
    </div>
  );
};

/* ── Step card ── */
const StepCard = ({ step, idx, visible }) => {
  const Icon = step.icon;
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const onMove = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    setTilt({ x: -(y - r.height / 2) / 16, y: (x - r.width / 2) / 16 });
    setShine({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  };

  const isYellow = step.accent === "#fcce00";

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transitionDelay: `${idx * 120}ms`,
        transform: hovered
          ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-12px) scale(1.03)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.55s cubic-bezier(.23,1,.32,1)",
        opacity: visible ? 1 : 0,
        translate: visible ? "0" : "0 40px",
      }}
      className="group relative cursor-pointer"
    >
      {/* Step number badge — floats above */}
      <div
        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full font-black text-xs transition-all duration-400"
        style={{
          background: hovered ? step.accent : "rgba(255,255,255,0.08)",
          color: hovered ? (isYellow ? "#000" : "#fff") : "rgba(255,255,255,0.5)",
          border: `1.5px solid ${hovered ? step.accent : "rgba(255,255,255,0.12)"}`,
          boxShadow: hovered ? `0 0 16px ${step.accent}88` : "none",
          animation: hovered ? "floatNum 2s ease-in-out infinite" : "none",
        }}
      >
        {step.number}
      </div>

      {/* Card body */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 pt-8 h-full"
        style={{
          background: hovered
            ? `linear-gradient(145deg, ${step.accent}12 0%, rgba(0,0,0,0.6) 100%)`
            : "linear-gradient(145deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
          border: `1px solid ${hovered ? step.accent + "55" : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered ? `0 24px 64px ${step.accent}1a, 0 0 0 1px ${step.accent}22` : "none",
          backdropFilter: "blur(12px)",
          transition: "background 0.4s, border 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Shine */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.07) 0%, transparent 55%)` }}
          />
        )}

        {/* Corner connector lines (desktop) */}
        {idx < steps.length - 1 && (
          <div
            className="absolute top-[72px] -right-4 w-8 h-px hidden lg:block transition-all duration-500"
            style={{
              background: hovered ? `linear-gradient(90deg,${step.accent},transparent)` : "rgba(255,255,255,0.1)",
            }}
          />
        )}

        {/* Icon container */}
        <div
          className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-400"
          style={{
            background: hovered ? `${step.accent}20` : "rgba(255,255,255,0.06)",
            border: `1px solid ${hovered ? step.accent + "40" : "rgba(255,255,255,0.08)"}`,
            boxShadow: hovered ? `0 8px 24px ${step.accent}30` : "none",
          }}
        >
          <Icon
            size={26}
            strokeWidth={1.5}
            style={{
              color: hovered ? step.accent : "rgba(255,255,255,0.5)",
              transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1) rotate(0deg)",
              transition: "color 0.3s, transform 0.4s cubic-bezier(.23,1,.32,1)",
            }}
          />
        </div>

        {/* Title */}
        <h3
          className="text-lg font-extrabold mb-2 tracking-tight transition-colors duration-300"
          style={{ color: hovered ? step.accent : "#fff" }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed mb-4 transition-colors duration-300"
          style={{ color: hovered ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.42)" }}
        >
          {step.description}
        </p>

        {/* Detail line */}
        <p
          className="text-xs leading-relaxed mb-4 transition-all duration-400"
          style={{
            color: step.accent,
            opacity: hovered ? 0.9 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
          }}
        >
          {step.detail}
        </p>

        {/* Duration badge */}
        <div className="flex items-center justify-between">
          <span
            className="inline-block text-xs font-mono px-2.5 py-1 rounded-full transition-all duration-300"
            style={{
              background: hovered ? `${step.accent}20` : "rgba(255,255,255,0.05)",
              color: hovered ? step.accent : "rgba(255,255,255,0.35)",
              border: `1px solid ${hovered ? step.accent + "40" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {step.duration}
          </span>
          <ArrowRight
            size={14}
            style={{
              color: step.accent,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-8px)",
              transition: "opacity 0.3s, transform 0.4s cubic-bezier(.23,1,.32,1)",
            }}
          />
        </div>

        {/* Bottom glow line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${step.accent}, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

/* ── Mobile vertical stepper ── */
const MobileStepper = ({ visible }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  return (
    <div className="flex flex-col gap-0 lg:hidden mt-12">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isYellow = step.accent === "#fcce00";
        const hovered = hoveredIndex === idx;
        return (
          <div key={step.number} className="flex gap-4">
            {/* Line + dot column */}
            <div className="flex flex-col items-center">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border transition-all duration-400"
                style={{
                  background: hovered ? step.accent : "rgba(255,255,255,0.05)",
                  borderColor: hovered ? step.accent : "rgba(255,255,255,0.1)",
                  color: hovered ? (isYellow ? "#000" : "#fff") : "rgba(255,255,255,0.4)",
                  boxShadow: hovered ? `0 0 20px ${step.accent}66` : "none",
                }}
              >
                {step.number}
              </div>
              {idx < steps.length - 1 && (
                <div
                  className="w-px flex-1 mt-2 mb-2 transition-all duration-700"
                  style={{
                    background: visible
                      ? `linear-gradient(to bottom, ${step.accent}, ${steps[idx + 1].accent})`
                      : "rgba(255,255,255,0.06)",
                    minHeight: 40,
                    opacity: visible ? 0.5 : 0.1,
                    transitionDelay: `${idx * 200 + 400}ms`,
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div
              className="flex-1 rounded-2xl p-5 mb-3 border transition-all duration-400"
              style={{
                background: hovered ? `${step.accent}0d` : "rgba(255,255,255,0.03)",
                borderColor: hovered ? `${step.accent}44` : "rgba(255,255,255,0.07)",
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateX(20px)",
                transition: `opacity 0.6s ${idx * 120}ms, transform 0.6s ${idx * 120}ms, background 0.3s, border 0.3s`,
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon size={18} strokeWidth={1.5} style={{ color: step.accent }} />
                <h3 className="font-extrabold text-white text-base">{step.title}</h3>
                <span
                  className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{ background: `${step.accent}18`, color: step.accent }}
                >
                  {step.duration}
                </span>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── Trust pill ── */
const TrustPill = ({ color, label }) => {
  const magnetic = useMagnetic(0.25);
  return (
    <div
      {...magnetic}
      style={{ transition: "transform 0.35s cubic-bezier(.23,1,.32,1)", display: "inline-block" }}
    >
      <span
        className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all duration-300 hover:scale-105"
        style={{
          borderColor: color + "30",
          color: "rgba(255,255,255,0.55)",
          background: color + "0a",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: color, boxShadow: `0 0 8px ${color}` }}
        />
        {label}
      </span>
    </div>
  );
};

/* ── Main Process component ── */
const Process = () => {
  const [headerRef, headerVis] = useReveal(0.2);
  const [stepsRef, stepsVis] = useReveal(0.1);
  const sectionRef = useRef(null);

  // Trust pills data – full set for desktop, first 4 for mobile
  const allTrustPills = [
    { color: "#089ff1", label: "Agile methodology" },
    { color: "#fcce00", label: "Weekly updates" },
    { color: "#02a1fe", label: "Dedicated support" },
    { color: "#089ff1", label: "NDA on request" },
    { color: "#fcce00", label: "Fixed-price options" },
  ];
  const mobileTrustPills = allTrustPills.slice(0, 4); // only first 4 on mobile

  // Mouse move handler for grid glow
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
      id="process-premium"
      ref={sectionRef}
      className="section-grid-bg relative py-24 md:py-32 overflow-hidden"
    >
      {/* Grid fade mask (edge softening) */}
      <div className="grid-fade-mask" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
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
              How We Work
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 1rem",
              color: "#ffffff",
            }}
          >
            A transparent{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #089ff1, #02a1fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              process
            </span>{" "}
            that{" "}
            <span style={{ color: "#fcce00" }}>delivers results</span>
          </h2>

          <p
            style={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            From idea to launch and beyond — a proven methodology that keeps you involved and informed at every stage.
          </p>
        </div>

        {/* Desktop grid (with progress line) */}
        <div
          ref={stepsRef}
          className={`relative hidden lg:block transition-all duration-1000 ${stepsVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <ProgressLine visible={stepsVis} />
          <div className="grid lg:grid-cols-5 gap-5 pt-8">
            {steps.map((step, idx) => (
              <StepCard key={step.number} step={step} idx={idx} visible={stepsVis} />
            ))}
          </div>
        </div>

        {/* Mobile stepper */}
        <div ref={stepsRef}>
          <MobileStepper visible={stepsVis} />
        </div>

        {/* Trust pills – responsive: 2 columns on mobile (4 pills), flex row on desktop (5 pills) */}
        <div className={`mt-16 transition-all duration-700 delay-500 ${stepsVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Mobile: grid with 2 columns, only first 4 pills */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            {mobileTrustPills.map((pill) => (
              <div key={pill.label} className="flex justify-center">
                <TrustPill color={pill.color} label={pill.label} />
              </div>
            ))}
          </div>
          {/* Desktop: flex wrap with all 5 pills */}
          <div className="hidden lg:flex flex-wrap justify-center gap-3">
            {allTrustPills.map((pill) => (
              <TrustPill key={pill.label} color={pill.color} label={pill.label} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatNum { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-5px)} }
        @keyframes pulse-dot {
          0%{transform:translate(-50%,-50%) scale(1);opacity:0.7}
          100%{transform:translate(-50%,-50%) scale(2.5);opacity:0}
        }
      `}</style>
    </section>
  );
};

export default Process;