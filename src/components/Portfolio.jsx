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
    title: "FinTech Dashboard",
    category: "web",
    categoryName: "Web Development",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop",
    description:
      "Interactive dashboard for real-time financial analytics with AI-powered insights.",
    longDescription:
      "A cutting-edge financial analytics platform that processes millions of transactions in real-time. The dashboard provides institutional investors with AI-driven market predictions, risk assessment tools, and portfolio optimization algorithms. Built with React and D3.js, it delivers 60fps visualizations even with large datasets.",
    challenge:
      "Existing solutions were slow and lacked predictive capabilities. Clients needed real-time data processing with intuitive visualizations.",
    outcome:
      "3.2x faster data processing, 40% increase in user engagement, and won 'Best FinTech Innovation' award.",
    tags: ["React", "D3.js", "Tailwind"],
    accent: "#089ff1",
    stat: "3.2x",
    statLabel: "Performance",
    client: "Vanguard Group",
    year: "2024",
    technologies: ["React 18", "D3.js", "Node.js", "WebSockets", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "Luxury Brand Identity",
    category: "design",
    categoryName: "Graphic Design",
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=700&h=500&fit=crop",
    description:
      "Complete brand identity including logo, stationery, and comprehensive guidelines.",
    longDescription:
      "A complete rebranding for a high-end watchmaker, including logo design, color palette, typography system, packaging, and digital assets. The identity reflects precision craftsmanship and timeless elegance.",
    challenge:
      "The brand needed to differentiate from competitors while maintaining heritage appeal. Consistency across print, digital, and product packaging was critical.",
    outcome:
      "12 deliverables produced, brand recognition increased by 65%, featured in 'Brand Identity 2024' publication.",
    tags: ["Logo", "Typography", "Branding"],
    accent: "#fcce00",
    stat: "12",
    statLabel: "Deliverables",
    client: "Horologe Suisse",
    year: "2023",
    technologies: ["Adobe Illustrator", "Photoshop", "Figma", "InDesign"],
  },
  {
    id: 3,
    title: "E-commerce Growth",
    category: "marketing",
    categoryName: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=500&fit=crop",
    description:
      "SEO + PPC campaign that increased revenue by 240% in six months.",
    longDescription:
      "A comprehensive digital marketing strategy for a D2C sustainable fashion brand. The campaign combined technical SEO overhaul, targeted Google Shopping campaigns, and TikTok influencer partnerships.",
    challenge:
      "High competition in sustainable fashion space with limited budget. Needed to achieve ROI positive within first quarter.",
    outcome:
      "240% revenue increase, 180% ROAS, #1 ranking for 12 target keywords, and 45% reduction in CAC.",
    tags: ["SEO", "PPC", "Analytics"],
    accent: "#02a1fe",
    stat: "240%",
    statLabel: "Revenue Uplift",
    client: "EcoWear Collective",
    year: "2024",
    technologies: ["Google Analytics 4", "Semrush", "Meta Ads", "Shopify"],
  },
  {
    id: 4,
    title: "Healthcare App UI/UX",
    category: "web",
    categoryName: "Web Development",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&h=500&fit=crop",
    description:
      "Patient-centric mobile app with appointment scheduling and telehealth.",
    longDescription:
      "A HIPAA-compliant mobile application that connects patients with healthcare providers. Features include video consultations, prescription management, lab results, and secure messaging.",
    challenge:
      "Complex medical workflows needed simplification for elderly users while maintaining clinical accuracy and data security.",
    outcome:
      "4.9★ app store rating, 78% reduction in no-show appointments, and 120K+ downloads in first 3 months.",
    tags: ["Figma", "Prototype", "Usability"],
    accent: "#089ff1",
    stat: "4.9★",
    statLabel: "App Rating",
    client: "HealthFirst Network",
    year: "2023",
    technologies: ["Figma", "React Native", "Firebase", "Twilio"],
  },
  {
    id: 5,
    title: "Restaurant Packaging",
    category: "design",
    categoryName: "Graphic Design",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=700&h=500&fit=crop",
    description:
      "Sustainable packaging that tells a brand story through illustration and print.",
    longDescription:
      "Eco-friendly packaging system for a farm-to-table restaurant chain. The design uses soy-based inks, recycled materials, and hand-drawn illustrations that tell the story of local farming partnerships.",
    challenge:
      "Creating a premium unboxing experience while maintaining compostable materials and cost efficiency.",
    outcome:
      "8 SKUs designed, 32% increase in social media unboxing shares, won 'Sustainable Design Award 2024'.",
    tags: ["Packaging", "Illustration", "Print"],
    accent: "#fcce00",
    stat: "8",
    statLabel: "SKUs Designed",
    client: "Harvest Table",
    year: "2024",
    technologies: ["Adobe Illustrator", "Procreate", "Packaging mockup tools"],
  },
  {
    id: 6,
    title: "SaaS Product Launch",
    category: "marketing",
    categoryName: "Digital Marketing",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=500&fit=crop",
    description:
      "Multi-channel launch strategy with email automation and social media ads.",
    longDescription:
      "Go-to-market strategy for a B2B project management SaaS. The launch included a 6-week pre-launch campaign, beta program, influencer partnerships, and post-launch retention automation.",
    challenge:
      "Competing against established players like Asana and Monday.com. Required a differentiated positioning and aggressive user acquisition.",
    outcome:
      "18K users on day one, 4.2x ROI in first month, and featured in 'Product Hunt' #2 product of the week.",
    tags: ["Email", "Social Ads", "Automation"],
    accent: "#02a1fe",
    stat: "18K",
    statLabel: "Users Day 1",
    client: "TaskFlow AI",
    year: "2024",
    technologies: ["HubSpot", "LinkedIn Ads", "Google Ads", "Zapier"],
  },
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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (isTouch) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [strength, isTouch]
  );

  const handleLeave = useCallback(() => {
    if (isTouch) return;
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, [isTouch]);

  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
};

const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
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

const ProjectCard = ({ project, idx, visible, onClick }) => {
  const [isTouch, setIsTouch] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const handleMouseEnter = () => {
    if (!isTouch) setHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTouch) setHovered(false);
  };

  return (
    <button
      type="button"
      onClick={() => onClick(project)}
      className="group relative rounded-2xl overflow-hidden text-left w-full cursor-pointer"
      style={{
        transitionDelay: `${idx * 90}ms`,
        transition:
          "transform 0.5s cubic-bezier(.23,1,.32,1), opacity 0.7s",
        transform: visible ? "translateY(0)" : "translateY(16px)",
        opacity: visible ? 1 : 0,
        touchAction: "manipulation",
      }}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden border transition-all duration-500"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          borderColor: hovered ? `${project.accent}60` : "rgba(255,255,255,0.08)",
          boxShadow: hovered ? `0 20px 40px ${project.accent}22` : "none",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-52 sm:h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: project.accent,
              color: project.accent === "#fcce00" ? "#000" : "#fff",
            }}
          >
            {project.stat} {project.statLabel}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.accent }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: project.accent }}
            >
              {project.categoryName}
            </span>
          </div>

          <h3 className="text-lg font-extrabold text-white mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/40"
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
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  return (
    <div
      {...(isTouch ? {} : magnetic)}
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
                boxShadow:
                  "0 0 24px #089ff155, 0 4px 16px rgba(8,159,241,0.3)",
                touchAction: "manipulation",
              }
            : {
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.65)",
                touchAction: "manipulation",
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

const useBodyScrollLock = (locked) => {
  useEffect(() => {
    if (!locked) return undefined;

    const scrollY = window.scrollY || window.pageYOffset;
    const originalStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      left: document.body.style.left,
      right: document.body.style.right,
    };

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = originalStyle.overflow;
      document.body.style.position = originalStyle.position;
      document.body.style.top = originalStyle.top;
      document.body.style.width = originalStyle.width;
      document.body.style.left = originalStyle.left;
      document.body.style.right = originalStyle.right;
      window.scrollTo(0, scrollY);
    };
  }, [locked]);
};

const Modal = ({ isOpen, onClose, children }) => {
  const contentRef = useRef(null);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const content = contentRef.current;
    if (!content) return;

    let startY = 0;

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const el = content;
      const currentY = e.touches[0].clientY;
      const isScrollingUp = currentY > startY;
      const isAtTop = el.scrollTop <= 0;
      const isAtBottom =
        Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

      if ((isAtTop && isScrollingUp) || (isAtBottom && !isScrollingUp)) {
        e.preventDefault();
      }
    };

    content.addEventListener("touchstart", onTouchStart, { passive: true });
    content.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      content.removeEventListener("touchstart", onTouchStart);
      content.removeEventListener("touchmove", onTouchMove);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-4"
      style={{
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          background:
            "linear-gradient(135deg, rgba(10,10,15,0.98) 0%, rgba(5,5,10,0.98) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="sticky top-3 ml-auto mr-3 mt-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all duration-200 hover:bg-white/10"
          style={{ touchAction: "manipulation" }}
        >
          <X size={18} />
        </button>

        <div className="-mt-10 sm:-mt-12">{children}</div>
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
            className="absolute top-14 left-4 px-3 py-1 rounded-full text-xs font-bold"
            style={{
              background: project.accent,
              color: project.accent === "#fcce00" ? "#000" : "#fff",
            }}
          >
            {project.stat} {project.statLabel}
          </div>
        </div>

        <div className="md:w-1/2 p-5 sm:p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: project.accent }}
            />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: project.accent }}
            >
              {project.categoryName}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            {project.title}
          </h2>

          <p className="text-white/70 text-sm leading-relaxed mb-6">
            {project.longDescription || project.description}
          </p>

          <div className="space-y-4 mb-6">
            {project.challenge && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">
                  Challenge
                </h4>
                <p className="text-white/70 text-sm">{project.challenge}</p>
              </div>
            )}

            {project.outcome && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-1">
                  Outcome
                </h4>
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
                <span className="text-white/60 text-xs">
                  {project.stat} {project.statLabel}
                </span>
              </div>
            )}
          </div>

          {project.technologies && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                  >
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
                style={{
                  background: `${project.accent}20`,
                  color: project.accent,
                }}
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
  const handleProjectOpen = (project) => {
    onClose();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onSelectProject(project);
      });
    });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="p-4 sm:p-6 md:p-8 pt-14 sm:pt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          All Projects
        </h2>
        <p className="text-white/50 text-sm mb-6">
          Explore our complete portfolio of work
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {projects.map((project) => (
            <button
              type="button"
              key={project.id}
              onClick={() => handleProjectOpen(project)}
              className="cursor-pointer text-left transition-all duration-300 hover:scale-[1.02] w-full"
              style={{ touchAction: "manipulation" }}
            >
              <div
                className="relative rounded-xl overflow-hidden border transition-all duration-300 hover:border-opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.02) 100%)",
                  borderColor: `${project.accent}40`,
                }}
              >
                <div className="relative h-40 sm:h-44 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{
                      background: project.accent,
                      color: project.accent === "#fcce00" ? "#000" : "#fff",
                    }}
                  >
                    {project.stat} {project.statLabel}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-bold text-white mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
};

const CtaButton = ({ onClick }) => {
  const magnetic = useMagnetic(0.25);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  return (
    <div
      {...(isTouch ? {} : magnetic)}
      style={{
        transition: "transform 0.3s cubic-bezier(.23,1,.32,1)",
        display: "inline-block",
      }}
    >
      <button
        type="button"
        onClick={onClick}
        className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-all duration-300"
        style={{
          border: "1px solid rgba(8,159,241,0.35)",
          color: "#fff",
          background: "transparent",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg,#089ff1,#02a1fe)" }}
        />
        <span className="relative z-10 text-xs sm:text-sm">
          View All Case Studies
        </span>
        <ArrowUpRight
          size={16}
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
  const [headerRef, headerVis] = useReveal(0.2);
  const [gridRef, gridVis] = useReveal(0.05);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const section = sectionRef.current;
      if (!section) return;

      const r = section.getBoundingClientRect();
      const x = (((e.clientX - r.left) / r.width) * 100).toFixed(1);
      const y = (((e.clientY - r.top) / r.height) * 100).toFixed(1);

      section.style.setProperty("--mx", `${x}%`);
      section.style.setProperty("--my", `${y}%`);
    };

    if (!isTouchDevice()) {
      window.addEventListener("mousemove", handleMove);
    }

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const stats = [
    { value: "120", suffix: "+", label: "Projects Done" },
    { value: "98", suffix: "%", label: "Happy Clients" },
    { value: "12", suffix: "", label: "Awards Won" },
    { value: "7", suffix: "yr", label: "Experience" },
  ];

  const handleOpenProjectDetail = (project) => {
    setSelectedProject(project);
  };

  const handleOpenAllProjects = () => {
    setAllProjectsModalOpen(true);
  };

  const handleSelectProjectFromAll = (project) => {
    setSelectedProject(project);
  };

  return (
    <section
      id="portfolio-premium"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(8,159,241,0.08) 0%, rgba(0,0,0,0) 70%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
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
            that <span style={{ color: "#fcce00" }}>inspire</span>
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
            A curated selection of our finest work, from web platforms to
            visual identities and growth campaigns.
          </p>
        </div>

        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14 transition-all duration-700 delay-100 ${
            headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center rounded-xl p-4 border"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">
                {s.label}
              </div>
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
                onClick={handleOpenProjectDetail}
              />
            ))}
          </div>
        </div>

        <div
          className={`flex justify-center mt-14 transition-all duration-700 delay-300 ${
            gridVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <CtaButton onClick={handleOpenAllProjects} />
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
          onSelectProject={handleSelectProjectFromAll}
        />
      )}

      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(8,159,241,0.5);
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(8,159,241,0.8);
        }
      `}</style>
    </section>
  );
};

export default Portfolio;