import { useEffect, useRef, useState } from "react";

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const CTASection = () => {
  const orbMouseRef = useRef(null);
  const orb1Ref = useRef(null);
  const rootRef = useRef(null);

  const [eyebrowRef, eyebrowVisible] = useReveal();
  const [headRef, headVisible] = useReveal();
  const [subRef, subVisible] = useReveal();
  const [btnsRef, btnsVisible] = useReveal();
  const [cardsRef, cardsVisible] = useReveal();
  const [trustRef, trustVisible] = useReveal();

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

      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const dx = (x - cx) * 0.015;
      const dy = (y - cy) * 0.015;

      if (orb1Ref.current) {
        orb1Ref.current.style.transform =
          `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
      }
    };

    root.addEventListener("mousemove", handleMove);

    return () => root.removeEventListener("mousemove", handleMove);
  }, []);

  const reveal = (visible, delay = "0s") => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(24px)",
    transition: `opacity 0.7s ${delay} ease, transform 0.7s ${delay} ease`,
  });

  const cards = [
    {
      icon: "⚡",
      color: "rgba(8,159,241,0.15)",
      title: "Fast Response",
      sub: "We reply to project inquiries quickly so you can move forward without unnecessary delays.",
      textColor: "#089ff1",
    },
    {
      icon: "★",
      color: "rgba(252,206,0,0.13)",
      title: "Client-Focused Delivery",
      sub: "We work closely with you to refine the project until it feels right for your business.",
      textColor: "#fcce00",
    },
    {
      icon: "+",
      color: "rgba(0,220,130,0.12)",
      title: "Free Consultation",
      sub: "Start with a simple, no-obligation discussion about your goals and next steps.",
      textColor: "#00dc82",
    },
  ];

  return (
    <section
      ref={rootRef}
      id="cta"
      style={{
        position: "relative",
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "6rem 1.5rem",
        fontFamily: "system-ui",
      }}
    >

      <div
        ref={orb1Ref}
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(8,159,241,0.22) 0%,transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={orbMouseRef}
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,rgba(8,159,241,0.10) 0%,transparent 70%)",
          pointerEvents: "none",
          transform: "translate(-50%,-50%)",
          left: "50%",
          top: "50%",
        }}
      />

      <div style={{ maxWidth: 820, width: "100%", textAlign: "center" }}>

        <div ref={eyebrowRef} style={reveal(eyebrowVisible)}>
          <span
            style={{
              color: "#089ff1",
              letterSpacing: "0.2em",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Let's build together
          </span>
        </div>

        <div ref={headRef} style={{ ...reveal(headVisible), marginTop: 20 }}>
          <h2
            style={{
              fontSize: "clamp(2rem,5vw,3.4rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "#fff",
            }}
          >
            Ready to <span style={{ color: "#089ff1" }}>transform</span>
            <br />
            grow your <span style={{ color: "#fcce00" }}>brand online?</span>
          </h2>
        </div>

        <div ref={subRef} style={{ ...reveal(subVisible), marginTop: 20 }}>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              maxWidth: 560,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            From logo design and modern websites to social media marketing and
            SEO, TechTide Studio helps businesses build a stronger brand and
            grow with confidence online.
          </p>
        </div>

        {/* Buttons */}

        <div
          ref={btnsRef}
          style={{
            ...reveal(btnsVisible),
            display: "flex",
            gap: 14,
            justifyContent: "center",
            marginTop: 40,
          }}
        >

          <PrimaryButton href="#contact">
            Get Started →
          </PrimaryButton>

          <SecondaryButton href="tel:6824211029">
            <ChatIcon />
            Call Us
          </SecondaryButton>

        </div>

        <div
          ref={cardsRef}
          style={{
            ...reveal(cardsVisible),
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 14,
            marginTop: 40,
          }}
        >
          {cards.map((c) => (
            <InfoCard key={c.title} {...c} />
          ))}
        </div>

        <div
          ref={trustRef}
          style={{
            ...reveal(trustVisible),
            display: "flex",
            justifyContent: "center",
            gap: 20,
            marginTop: 40,
          }}
        >
          {["No hidden fees", "Clear Communication", "Reliable delivery", "Ongoing support"].map((t) => (
            <TrustPill key={t}>{t}</TrustPill>
          ))}
        </div>
      </div>
    </section>
  );
};

const PrimaryButton = ({ children, href }) => {
  return (
    <a
      href={href}
      style={{
        padding: "14px 32px",
        borderRadius: 100,
        fontWeight: 600,
        background: "linear-gradient(135deg,#089ff1,#02a1fe)",
        color: "#000",
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      {children}
    </a>
  );
};

const SecondaryButton = ({ children, href }) => {
  return (
    <a
      href={href}
      style={{
        padding: "14px 32px",
        borderRadius: 100,
        fontWeight: 600,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      {children}
    </a>
  );
};

const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#089ff1" strokeWidth="1.5">
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>
  </svg>
);

const InfoCard = ({ icon, color, title, sub }) => (
  <div
    style={{
      padding: "1.4rem",
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,0.08)",
      background: "rgba(255,255,255,0.03)",
    }}
  >
    <div style={{ marginBottom: 10 }}>{icon}</div>
    <div style={{ color: "#fff", fontWeight: 600 }}>{title}</div>
    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>{sub}</div>
  </div>
);

const TrustPill = ({ children }) => (
  <span
    style={{
      padding: "6px 14px",
      borderRadius: 100,
      border: "1px solid rgba(255,255,255,0.08)",
      color: "rgba(255,255,255,0.45)",
      fontSize: 12,
    }}
  >
    ✓ {children}
  </span>
);

export default CTASection;