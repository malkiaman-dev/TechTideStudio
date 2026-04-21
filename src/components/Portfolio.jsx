import { useEffect, useRef, useState, useCallback } from "react";
import {
  Code2,
  Palette,
  Megaphone,
  ArrowUpRight,
  Layers,
  X,
  Calendar,
  Users,
  TrendingUp,
} from "lucide-react";
import { createPortal } from "react-dom";

const projects = [
  {
    id: 1,
    title: "Corporate Business Website",
    category: "web",
    categoryName: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop",
    description: "Modern corporate website built to strengthen credibility and generate quality leads.",
    longDescription:
      "A complete business website designed for a service-based company looking to establish a stronger online presence. The project focused on premium visuals, responsive layouts, clear call-to-actions, and a smooth user experience across devices.",
    challenge:
      "The client had no strong digital presence and needed a professional website that could clearly present services, build trust, and encourage inquiries.",
    outcome:
      "Improved brand presentation, stronger lead generation, and a significantly more professional online presence.",
    tags: ["React", "Responsive", "Business Website"],
    accent: "#089ff1",
    stat: "Responsive",
    statLabel: "Across Devices",
    client: "Corporate Client",
    year: "2024",
    technologies: ["React", "Tailwind CSS", "Vite", "JavaScript"]
  },
  {
    id: 2,
    title: "E-commerce Storefront",
    category: "web",
    categoryName: "Web Development",
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=700&h=500&fit=crop",
    description: "A conversion-focused online store built for product visibility and smooth shopping experience.",
    longDescription:
      "A modern e-commerce storefront created for a growing retail business. The website was designed to make browsing, product discovery, and checkout simpler while presenting the brand in a clean and professional way.",
    challenge:
      "The business needed a store that looked trustworthy, loaded well on mobile, and made it easier for customers to explore products and place orders.",
    outcome:
      "Better product presentation, smoother user flow, and stronger customer confidence in the brand online.",
    tags: ["E-commerce", "UI", "Performance"],
    accent: "#02a1fe",
    stat: "Mobile",
    statLabel: "Optimized",
    client: "Retail Brand",
    year: "2024",
    technologies: ["React", "Tailwind CSS", "Product UI", "Responsive Design"]
  },
  {
    id: 3,
    title: "Luxury Brand Identity",
    category: "design",
    categoryName: "Logo Design",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=700&h=500&fit=crop",
    description: "Professional logo and brand identity crafted for a premium business image.",
    longDescription:
      "A complete branding project focused on logo design, typography direction, color styling, and visual consistency. The identity was designed to make the business look established, memorable, and visually refined across digital and print use.",
    challenge:
      "The client needed a logo and identity that felt premium, trustworthy, and flexible enough to work across multiple platforms.",
    outcome:
      "A stronger visual identity, improved brand recognition, and a more polished business presentation.",
    tags: ["Logo", "Brand Identity", "Typography"],
    accent: "#fcce00",
    stat: "Complete",
    statLabel: "Brand System",
    client: "Luxury Brand",
    year: "2023",
    technologies: ["Adobe Illustrator", "Photoshop", "Brand Guidelines"]
  },
  {
    id: 4,
    title: "Restaurant Branding Kit",
    category: "design",
    categoryName: "Logo Design",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=500&fit=crop",
    description: "A branding package including logo, menu styling, and visual assets for a local food business.",
    longDescription:
      "This project focused on creating a cohesive identity for a restaurant brand through logo refinement, menu visuals, color direction, and promotional design elements that could be used both online and offline.",
    challenge:
      "The brand lacked consistency and needed a stronger identity that customers could recognize easily.",
    outcome:
      "Improved visual consistency, more professional brand presentation, and stronger marketing readiness.",
    tags: ["Logo", "Branding", "Print Assets"],
    accent: "#fcce00",
    stat: "Ready",
    statLabel: "For Promotion",
    client: "Restaurant Client",
    year: "2024",
    technologies: ["Adobe Illustrator", "Photoshop", "Brand Assets"]
  },
  {
    id: 5,
    title: "Social Media Growth Campaign",
    category: "marketing",
    categoryName: "Social Media Marketing",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=700&h=500&fit=crop",
    description: "Creative social media campaign designed to improve reach, consistency, and audience engagement.",
    longDescription:
      "A focused social media marketing project that included branded post design, content direction, posting strategy, and audience-focused creatives to help the business stay visible and active online.",
    challenge:
      "The client needed a more professional social media presence and consistent content that aligned with their brand image.",
    outcome:
      "Improved engagement, stronger visual consistency, and better audience interaction across social platforms.",
    tags: ["Content Strategy", "Social Media", "Brand Reach"],
    accent: "#089ff1",
    stat: "Higher",
    statLabel: "Engagement",
    client: "Local Business",
    year: "2024",
    technologies: ["Content Planning", "Creative Design", "Campaign Strategy"]
  },
  {
    id: 6,
    title: "SEO Visibility Campaign",
    category: "marketing",
    categoryName: "SEO",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=700&h=500&fit=crop",
    description: "SEO project focused on improving search visibility and helping customers discover the business online.",
    longDescription:
      "An SEO-focused growth project built around keyword targeting, on-page optimization, content improvements, and search visibility strategy to help the client appear more effectively in relevant searches.",
    challenge:
      "The business had limited visibility in search results and needed a stronger organic presence to attract qualified visitors.",
    outcome:
      "Better search visibility, stronger keyword presence, and a more discoverable online brand.",
    tags: ["SEO", "Keywords", "Organic Growth"],
    accent: "#02a1fe",
    stat: "Better",
    statLabel: "Search Presence",
    client: "Service Business",
    year: "2024",
    technologies: ["SEO Audit", "Keyword Research", "On-Page SEO", "Analytics"]
  }
];

const categories = [
  { value: "all", label: "All Work", icon: Layers },
  { value: "web", label: "Web Dev", icon: Code2 },
  { value: "design", label: "Design", icon: Palette },
  { value: "marketing", label: "Marketing", icon: Megaphone },
];

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};

const useMagnetic = (strength = 0.35) => {
  const ref = useRef(null);

  const handleMove = useCallback(
    (e) => {
      if (isTouchDevice()) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px,${dy}px)`;
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);

  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
};

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, vis];
};

const Counter = ({ value, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, vis] = useReveal(0.5);

  useEffect(() => {
    if (!vis) return;
    const num = parseInt(value, 10);
    if (Number.isNaN(num)) return;

    let start = 0;
    const step = Math.ceil(num / 40);

    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        setCount(num);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [vis, value]);

  return (
    <span ref={ref}>
      {Number.isNaN(parseInt(value, 10)) ? value : count}
      {suffix}
    </span>
  );
};

// ============================================
// FIXED BODY SCROLL LOCK – no position: fixed
// ============================================
const useBodyScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return;

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = '';
    };
  }, [locked]);
};

const ProjectCard = ({ project, idx, visible, onOpen }) => {
  const [hovered, setHovered] = useState(false);
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef.current) {
      onOpen(project, buttonRef.current);
    } else {
      onOpen(project, null);
    }
  };

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={handleClick}
      className={`group relative rounded-2xl overflow-hidden text-left w-full transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${idx * 90}ms`,
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
      onMouseEnter={() => !isTouchDevice() && setHovered(true)}
      onMouseLeave={() => !isTouchDevice() && setHovered(false)}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden border transition-all duration-500"
        style={{
          background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
          borderColor: hovered ? project.accent + "60" : "rgba(255,255,255,0.08)",
          boxShadow: hovered ? `0 24px 60px ${project.accent}20` : "none",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: project.accent,
              color: project.accent === "#fcce00" ? "#000" : "#fff",
            }}
          >
            {project.stat} {project.statLabel}
          </div>

          <div
            className="absolute bottom-3 right-3 flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300"
            style={{
              background: "rgba(0,0,0,0.45)",
              borderColor: project.accent + "80",
              color: project.accent,
              opacity: hovered ? 1 : 0.85,
            }}
          >
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: project.accent,
                boxShadow: hovered ? `0 0 10px ${project.accent}` : "none",
              }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: project.accent }}
            >
              {project.categoryName}
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white mb-2 leading-snug tracking-tight">
            {project.title}
          </h3>

          <p
            className="text-sm leading-relaxed mb-4 transition-colors duration-300 line-clamp-2"
            style={{ color: hovered ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.5)" }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border transition-all duration-300"
                style={{
                  borderColor: hovered ? project.accent + "40" : "rgba(255,255,255,0.08)",
                  color: hovered ? project.accent : "rgba(255,255,255,0.42)",
                  background: hovered ? project.accent + "10" : "transparent",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 h-0.5 transition-all duration-500"
          style={{
            width: hovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          }}
        />
      </div>
    </button>
  );
};

const FilterBtn = ({ cat, active, onClick }) => {
  const Icon = cat.icon;
  const magnetic = useMagnetic(0.3);

  return (
    <div
      {...(!isTouchDevice() ? magnetic : {})}
      className="inline-block"
      style={{ transition: "transform 0.3s cubic-bezier(.23,1,.32,1)" }}
    >
      <button
        type="button"
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
        {Icon && <Icon size={15} style={{ color: active ? "#fff" : "#089ff1" }} />}
        {cat.label}
      </button>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }) => {
  const contentRef = useRef(null);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, rgba(10,10,15,0.98) 0%, rgba(5,5,10,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 hover:bg-white/10"
          style={{ color: "#fff" }}
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <Modal isOpen={!!project} onClose={onClose}>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 md:h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: project.accent, color: project.accent === "#fcce00" ? "#000" : "#fff" }}
          >
            {project.stat} {project.statLabel}
          </div>
        </div>

        <div className="md:w-1/2 p-6 md:p-8 pt-14 md:pt-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full" style={{ background: project.accent }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: project.accent }}>
              {project.categoryName}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h2>
          <p className="text-white/70 text-sm leading-relaxed mb-6">{project.longDescription || project.description}</p>

          <div className="space-y-4 mb-6">
            {project.challenge && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">Challenge</h4>
                <p className="text-white/70 text-sm">{project.challenge}</p>
              </div>
            )}
            {project.outcome && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">Outcome</h4>
                <p className="text-white/70 text-sm">{project.outcome}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {project.client && (
              <div className="flex items-center gap-2">
                <Users size={14} className="text-white/40" />
                <span className="text-white/60 text-xs">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-white/40" />
                <span className="text-white/60 text-xs">{project.year}</span>
              </div>
            )}
            {project.stat && (
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-white/40" />
                <span className="text-white/60 text-xs">{project.stat} {project.statLabel}</span>
              </div>
            )}
          </div>

          {project.technologies && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full"
                style={{ background: `${project.accent}20`, color: project.accent }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const AllProjectsModal = ({ projects, onClose, onSelectProject }) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-6 md:p-8 pt-14">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">All Projects</h2>
        <p className="text-white/50 text-sm mb-6">Explore our complete portfolio of work</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-h-[70vh] overflow-y-auto pr-2">
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              idx={idx}
              visible={true}
              onOpen={(proj) => {
                onClose();
                setTimeout(() => onSelectProject(proj), 140);
              }}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};

const CtaButton = ({ onClick }) => {
  const magnetic = useMagnetic(0.25);

  return (
    <div
      {...(!isTouchDevice() ? magnetic : {})}
      style={{ transition: "transform 0.3s cubic-bezier(.23,1,.32,1)", display: "inline-block" }}
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all duration-300"
        style={{ border: "1px solid rgba(8,159,241,0.35)", color: "#fff", background: "transparent" }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg,#089ff1,#02a1fe)" }}
        />
        <span className="relative z-10">Explore All Projects</span>
        <ArrowUpRight
          size={18}
          className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </button>
    </div>
  );
};

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [allProjectsModalOpen, setAllProjectsModalOpen] = useState(false);
  const [scrollTargetY, setScrollTargetY] = useState(null);
  const [headerRef, headerVis] = useReveal(0.2);
  const [gridRef, gridVis] = useReveal(0.05);
  const sectionRef = useRef(null);

  // Auto-scroll back to card after modal closes (mobile only)
  useEffect(() => {
    if (selectedProject === null && scrollTargetY !== null) {
      const timeout = setTimeout(() => {
        window.scrollTo({
          top: scrollTargetY,
          behavior: "smooth",
        });
        setScrollTargetY(null);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [selectedProject, scrollTargetY]);

  // Mouse move glow (desktop only)
  useEffect(() => {
    if (isTouchDevice()) return;

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
  
  // ============================================
  // REPLACED STATS SECTION with portfolio‑focused metrics
  // ============================================
  const portfolioMetrics = [
    { value: "99", suffix: "%", label: "Success Rate" },
    { value: "10", suffix: "+", label: "Brands Trusted" },
    { value: "100", suffix: "%", label: "Client Satisfaction" },
    { value: "98", suffix: "%", label: "On‑Time Delivery" },
  ];

  const handleOpenProject = (project, element) => {
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      setScrollTargetY(y);
    }
    setSelectedProject(project);
  };

  const handleOpenProjectFromAllModal = (project) => {
    setSelectedProject(project);
  };

  return (
    <section
      id="portfolio-premium"
      ref={sectionRef}
      className="section-grid-bg relative py-24 md:py-32 overflow-hidden isolate"
      style={{
        background: "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(8,159,241,0.08) 0%, rgba(0,0,0,0) 70%)",
      }}
    >
      <div className="grid-fade-mask pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-20">
        <div
          ref={headerRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#089ff1]" />
              <div
                className="absolute inset-0 rounded-full bg-[#089ff1]"
                style={{ animation: "pulse-ring 1.8s ease-out infinite" }}
              />
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

          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 1rem",
              color: "#ffffff",
            }}
          >
            Projects{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #089ff1, #02a1fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              built
            </span>{" "}
            that <span style={{ color: "#fcce00" }}>for growth</span>
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
            Explore some of our recent work across websites, logo design, social media marketing, and SEO, each crafted to help businesses stand out and perform better online.
          </p>
        </div>

        {/* REPLACED STATS SECTION */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 transition-all duration-700 delay-100 ${
            headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {portfolioMetrics.map((metric, i) => (
            <div
              key={i}
              className="text-center rounded-xl p-4 border"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                <Counter value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">{metric.label}</div>
            </div>
          ))}
        </div>

        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-150 ${
            headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {categories.map((cat) => (
            <FilterBtn
              key={cat.value}
              cat={cat}
              active={activeCategory === cat.value}
              onClick={() => setActiveCategory(cat.value)}
            />
          ))}
        </div>

        <div ref={gridRef}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                visible={gridVis}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </div>

        <div
          className={`flex justify-center mt-14 transition-all duration-700 delay-300 ${
            gridVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <CtaButton onClick={() => setAllProjectsModalOpen(true)} />
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {allProjectsModalOpen && (
        <AllProjectsModal
          projects={projects}
          onClose={() => setAllProjectsModalOpen(false)}
          onSelectProject={handleOpenProjectFromAllModal}
        />
      )}

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;