import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logoSrc from "../assets/techtide-logo.png";

const PARTICLES = [
  { id: 0, x: 12,  y: 18, size: 2.5, delay: "0s",    dur: "4s"   },
  { id: 1, x: 82,  y: 12, size: 2,   delay: "0.5s",  dur: "3.5s" },
  { id: 2, x: 88,  y: 72, size: 3.5, delay: "1s",    dur: "5s"   },
  { id: 3, x: 8,   y: 78, size: 2,   delay: "0.3s",  dur: "4.5s" },
  { id: 4, x: 52,  y: 8,  size: 3,   delay: "0.8s",  dur: "3s"   },
  { id: 5, x: 22,  y: 62, size: 2,   delay: "1.2s",  dur: "4s"   },
  { id: 6, x: 72,  y: 88, size: 3,   delay: "0.6s",  dur: "5s"   },
  { id: 7, x: 38,  y: 92, size: 2.5, delay: "0.9s",  dur: "3.5s" },
  { id: 8, x: 65,  y: 30, size: 1.5, delay: "1.4s",  dur: "4.2s" },
  { id: 9, x: 30,  y: 42, size: 2,   delay: "0.2s",  dur: "3.8s" },
];

const CORNERS = [
  { top: 28, left: 28,    bTop: true,    bLeft: true  },
  { top: 28, right: 28,   bTop: true,    bRight: true },
  { bottom: 28, left: 28,  bBottom: true, bLeft: true  },
  { bottom: 28, right: 28, bBottom: true, bRight: true },
];

const getStatus = (pct) => {
  if (pct < 30) return "Initializing";
  if (pct < 62) return "Loading Assets";
  if (pct < 90) return "Building Interface";
  return "Ready";
};

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    let frame;
    let startTs = null;
    const loadDuration = 1700;

    const tick = (ts) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const raw = Math.min((elapsed / loadDuration) * 100, 100);
      setCount(Math.floor(raw));

      if (raw < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          gsap.to(containerRef.current, {
            yPercent: -105,
            duration: 0.95,
            ease: "expo.inOut",
            onComplete,
          });
        }, 380);
      }
    };

    const t = setTimeout(() => { frame = requestAnimationFrame(tick); }, 150);
    return () => { clearTimeout(t); cancelAnimationFrame(frame); };
  }, [onComplete]);

  return (
    <>
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#05070c",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(rgba(8,159,241,0.11) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          animation: "pl-fade-in 1s ease forwards",
        }} />

        {/* Central glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 720, height: 720,
          background: "radial-gradient(circle, rgba(8,159,241,0.07) 0%, transparent 68%)",
          animation: "pl-glow-pulse 2.8s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* Secondary yellow glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(252,206,0,0.04) 0%, transparent 65%)",
          animation: "pl-glow-pulse 2.8s ease-in-out 1.4s infinite",
          pointerEvents: "none",
        }} />

        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(8,159,241,0.18) 30%, rgba(252,206,0,0.08) 70%, transparent 100%)",
          animation: "pl-scan 2.8s linear infinite",
          pointerEvents: "none",
        }} />

        {/* Floating particles */}
        {PARTICLES.map((p) => (
          <div key={p.id} style={{
            position: "absolute",
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: "50%",
            background: p.id % 3 === 0 ? "#fcce00" : "#089ff1",
            boxShadow: p.id % 3 === 0
              ? `0 0 ${p.size * 3}px rgba(252,206,0,0.7)`
              : `0 0 ${p.size * 3}px rgba(8,159,241,0.7)`,
            opacity: 0,
            animation: `pl-float ${p.dur} ease-in-out ${p.delay} infinite`,
          }} />
        ))}

        {/* Corner brackets */}
        {CORNERS.map((c, i) => (
          <div key={i} style={{
            position: "absolute",
            top: c.top, right: c.right, bottom: c.bottom, left: c.left,
            width: 22, height: 22,
            borderTop: c.bTop ? "1.5px solid rgba(8,159,241,0.45)" : "none",
            borderBottom: c.bBottom ? "1.5px solid rgba(8,159,241,0.45)" : "none",
            borderLeft: c.bLeft ? "1.5px solid rgba(8,159,241,0.45)" : "none",
            borderRight: c.bRight ? "1.5px solid rgba(8,159,241,0.45)" : "none",
            animation: `pl-corner-in 0.7s cubic-bezier(.23,1,.32,1) ${0.1 + i * 0.08}s both`,
          }} />
        ))}

        {/* Main content */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", flexDirection: "column", alignItems: "center",
          textAlign: "center",
        }}>

          {/* Logo */}
          <div style={{ marginBottom: 14, animation: "pl-logo-in 0.9s cubic-bezier(.23,1,.32,1) 0.1s both" }}>
            <img
              src={logoSrc}
              alt="TechTide Studio"
              style={{
                height: 54,
                filter: "drop-shadow(0 0 22px rgba(8,159,241,0.65)) drop-shadow(0 0 48px rgba(8,159,241,0.2))",
              }}
            />
          </div>

          {/* Descriptor */}
          <p style={{
            margin: "0 0 52px",
            color: "rgba(255,255,255,0.28)",
            fontSize: 10,
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            animation: "pl-fade-up 0.8s ease 0.35s both",
          }}>
            Digital Agency
          </p>

          {/* Progress track */}
          <div style={{
            width: 300,
            marginBottom: 16,
            animation: "pl-fade-up 0.8s ease 0.45s both",
          }}>
            <div style={{
              height: 2,
              background: "rgba(255,255,255,0.07)",
              borderRadius: 999,
              position: "relative",
              overflow: "visible",
            }}>
              <div style={{
                height: "100%",
                width: `${count}%`,
                borderRadius: 999,
                background: "linear-gradient(90deg, #089ff1 0%, #02a1fe 55%, #fcce00 100%)",
                boxShadow: "0 0 12px rgba(8,159,241,0.6)",
                transition: "width 0.04s linear",
                position: "relative",
              }}>
                {count > 0 && count < 100 && (
                  <div style={{
                    position: "absolute",
                    right: -4, top: "50%",
                    transform: "translateY(-50%)",
                    width: 8, height: 8,
                    borderRadius: "50%",
                    background: "#fcce00",
                    boxShadow: "0 0 8px #fcce00, 0 0 18px rgba(252,206,0,0.6)",
                  }} />
                )}
              </div>
            </div>
          </div>

          {/* Status + counter row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            animation: "pl-fade-up 0.8s ease 0.5s both",
          }}>
            <span style={{
              color: "rgba(255,255,255,0.22)",
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
            }}>
              {getStatus(count)}
            </span>

            <span style={{
              width: 1, height: 12,
              background: "rgba(255,255,255,0.1)",
              display: "inline-block",
            }} />

            <span style={{
              fontFamily: "monospace",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: count >= 100 ? "#fcce00" : "#089ff1",
              transition: "color 0.4s",
            }}>
              {count}%
            </span>
          </div>
        </div>

        {/* Bottom tagline */}
        <div style={{
          position: "absolute",
          bottom: 32,
          color: "rgba(255,255,255,0.14)",
          fontSize: 10,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          fontWeight: 500,
          fontFamily: "Inter, sans-serif",
          animation: "pl-fade-up 0.8s ease 0.65s both",
        }}>
          Building your digital experience
        </div>
      </div>

      <style>{`
        @keyframes pl-fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes pl-glow-pulse {
          0%, 100% { opacity: 0.55; transform: translate(-50%,-50%) scale(1); }
          50%       { opacity: 1;    transform: translate(-50%,-50%) scale(1.12); }
        }
        @keyframes pl-scan {
          0%   { top: -2px; }
          100% { top: 100%; }
        }
        @keyframes pl-float {
          0%, 100% { opacity: 0;   transform: translateY(0)    scale(0.8); }
          40%      { opacity: 0.5; transform: translateY(-10px) scale(1);   }
          60%      { opacity: 0.5; transform: translateY(-10px) scale(1);   }
        }
        @keyframes pl-corner-in {
          from { opacity: 0; width: 0;    height: 0;    }
          to   { opacity: 1; width: 22px; height: 22px; }
        }
        @keyframes pl-logo-in {
          from { opacity: 0; transform: translateY(18px) scale(0.92); filter: blur(10px); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);    }
        }
        @keyframes pl-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </>
  );
}
