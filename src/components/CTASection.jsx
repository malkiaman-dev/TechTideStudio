import { useEffect, useRef, useState } from "react";

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

const CTASection = () => {
  const mousePos = useRef({ x: 0, y: 0 });
  const orbMouseRef = useRef(null);
  const orb1Ref = useRef(null);
  const rootRef = useRef(null);
  const [eyebrowRef, eyebrowVisible] = useReveal();
  const [headRef, headVisible] = useReveal();
  const [subRef, subVisible] = useReveal();
  const [btnsRef, btnsVisible] = useReveal();
  const [cardsRef, cardsVisible] = useReveal();
  const [trustRef, trustVisible] = useReveal();

  // Mouse move handler for grid glow
  useEffect(() => {
    const handleMove = (e) => {
      const section = rootRef.current;
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

  // Original orb follow logic
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const handleMove = (e) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (orbMouseRef.current) {
        orbMouseRef.current.style.left = x + "px";
        orbMouseRef.current.style.top = y + "px";
      }
      const cx = rect.width / 2, cy = rect.height / 2;
      const dx = (x - cx) * 0.015, dy = (y - cy) * 0.015;
      if (orb1Ref.current) {
        orb1Ref.current.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      }
    };
    const handleLeave = () => {
      if (orbMouseRef.current) { orbMouseRef.current.style.left = "50%"; orbMouseRef.current.style.top = "50%"; }
    };
    root.addEventListener("mousemove", handleMove);
    root.addEventListener("mouseleave", handleLeave);
    return () => { root.removeEventListener("mousemove", handleMove); root.removeEventListener("mouseleave", handleLeave); };
  }, []);

  const reveal = (visible, delay = "0s") => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(24px)",
    transition: `opacity 0.7s ${delay} ease, transform 0.7s ${delay} ease`,
  });

  const cards = [
    { icon: "⚡", color: "rgba(8,159,241,0.15)", title: "24h response", sub: "We reply to every inquiry within one business day, guaranteed.", textColor: "#089ff1" },
    { icon: "★", color: "rgba(252,206,0,0.13)", title: "100% satisfaction", sub: "We iterate until you love it. No hidden fees, no surprises.", textColor: "#fcce00" },
    { icon: "+", color: "rgba(0,220,130,0.12)", title: "Free consultation", sub: "Kick things off with a no-obligation strategy session on us.", textColor: "#00dc82" },
  ];

  return (
    <section
      ref={rootRef}
      id="cta"
      className="section-grid-bg"
      style={{
        position: "relative",
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "6rem 1.5rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Grid fade mask (edge softening) */}
      <div className="grid-fade-mask" />

      {/* Orbs (preserved) */}
      <div ref={orb1Ref} style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,159,241,0.22) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none", transition: "transform 0.1s ease-out" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(252,206,0,0.15) 0%,transparent 70%)", bottom: -80, right: -60, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,159,241,0.12) 0%,transparent 70%)", top: -40, left: -40, pointerEvents: "none" }} />
      <div ref={orbMouseRef} style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(8,159,241,0.10) 0%,transparent 70%)", pointerEvents: "none", transform: "translate(-50%,-50%)", left: "50%", top: "50%", transition: "left 0.15s ease-out, top 0.15s ease-out" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: 820, width: "100%", textAlign: "center" }}>
        {/* Eyebrow – matches other sections */}
        <div ref={eyebrowRef} style={reveal(eyebrowVisible, "0.05s")}>
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
            Let's build together
          </span>
        </div>

        {/* Headline – no gradient, solid colors */}
        <div ref={headRef} style={{ ...reveal(headVisible, "0.15s"), marginBottom: "1.4rem" }}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 1rem",
              color: "#ffffff",
            }}
          >
            Ready to{" "}
            <span style={{ color: "#089ff1" }}>transform</span>
            <br />
            your{" "}
            <span style={{ color: "#fcce00" }}>digital presence</span>?
          </h2>
        </div>

        {/* Subtext – matches paragraph style */}
        <div ref={subRef} style={{ ...reveal(subVisible, "0.25s"), marginBottom: "2.8rem" }}>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            Build something extraordinary with us. Start your journey toward digital excellence — from first idea to polished launch.
          </p>
        </div>

        {/* Buttons */}
        <div ref={btnsRef} style={{ ...reveal(btnsVisible, "0.35s"), display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: "3rem" }}>
          <PrimaryButton>Start a Project →</PrimaryButton>
          <SecondaryButton>💬 Let's Talk</SecondaryButton>
        </div>

        {/* Cards */}
        <div ref={cardsRef} style={{ ...reveal(cardsVisible, "0.45s"), display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: "2.8rem" }}>
          {cards.map((c) => <InfoCard key={c.title} {...c} />)}
        </div>

        {/* Contact row */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 24px", marginBottom: "1.8rem" }}>
          <ContactLink href="tel:+1234567890">📞 +1 (234) 567-890</ContactLink>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <ContactLink href="mailto:hello@agency.com">✉ hello@agency.com</ContactLink>
        </div>

        {/* Trust pills */}
        <div ref={trustRef} style={{ ...reveal(trustVisible, "0.55s"), display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 20px", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {["No hidden fees", "Free consultation", "Transparent pricing", "Dedicated support"].map((t) => (
            <TrustPill key={t}>{t}</TrustPill>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(.7); }
        }
      `}</style>
    </section>
  );
};

const PrimaryButton = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 32px", borderRadius: 100, fontSize: "1rem", fontWeight: 600, border: "none",
        background: hovered ? "linear-gradient(135deg,#fcce00,#089ff1)" : "linear-gradient(135deg,#089ff1,#02a1fe)",
        color: "#000", cursor: "pointer",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        boxShadow: hovered ? "0 0 40px rgba(8,159,241,0.4)" : "none",
        transition: "all 0.25s ease",
      }}
    >{children}</button>
  );
};

const SecondaryButton = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 32px", borderRadius: 100, fontSize: "1rem", fontWeight: 600,
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(8,159,241,0.4)" : "rgba(255,255,255,0.10)"}`,
        color: "#fff", cursor: "pointer",
        transform: hovered ? "scale(1.04)" : "scale(1)",
        transition: "all 0.25s ease",
      }}
    >{children}</button>
  );
};

const InfoCard = ({ icon, color, textColor, title, sub }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1.4rem 1.2rem", borderRadius: 16, textAlign: "left",
        border: `1px solid ${hovered ? "rgba(8,159,241,0.35)" : "rgba(255,255,255,0.08)"}`,
        background: hovered ? "rgba(8,159,241,0.06)" : "rgba(255,255,255,0.03)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.25s ease", cursor: "default",
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12, fontSize: 18, color: textColor }}>{icon}</div>
      <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 600, marginBottom: 4 }}>{title}</div>
      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.78rem", lineHeight: 1.5 }}>{sub}</div>
    </div>
  );
};

const ContactLink = ({ href, children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? "#089ff1" : "rgba(255,255,255,0.4)", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.2s", display: "inline-flex", alignItems: "center", gap: 6 }}>
      {children}
    </a>
  );
};

const TrustPill = ({ children }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "5px 14px", borderRadius: 100,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${hovered ? "rgba(252,206,0,0.35)" : "rgba(255,255,255,0.08)"}`,
        color: hovered ? "rgba(252,206,0,0.8)" : "rgba(255,255,255,0.45)",
        fontSize: "0.75rem", transition: "all 0.2s", cursor: "default",
      }}
    >
      <span style={{ color: "#089ff1" }}>✓</span>{children}
    </span>
  );
};

export default CTASection;