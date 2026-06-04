import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  { name: "Syde", role: "Member", text: "AOF transformed how I train — discipline, technique, and family vibe all in one." },
  { name: "Seity", role: "Member", text: "The coaches actually care. I've gained real skill and real confidence." },
  { name: "Rolen", role: "Member", text: "Best decision I made this year. The 30-day program is no joke — results are real." },
  { name: "Karthik", role: "Fighter", text: "From beginner to ring-ready in months. The system works." },
  { name: "Arjun", role: "Member", text: "Pad work, sparring, conditioning — every session pushes you to level up." },
  { name: "Vikram", role: "Athlete", text: "Best coaching in the city — period. The team feels like family." },
];

const VISIBLE = 3;

const TestimonialsSection = () => {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animDir, setAnimDir] = useState(null); // 'next' | 'prev'
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => triggerNext(), 3500);
    return () => clearInterval(id);
  }, [paused, start]);

  const triggerNext = () => {
    if (animating) return;
    setAnimDir("next");
    setAnimating(true);
    setTimeout(() => {
      setStart((s) => (s + 1) % testimonials.length);
      setAnimating(false);
    }, 320);
  };

  const triggerPrev = () => {
    if (animating) return;
    setAnimDir("prev");
    setAnimating(true);
    setTimeout(() => {
      setStart((s) => (s - 1 + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 320);
  };

  const visible = Array.from({ length: VISIBLE }, (_, i) =>
    testimonials[(start + i) % testimonials.length]
  );

  return (
    <section
      id="testimonials"
      className="py-16 md:py-24"
      style={{ backgroundColor: "#0d1117" }}
    >
      <style>{`
        @keyframes slideInFromBottom {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInFromTop {
          from { opacity: 0; transform: translateY(-22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter-next {
          animation: slideInFromBottom 0.32s ease both;
        }
        .card-enter-prev {
          animation: slideInFromTop 0.32s ease both;
        }
        .teal-glow {
          box-shadow: 0 0 32px 8px rgba(7,180,186,0.18), 0 0 0 1px rgba(7,180,186,0.10);
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          {/* ── LEFT: Video placeholder ── */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16/9",
              borderRadius: 14,
              overflow: "hidden",
              background: "linear-gradient(135deg, #131c27 0%, #0d1117 100%)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* subtle teal radial glow behind button */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse 55% 55% at 50% 55%, rgba(7,180,186,0.12) 0%, transparent 70%)",
              }}
            />
            {/* Play button */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <div
                className="teal-glow"
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: "50%",
                  backgroundColor: "#07b4ba",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s, background-color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                {/* Triangle play icon */}
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "18px solid #0d1117",
                    marginLeft: 4,
                  }}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Stacked testimonial cards ── */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {visible.map((t, i) => (
                <div
                  key={`${t.name}-${start}-${i}`}
                  className={animating ? (animDir === "next" ? "card-enter-next" : "card-enter-prev") : ""}
                  style={{
                    animationDelay: `${i * 45}ms`,
                    backgroundColor: "#131c27",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "18px 22px",
                  }}
                >
                  {/* Stars */}
                  <div style={{ display: "flex", gap: 3, marginBottom: 10 }}>
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} style={{ width: 15, height: 15, color: "#07b4ba", fill: "#07b4ba" }} />
                    ))}
                  </div>
                  {/* Quote */}
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      color: "rgba(255,255,255,0.75)",
                      fontSize: 14,
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      marginBottom: 14,
                    }}
                  >
                    "{t.text}"
                  </p>
                  {/* Author */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
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
              ))}
            </div>

            {/* Nav arrows — bottom right */}
            <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
              <button
                onClick={triggerPrev}
                aria-label="Previous"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.6)",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#07b4ba"; e.currentTarget.style.color = "#07b4ba"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                <ChevronLeft size={17} />
              </button>
              <button
                onClick={triggerNext}
                aria-label="Next"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backgroundColor: "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.6)",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#07b4ba"; e.currentTarget.style.color = "#07b4ba"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
