import { useEffect, useRef, useState, ReactNode, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

/* ── REVEAL ── */
function Reveal({ children, style = {}, delay = 0 }: { children: ReactNode; style?: CSSProperties; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, transform: "translateY(28px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ── FEEDBACK SLIDER ── */
const feedbackCards = [
  { text: "In 8 weeks my footwork completely changed. My coach saw things I couldn't see myself and fixed them immediately.", author: "Jordan K." },
  { text: "I was plateau'd for over a year. AOF broke that within the first month. The personalised approach is unlike anything else.", author: "Priya S." },
  { text: "Best investment I've made in my fight career. The plan, the feedback, the accountability — it's all dialled in perfectly.", author: "Carlos R." },
  { text: "The coaches actually care. I've gained real skill in just a few months of training with AOF.", author: "Seity M." },
  { text: "Best decision I made this year. The structure and support is unlike any gym I've trained at before.", author: "Rolen A." },
  { text: "From complete beginner to ring-ready in just a few months. AOF's system truly works.", author: "Karthik V." },
  { text: "My performance improved drastically. The personalised game plan made all the difference in my last fight.", author: "Rahul P." },
];

function InfiniteFeedbackSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);
  const [mobilePage, setMobilePage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const CARDS_PER_PAGE = 3;
  const allCards = [...feedbackCards, ...feedbackCards];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;
    const speed = 0.55;
    const getHalfWidth = () => track.scrollWidth / 2;
    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current += speed;
        if (posRef.current >= getHalfWidth()) posRef.current -= getHalfWidth();
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    const pause = () => { isPausedRef.current = true; };
    const resume = () => { setTimeout(() => { isPausedRef.current = false; }, 600); };
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
    };
  }, [isMobile]);

  const pageCards = Array.from(
    { length: CARDS_PER_PAGE },
    (_, i) => feedbackCards[(mobilePage + i) % feedbackCards.length]
  );

  if (isMobile) {
    return (
      <div className="pp-feedback-mobile">
        <div className="pp-feedback-mobile-list">
          {pageCards.map((card, i) => (
            <div key={`${card.author}-${mobilePage}-${i}`} className="pp-feedback-mobile-card">
              <div className="pp-feedback-mobile-stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="pp-feedback-mobile-text">"{card.text}"</p>
              <div className="pp-feedback-mobile-author">
                <div className="pp-feedback-avatar" />
                <div>
                  <p>{card.author}</p>
                  <span>Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pp-feedback-mobile-nav">
          <button onClick={() => setMobilePage(p => (p - 1 + feedbackCards.length) % feedbackCards.length)} aria-label="Previous testimonial">‹</button>
          <button onClick={() => setMobilePage(p => (p + 1) % feedbackCards.length)} aria-label="Next testimonial">›</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        ref={sliderRef}
        style={{ overflow: "hidden", width: "100%", position: "relative" }}
      >
        <div ref={trackRef} style={{ display: "flex", gap: 24, width: "max-content", willChange: "transform" }}>
          {allCards.map((card, i) => (
            <div key={i} style={{ width: 340, flexShrink: 0, borderRadius: 18, background: "#1a1d23", border: "1px solid rgba(255,255,255,0.05)", padding: "28px 24px" }}>
              <div style={{ display: "flex", gap: 4, marginBottom: 16, color: "#07b4ba", fontSize: 16 }}>
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.72)", fontSize: 15, lineHeight: 1.65, fontStyle: "italic", marginBottom: 20 }}>"{card.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto", minHeight: 52 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#202533", display: "flex", alignItems: "center", justifyContent: "center", color: "#8d96a8", fontSize: 20, flexShrink: 0 }}>👤</div>
                <div>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, color: "#fff", fontSize: 15, marginBottom: 2 }}>{card.author}</p>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NAV BUTTONS — centered below cards, matching screenshot */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 32 }}>
        <button
          onClick={() => {
            isPausedRef.current = true;
            posRef.current = Math.max(posRef.current - 364, 0);
            if (trackRef.current) {
              trackRef.current.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
              trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
              setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ""; }, 700);
            }
            setTimeout(() => { isPausedRef.current = false; }, 700);
          }}
          style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(15,18,24,0.92)", color: "#fff", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)" }}
        >
          ‹
        </button>
        <button
          onClick={() => {
            isPausedRef.current = true;
            posRef.current += 364;
            if (trackRef.current) {
              trackRef.current.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
              trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
              setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ""; }, 700);
            }
            setTimeout(() => { isPausedRef.current = false; }, 700);
          }}
          style={{ width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(15,18,24,0.92)", color: "#fff", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(10px)" }}
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* ── FAQ ── */
const faqItems = [
  { question: "Who is AOF 1-on-1 coaching for?", answer: "AOF coaching is designed for serious fighters and committed beginners alike — anyone who is tired of training without direction. Whether you're a competitive MMA athlete looking to peak for your next bout, or someone starting from scratch who wants to build real skill fast, our personalised system is built around your specific goals, body type, and schedule." },
  { question: "How does the remote coaching work?", answer: "After your strategy call, your coach builds a fully customised training plan and delivers it digitally. You'll have direct WhatsApp access to your coach for questions, feedback, and check-ins. You submit session videos for review, and your coach adjusts the plan in real time based on what they see." },
  { question: "How quickly will I see results?", answer: "Most athletes report noticeable improvements in technique and conditioning within the first 3–4 weeks. Significant transformation typically takes 6–8 weeks of consistent training under the AOF method." },
  { question: "What if I'm a complete beginner?", answer: "Beginners are welcome and thrive in the AOF system. In fact, starting with proper 1-on-1 coaching before picking up bad habits is the fastest route to becoming a skilled fighter." },
  { question: "Is there a contract or long-term commitment?", answer: "No long-term contracts. You can cancel anytime. We also back that up with a results guarantee — if you don't see measurable progress, we'll extend your coaching for free until you do." },
  { question: "How many sessions should I train per week?", answer: "Most athletes train between 3–6 sessions per week depending on their goals, recovery capacity, and schedule. Your coach will create the optimal structure for you." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div id="faq" style={{ position: "relative", overflow: "hidden", backgroundColor: "#0b0b0b" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 40px", textAlign: "center", position: "relative", zIndex: 1 }}>
        <Reveal>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" as const, color: "#07b4ba", marginBottom: 10 }}>Got Questions?</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 5.5vw, 60px)", letterSpacing: 2, color: "#fff", lineHeight: 1, marginBottom: 10 }}>
            Frequently Asked <span style={{ color: "#07b4ba" }}>Questions</span>
          </h2>
          <div style={{ width: 56, height: 2, background: "#07b4ba", margin: "16px auto 48px", borderRadius: 2 }} />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))", gap: 18, textAlign: "left" }}>
          {faqItems.map((item, i) => (
            <Reveal key={i}>
              <div style={{ border: `1px solid ${openIndex === i ? "rgba(7,180,186,0.45)" : "rgba(255,255,255,0.08)"}`, borderRadius: 12, background: "#141414", overflow: "hidden", transition: "border-color 0.25s" }}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} style={{ width: "100%", background: "none", border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", cursor: "pointer", textAlign: "left" as const, gap: 16 }}>
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 18, color: openIndex === i ? "#07b4ba" : "#fff", lineHeight: 1.3, flex: 1 }}>{item.question}</span>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${openIndex === i ? "#07b4ba" : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: openIndex === i ? "#07b4ba" : "rgba(255,255,255,0.6)", fontSize: 18, transform: openIndex === i ? "rotate(45deg)" : "none", transition: "all 0.35s", background: openIndex === i ? "rgba(7,180,186,0.12)" : "none" }}>+</span>
                </button>
                <div style={{ maxHeight: openIndex === i ? 400 : 0, overflow: "hidden", transition: "max-height 0.4s ease, padding 0.3s ease", padding: openIndex === i ? "0 26px 24px" : "0 26px" }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, fontSize: 15, color: "rgba(255,255,255,0.58)", lineHeight: 1.75 }}>{item.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── STYLES ── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0a0a0a; overflow-x: hidden; }
  .pp { font-family: 'Barlow', sans-serif; color: #fff; background: #0a0a0a; overflow-x: hidden; }

  /* ───────── NAVBAR ───────── */
  .pp-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    height: 62px; padding: 0 20px;
    background: rgba(17,20,25,0.80); backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
  }
  .pp-nav-left { display: flex; align-items: center; margin-left: -2px; }
  .pp-nav-logo { display: flex; align-items: center; font-family: 'Bebas Neue', sans-serif; font-size: 29.8px; line-height: 1; margin: 0; }
  .pp-nav-logo span:nth-child(1), .pp-nav-logo span:nth-child(3) { color: #07b4ba; }
  .pp-nav-logo span:nth-child(2) { color: #ffffff; }
  .pp-nav-right { display: flex; align-items: center; gap: 18px; }
  .pp-nav-home { background: none; border: none; color: rgba(255,255,255,0.65); font-family: 'Barlow', sans-serif; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s; }
  .pp-nav-home:hover { color: #ffffff; }
  .pp-nav-home-mobile { display: none; }
  .pp-nav-call { height: 44px; padding: 0 22px; border-radius: 8px; border: none; background: #07b4ba; color: #ffffff; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1.5px; cursor: pointer; transition: 0.25s; }
  .pp-nav-call:hover { background: #075e61; transform: translateY(-2px); }

  @media (max-width: 768px) {
    .pp-nav { height: 58px; padding: 0 14px; }
    .pp-nav-logo { font-size: 26px; letter-spacing: 2px; }
    .pp-nav-right { gap: 8px; }
    .pp-nav-home { font-size: 11px; }
    .pp-nav-call { height: 36px; padding: 0 14px; font-size: 14px; letter-spacing: 1px; }
  }

  /* HERO */
  .pp-hero {
  position: relative;

  min-height: 78vh; /* reduced height */

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  padding: 110px 7px 40px; /* reduced bottom spacing */

  background:
    radial-gradient(circle at top,
    rgba(7,180,186,0.12),
    transparent 45%),
    #06080c;
}
  .pp-hero-bg { position: absolute; inset: 0; z-index: 0; background: linear-gradient(to bottom, rgba(6,8,12,0.65), rgba(6,8,12,0.92)), url('https://images.unsplash.com/photo-1549476464-37392f717541?w=1400&q=80') center/cover no-repeat; opacity: 0.42; }
  .pp-hero-overlay { position: absolute; inset: 0; z-index: 1; background: linear-gradient(180deg, rgba(6,8,12,0.55) 0%, rgba(6,8,12,0.78) 55%, #06080c 100%); }
  .pp-hero-content {
  position: relative;
  z-index: 2;

  width: 100%;
  max-width: 1180px;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  text-align: left;

  padding-left: -90px;   /* moves content left */
  margin-top: 15px;    /* moves whole hero content upward */
}
 .pp-hero-h1 {

  font-family: 'Bebas Neue', sans-serif;

  font-size: clamp(40px, 6vw, 60px);

  line-height: 0.95;

  letter-spacing: 2px;
 margin-left: -66px;
  text-transform: uppercase;

  color: #fff;

  margin-bottom: 20px;
}
  .pp-hero-h2 { color: #07b4ba; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px;  margin-left: -66px; margin-bottom: 16px; }
  .pp-hero-desc { color: rgba(255,255,255,0.62); font-family: 'Barlow', sans-serif; font-size: 16px; line-height: 1.7; max-width: 480px; margin-bottom: 32px;  margin-left: -66px;}
  .pp-hero-desc strong { color: #07b4ba; }
 .pp-join-btn {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  height: 44px;

  padding: 0 26px;

  border-radius: 10px;

  background: #07b4ba;

  color: #fff;

  font-family: 'Barlow', sans-serif;

  font-size: 13px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 1px;

  border: 1px solid #07b4ba; margin-left: -66px;

  cursor: pointer;

  transition: all 0.25s ease;
}
  .pp-join-btn:hover { background: #057e82; transform: translateY(-2px); box-shadow: 0 14px 40px rgba(7,180,186,0.38); }
  .pp-scarcity { margin-top: 18px; color: rgba(255,255,255,0.4); font-family: 'Barlow', sans-serif; font-size: 13px; letter-spacing: 1px; font-style: italic; }

  /* ───────── TRUST BAR ───────── */
  .pp-trust-strip {

  width: 100%;

  height: 60px;

  background: #07b4ba;

  display: flex;

  align-items: center;

  justify-content: space-around;

  padding: 0 40px;

  gap: 12px;

  flex-wrap: wrap;

  position: relative;

  margin-top: 17px; /* moves strip upward */

  z-index: 20;
}
 .pp-trust-item { display: flex; align-items: center; gap: 12px; }
  .pp-trust-icon { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .pp-trust-icon svg { width: 30px; height: 30px; stroke: #fff; fill: none; stroke-width: 2; }
  .pp-trust-item p { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: #ffffff; line-height: 1; }

  @media (max-width: 768px) {
    .pp-trust-strip { height: auto; padding: 14px; gap: 16px; justify-content: center; }
    .pp-trust-item p { font-size: 13px; letter-spacing: 1px; }
    .pp-trust-icon { width: 26px; height: 26px; }
    .pp-trust-icon svg { width: 20px; height: 20px; }
  }

  /* SECTION WRAPPER */
  .pp-section { max-width: 1100px; margin: 0 auto; padding: 28px 10px; }
  @media (min-width: 1200px) { .pp-section { padding-left: 8px; padding-right: 8px; } }

  /* PAIN */
  .pp-problem { background: #0b0b0b; }
  .pp-problem-grid { display: flex; gap: 56px; align-items: center; flex-wrap: wrap; }
  .pp-problem-left { flex: 1; min-width: 260px; }
  .pp-problem-h { font-family: 'Bebas Neue', sans-serif; font-size: clamp(32px,4vw,48px); letter-spacing: 2px; color: #07b4ba; margin-bottom: 16px; }
  .pp-problem-intro { color: rgba(255,255,255,0.6); font-family: 'Barlow', sans-serif; font-size: 15px; line-height: 1.7; margin-bottom: 28px; }
  .pp-pain-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
  .pp-pain-bar { width: 3px; height: 18px; background: #ff2d2d; border-radius: 2px; flex-shrink: 0; margin-top: 3px; box-shadow: 0 0 6px rgba(255,45,45,0.9), 0 0 16px rgba(255,45,45,0.6); }
  .pp-pain-item p  { color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.5; }
  .pp-problem-right { flex: 0 0 460px; max-width: 100%; }
  .pp-problem-right img { width: 100%; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); display: block; aspect-ratio: 16/9; object-fit: cover; }

  /* WHAT YOU GET */
  .pp-features { background: #0b0b0b; position: relative; overflow: hidden; background-image: linear-gradient(rgba(7,180,186,0.07) 1px, transparent 0.4px), linear-gradient(90deg, rgba(7,180,186,0.07) 1px, transparent 0.4px); background-size: 30px 30px; }
  .pp-features-heading { font-family: 'Bebas Neue', sans-serif; font-size: 52px; letter-spacing: 2px; color: #fff; text-align: center; margin-bottom: 60px; }
  .pp-features-grid { display: flex; gap: 45px; flex-wrap: wrap; justify-content: center; }
  .pp-feature-card { width: 175px; min-height: 255px; padding: 11px 6px; border-radius: 18px; background: #111417; border: 2px solid #111417; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
  .pp-feature-icon { width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; }
  .pp-feature-icon svg { width: 52px; height: 52px; stroke: #07b4ba; }
 .pp-feature-card h4 {
  font-family: 'Bebas Neue', sans-serif;
  color: #07b4ba;
  font-size: 16px;
  letter-spacing: 2px;
  line-height: 1.3;
  min-height: 58px;
  margin: 0 0 4px;
  text-align: center;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.pp-feature-card p {
  font-size: 14px;
  line-height: 1.55;
  color: rgba(255,255,255,0.62);
  text-align: center;
  margin: 0;
  min-height: 44px;

  display: flex;
  align-items: flex-start;
  justify-content: center;
}
  @media (max-width: 768px) {
    .pp-features-grid { gap: 18px; }
    .pp-feature-card { width: calc(50% - 10px); min-height: 230px; }
    .pp-features-heading { font-size: 38px; margin-bottom: 40px; }
  }

  /* COACH */
  .pp-coach-bg { background: #0b0b0b; }
.pp-book-strip {
  background: #07b4ba;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
  .pp-book-strip button { width: 100%; padding: 14px; background: none; border: none; cursor: pointer; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 3px; transition: background 0.2s; }
  .pp-book-strip button:hover { background: #075e61; }

  /* TESTIMONIALS */
  .pp-testi-bg { position: relative; overflow: hidden; background: #0b0b0b; }
  .pp-testi-main { display: flex; gap: 48px; align-items: center; margin-bottom: 40px; flex-wrap: wrap; }
  .pp-testi-img { flex: 0 0 460px; max-width: 100%; aspect-ratio: 16/9; }
  .pp-testi-img img { width: 100%; border-radius: 10px; object-fit: cover; }
  .pp-feedback-mobile { display: none; }

  /* PROMISE SECTION */
  .cp-promise-section {
    position: relative;
    overflow: hidden;
    background: #0b0b0b;
  }
  .cp-promise-section::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(-45deg, rgba(7,180,186,0.04) 0px, rgba(7,180,186,0.04) 1px, transparent 1px, transparent 6px);
    pointer-events: none;
    z-index: 0;
  }
  .cp-new-promise {
    max-width: 820px;
    margin: 0 auto;
    padding: 1px 42px;
    text-align: center;
    position: relative;
    z-index: 1;
  }
  .cp-new-promise-line { width: 70px; height: 2px; background: #07b4ba; margin: 0 auto 22px; border-radius: 999px; }
  .cp-new-promise-text { font-family: 'Barlow', sans-serif; font-size: 19px; line-height: 1.9; color: rgba(255,255,255,0.76); font-style: italic; max-width: 720px; margin: 0 auto; }
  .cp-new-promise-title { font-family: 'Bebas Neue', sans-serif; font-size: 30px; letter-spacing: 2px; color: #fff; margin-bottom: 12px; text-align: center; }
  .cp-quote-mark { color: #07b4ba; font-size: 42px; line-height: 0; margin-right: 6px; font-family: serif; position: relative; top: 10px; }

  @media (max-width: 768px) {
    .cp-new-promise { padding: 26px 22px; }
    .cp-new-promise-text { font-size: 15px; line-height: 1.8; }
    .cp-new-promise-title { font-size: 26px; }
  }

  /* FOOTER CTA */
  .pp-footer-cta { background: #0b0b0b; border-top: none; position: relative; padding-top: 0 !important; margin-top: 0 !important; z-index: 10; }
  .pp-footer-cta::before { display: none; }
  .pp-footer-grid { display: flex; gap: 56px; align-items: center; flex-wrap: wrap; }
  .pp-footer-left { flex: 1; min-width: 300px; }
  .pp-footer-right { flex: 0 0 200px; max-width: 100%; text-align: center; }
  .pp-offer-label { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 3px; color: #07b4ba; margin-bottom: 8px; }
  .pp-offer-h { font-family: 'Bebas Neue', sans-serif; font-size: clamp(28px,4vw,42px); letter-spacing: 2px; color: #fff; line-height: 1.1; margin-bottom: 24px; }
  .pp-timer { display: flex; gap: 12px; margin-bottom: 8px; }
  .pp-timer-block { text-align: center; }
  .pp-timer-block h3 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px,5vw,56px); letter-spacing: 2px; color: #07b4ba; line-height: 1; background: #111; border: 1px solid rgba(7,180,186,0.2); border-radius: 8px; padding: 10px 18px; min-width: 72px; }
  .pp-timer-block p { font-family: 'Barlow', sans-serif; font-size: 11px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 1px; margin-top: 6px; }
  .pp-timer-sep { font-family: 'Bebas Neue', sans-serif; font-size: 40px; color: rgba(255,255,255,0.3); align-self: flex-start; padding-top: 10px; }
  .pp-last-day { font-family: 'Barlow', sans-serif; font-size: 13px; color: rgba(255,255,255,0.35); letter-spacing: 1px; font-style: italic; }
 .pp-price-box {
  background: #111;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 22px 20px;
  max-width: 300px;
  margin: 0 auto;
}
  .pp-price-old { font-family: 'Barlow', sans-serif; font-size: 22px; color: rgba(255,255,255,0.35); text-decoration: line-through; margin-bottom: 4px; }
  .pp-price-new { font-family: 'Bebas Neue', sans-serif; font-size: clamp(22px,4vw,32px); letter-spacing: 2px; color: #07b4ba; line-height: 1; margin-bottom: 4px; }
  .pp-price-tag { font-family: 'Barlow', sans-serif; font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 24px; }
  .pp-cta-btn { width: 100%; padding: 14px; border-radius: 10px; background: #07b4ba; color: #000; font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 2px; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 0 24px rgba(7,180,186,0.35); }
  .pp-cta-btn:hover { background: #059a9f; box-shadow: 0 0 40px rgba(7,180,186,0.5); transform: translateY(-2px); }
  .pp-cta-note { font-family: 'Barlow', sans-serif; font-size: 12px; color: rgba(255,255,255,0.3); margin-top: 12px; }

 /* FOOTER CTA */
.pp-footer-cta {
  background: #0b0b0b;
  border-top: none;
  position: relative;
  padding-top: 0 !important;
  margin-top: 0 !important;
  z-index: 10;
}

.pp-footer-cta::before {
  display: none;
}

.pp-footer-grid {
  display: flex;
  gap: 28px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.pp-footer-left {
  flex: 1;
  min-width: 0;
  max-width: 620px;
}

.pp-footer-right {
  flex: 0 0 170px;
  width: 170px;
  max-width: 170px;
  text-align: center;
}

.pp-offer-label {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  color: #07b4ba;
  margin-bottom: 6px;
}

.pp-offer-h {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(22px,3vw,34px);
  letter-spacing: 1px;
  color: #fff;
  line-height: 1;
  margin-bottom: 18px;
}

.pp-timer {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.pp-timer-block {
  text-align: center;
}

.pp-timer-block h3 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(24px,3vw,34px);
  letter-spacing: 1px;
  color: #07b4ba;
  line-height: 1;
  background: #111;
  border: 1px solid rgba(7,180,186,0.2);
  border-radius: 6px;
  padding: 6px 10px;
  min-width: 50px;
}

.pp-timer-block p {
  font-family: 'Barlow', sans-serif;
  font-size: 9px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
}

.pp-timer-sep {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  color: rgba(255,255,255,0.3);
  align-self: flex-start;
  padding-top: 4px;
}

.pp-last-day {
  font-family: 'Barlow', sans-serif;
  font-size: 10px;
  color: rgba(255,255,255,0.35);
  letter-spacing: 1px;
  font-style: italic;
}

.pp-price-box {
  background: #111;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  padding: 16px 14px;
  max-width: 170px;
  margin: 0 auto;
}

.pp-price-old {
  font-family: 'Barlow', sans-serif;
  font-size: 16px;
  color: rgba(255,255,255,0.35);
  text-decoration: line-through;
  margin-bottom: 2px;
}

.pp-price-new {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 26px;
  letter-spacing: 1px;
  color: #07b4ba;
  line-height: 1;
  margin-bottom: 2px;
}


.pp-price-tag {
  font-family: 'Barlow', sans-serif;
  font-size: 11px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 16px;
}

.pp-cta-btn {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background: #07b4ba;
  color: #000;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 15px;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 16px rgba(7,180,186,0.25);
}

.pp-cta-btn:hover {
  background: #059a9f;
  transform: translateY(-2px);
}

.pp-cta-note {
  font-family: 'Barlow', sans-serif;
  font-size: 10px;
  color: rgba(255,255,255,0.3);
  margin-top: 10px;
}

  /* CHECKLIST */
  .pp-checklist-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
  .pp-checklist-item .check { color: #07b4ba; font-size: 16px; flex-shrink: 0; margin-top: 2px; }
  .pp-checklist-item p  { color: rgba(255,255,255,0.7); font-size: 15px; line-height: 1.5; }

  /* BOTTOM BAR */
  .pp-bottom-bar { background: #101318; padding: 7px 40px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; border-top: 1px solid rgba(255,255,255,0.05); }
  .pp-bottom-bar span { font-family: 'Barlow', sans-serif; font-size: 12px; color: rgba(255,255,255,0.25); }
  .pp-bottom-logo { font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 3px; }

  /* FOOTER */
  .pp-footer { background: #101318; padding: 12px 40px 4px; border-top: 1px solid rgba(255,255,255,0.06); }
  .pp-footer-inner { max-width: 1220px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
  .pp-footer-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; color: #fff; padding-top: 8px; margin-bottom: 10px; }
  .pp-footer-links { display: flex; flex-direction: column; gap: 10px; }
  .pp-footer-links a, .pp-footer-contact p, .pp-footer-about p { font-family: 'Barlow', sans-serif; font-size: 17px; color: rgba(255,255,255,0.52); text-decoration: none; transition: 0.2s; }
  .pp-footer-links a:hover { color: #075e61; }
  .pp-footer-contact { display: flex; flex-direction: column; gap: 10px; }
  .pp-footer-about p { line-height: 1.8; max-width: 320px; }
  .pp-footer-bottom { margin-top: 12px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-family: 'Barlow', sans-serif; font-size: 13px; color: rgba(255,255,255,0.3); }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .pp-nav { padding: 12px 16px; }
    .pp-section { padding: 48px 20px; }
    .pp-problem-grid { flex-direction: column; }
    .pp-problem-right { flex: unset; width: 100%; }
    .pp-features-grid { flex-direction: column; }
    .pp-footer-grid { flex-direction: column; gap: 40px; }
    .pp-footer-right { flex: unset; width: 100%; }
    .pp-timer { justify-content: center; }
    .pp-bottom-bar { flex-direction: column; text-align: center; }
    .pp-hero { min-height: 82vh; padding: 120px 20px 70px; }
    .pp-hero-content { align-items: flex-start; text-align: left; }
    .pp-hero-h1 { font-size: 64px; line-height: 0.95; }
    .pp-hero-h2 { font-size: 28px; }
    .pp-hero-desc { font-size: 14px; line-height: 1.7; }
    .pp-join-btn { width: 100%; }
    .pp-testi-main { flex-direction: column; }
    .pp-testi-img { flex: unset; width: 100%; }
    .pp-footer-inner { grid-template-columns: 1fr; gap: 40px; }
    .pp-footer { padding: 50px 20px 24px; }
    .pp-footer-bottom { margin-top: 40px; }
    .pp-coach-stats { display: grid !important; grid-template-columns: 1fr 1fr; gap: 12px; }
    .pp-coach-stats > div { width: 100% !important; min-height: 120px !important; height: auto !important; padding: 18px 10px !important; display: flex !important; flex-direction: column !important; justify-content: center !important; align-items: center !important; }
    .pp-coach-stats > div p:first-child { font-size: 34px !important; letter-spacing: 1px !important; margin-bottom: 6px !important; }
    .pp-coach-stats > div p:last-child { font-size: 11px !important; letter-spacing: 2px !important; padding: 0 4px; }
    .roadmap-card { min-width: 90vw !important; max-width: 90vw !important; }
    .roadmap-card > div:first-child { grid-template-columns: 1fr !important; }
    .roadmap-card img { height: 260px !important; }
    .roadmap-card h3 { font-size: 34px !important; }
    .roadmap-card p { font-size: 13px !important; }
    .pp-apply-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
    .pp-nav-home { display: none; }
    .pp-nav-call { height: 38px; padding: 0 16px; font-size: 14px; }
  }

  @media (max-width: 768px) {
    .pp-section { padding: 56px 18px !important; }
    .pp-hero { min-height: auto; padding: 110px 18px 72px; align-items: flex-start; }
    .pp-hero-content { width: 100%; }
    .pp-hero-h1 { font-size: 36px; line-height: 0.95; letter-spacing: 2px; max-width: 100%; }
    .pp-hero-h2 { font-size: 14px; letter-spacing: 1.5px; margin-bottom: 16px; }
    .pp-hero-desc { font-size: 14px; line-height: 1.7; margin-bottom: 26px; max-width: 100%; }
    .pp-join-btn { width: 100%; height: 58px; font-size: 20px; border-radius: 12px; padding: 0 20px; }
    .pp-scarcity { font-size: 11px; line-height: 1.5; }
    .pp-trust-strip { padding: 11px; gap: 16px; height: auto; justify-content: center; }
    .pp-trust-item { width: calc(50% - 8px); justify-content: center; }
    .pp-trust-item p { font-size: 12px; letter-spacing: 0.5px; }
    .pp-problem-grid { flex-direction: column; gap: 32px; }
    .pp-problem-left, .pp-problem-right { width: 100%; flex: unset; }
    .pp-features-heading { font-size: 38px; letter-spacing: 2px !important; margin-bottom: 36px; line-height: 1; }
    .pp-features-grid { display: flex; flex-direction: column; gap: 16px; }
    .pp-feature-card { width: 100%; min-height: auto; padding: 22px 18px; border-radius: 16px; display: flex; flex-direction: row; align-items: flex-start; text-align: left; gap: 18px; background: linear-gradient(180deg,#13171d 0%,#101318 100%); border: 1px solid rgba(255,255,255,0.06); }
    .pp-feature-icon { width: 58px; height: 58px; flex-shrink: 0; }
    .pp-feature-icon svg { width: 40px; height: 40px; }
    .pp-feature-card h4 { font-size: 17px; margin-bottom: 6px; line-height: 1.3; }
    .pp-feature-card p { font-size: 13px; line-height: 1.65; }
    .roadmap-card { min-width: 100% !important; }
    .roadmap-card > div:first-child { display: flex !important; flex-direction: column !important; }
    .roadmap-card img { height: 220px !important; }
    .pp-coach-stats { gap: 14px !important; }
    .pp-coach-stats > div { width: calc(50% - 7px) !important; height: 120px !important; }
    .pp-testi-main { flex-direction: column; gap: 28px; }
    .pp-testi-img { width: 100%; flex: unset; }
    .pp-bonus-grid { grid-template-columns: 1fr !important; }
    .pp-apply-grid { grid-template-columns: 1fr !important; gap: 42px !important; }
    .pp-apply-grid h2 br, .pp-apply-grid h3 br { display: none; }
    .pp-apply-grid button { width: 100%; }
    .pp-apply-grid > div:last-child { padding: 38px 24px !important; border-radius: 22px !important; min-height: auto !important; }
    #faq > div { padding: 58px 18px !important; }
    #faq h2 { font-size: 38px !important; }
    #faq div[style*="gridTemplateColumns"] { grid-template-columns: 1fr !important; }
    #faq button { padding: 18px !important; }
    #faq button span:first-child { font-size: 15px !important; }
    #faq p { font-size: 13px !important; line-height: 1.6 !important; }
    .pp-footer-inner { grid-template-columns: 1fr !important; gap: 32px !important; }
    img { max-width: 100%; height: auto; }
    * { word-break: break-word; }
    body, html { overflow-x: hidden; }
  }

  @media (max-width: 768px) {
    .pp-roadmap-mobile { background: radial-gradient(circle at 50% 9%, rgba(7,180,186,0.12), transparent 28%), linear-gradient(180deg, #02070d 0%, #061018 52%, #03070c 100%) !important; border-top: 1px solid rgba(7,180,186,0.12); border-bottom: 1px solid rgba(7,180,186,0.16); }
    .pp-roadmap-mobile > div { max-width: none !important; padding: 24px 0 26px !important; background-image: linear-gradient(rgba(7,180,186,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(7,180,186,0.035) 1px, transparent 1px) !important; background-size: 26px 26px !important; }
    .pp-roadmap-mobile > div > div:first-child { margin-bottom: 22px !important; padding: 0 14px; }
    .pp-roadmap-mobile > div > div:first-child p:first-child { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 8px !important; font-size: 10px !important; letter-spacing: 1px !important; }
    .pp-roadmap-mobile > div > div:first-child h2 { font-size: 38px !important; line-height: 0.88 !important; letter-spacing: 1px !important; }
    .pp-roadmap-mobile > div > div:first-child p:last-child { margin-top: 12px !important; font-size: 12px !important; color: rgba(255,255,255,0.68) !important; }
    .pp-roadmap-mobile-shell { width: 100%; overflow: hidden; padding-bottom: 2px; }
    .pp-roadmap-mobile-timeline { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); align-items: end; gap: 0; margin: 0 14px 28px; padding-top: 4px; }
    .pp-roadmap-mobile-line { position: absolute; left: 9%; right: 9%; bottom: 7px; height: 1px; background: rgba(255,255,255,0.42); }
    .pp-roadmap-mobile-step { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; gap: 11px; min-width: 0; border: 0; background: transparent; color: rgba(255,255,255,0.72); font-family: 'Bebas Neue', sans-serif; cursor: pointer; }
    .pp-roadmap-mobile-step span { width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; letter-spacing: 0; }
    .pp-roadmap-mobile-step i { width: 15px; height: 15px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.66); background: #03070c; }
    .pp-roadmap-mobile-step.active { color: #07e8ef; }
    .pp-roadmap-mobile-step.active i { border: 2px solid #07e8ef; background: #061018; box-shadow: 0 0 0 4px rgba(7,180,186,0.18), 0 0 16px rgba(7,232,239,0.95); }
    .pp-roadmap-mobile-stage { position: relative; }
    .pp-roadmap-viewport { width: 100%; overflow: hidden; padding-left: 20px; }
    .pp-roadmap-track { display: flex; gap: 16px; transition: transform 0.42s ease; will-change: transform; }
    .pp-roadmap-card { position: relative; flex: 0 0 82vw; min-height: 308px; overflow: hidden; border: 1px solid rgba(116,225,232,0.28); border-radius: 10px; background: #061018; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02), 0 18px 38px rgba(0,0,0,0.34); }
    .pp-roadmap-card-bg { position: absolute; inset: 0; background-position: 62% center; background-size: cover; opacity: 0.62; filter: saturate(1.04) contrast(1.08); }
    .pp-roadmap-card::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(2,7,12,0.98) 0%, rgba(2,7,12,0.78) 42%, rgba(2,7,12,0.34) 76%), linear-gradient(180deg, rgba(2,7,12,0.1) 0%, rgba(2,7,12,0.9) 100%); z-index: 1; }
    .pp-roadmap-card-body { position: relative; z-index: 2; min-height: 258px; padding: 30px 18px 18px; }
    .pp-roadmap-you { margin: 0 0 6px !important; color: #07e8ef !important; font-family: 'Bebas Neue', sans-serif !important; font-size: 12px !important; letter-spacing: 0.5px !important; }
    .pp-roadmap-card h3 { margin: 0 0 14px !important; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 28px !important; line-height: 1.05 !important; letter-spacing: 2px; min-height: 64px; display: flex; align-items: flex-start; }
    .pp-roadmap-rule { width: 54px; height: 2px; margin-bottom: 34px; background: #07e8ef; box-shadow: 0 0 10px rgba(7,232,239,0.55); }
    .pp-roadmap-points { display: flex; flex-direction: column; gap: 16px; }
    .pp-roadmap-point { display: flex; align-items: center; gap: 10px; }
    .pp-roadmap-point span { display: flex; width: 14px; height: 14px; flex-shrink: 0; align-items: center; justify-content: center; border: 1px solid #07e8ef; border-radius: 50%; color: #07e8ef; font-size: 8px; line-height: 1; }
    .pp-roadmap-point p { margin: 0 !important; color: rgba(255,255,255,0.82) !important; font-size: 11px !important; line-height: 1.25 !important; }
    .pp-roadmap-card-footer { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 12px; min-height: 50px; border-top: 1px solid rgba(255,255,255,0.12); background: rgba(3,9,15,0.72); }
    .pp-roadmap-card-footer span { width: 20px; height: 20px; color: #07e8ef; }
    .pp-roadmap-card-footer svg { width: 100%; height: 100%; }
    .pp-roadmap-card-footer p { margin: 0 !important; color: #07e8ef !important; font-family: 'Bebas Neue', sans-serif !important; font-size: 18px !important; letter-spacing: 1px; }
    .pp-roadmap-arrow { position: absolute; top: 50%; z-index: 8; width: 34px; height: 34px; transform: translateY(-50%); border: 1px solid rgba(7,232,239,0.55); border-radius: 8px; background: rgba(3,11,18,0.92); color: #07e8ef; font-size: 19px; line-height: 1; cursor: pointer; box-shadow: 0 0 18px rgba(7,180,186,0.18); }
    .pp-roadmap-arrow:disabled { opacity: 0.35; cursor: default; }
    .pp-roadmap-arrow-left { left: 0; }
    .pp-roadmap-arrow-right { right: 0; }
    .pp-roadmap-dots { display: flex; justify-content: center; gap: 13px; margin-top: 18px; }
    .pp-roadmap-dots button { width: 8px; height: 8px; padding: 0; border: 0; border-radius: 50%; background: rgba(255,255,255,0.3); cursor: pointer; }
    .pp-roadmap-dots button.active { background: #07e8ef; box-shadow: 0 0 12px rgba(7,232,239,0.7); }
    .pp-roadmap-note { display: flex; align-items: center; gap: 14px; margin: 20px 16px 0; padding: 17px 18px; border: 1px solid rgba(255,255,255,0.07); border-radius: 8px; background: linear-gradient(180deg, rgba(13,26,36,0.9), rgba(7,14,22,0.92)); }
    .pp-roadmap-note-icon { display: flex; width: 38px; height: 38px; flex-shrink: 0; align-items: center; justify-content: center; border: 1px solid #07e8ef; border-radius: 50%; color: #07e8ef; }
    .pp-roadmap-note-icon svg { width: 22px; height: 22px; }
    .pp-roadmap-note h3 { margin: 0 0 5px; color: rgba(255,255,255,0.9); font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 0.8px; line-height: 1; }
    .pp-roadmap-note p { margin: 0; color: #07e8ef; font-size: 11px; line-height: 1.3; }
    .pp-nav-home-mobile { position: fixed; bottom: 18px; left: 18px; z-index: 999; display: flex; align-items: center; justify-content: center; width: 52px; height: 52px; border: 1px solid rgba(255,255,255,0.08); border-radius: 50%; background: linear-gradient(180deg, #13171d 0%, #0d1117 100%); color: #07b4ba; font-size: 22px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); backdrop-filter: blur(10px); }
    .pp-feedback-mobile { display: block; width: 100%; }
    .pp-feedback-mobile-list { display: flex; flex-direction: column; gap: 36px; padding: 0 8px; }
    .pp-feedback-mobile-card { width: 100%; min-height: 60px; padding: 32px 28px; border: 1px solid rgba(141,150,168,0.22); border-radius: 22px; background: #171a21; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02), 0 14px 34px rgba(0,0,0,0.25); }
    .pp-feedback-mobile-stars { display: flex; gap: 10px; margin-bottom: 28px; color: #07b4ba; font-size: 30px; line-height: 1; }
    .pp-feedback-mobile-text { margin: 0 0 28px !important; color: rgba(189,195,208,0.78) !important; font-family: 'Barlow', sans-serif !important; font-size: 25px !important; font-style: italic !important; font-weight: 400 !important; line-height: 1.72 !important; }
    .pp-feedback-mobile-author { display: flex; align-items: center; gap: 22px; }
    .pp-feedback-avatar { position: relative; width: 84px; height: 84px; flex-shrink: 0; border-radius: 50%; background: #262b35; }
    .pp-feedback-avatar::before { content: ""; position: absolute; top: 24px; left: 50%; width: 14px; height: 14px; transform: translateX(-50%); border: 4px solid #929aaa; border-radius: 50%; }
    .pp-feedback-avatar::after { content: ""; position: absolute; left: 50%; bottom: 21px; width: 26px; height: 18px; transform: translateX(-50%); border: 4px solid #929aaa; border-bottom: 0; border-radius: 14px 14px 0 0; }
    .pp-feedback-mobile-author p { margin: 0 0 8px !important; color: #fff !important; font-family: 'Barlow', sans-serif !important; font-size: 27px !important; font-weight: 800 !important; line-height: 1 !important; }
    .pp-feedback-mobile-author span { color: #9da5b6; font-family: 'Barlow', sans-serif; font-size: 22px; line-height: 1; }
    .pp-feedback-mobile-nav { display: flex; justify-content: center; gap: 38px; margin-top: 82px; }
    .pp-feedback-mobile-nav button { display: flex; align-items: center; justify-content: center; width: 82px; height: 82px; border: 2px solid rgba(141,150,168,0.28); border-radius: 50%; background: rgba(7,10,16,0.35); color: #a6adbd; font-size: 58px; line-height: 1; cursor: pointer; }
  }

  @media (max-width: 480px) {
    .pp-hero-h1 { font-size: 31px; }
    .pp-trust-item { width: 100%; }
    .pp-feature-card { padding: 18px 16px; gap: 14px; }
    .pp-feature-icon { width: 48px; height: 48px; }
    .pp-feature-icon svg { width: 34px; height: 34px; }
    .pp-coach-stats > div { width: 100% !important; }
    .roadmap-card img { height: 190px !important; }
  }
`;

const IconPlan = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);
const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconLeaf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z" />
  </svg>
);
const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const whatCards = [
  { icon: <IconPlan />, title: "MADE EXCLUSIVELY FOR BEGINNERS", desc: "Clear guidance from day one" },
  { icon: <IconChat />, title: "STRUCTURED PROGRESSION", desc: "Stance → punches → kicks → combinations" },
  { icon: <IconLeaf />, title: "NO EQUIPMENT OR PARTNER NEEDED", desc: "Train effectively from the comfort of your home." },
  { icon: <IconChart />, title: "TAMIL-GUIDED INSTRUCTION", desc: "For better understanding" },
  { icon: <IconGlobe />, title: "JUST 30-40 MINUTES A DAY", desc: "Built for busy schedules" },
];

const painPoints = [
  "You train 4-5 days a week but your technique isn't improving",
  "Your sparring partners are getting better — you feel stuck",
  "You have no structured plan, just random gym sessions",
  "Coaches at your gym don't give you personal attention",
  "You don't know what to fix or where to even start",
];

const coachCredentials = [
  "Former Professional MMA Fighter — 12+ Years Ring Experience",
  "Trained athletes who compete at national and international level",
  "Specialist in striking, grappling transitions and mental conditioning",
];

const stats = [
  { val: "1,000+", label: "Athletes Coached" },
  { val: "10+", label: "Years Experience" },
  { val: "50+", label: "Champions Trained" },
  { val: "3", label: "Continents" },
];

export default function ProgramPage() {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: "02", hours: "18", minutes: "43" });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 2);
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft({ days: String(days).padStart(2, "0"), hours: String(hours).padStart(2, "0"), minutes: String(minutes).padStart(2, "0") });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFooter = () => footerRef.current?.scrollIntoView({ behavior: "smooth" });
  const [roadmapIndex, setRoadmapIndex] = useState(0);
  const [isMobileRoadmap, setIsMobileRoadmap] = useState(false);

  const roadmapCards = [
    { title: "1ST WEEK", days: "DAYS 1 - 7", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200", points: ["Fundamentals", "Basic Techniques", "Conditioning", "Mindset Building"] },
    { title: "2ND WEEK", days: "DAYS 8 - 14", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200", points: ["Skill Development", "Strength & Power", "Drills & Combos", "Recovery Focus"] },
    { title: "3RD WEEK", days: "DAYS 15 - 21", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200", points: ["Advanced Techniques", "Sparring Practice", "Endurance Boost", "Mental Toughness"] },
    { title: "4TH WEEK", days: "DAYS 22 - 28", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200", points: ["Fight IQ", "Combination Chains", "Counter Attacks", "Explosive Training"] },
    { title: "5TH WEEK", days: "DAYS 29 - 35", image: "https://images.unsplash.com/photo-1517438984742-1262db08379e?q=80&w=1200", points: ["Full Integration", "Fight Simulation", "Peak Conditioning", "Program Completion"] },
  ];

  useEffect(() => {
    const checkRoadmapLayout = () => setIsMobileRoadmap(window.innerWidth <= 768);
    checkRoadmapLayout();
    window.addEventListener("resize", checkRoadmapLayout);
    return () => window.removeEventListener("resize", checkRoadmapLayout);
  }, []);

  useEffect(() => {
    const maxIndex = isMobileRoadmap ? roadmapCards.length - 1 : roadmapCards.length - 2;
    setRoadmapIndex((prev) => Math.min(prev, maxIndex));
  }, [isMobileRoadmap, roadmapCards.length]);

  return (
    <>
      <style>{css}</style>
      <div className="pp">

        {/* ── NAVBAR ── */}
        <nav className="pp-nav">
          <div className="pp-nav-left">
            <h1 className="pp-nav-logo"><span>A</span><span>O</span><span>F</span></h1>
          </div>
          <div className="pp-nav-right">
            <button className="pp-nav-home" onClick={() => navigate("/")}>← Back To Home</button>
            <button className="pp-nav-call" onClick={scrollToFooter}>JOIN NOW</button>
          </div>
        </nav>
        <button className="pp-nav-home-mobile" onClick={() => navigate("/")} aria-label="Back to home">←</button>

        {/* ── HERO ── */}
        <section className="pp-hero">
          <div className="pp-hero-bg" />
          <div className="pp-hero-overlay" />
          <div className="pp-hero-content">
            <Reveal>
              <p className="pp-hero-h2">AOF 30-Day Online Program</p>
              <h1 className="pp-hero-h1">
                Build Real <br />
                <span style={{ color: "#07b4ba" }}>MMA Striking</span> <br />
                Fundamentals
              </h1>
              <p className="pp-hero-desc">
                A structured system designed to create visible improvement in your first 30 days.
                Built for absolute beginners.
              </p>
              <button className="pp-join-btn" onClick={scrollToFooter}>Join Now</button>
            </Reveal>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div className="pp-trust-strip">
          <div className="pp-trust-item">
            <span className="pp-trust-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
              </svg>
            </span>
            <p>PROVEN SYSTEM</p>
          </div>
          <div className="pp-trust-item">
            <span className="pp-trust-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <p>TAMIL TEAM</p>
          </div>
          <div className="pp-trust-item">
            <span className="pp-trust-icon">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M8 21h8"/><path d="M12 17v4"/>
                <path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/>
                <path d="M5 4H3v2a4 4 0 0 0 4 4"/><path d="M19 4h2v2a4 4 0 0 1-4 4"/>
              </svg>
            </span>
            <p>REAL RESULTS</p>
          </div>
        </div>

        {/* ── PAIN SECTION ── */}
        <div className="pp-problem">
          <div className="pp-section">
            <Reveal>
              <div className="pp-problem-grid">
                <div className="pp-problem-left">
                  <p style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>Sounds Familiar?</p>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,4vw,42px)", letterSpacing: 2, color: "#fff", marginBottom: 16, lineHeight: 1.1 }}>
                    You're Training Hard...<br />But Still Not Improving
                  </h2>
                  <div style={{ width: 80, height: 3, background: "#e53e3e", borderRadius: 2, marginBottom: 24, boxShadow: "0 0 10px rgba(229,62,62,0.7)" }} />
                  {painPoints.map((p, i) => (
                    <Reveal key={i} delay={i * 80}>
                      <div className="pp-pain-item">
                        <div className="pp-pain-bar" />
                        <p>{p}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <div className="pp-problem-right">
                  <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=900&q=80" alt="MMA Training" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── AOF INTRO SECTION ── */}
        <div style={{ background: "#0b0b0b", backgroundImage: "repeating-linear-gradient(-45deg, rgba(7,180,186,0.05) 0px, rgba(7,180,186,0.05) 1px, transparent 1px, transparent 5px)" }}>
          <div className="pp-section">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 10, overflow: "hidden", background: "linear-gradient(135deg,#1c2230 0%, #202632 100%)" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 90, height: 90, borderRadius: "50%", background: "#07b4ba", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "15px solid white", marginLeft: 6 }} />
                  </div>
                </div>
              </div>
              <div>
                <p style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 3, textTransform: "uppercase",marginBottom: 10 }}>AOF Intro Section</p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,4vw,42px)", letterSpacing: 2, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
                  Welcome to the <span style={{ color: "#07b4ba" }}>AOF Family</span>
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.8 }}>
                    At Art of Fight, we're more than just a gym — we're a family built on discipline, respect, and relentless growth. Our coaches bring years of real fight experience to every session.
                  </p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.8 }}>
                    Whether you're a complete beginner or training for competition, you'll find a system designed to push your limits safely while building strong fundamentals, sharp technique, and fighter mentality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section className="pp-features">
          <div className="pp-section">
            <Reveal>
              <p
  style={{
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 700,
    fontSize: 14,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: "#07b4ba",
    marginBottom: 0,
    textAlign: "center",
  }}
>
  WHAT'S INCLUDED
</p>
              <h2 className="pp-features-heading">WHAT YOU GET</h2>
            </Reveal>
            <div className="pp-features-grid">
              {whatCards.map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="pp-feature-card">
                    <div className="pp-feature-icon">{item.icon}</div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ROADMAP SECTION ── */}
        <div className={isMobileRoadmap ? "pp-roadmap pp-roadmap-mobile" : "pp-roadmap"} style={{ background: "#0b0b0b", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "30px 0", backgroundImage: "repeating-linear-gradient(-45deg, rgba(7,180,186,0.04) 0px, rgba(7,180,186,0.04) 1px, transparent 1px, transparent 6px)" }}>
            <div style={{ textAlign: "center", marginBottom: 35 }}>
              <p style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>
                30 DAYS TRANSFORMATION JOURNEY
              </p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(30px,4vw,60px)", lineHeight: 0.95, letterSpacing: 3, color: "#fff" }}>
                YOUR <span style={{ color: "#07b4ba" }}>5 WEEK</span> ROADMAP
              </h2>
              <p style={{ marginTop: 18, color: "rgba(255,255,255,0.6)", fontFamily: "'Barlow', sans-serif", fontSize: 18 }}>
                A structured path. Weekly focus. Real results.
              </p>
            </div>

            {isMobileRoadmap ? (
              <div className="pp-roadmap-mobile-shell">
                <div className="pp-roadmap-mobile-timeline">
                  <div className="pp-roadmap-mobile-line" />
                  {roadmapCards.map((week, i) => (
                    <button key={week.title} className={`pp-roadmap-mobile-step ${i === roadmapIndex ? "active" : ""}`} onClick={() => setRoadmapIndex(i)} aria-label={`Show ${week.title}`}>
                      <span>{week.title}</span>
                      <i />
                    </button>
                  ))}
                </div>
                <div className="pp-roadmap-mobile-stage">
                  <button className="pp-roadmap-arrow pp-roadmap-arrow-left" onClick={() => setRoadmapIndex((prev) => Math.max(prev - 1, 0))} disabled={roadmapIndex === 0} aria-label="Previous week">{"<"}</button>
                  <button className="pp-roadmap-arrow pp-roadmap-arrow-right" onClick={() => setRoadmapIndex((prev) => Math.min(prev + 1, roadmapCards.length - 1))} disabled={roadmapIndex === roadmapCards.length - 1} aria-label="Next week">{">"}</button>
                  <div className="pp-roadmap-viewport">
                    <div className="pp-roadmap-track" style={{ transform: `translateX(calc(-${roadmapIndex} * (82vw + 16px)))` }}>
                      {roadmapCards.map((card, i) => (
                        <div key={card.title} className="pp-roadmap-card">
                          <div className="pp-roadmap-card-bg" style={{ backgroundImage: `url(${card.image})` }} />
                          <div className="pp-roadmap-card-body">
                            {i === roadmapIndex && <p className="pp-roadmap-you">YOU ARE HERE</p>}
                            <h3>{card.title}</h3>
                            <div className="pp-roadmap-rule" />
                            <div className="pp-roadmap-points">
                              {card.points.map((point) => (
                                <div key={point} className="pp-roadmap-point">
                                  <span>✓</span>
                                  <p>{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="pp-roadmap-card-footer">
                            <span>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                              </svg>
                            </span>
                            <p>{card.days}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pp-roadmap-dots">
                  {roadmapCards.map((card, i) => (
                    <button key={card.title} className={i === roadmapIndex ? "active" : ""} onClick={() => setRoadmapIndex(i)} aria-label={`Go to ${card.title}`} />
                  ))}
                </div>
                <div className="pp-roadmap-note">
                  <div className="pp-roadmap-note-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 21h8" /><path d="M12 17v4" />
                      <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
                      <path d="M5 4H3v2a4 4 0 0 0 4 4" /><path d="M19 4h2v2a4 4 0 0 1-4 4" />
                    </svg>
                  </div>
                  <div>
                    <h3>STAY CONSISTENT. TRUST THE PROCESS.</h3>
                    <p>Become the best version of yourself.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto", overflow: "hidden", padding: "0 70px" }}>
                <button onClick={() => setRoadmapIndex((prev) => Math.max(prev - 1, 0))} style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20, width: 52, height: 52, borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "#0d1117", color: "#fff", fontSize: 24, cursor: "pointer" }}>‹</button>
                <button onClick={() => setRoadmapIndex((prev) => Math.min(prev + 1, roadmapCards.length - 2))} style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 20, width: 52, height: 52, borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "#0d1117", color: "#fff", fontSize: 24, cursor: "pointer" }}>›</button>
                <div className="roadmap-timeline" style={{ display: "flex", justifyContent: "space-between", marginBottom: 42, position: "relative" }}>
                  <div style={{ position: "absolute", top: 14, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.1)" }} />
                  {roadmapCards.map((week, i) => (
                    <div key={i} style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                      <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: 1, color: i === roadmapIndex || i === roadmapIndex + 1 ? "#07b4ba" : "rgba(255,255,255,0.45)", marginBottom: 10, transition: "0.3s" }}>{week.title}</p>
                      <div style={{ width: 26, height: 26, borderRadius: "50%", border: "2px solid #07b4ba", background: i === roadmapIndex || i === roadmapIndex + 1 ? "#07b4ba" : "#0b0b0b", boxShadow: i === roadmapIndex || i === roadmapIndex + 1 ? "0 0 18px rgba(7,180,186,0.95)" : "none", transition: "0.3s" }} />
                    </div>
                  ))}
                </div>
                <div style={{ overflow: "hidden" }}>
                  <div style={{ display: "flex", gap: 20, transform: `translateX(-${roadmapIndex * 47}%)`, transition: "0.45s ease" }}>
                    {roadmapCards.map((card, i) => (
                      <div key={i} className="roadmap-card" style={{ minWidth: "45%", borderRadius: 22, overflow: "hidden", background: "linear-gradient(180deg,#10151d 0%, #0b0f14 100%)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 90 }}>
                          <img src={card.image} alt={card.title} style={{ width: "100%", height: 285, objectFit: "cover" }} />
                          <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: "#fff", marginBottom: 18 }}>{card.title}</h3>
                            <div style={{ width: 60, height: 3, background: "#07b4ba", marginBottom: 20 }} />
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                              {card.points.map((point, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #07b4ba", color: "#07b4ba", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>✓</div>
                                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                          <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "#07b4ba", letterSpacing: 1 }}>{card.days}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── PROMISE SECTION ── */}
            <div className="cp-promise-section" style={{ marginTop: 60 }}>
              <div className="cp-new-promise">
                <p className="cp-new-promise-title">OUR PROMISE</p>
                <div className="cp-new-promise-line" />
                <p className="cp-new-promise-text">
                  <span className="cp-quote-mark">"</span>
                  Most fighters train hard. Very few train correctly. AOF exists to close that gap — with structure, accountability, and coaching that actually evolves with you.
                </p>
              </div>
            </div>

            {/* ── JOIN NOW STRIP ── */}
            <div className="pp-book-strip" style={{ marginTop: 24 }}>
              <button onClick={scrollToFooter}>Join Now</button>
            </div>

          </div>
        </div>

        {/* ── COACH SECTION ── */}
        <div className="pp-coach-bg">
          <div className="pp-section" style={{ paddingBottom: 40 }}>
            <Reveal>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "#07b4ba", fontWeight: 700, marginBottom: 24, letterSpacing: 2, textTransform: "uppercase" }}>LED BY</p>
              <div style={{ display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80" alt="Head Coach" style={{ width: 240, height: 300, objectFit: "cover", objectPosition: "top", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 2, color: "#fff", marginBottom: 4 }}>Head Coach</h2>
                  <p style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>AOF Academy — Lead Trainer &amp; Founder</p>
                  <div style={{ marginBottom: 24 }}>
                    {coachCredentials.map((cred, i) => (
                      <div key={i} className="pp-checklist-item">
                        <span className="check">✓</span>
                        <p>{cred}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pp-coach-stats" style={{ display: "flex", gap: 22, flexWrap: "wrap", marginTop: 26 }}>
                    {stats.map((stat, i) => (
                      <div key={i} style={{ background: "linear-gradient(180deg,#181818 0%, #121212 100%)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, width: 160, height: 140, padding: "18px 16px", textAlign: "center", boxShadow: "0 0 14px rgba(0,0,0,0.18)" }}>
                        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: "#07b4ba", letterSpacing: 1, marginBottom: 10 }}>{stat.val}</p>
                        <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.45)", fontSize: 12, letterSpacing: 2, textTransform: "uppercase" }}>{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <div className="pp-testi-bg">
          <div className="pp-section" style={{ paddingTop: 48 }}>
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 44 }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", color: "#07b4ba", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>Real People, Real Results</p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px,5vw,56px)", letterSpacing: 2, color: "#fff", marginTop: 8, lineHeight: 1 }}>
                  Trusted By Fighters, <span style={{ color: "#07b4ba" }}>Proven Results</span>
                </h2>
                <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.42)", marginTop: 8, fontSize: 14 }}>Here's What Athletes Say About Their Transformation With AOF</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="pp-testi-main">
                <div className="pp-testi-img">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&q=80" alt="Athlete" />
                </div>
                <div style={{ flex: 1, minWidth: 260 }}>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3vw,42px)", letterSpacing: 1.5, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
                    AOF Changed The Way <span style={{ color: "#07b4ba" }}>I Train And Perform.</span>
                  </h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.75 }}>
                    The structure, the attention to detail, and the accountability took me to a level I never thought possible. I'm stronger, faster, and fight with more confidence than ever.
                  </p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", marginTop: 14, color: "#07b4ba", fontWeight: 700, fontSize: 14 }}>— Alex M., Amateur MMA Fighter</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <InfiniteFeedbackSlider />
            </Reveal>
          </div>
        </div>

        {/* ── BONUSES SECTION ── */}
        <div style={{ background: "#0b0b0b", position: "relative", overflow: "hidden", backgroundImage: "linear-gradient(rgba(7,180,186,0.05) 1px, transparent 0.4px), linear-gradient(90deg, rgba(7,180,186,0.05) 1px, transparent 0.4px)", backgroundSize: "32px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 20px" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <p style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>EXCLUSIVE FOUNDERS BONUSES</p>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,4vw,42px)", lineHeight: 0.95, letterSpacing: 2, color: "#fff", marginBottom: 18 }}>
                5 PREMIUM BONUSES.<span style={{ color: "#07b4ba" }}> FREE WITH ENROLLMENT.</span>
              </h2>
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.62)", lineHeight: 1.7 }}>Join the Founder's Batch and unlock premium resources at no extra cost.</p>
            </div>
            <div className="pp-bonus-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
              {[
                { title: "FIGHTER NUTRITION GUIDE", desc: "Simple meal structure to improve recovery, energy and body composition.", img: "🥗", value: "₹1499 VALUE" },
                { title: "DAILY MOBILITY ROUTINE", desc: "Warm-up and recovery drills to move better and prevent injuries.", img: "🧘", value: "₹1299 VALUE" },
                { title: "PRIVATE FIGHTERS COMMUNITY", desc: "Get support, motivation and direct interaction with fellow members.", img: "💬", value: "₹1299 VALUE" },
                { title: "ADVANCED SHADOWBOXING FLOWS", desc: "Extra drills to improve timing, rhythm and striking creativity.", img: "🥊", value: "₹1299 VALUE" },
                { title: "FIGHTER MINDSET AUDIO PACK", desc: "Mental conditioning audios to improve focus, discipline and confidence.", img: "🎧", value: "₹1199 VALUE" },
              ].map((item, i) => (
                <div key={i} style={{ background: "linear-gradient(180deg,#0e141c 0%, #0a0f14 100%)", border: "1px solid rgba(7,180,186,0.35)", borderRadius: 18, padding: "24px 20px", position: "relative", overflow: "hidden", minHeight: 420, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <div style={{ position: "absolute", top: 14, right: 14, background: "#07b4ba", color: "#000", fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, letterSpacing: 1, padding: "5px 10px", borderRadius: 5 }}>FREE BONUS</div>
                  <div style={{ width: 95, height: 95, borderRadius: "50%", border: "2px solid rgba(7,180,186,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42, marginBottom: 24, marginTop: 10 }}>{item.img}</div>
                  <p style={{ color: "#07b4ba", fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 12 }}>BONUS #{i + 1}</p>
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 34, lineHeight: 1, letterSpacing: 1.5, color: "#fff", marginBottom: 18 }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, marginBottom: "auto" }}>{item.desc}</p>
                  <div style={{ marginTop: 30, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, width: "100%" }}>
                    <p style={{ color: "#07b4ba", fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 40, border: "1px solid rgba(7,180,186,0.35)", borderRadius: 18, padding: "16px 24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 20, background: "linear-gradient(90deg,#0f141a 0%, #0a0f14 100%)" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                  <img src="https://i.postimg.cc/pr1bYVdc/Chat-GPT-Image-May-22-2026-12-03-35-AM.png" alt="Gift Box" style={{ width: 95, height: 95, objectFit: "contain", marginTop: 2, marginBottom: 4, filter: "drop-shadow(0 0 10px rgba(255,215,0,0.35))" }} />
                  <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 14, letterSpacing: 1, marginTop: -70, marginLeft: 26 }}>TOTAL BONUS VALUE</p>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 46, lineHeight: 1, letterSpacing: 2, color: "#07b4ba", marginLeft: 160, marginTop: -60 }}>₹7,499</h2>
              </div>
              <div style={{ paddingLeft: 25, borderLeft: "1px solid rgba(255,255,255,0.14)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: 2, color: "#fff", lineHeight: 1 }}>YOURS 100% FREE</p>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.68)", marginTop: 12 }}>When you join the AOF 30-Day MMA Striking Program.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── APPLY / CTA SECTION ── */}
        <div ref={footerRef} style={{ background: "#0b0b0b", backgroundImage: "radial-gradient(rgba(7,180,186,0.22) 1px, transparent 1px)", backgroundSize: "20px 20px", position: "relative", overflow: "hidden" }}>
          <div className="pp-section">
            <div className="pp-apply-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 3, color: "#07b4ba", marginBottom: 12, textTransform: "uppercase" }}>Ready To Start?</p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,4vw,44px)", lineHeight: 0.95, letterSpacing: 2, color: "#fff", marginBottom: 20 }}>
                  APPLY FOR YOUR <br /><span style={{ color: "#07b4ba" }}>30-DAY PROGRAM</span>
                </h2>
                <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.52)", fontSize: 13, lineHeight: 1.7, marginBottom: 20, maxWidth: 340 }}>
                  Spots are limited. We only take a small number of students at a time to ensure every athlete gets the attention they deserve.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                  {["Structured step-by-step training system", "Beginner friendly progression", "Train anytime from your home", "Tamil-guided instructions"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: "#07b4ba", fontSize: 18, lineHeight: 1 }}>✓</span>
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 15, color: "#fff" }}>{item}</p>
                    </div>
                  ))}
                </div>
                <button style={{ height: 52, padding: "0 28px", borderRadius: 999, border: "none", background: "#1ebe57", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 1, cursor: "pointer" }}>
                  Chat On WhatsApp
                </button>
              </div>

              {/* CTA CARD */}
              <div style={{ background: "#05070b", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", padding: "32px 28px", textAlign: "center", boxShadow: "0 0 30px rgba(0,0,0,0.4)" }}>
                <p style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#07b4ba", marginBottom: 14 }}>LIMITED FOUNDER SPOTS</p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,5vw,60px)", lineHeight: 0.95, letterSpacing: 2, marginBottom: 20, color: "#fff" }}>
                  START YOUR<br /><span style={{ color: "#07b4ba" }}>TRANSFORMATION</span>
                </h2>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "rgba(255,255,255,0.3)", textDecoration: "line-through" }}>₹1999</span>
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, letterSpacing: 2, color: "#fff", lineHeight: 1 }}>₹999</span>
                </div>
                <button style={{ width: "100%", height: 60, border: "none", borderRadius: 12, background: "#16c7d0", color: "#fff", fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, cursor: "pointer", boxShadow: "0 0 24px rgba(7,180,186,0.28)" }}>
                  JOIN NOW
                </button>
                <p style={{ marginTop: 18, fontFamily: "'Barlow', sans-serif", fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
                  Build real striking fundamentals with a structured beginner-friendly system.
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 20 }}>
                  {[["01","DAYS"],["23","HOURS"],["49","MIN"]].map(([num, label]) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <div style={{ width: 64, height: 64, borderRadius: 12, border: "1px solid rgba(7,180,186,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: "#07b4ba", background: "#0b1016" }}>{num}</div>
                      <p style={{ marginTop: 6, fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: 2, color: "rgba(255,255,255,0.4)" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <FAQSection />

        {/* ── FOOTER ── */}
        <footer className="pp-footer">
          <div className="pp-footer-inner">
            <div>
              <h3 className="pp-footer-title">CONTACT</h3>
              <div className="pp-footer-contact">
                <p>+91 00000 00000</p>
                <p>info@aofacademy.com</p>
                <p>Chennai, Tamil Nadu, India</p>
              </div>
            </div>
            <div>
              <h3 className="pp-footer-title">NAVIGATION</h3>
              <div className="pp-footer-links">
                <a href="#home">Home</a>
                <a href="#method">AOF Method</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#faq">FAQ</a>
                <a href="#contact">Apply Now</a>
              </div>
            </div>
            <div>
              <h3 className="pp-footer-title">
                <span style={{ color: "#07b4ba" }}>A</span>
                <span style={{ color: "#fff" }}>O</span>
                <span style={{ color: "#07b4ba" }}>F</span>
              </h3>
              <div className="pp-footer-about">
                <p>Art of Fighting Academy — building champions through proven systems and disciplined training.</p>
              </div>
            </div>
          </div>
          <div className="pp-footer-bottom">© 2026 AOF Academy. All rights reserved.</div>
        </footer>

      </div>
    </>
  );
}
