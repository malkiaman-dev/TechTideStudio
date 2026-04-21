import { useEffect, useRef, useState, useCallback } from "react";

/* ─── SVG Icons (unchanged) ────────────────────────────────────────── */
const IconMail = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconPhone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
  </svg>
);
const IconPin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconSend = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m22 2-7 20-4-9-9-4z"/>
    <path d="M22 2 11 13"/>
  </svg>
);
const IconArrow = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const IconCheck = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);
const IconStar = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#fcce00" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const IconSpinner = ({ size = 17 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: "cts-spin 0.9s linear infinite" }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);
const IconClock = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);
const IconUser = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconAt = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/>
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/>
  </svg>
);
const IconMsg = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

/* ─── Hooks (unchanged) ────────────────────────────────────────────── */
const useReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const useTilt = (factor = 8) => {
  const ref = useRef(null);
  const raf = useRef(null);
  const move = useCallback((e) => {
    if (!ref.current) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * factor;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -factor;
      ref.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(4px)`;
    });
  }, [factor]);
  const leave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
  }, []);
  return [ref, move, leave];
};

/* ─── Field component (opaque input backgrounds) ───────────────────── */
const Field = ({ label, name, type = "text", value, onChange, placeholder, Icon, rows }) => {
  const [focus, setFocus] = useState(false);
  const shared = {
    width: "100%",
    background: focus ? "#0a1a2a" : "#0f0f12",
    border: `1px solid ${focus ? "#089ff1" : "rgba(255,255,255,0.12)"}`,
    borderRadius: 12,
    color: "#fff",
    fontFamily: "inherit",
    fontSize: 14,
    lineHeight: 1.6,
    outline: "none",
    paddingLeft: 40,
    paddingRight: 16,
    resize: "none",
    transition: "border .25s, background .25s, box-shadow .25s",
    boxShadow: focus ? "0 0 0 4px rgba(8,159,241,0.15)" : "none",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: focus ? "#089ff1" : "rgba(255,255,255,0.45)", transition: "color .25s" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span style={{ position: "absolute", left: 13, top: rows ? 14 : "50%", transform: rows ? "none" : "translateY(-50%)", color: focus ? "#089ff1" : "rgba(255,255,255,0.35)", transition: "color .25s", pointerEvents: "none", display: "flex" }}>
          <Icon size={15} />
        </span>
        {rows ? (
          <textarea name={name} value={value} onChange={onChange} required rows={rows}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            placeholder={placeholder}
            style={{ ...shared, paddingTop: 12, paddingBottom: 12 }} />
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} required
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
            placeholder={placeholder}
            style={{ ...shared, height: 50 }} />
        )}
      </div>
    </div>
  );
};

/* ─── InfoCard (opaque background, no blur) ────────────────────────── */
const InfoCard = ({ Icon, label, value, sub, href, accent, delay, visible }) => {
  const [hov, setHov] = useState(false);
  const [tref, tMove, tLeave] = useTilt(6);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      ref={tref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); tLeave(); }}
      onMouseMove={tMove}
      style={{
        display: "block",
        textDecoration: "none",
        padding: "30px 26px",
        borderRadius: 20,
        background: hov ? "#111318" : "#0c0d10",
        border: `1px solid ${hov ? accent + "60" : "rgba(255,255,255,0.08)"}`,
        transition: "border .3s, background .3s, box-shadow .3s, opacity .65s, transform .65s",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        boxShadow: hov ? `0 16px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20` : "none",
        willChange: "transform",
        cursor: "pointer",
      }}
    >
      <div style={{
        width: 50, height: 50, borderRadius: 15,
        background: hov ? `${accent}1a` : "#15171e",
        border: `1px solid ${hov ? accent + "40" : "rgba(255,255,255,0.08)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: hov ? accent : "rgba(255,255,255,0.5)",
        marginBottom: 20, transition: "all .3s",
      }}>
        <Icon size={20} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 7 }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 5, lineHeight: 1.4 }}>{value}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{sub}</div>
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6, color: accent, fontSize: 12, fontWeight: 700, opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(-8px)", transition: "all .3s" }}>
        Connect <IconArrow size={13} />
      </div>
    </a>
  );
};

/* ─── Main Component with unified grid background, opaque cards, and consistent typography ── */
export default function Contact() {
  const sectionRef = useRef(null);
  const [secRef, secVis] = useReveal(0.05);
  const [cardsRef, cardsVis] = useReveal(0.08);
  const [bodyRef, bodyVis] = useReveal(0.04);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [btnHov, setBtnHov] = useState(false);
  const [btnDown, setBtnDown] = useState(false);

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

  const onChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 7000);
    }, 1800);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-grid-bg"
      style={{
        position: "relative",
        padding: "clamp(80px,10vw,140px) clamp(16px,4vw,40px)",
        overflow: "hidden",
      }}
    >
      {/* Grid fade mask */}
      <div className="grid-fade-mask" />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1140, margin: "0 auto" }}>

        {/* ── HEADER (updated to match other sections) ── */}
        <div
          ref={secRef}
          style={{
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto clamp(56px,8vw,96px)",
            opacity: secVis ? 1 : 0,
            transform: secVis ? "translateY(0)" : "translateY(40px)",
            transition: "opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)",
          }}
        >
          {/* Eyebrow – simple cyan text, no badge */}
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
            Get in touch
          </span>

          {/* Main heading – same size/weight as other sections */}
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              margin: "0 0 1rem",
              color: "#ffffff",
            }}
          >
            Let's build something{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #089ff1, #02a1fe)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              extraordinary
            </span>{" "}
            <span style={{ color: "#fcce00" }}>together</span>
          </h2>

          {/* Paragraph – consistent style */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: "1rem",
              lineHeight: 1.75,
              maxWidth: "560px",
              margin: "0 auto",
            }}
          >
            We partner with ambitious teams to craft digital products that make a real difference. Tell us about your vision and let's make it happen.
          </p>
        </div>

        {/* ── INFO CARDS (opaque backgrounds) ── */}
        <div
          ref={cardsRef}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 20 }}
        >
          <InfoCard Icon={IconMail} label="Email" value="info@techtidestudio.com" sub="We reply within 24 hours" href="mailto:info@techtidestudio.com" accent="#089ff1" delay={0} visible={cardsVis} />
          <InfoCard Icon={IconPhone} label="Phone" value="682-421-1029" sub="Mon–Fri, 9 am – 6 pm EST" href="tel:682-421-1029" accent="#fcce00" delay={90} visible={cardsVis} />
          <InfoCard Icon={IconPin} label="Location" value="750 S Main St, Suite 150-61, Keller Texas 76248" sub="Suite 150-61, Keller Texas 76248" href="https://maps.google.com" accent="#02a1fe" delay={180} visible={cardsVis} />
        </div>

        {/* ── FORM + SIDEBAR ── */}
        <div
          ref={bodyRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
            gap: 20,
            marginTop: 20,
            opacity: bodyVis ? 1 : 0,
            transform: bodyVis ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 1s cubic-bezier(.16,1,.3,1) .12s, transform 1s cubic-bezier(.16,1,.3,1) .12s",
          }}
        >
          {/* FORM (solid background) */}
          <div style={{ background: "#0a0b0e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(28px,4vw,44px) clamp(24px,3.5vw,40px)", position: "relative", overflow: "hidden" }}>
            <span aria-hidden style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg,transparent,rgba(8,159,241,0.6),transparent)" }} />

            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#089ff1", margin: "0 0 10px" }}>Start a conversation</p>
              <h3 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.025em" }}>Send us a message</h3>
            </div>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <Field label="Full name" name="name" value={form.name} onChange={onChange} placeholder="Alex Johnson" Icon={IconUser} />
              <Field label="Email address" name="email" type="email" value={form.email} onChange={onChange} placeholder="alex@company.com" Icon={IconAt} />
              <Field label="Your message" name="message" value={form.message} onChange={onChange} placeholder="Tell us about your project, goals, timeline…" Icon={IconMsg} rows={5} />

              <button
                type="submit"
                disabled={sending}
                onMouseEnter={() => setBtnHov(true)}
                onMouseLeave={() => { setBtnHov(false); setBtnDown(false); }}
                onMouseDown={() => setBtnDown(true)}
                onMouseUp={() => setBtnDown(false)}
                style={{
                  marginTop: 4, height: 56, borderRadius: 14, border: "none",
                  background: "linear-gradient(135deg,#089ff1,#02a1fe)",
                  color: "#000", fontFamily: "inherit", fontSize: 15, fontWeight: 800,
                  letterSpacing: "0.03em", cursor: sending ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "transform .2s, box-shadow .2s, filter .2s",
                  transform: btnDown ? "scale(0.972)" : btnHov ? "scale(1.016)" : "scale(1)",
                  boxShadow: btnHov ? "0 12px 40px rgba(8,159,241,0.5)" : "0 4px 20px rgba(8,159,241,0.22)",
                  filter: btnHov ? "brightness(1.08)" : "brightness(1)",
                  opacity: sending ? 0.72 : 1,
                }}
              >
                {sending ? <><IconSpinner size={17} /> Sending…</> : <><IconSend size={16} /> Send message</>}
              </button>

              {sent && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "16px 18px", borderRadius: 14, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", animation: "cts-in .4s ease" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#4ade80" }}>
                    <IconCheck size={14} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#4ade80", marginBottom: 3 }}>Message received!</div>
                    <div style={{ fontSize: 12, color: "rgba(74,222,128,0.6)", lineHeight: 1.55 }}>We'll get back to you within 24 hours.</div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* SIDEBAR (opaque cards) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Map */}
            <div style={{ flex: "1 1 auto", minHeight: 240, borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
              <iframe
                title="Studio location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2068.7401062411473!2d-97.25502102760495!3d32.92325079066514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864dd77a9965b18f%3A0x23f495c89584625b!2s750%20S%20Main%20St%20150%2061%2C%20Keller%2C%20TX%2076248%2C%20USA!5e0!3m2!1sen!2s!4v1776802880996!5m2!1sen!2s"
                width="100%" height="100%"
                style={{ position: "absolute", inset: 0, border: 0, filter: "invert(0.88) hue-rotate(190deg) saturate(0.65) brightness(0.82)" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
              <div style={{ position: "absolute", bottom: 14, left: 14, right: 14, background: "#0a0b0e", borderRadius: 14, padding: "13px 16px", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 13 }}>
                <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(8,159,241,0.12)", border: "1px solid rgba(8,159,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#089ff1", flexShrink: 0 }}>
                  <IconPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>TechTide Studio HQ</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>123 Digital Ave, New York, NY 10001</div>
                </div>
              </div>
            </div>

            {/* Hours + testimonial */}
            <div style={{ background: "#0a0b0e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "clamp(22px,3vw,32px) clamp(20px,3vw,30px)", position: "relative", overflow: "hidden" }}>
              <span aria-hidden style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg,transparent,rgba(252,206,0,0.5),transparent)" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, color: "rgba(255,255,255,0.35)" }}>
                <IconClock size={14} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>Office hours</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0 16px", marginBottom: 26 }}>
                {[
                  ["Mon – Fri", "9:00 AM – 6:00 PM"],
                  ["Saturday", "10:00 AM – 2:00 PM"],
                  ["Sunday", "Closed"],
                  ["Timezone", "EST (UTC−5)"],
                ].map(([day, hrs]) => (
                  <div key={day} style={{ display: "contents" }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", paddingBottom: 9 }}>{day}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: hrs === "Closed" ? "rgba(255,255,255,0.2)" : "#fff", textAlign: "right", paddingBottom: 9 }}>{hrs}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: "18px 20px", borderRadius: 16, background: "linear-gradient(135deg,rgba(252,206,0,0.08),rgba(8,159,241,0.06))", border: "1px solid rgba(252,206,0,0.2)" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 10 }}>
                  {[0,1,2,3,4].map(i => <IconStar key={i} size={12} />)}
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, margin: "0 0 8px" }}>
                  "TechTide turned our rough vision into a product users genuinely love. World-class execution."
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#089ff1,#02a1fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#000" }}>SL</div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>Sara L. — Founder, Luminary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cts-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(1.5)} }
        @keyframes cts-spin  { to{transform:rotate(360deg)} }
        @keyframes cts-in    { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        ::placeholder { color: rgba(255,255,255,0.2) !important; }
        textarea::-webkit-scrollbar { width: 4px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        @media (max-width:480px) {
          section { padding-left: 14px !important; padding-right: 14px !important; }
        }
      `}</style>
    </section>
  );
}