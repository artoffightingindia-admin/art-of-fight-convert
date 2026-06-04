import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  { name: "Syde",    role: "Member",  text: "AOF transformed how I train — discipline, technique, and family vibe all in one." },
  { name: "Seity",   role: "Member",  text: "The coaches actually care. I've gained real skill and real confidence." },
  { name: "Rolen",   role: "Member",  text: "Best decision I made this year. The 30-day program is no joke — results are real." },
  { name: "Karthik", role: "Fighter", text: "From beginner to ring-ready in months. The system works." },
  { name: "Arjun",   role: "Member",  text: "Pad work, sparring, conditioning — every session pushes you to level up." },
  { name: "Vikram",  role: "Athlete", text: "Best coaching in the city — period. The team feels like family." },
];

const VISIBLE = 3;

/* Tilt card — tracks cursor position within the card */
const TiltCard = ({ t, animClass, delay }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;   // -0.5 → 0.5
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: cy * 10, y: cx * -10, scale: 1.03 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0, scale: 1 });

  return (
    <div
      ref={ref}
      className={animClass}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${delay}ms`,
        backgroundColor: "#131c27",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 12,
        padding: "18px 22px",
        /* base slope — matches image */
        transform: `rotate(-2deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: tilt.scale > 1
          ? "0 16px 40px rgba(7,180,186,0.15), 0 4px 16px rgba(0,0,0,0.5)"
          : "0 2px 12px rgba(0,0,0,0.4)",
        cursor: "default",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
        {[...Array(5)].map((_, s) => (
          <Star key={s} style={{ width: 15, height: 15, color: "#07b4ba", fill: "#07b4ba" }} />
        ))}
      </div>
      {/* Quote */}
      <p style={{
        fontFamily: "'Barlow', sans-serif",
        color: "rgba(255,255,255,0.75)",
        fontSize: 14,
        lineHeight: 1.65,
        fontStyle: "italic",
        marginBottom: 14,
      }}>
        "{t.text}"
      </p>
      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.07)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <User style={{ width: 16, height: 16, color: "rgba(255,255,255,0.4)" }} />
        </div>
        <div>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, color: "#fff", margin: 0 }}>
            {t.name}
          </p>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [start, setStart]     = useState(0);
  const [paused, setPaused]   = useState(false);
  const [animDir, setAnimDir] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => triggerNext(), 3500);
    return () => clearInterval(id);
  }, [paused, start]);

  const triggerNext = () => {
    if (animating) return;
    setAnimDir("next"); setAnimating(true);
    setTimeout(() => { setStart(s => (s + 1) % testimonials.length); setAnimating(false); }, 320);
  };
  const triggerPrev = () => {
    if (animating) return;
    setAnimDir("prev"); setAnimating(true);
    setTimeout(() => { setStart(s => (s - 1 + testimonials.length) % testimonials.length); setAnimating(false); }, 320);
  };

  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    testimonials[(start + i) % testimonials.length]
  );

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: "#0a0f14",
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)`,
        backgroundSize: "22px 22px",
        padding: "64px 0 72px",
      }}
    >
      <style>{`
        @keyframes slideInBottom {
          from { opacity: 0; transform: rotate(-2deg) translateY(24px); }
          to   { opacity: 1; transform: rotate(-2deg) translateY(0); }
        }
        @keyframes slideInTop {
          from { opacity: 0; transform: rotate(-2deg) translateY(-24px); }
          to   { opacity: 1; transform: rotate(-2deg) translateY(0); }
        }
        .card-next { animation: slideInBottom 0.32s ease both; }
        .card-prev { animation: slideInTop    0.32s ease both; }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Section heading ── */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#07b4ba",
            marginBottom: 8,
          }}>
            Testimonials
          </p>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(32px, 4vw, 52px)",
            letterSpacing: 2,
            lineHeight: 1.05,
            color: "#fff",
            margin: 0,
            textTransform: "uppercase",
          }}>
            What People Say
          </h2>
        </div>

        {/* ── 2-col layout ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
        }}>

          {/* LEFT: video */}
          <div style={{
            position: "relative",
            aspectRatio: "16/9",
            borderRadius: 14,
            overflow: "hidden",
            background: "linear-gradient(135deg, #131c27 0%, #0d1117 100%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse 55% 55% at 50% 55%, rgba(7,180,186,0.13) 0%, transparent 70%)",
            }} />
            <div style={{
              position: "absolute", inset: 0, zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div
                style={{
                  width: 62, height: 62, borderRadius: "50%",
                  backgroundColor: "#07b4ba",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 0 28px 6px rgba(7,180,186,0.28)",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <div style={{
                  width: 0, height: 0,
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  borderLeft: "18px solid #0a0f14",
                  marginLeft: 5,
                }} />
              </div>
            </div>
          </div>

          {/* RIGHT: sloped cards + nav */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ perspective: "800px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {visible.map((t, i) => (
                <TiltCard
                  key={`${t.name}-${start}-${i}`}
                  t={t}
                  animClass={animating ? (animDir === "next" ? "card-next" : "card-prev") : ""}
                  delay={i * 50}
                />
              ))}
            </div>

            {/* Nav arrows */}
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              {[{ label: "Previous", icon: <ChevronLeft size={17} />, fn: triggerPrev },
                { label: "Next",     icon: <ChevronRight size={17} />, fn: triggerNext }]
                .map(({ label, icon, fn }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backgroundColor: "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.6)",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#07b4ba"; e.currentTarget.style.color = "#07b4ba"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
