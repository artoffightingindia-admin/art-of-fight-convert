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

const TiltCard = ({ t, animClass, delay }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * 10, y: cx * -10, scale: 1.03 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0, scale: 1 });

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-white/[0.07] p-[18px_22px] transition-[transform,box-shadow] duration-[180ms] ease-in-out cursor-default ${animClass}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${delay}ms`,
        backgroundColor: "#131c27",
        transform: `rotate(-2deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: tilt.scale > 1
          ? "0 16px 40px rgba(7,180,186,0.15), 0 4px 16px rgba(0,0,0,0.5)"
          : "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-[3px] mb-[10px]">
        {[...Array(5)].map((_, s) => (
          <Star key={s} className="w-[15px] h-[15px]" style={{ color: "#07b4ba", fill: "#07b4ba" }} />
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-sm leading-[1.65] italic mb-[14px]"
        style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.75)" }}
      >
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-[10px]">
        <div
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          <User className="w-4 h-4" style={{ color: "rgba(255,255,255,0.4)" }} />
        </div>
        <div>
          <p
            className="text-sm font-bold text-white m-0"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {t.name}
          </p>
          <p
            className="text-[12px] m-0"
            style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.4)" }}
          >
            {t.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [start, setStart]         = useState(0);
  const [paused, setPaused]       = useState(false);
  const [animDir, setAnimDir]     = useState(null);
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
      className="py-16 md:py-[72px]"
      style={{
        backgroundColor: "#0a0f14",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
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

      <div className="max-w-[1100px] mx-auto px-6">

        {/* Section heading */}
        <div className="text-center mb-[52px]">
          <p
            className="text-sm font-bold uppercase tracking-[4px] mb-2"
            style={{ fontFamily: "'Barlow', sans-serif", color: "#07b4ba" }}
          >
            Testimonials
          </p>
          <h2
            className="uppercase m-0 leading-[1.05]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: 2,
              color: "#fff",
            }}
          >
            What People Say
          </h2>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT: video */}

  <div className="flex flex-col">
  <h3
  className="mb-4 text-center italic"
  style={{
    fontFamily: "'Barlow', sans-serif",
    fontSize: "22px",
    fontWeight: 600,
    color: "#07b4ba",
    letterSpacing: "0.5px",
  }}
>
  Hear It From Our Fighters
</h3>
          <div
            
            className="relative rounded-[14px] overflow-hidden border border-white/[0.06]"
            style={{
              aspectRatio: "16/9",
              background: "linear-gradient(135deg, #131c27 0%, #0d1117 100%)",
            }}
          >
              <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 55% 55% at 50% 55%, rgba(7,180,186,0.13) 0%, transparent 70%)",
              }}
            />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div
                className="w-[62px] h-[62px] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{
                  backgroundColor: "#07b4ba",
                  boxShadow: "0 0 28px 6px rgba(7,180,186,0.28)",
                }}
              >
                <div
                  className="ml-[5px]"
                  style={{
                    width: 0, height: 0,
                    borderTop: "10px solid transparent",
                    borderBottom: "10px solid transparent",
                    borderLeft: "18px solid #0a0f14",
                  }}
                />
      </div>
            </div>
            </div>
          </div>

          {/* RIGHT: cards + nav */}
          <div
            className="[perspective:800px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex flex-col gap-[14px]">
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
            <div className="flex gap-[10px] mt-5 justify-end">
              {[
                { label: "Previous", icon: <ChevronLeft size={17} />, fn: triggerPrev },
                { label: "Next",     icon: <ChevronRight size={17} />, fn: triggerNext },
              ].map(({ label, icon, fn }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-transparent transition-[border-color,color] duration-200 hover:border-[#07b4ba] hover:text-[#07b4ba]"
                  style={{
                    borderColor: "rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.6)",
                  }}
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
