import { useEffect, useRef, useState, useCallback } from "react";
import { Code2, Palette, Megaphone, ArrowUpRight, Layers } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "FinTech Dashboard",
    category: "web",
    categoryName: "Web Development",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop",
    description: "Interactive dashboard for real‑time financial analytics with AI-powered insights.",
    tags: ["React", "D3.js", "Tailwind"],
    accent: "#089ff1",
    stat: "3.2x",
    statLabel: "Performance",
  },
  {
    id: 2,
    title: "Luxury Brand Identity",
    category: "design",
    categoryName: "Graphic Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=700&h=500&fit=crop",
    description: "Complete brand identity including logo, stationery, and comprehensive guidelines.",
    tags: ["Logo", "Typography", "Branding"],
    accent: "#fcce00",
    stat: "12",
    statLabel: "Deliverables",
  },
  {
    id: 3,
    title: "E‑commerce Growth",
    category: "marketing",
    categoryName: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop",
    description: "SEO + PPC campaign that increased revenue by 240% in six months.",
    tags: ["SEO", "PPC", "Analytics"],
    accent: "#02a1fe",
    stat: "240%",
    statLabel: "Revenue Uplift",
  },
  {
    id: 4,
    title: "Healthcare App UI/UX",
    category: "web",
    categoryName: "Web Development",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop",
    description: "Patient‑centric mobile app with appointment scheduling and telehealth.",
    tags: ["Figma", "Prototype", "Usability"],
    accent: "#089ff1",
    stat: "4.9★",
    statLabel: "App Rating",
  },
  {
    id: 5,
    title: "Restaurant Packaging",
    category: "design",
    categoryName: "Graphic Design",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=700&h=500&fit=crop",
    description: "Sustainable packaging that tells a brand story through illustration and print.",
    tags: ["Packaging", "Illustration", "Print"],
    accent: "#fcce00",
    stat: "8",
    statLabel: "SKUs Designed",
  },
  {
    id: 6,
    title: "SaaS Product Launch",
    category: "marketing",
    categoryName: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=500&fit=crop",
    description: "Multi‑channel launch strategy with email automation and social media ads.",
    tags: ["Email", "Social Ads", "Automation"],
    accent: "#02a1fe",
    stat: "18K",
    statLabel: "Users Day 1",
  },
];

const categories = [
  { value: "all", label: "All Work", icon: Layers },
  { value: "web", label: "Web Dev", icon: Code2 },
  { value: "design", label: "Design", icon: Palette },
  { value: "marketing", label: "Marketing", icon: Megaphone },
];

/* ── Magnetic cursor hook ── */
const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px,${dy}px)`;
  }, [strength]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
};

/* ── 3D tilt card ── */
const TiltCard = ({ project, idx, visible }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({ x: -(y - cy) / 18, y: (x - cx) / 18 });
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{
        transitionDelay: `${idx * 90}ms`,
        transform: hovered
          ? `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px) scale(1.02)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
        transition: hovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(.23,1,.32,1)",
      }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-opacity duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {/* Card shell */}
      <div
        className="relative h-full rounded-2xl overflow-hidden border transition-all duration-500"
        style={{
          background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
          borderColor: hovered ? project.accent + "60" : "rgba(255,255,255,0.08)",
          boxShadow: hovered ? `0 30px 80px ${project.accent}22, 0 0 0 1px ${project.accent}30` : "none",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Shine overlay */}
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none z-20 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Image */}
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.12)" : "scale(1)" }}
          />
          {/* Image overlay gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-400"
            style={{
              background: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)`,
              opacity: hovered ? 1 : 0.4,
            }}
          />

          {/* Stat badge */}
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-400"
            style={{
              background: project.accent,
              color: project.accent === "#fcce00" ? "#000" : "#fff",
              transform: hovered ? "translateY(0) scale(1)" : "translateY(-4px) scale(0.9)",
              opacity: hovered ? 1 : 0,
            }}
          >
            {project.stat} {project.statLabel}
          </div>

          {/* External link */}
          <a
            href="#"
            className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md border transition-all duration-300"
            style={{
              background: "rgba(0,0,0,0.5)",
              borderColor: project.accent + "80",
              transform: hovered ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(-15deg)",
              opacity: hovered ? 1 : 0,
              color: project.accent,
            }}
          >
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-1.5 h-1.5 rounded-full transition-all duration-400"
              style={{
                background: project.accent,
                boxShadow: hovered ? `0 0 8px ${project.accent}` : "none",
              }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: project.accent }}
            >
              {project.categoryName}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-extrabold text-white mb-2 leading-snug tracking-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-4 transition-all duration-500"
            style={{ color: hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.45)" }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border transition-all duration-300"
                style={{
                  borderColor: hovered ? project.accent + "40" : "rgba(255,255,255,0.08)",
                  color: hovered ? project.accent : "rgba(255,255,255,0.4)",
                  background: hovered ? project.accent + "10" : "transparent",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

/* ── Filter button ── */
const FilterBtn = ({ cat, active, onClick }) => {
  const Icon = cat.icon;
  const magnetic = useMagnetic(0.3);

  return (
    <div
      {...magnetic}
      className="inline-block"
      style={{ transition: "transform 0.3s cubic-bezier(.23,1,.32,1)" }}
    >
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 outline-none"
        style={
          active
            ? {
                background: "linear-gradient(135deg,#089ff1,#02a1fe)",
                color: "#fff",
                boxShadow: "0 0 24px #089ff155, 0 4px 16px rgba(8,159,241,0.3)",
              }
            : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
              }
        }
      >
        {Icon && (
          <Icon size={15} style={{ color: active ? "#fff" : "#089ff1" }} />
        )}
        {cat.label}
      </button>
    </div>
  );
};

/* ── Scroll reveal hook ── */
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

/* ── Animated counter ── */
const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, vis] = useReveal(0.5);
  useEffect(() => {
    if (!vis) return;
    const num = parseInt(value);
    if (isNaN(num)) return;
    let start = 0;
    const step = Math.ceil(num / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [vis, value]);
  return <span ref={ref}>{isNaN(parseInt(value)) ? value : count}{suffix}</span>;
};

/* ── CTA Button ── */
const CtaButton = () => {
  const magnetic = useMagnetic(0.25);
  return (
    <div
      {...magnetic}
      style={{ transition: "transform 0.3s cubic-bezier(.23,1,.32,1)", display: "inline-block" }}
    >
      <a
        href="#contact"
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all duration-300"
        style={{ border: "1px solid rgba(8,159,241,0.35)", color: "#fff" }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg,#089ff1,#02a1fe)" }}
        />
        <span className="relative z-10">View All Case Studies</span>
        <ArrowUpRight
          size={18}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </a>
    </div>
  );
};

/* ── Main component with unified grid background and updated typography ── */
const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [headerRef, headerVis] = useReveal(0.2);
  const [gridRef, gridVis] = useReveal(0.05);
  const sectionRef = useRef(null);

  // Mouse move handler for the grid glow (same as About/Services)
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

  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  const stats = [
    { value: "120", suffix: "+", label: "Projects Done" },
    { value: "98", suffix: "%", label: "Happy Clients" },
    { value: "12", suffix: "", label: "Awards Won" },
    { value: "7", suffix: "yr", label: "Experience" },
  ];

  return (
    <section
      id="portfolio-premium"
      ref={sectionRef}
      className="section-grid-bg relative py-24 md:py-32 overflow-hidden"
    >
      {/* Grid fade mask (required for the edge fade effect) */}
      <div className="grid-fade-mask" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* ── Header with updated typography (matches About) ── */}
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Eyebrow label */}
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#089ff1]" />
              <div className="absolute inset-0 rounded-full bg-[#089ff1]" style={{ animation: "pulse-ring 1.8s ease-out infinite" }} />
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
              Our Work
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
            Recent{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #089ff1, #02a1fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              projects
            </span>{" "}
            that{" "}
            <span style={{ color: "#fcce00" }}>inspire</span>
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
            A curated selection of our finest work — from web platforms to visual identities and growth campaigns.
          </p>
        </div>

        {/* ── Stats bar ── */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 transition-all duration-700 delay-100 ${headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center rounded-xl p-4 border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-150 ${headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {categories.map((cat) => (
            <FilterBtn
              key={cat.value}
              cat={cat}
              active={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
            />
          ))}
        </div>

        {/* ── Grid ── */}
        <div ref={gridRef}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((project, idx) => (
              <TiltCard key={project.id} project={project} idx={idx} visible={gridVis} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className={`flex justify-center mt-14 transition-all duration-700 delay-300 ${gridVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <CtaButton />
        </div>
      </div>

      {/* Re‑add the pulse‑ring animation (already used above) */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;