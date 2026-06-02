import { useEffect, useRef, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   TAILWIND NOTE:
   All sizing uses Tailwind tokens (fixed rem).
   No vw/px hacks. Looks identical on every
   1080p, 1200p, or 1440p screen.
   
   Google Fonts loaded via style tag below.
   Bebas Neue  → font-bebas  (custom class)
   Barlow      → font-barlow (custom class)
───────────────────────────────────────── */

/* ── REVEAL ── */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
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

function FeedbackSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const allCards = [...feedbackCards, ...feedbackCards];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;
    const half = () => track.scrollWidth / 2;
    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += 0.55;
        if (posRef.current >= half()) posRef.current -= half();
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    const pause = () => { pausedRef.current = true; };
    const resume = () => { setTimeout(() => { pausedRef.current = false; }, 600); };
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    return () => {
      cancelAnimationFrame(rafRef.current);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
    };
  }, [isMobile]);

  const nudge = (dir: number) => {
    pausedRef.current = true;
    posRef.current = Math.max(posRef.current + dir * 364, 0);
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1)";
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
      setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ""; }, 680);
    }
    setTimeout(() => { pausedRef.current = false; }, 700);
  };

  if (isMobile) {
    const cards = [0, 1, 2].map(i => feedbackCards[(page + i) % feedbackCards.length]);
    return (
      <div>
        <div className="flex flex-col gap-5">
          {cards.map((c, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-[#171a21] p-7">
              <div className="flex gap-1 text-[#07b4ba] text-xl mb-4">★★★★★</div>
              <p className="font-barlow text-white/75 text-base italic leading-relaxed mb-5">"{c.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#262b35] flex items-center justify-center text-lg">👤</div>
                <div>
                  <p className="font-barlow font-bold text-white text-sm">{c.author}</p>
                  <span className="font-barlow text-white/40 text-xs">Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-8">
          {["‹","›"].map((ch, i) => (
            <button key={i} onClick={() => setPage(p => (p + (i === 0 ? -1 : 1) + feedbackCards.length) % feedbackCards.length)}
              className="w-12 h-12 rounded-full border border-white/15 bg-[#111317] text-white text-xl flex items-center justify-center">
              {ch}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div ref={sliderRef} className="overflow-hidden w-full">
        <div ref={trackRef} className="flex gap-6" style={{ width: "max-content", willChange: "transform" }}>
          {allCards.map((c, i) => (
            <div key={i} className="w-80 flex-shrink-0 rounded-2xl bg-[#1a1d23] border border-white/5 p-7 flex flex-col">
              <div className="flex gap-1 text-[#07b4ba] text-base mb-4">★★★★★</div>
              <p className="font-barlow text-white/72 text-sm leading-relaxed italic mb-5">"{c.text}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-11 h-11 rounded-full bg-[#202533] flex items-center justify-center text-[#8d96a8] text-lg flex-shrink-0">👤</div>
                <div>
                  <p className="font-barlow font-bold text-white text-sm mb-0.5">{c.author}</p>
                  <span className="font-barlow text-white/40 text-xs">Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
        {["‹","›"].map((ch, i) => (
          <button key={i} onClick={() => nudge(i === 0 ? -1 : 1)}
            className="w-13 h-13 rounded-full border border-white/12 bg-[rgba(15,18,24,0.92)] text-white text-2xl flex items-center justify-center cursor-pointer"
            style={{ width: 52, height: 52 }}>
            {ch}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── FAQ ── */
const faqItems = [
  { q: "Who is AOF 1-on-1 coaching for?", a: "AOF coaching is designed for serious fighters and committed beginners alike — anyone who is tired of training without direction. Whether you're a competitive MMA athlete looking to peak for your next bout, or someone starting from scratch who wants to build real skill fast, our personalised system is built around your specific goals, body type, and schedule." },
  { q: "How does the remote coaching work?", a: "After your strategy call, your coach builds a fully customised training plan and delivers it digitally. You'll have direct WhatsApp access to your coach for questions, feedback, and check-ins. You submit session videos for review, and your coach adjusts the plan in real time based on what they see." },
  { q: "How quickly will I see results?", a: "Most athletes report noticeable improvements in technique and conditioning within the first 3–4 weeks. Significant transformation typically takes 6–8 weeks of consistent training under the AOF method." },
  { q: "What if I'm a complete beginner?", a: "Beginners are welcome and thrive in the AOF system. In fact, starting with proper 1-on-1 coaching before picking up bad habits is the fastest route to becoming a skilled fighter." },
  { q: "Is there a contract or long-term commitment?", a: "No long-term contracts. You can cancel anytime. We also back that up with a results guarantee — if you don't see measurable progress, we'll extend your coaching for free until you do." },
  { q: "How many sessions should I train per week?", a: "Most athletes train between 3–6 sessions per week depending on their goals, recovery capacity, and schedule. Your coach will create the optimal structure for you." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div id="faq" className="bg-[#0b0b0b]">
      <div className="max-w-5xl mx-auto px-10 py-16 text-center">
        <Reveal>
          <p className="font-barlow font-bold text-xs tracking-[3px] uppercase text-[#07b4ba] mb-2">Got Questions?</p>
          <h2 className="font-bebas text-5xl tracking-widest text-white leading-none mb-2">
            Frequently Asked <span className="text-[#07b4ba]">Questions</span>
          </h2>
          <div className="w-14 h-0.5 bg-[#07b4ba] mx-auto my-5 rounded-full" />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          {faqItems.map((item, i) => (
            <Reveal key={i}>
              <div className={`rounded-xl border bg-[#141414] overflow-hidden transition-colors duration-200 ${open === i ? "border-[rgba(7,180,186,0.45)]" : "border-white/8"}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full bg-transparent border-none flex items-center justify-between px-6 py-5 cursor-pointer text-left gap-4"
                >
                  <span className={`font-barlow font-bold text-lg leading-snug flex-1 ${open === i ? "text-[#07b4ba]" : "text-white"}`}>{item.q}</span>
                  <span
                    className={`w-7 h-7 rounded-full border flex items-center justify-center flex-shrink-0 text-lg leading-none transition-all duration-300 ${open === i ? "border-[#07b4ba] bg-[rgba(7,180,186,0.12)] text-[#07b4ba] rotate-45" : "border-white/20 text-white/60"}`}
                  >+</span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-400 px-6"
                  style={{ maxHeight: open === i ? 400 : 0, paddingBottom: open === i ? 20 : 0 }}
                >
                  <p className="font-barlow text-sm text-white/58 leading-7">{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── SVG ICONS ── */
const IcoShield = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
const IcoUsers = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IcoTrophy = () => <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M12 17v5M7 4v6a5 5 0 0 0 10 0V4H7z"/></svg>;
const IcoPlan = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>;
const IcoMsg = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IcoLeaf = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z"/></svg>;
const IcoChart = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IcoGlobe = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IcoNutrition = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="52" height="52"><path d="M12 22V12"/><path d="M12 12C12 7 17 3 21 2c0 5-2 9-9 10z"/><path d="M12 12C12 7 7 3 3 2c0 5 2 9 9 10z"/></svg>;
const IcoMobility = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="52" height="52"><circle cx="12" cy="5" r="2"/><path d="M12 7v5"/><path d="M12 12l-4 4"/><path d="M12 12l4 4"/><path d="M12 10l5-2"/></svg>;
const IcoCommunity = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="52" height="52"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-3 3-5 5-5s5 2 5 5"/><path d="M11 20c0-3 3-5 5-5s5 2 5 5"/></svg>;
const IcoShadowbox = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="52" height="52"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></svg>;
const IcoAudio = () => <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="52" height="52"><path d="M4 12a8 8 0 0 1 16 0"/><rect x="2" y="12" width="4" height="8" rx="2"/><rect x="18" y="12" width="4" height="8" rx="2"/></svg>;

/* ── DATA ── */
const whatCards = [
  { icon: <IcoPlan />, title: "MADE EXCLUSIVELY FOR BEGINNERS", desc: "Clear guidance from day one" },
  { icon: <IcoChart />, title: "STRUCTURED PROGRESSION", desc: "Stance → punches → kicks → combinations" },
  { icon: <IcoLeaf />, title: "NO EQUIPMENT OR PARTNER NEEDED", desc: "Train effectively from the comfort of your home." },
  { icon: <IcoGlobe />, title: "TAMIL-GUIDED INSTRUCTION", desc: "For better understanding" },
  { icon: <IcoMsg />, title: "JUST 30-40 MINUTES A DAY", desc: "Built for busy schedules" },
];

const painPoints = [
  "You train 4-5 days a week but your technique isn't improving",
  "Your sparring partners are getting better — you feel stuck",
  "You have no structured plan, just random gym sessions",
  "Coaches at your gym don't give you personal attention",
  "You don't know what to fix or where to even start",
];

const stats = [
  { val: "1,000+", label: "Athletes Coached" },
  { val: "10+", label: "Years Experience" },
  { val: "50+", label: "Champions Trained" },
  { val: "3", label: "Continents" },
];

const coachCreds = [
  "Former Professional MMA Fighter — 12+ Years Ring Experience",
  "Trained athletes who compete at national and international level",
  "Specialist in striking, grappling transitions and mental conditioning",
];

const bonuses = [
  { title: "FIGHTER NUTRITION GUIDE", val: "₹1499 VALUE", icon: <IcoNutrition /> },
  { title: "DAILY MOBILITY ROUTINE", val: "₹1299 VALUE", icon: <IcoMobility /> },
  { title: "PRIVATE FIGHTERS COMMUNITY", val: "₹1299 VALUE", icon: <IcoCommunity /> },
  { title: "ADVANCED SHADOWBOXING FLOWS", val: "₹1299 VALUE", icon: <IcoShadowbox /> },
  { title: "FIGHTER MINDSET AUDIO PACK", val: "₹1199 VALUE", icon: <IcoAudio /> },
];

const roadmapCards = [
  { title: "1ST WEEK", days: "DAYS 1 - 7", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200", points: ["Fundamentals", "Basic Techniques", "Conditioning", "Mindset Building"] },
  { title: "2ND WEEK", days: "DAYS 8 - 14", image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200", points: ["Skill Development", "Strength & Power", "Drills & Combos", "Recovery Focus"] },
  { title: "3RD WEEK", days: "DAYS 15 - 21", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200", points: ["Advanced Techniques", "Sparring Practice", "Endurance Boost", "Mental Toughness"] },
  { title: "4TH WEEK", days: "DAYS 22 - 28", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200", points: ["Fight IQ", "Combination Chains", "Counter Attacks", "Explosive Training"] },
  { title: "5TH WEEK", days: "DAYS 29 - 30", image: "https://images.unsplash.com/photo-1517438984742-1262db08379e?q=80&w=1200", points: ["Full Integration", "Fight Simulation", "Peak Conditioning", "Program Completion"] },
];

/* ── MAIN COMPONENT ── */
export default function ProgramPage() {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);
  const [roadmapIdx, setRoadmapIdx] = useState(0);
  const [isMobileRoadmap, setIsMobileRoadmap] = useState(false);

  useEffect(() => {
    const check = () => setIsMobileRoadmap(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollDown = () => footerRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── Google Fonts + Tailwind CDN ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif !important; }
        .font-barlow { font-family: 'Barlow', sans-serif !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { background: #0a0a0a; overflow-x: hidden; }
        img { max-width: 100%; height: auto; display: block; }

        /* Grid pattern backgrounds */
        .bg-grid-teal {
          background-image: linear-gradient(rgba(7,180,186,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(7,180,186,0.07) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .bg-grid-dot {
          background-image: radial-gradient(rgba(7,180,186,0.22) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-stripe {
          background-image: repeating-linear-gradient(-45deg,
            rgba(7,180,186,0.05) 0px, rgba(7,180,186,0.05) 1px,
            transparent 1px, transparent 5px);
        }
        .text-white\\/72 { color: rgba(255,255,255,0.72); }
        .text-white\\/58 { color: rgba(255,255,255,0.58); }
        .text-white\\/8 { color: rgba(255,255,255,0.08); }
        .border-white\\/8 { border-color: rgba(255,255,255,0.08) !important; }
        .border-white\\/12 { border-color: rgba(255,255,255,0.12) !important; }
        .border-white\\/15 { border-color: rgba(255,255,255,0.15) !important; }

        /* Roadmap card hover */
        .roadmap-card:hover { border-color: rgba(7,180,186,0.3) !important; }
      `}</style>

      <div className="font-barlow text-white bg-[#0a0a0a] overflow-x-hidden">

        {/* ══ NAVBAR ══ */}
        <nav className="fixed top-0 left-0 right-0 z-50 h-[62px] px-6 flex items-center justify-between"
          style={{ background: "rgba(17,20,25,0.82)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h1 className="font-bebas text-[30px] leading-none">
            <span className="text-[#07b4ba]">A</span>
            <span className="text-white">O</span>
            <span className="text-[#07b4ba]">F</span>
          </h1>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="hidden md:block bg-transparent border-none text-white/65 font-barlow font-bold text-sm cursor-pointer hover:text-white transition-colors">
              ← Back To Home
            </button>
            <button onClick={scrollDown}
              className="font-bebas text-[17px] tracking-[3px] px-5 py-2 rounded-md bg-[#07b4ba] text-white border-none cursor-pointer hover:bg-[#075e61] transition-colors">
              JOIN NOW
            </button>
          </div>
        </nav>

        {/* ══ HERO ══ */}
        <section className="relative min-h-[78vh] flex items-center justify-start overflow-hidden pt-[110px] pb-[60px] px-6 md:px-12"
          style={{ background: "radial-gradient(circle at top, rgba(7,180,186,0.12), transparent 45%), #06080c" }}>
          {/* BG image */}
          <div className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(to bottom, rgba(6,8,12,0.65), rgba(6,8,12,0.92)), url('https://i.postimg.cc/HWBD3qMR/Chat-GPT-Image-May-1-2026-12-14-18-AM.png') center/cover no-repeat",
              opacity: 1,
            }} />
          <div className="absolute inset-0 z-[1]"
            style={{ background: "linear-gradient(180deg, rgba(6,8,12,0.55) 0%, rgba(6,8,12,0.78) 55%, #06080c 100%)" }} />

          {/* Content */}
          <div className="relative z-[2] flex flex-col items-start text-left max-w-xl">
            <Reveal>
              <p className="font-barlow font-bold text-xs tracking-[3px] uppercase text-[#07b4ba] mb-4">
                AOF 30-Day Online Program
              </p>
              <h1 className="font-bebas text-[clamp(48px,5vw,72px)] leading-[0.95] tracking-wide uppercase text-white mb-5">
                Build Real <br />
                <span className="text-[#07b4ba]">MMA Striking</span><br />
                Fundamentals
              </h1>
              <p className="font-barlow text-white/62 text-base leading-[1.7] max-w-[480px] mb-8">
                A structured system designed to create visible improvement in your first 30 days.
                Built for absolute beginners.
              </p>
              <button onClick={scrollDown}
                className="font-barlow font-bold text-sm uppercase tracking-wide px-[60px] py-4 rounded-[7px] bg-[#07b4ba] text-white border border-[#07b4ba] cursor-pointer hover:bg-[#057e82] transition-all">
                Join Now
              </button>
            </Reveal>
          </div>
        </section>

        {/* ══ TRUST BAR ══ */}
        <div className="w-full bg-[#07b4ba] flex items-center justify-evenly py-[14px] flex-nowrap z-20">
          {[
            { icon: <IcoShield />, label: "PROVEN SYSTEM" },
            { icon: <IcoUsers />, label: "TAMIL TEAM" },
            { icon: <IcoTrophy />, label: "REAL RESULTS" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3 flex-1 justify-center">
              <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">{icon}</div>
              <span className="font-bebas text-[22px] tracking-[2px] text-white leading-none whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>

        {/* ══ PAIN SECTION ══ */}
        <div className="bg-[#0b0b0b]">
          <div className="max-w-[1100px] mx-auto px-6 py-12">
            <Reveal>
              <div className="flex gap-14 items-center flex-wrap">
                {/* Left */}
                <div className="flex-1 min-w-[260px]">
                  <p className="font-barlow font-bold text-sm tracking-[3px] uppercase text-[#07b4ba] mb-2">Sounds Familiar?</p>
                  <h2 className="font-bebas text-[clamp(28px,4vw,42px)] tracking-wide text-white mb-4 leading-[1.1]">
                    You're Training Hard...<br />But Still Not Improving
                  </h2>
                  <div className="w-20 h-[3px] rounded bg-[#e53e3e] mb-6" style={{ boxShadow: "0 0 10px rgba(229,62,62,0.7)" }} />
                  {painPoints.map((p, i) => (
                    <Reveal key={i} delay={i * 70}>
                      <div className="flex items-start gap-3 mb-3.5">
                        <div className="w-[3px] h-[18px] mt-1 flex-shrink-0 rounded bg-[#ff2d2d]"
                          style={{ boxShadow: "0 0 6px rgba(255,45,45,0.9), 0 0 16px rgba(255,45,45,0.6)" }} />
                        <p className="font-barlow text-white/70 text-base leading-[1.5]">{p}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
                {/* Right image */}
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=900&q=80"
                    alt="MMA Training"
                    className="w-full rounded-2xl border border-white/10"
                    style={{ aspectRatio: "16/9", objectFit: "cover" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══ AOF INTRO ══ */}
        <div className="bg-[#0b0b0b] bg-stripe">
          <div className="max-w-[1100px] mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              {/* Video placeholder */}
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-[#1c2230] to-[#202632]" style={{ aspectRatio: "16/9" }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[90px] h-[90px] rounded-full bg-[#07b4ba] flex items-center justify-center cursor-pointer">
                    <div style={{ width: 0, height: 0, borderTop: "14px solid transparent", borderBottom: "14px solid transparent", borderLeft: "15px solid white", marginLeft: 6 }} />
                  </div>
                </div>
              </div>
              {/* Text */}
              <div>
                <p className="font-barlow font-bold text-sm tracking-[3px] uppercase text-[#07b4ba] mb-2">AOF Intro Section</p>
                <h2 className="font-bebas text-[clamp(28px,4vw,42px)] tracking-wide text-white leading-[1.1] mb-5">
                  Welcome to the <span className="text-[#07b4ba]">AOF Family</span>
                </h2>
                <p className="font-barlow text-white/70 text-base leading-[1.8] mb-4">
                  At Art of Fight, we're more than just a gym — we're a family built on discipline, respect, and relentless growth. Our coaches bring years of real fight experience to every session.
                </p>
                <p className="font-barlow text-white/62 text-[15px] leading-[1.8]">
                  Whether you're a complete beginner or training for competition, you'll find a system designed to push your limits safely while building strong fundamentals, sharp technique, and fighter mentality.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ WHAT YOU GET ══ */}
        <section className="bg-[#0b0b0b] bg-grid-teal relative overflow-hidden">
          <div className="max-w-[1100px] mx-auto px-6 py-12">
            <Reveal>
              <p className="font-barlow font-bold text-sm tracking-[3px] uppercase text-[#07b4ba] text-center mb-0">WHAT'S INCLUDED</p>
              <h2 className="font-bebas text-[clamp(32px,4vw,52px)] tracking-[2px] text-white text-center mb-12 mt-1">WHAT YOU GET</h2>
            </Reveal>
            {/* 5 equal columns */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {whatCards.map((item, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="bg-[#111417] border-2 border-[#111417] rounded-[18px] p-4 flex flex-col items-center text-center gap-4 min-h-[255px] justify-center">
                    <div className="w-[70px] h-[70px] flex items-center justify-center">
                      <div className="w-[52px] h-[52px]">{item.icon}</div>
                    </div>
                    <h4 className="font-bebas text-[#07b4ba] text-base tracking-[2px] leading-[1.3] min-h-[58px] flex items-start justify-center text-center">{item.title}</h4>
                    <p className="font-barlow text-white/62 text-sm leading-[1.55] text-center min-h-[44px] flex items-start justify-center">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ROADMAP ══ */}
        <div className="bg-[#0b0b0b] relative overflow-hidden bg-stripe">
          <div className="max-w-[1400px] mx-auto py-8">
            <div className="text-center mb-9 px-6">
              <p className="font-barlow font-bold text-sm tracking-[4px] uppercase text-[#07b4ba] mb-3">30 DAYS TRANSFORMATION JOURNEY</p>
              <h2 className="font-bebas text-[clamp(30px,4vw,60px)] leading-[0.95] tracking-[3px] text-white">
                YOUR <span className="text-[#07b4ba]">5 WEEK</span> ROADMAP
              </h2>
              <p className="font-barlow text-white/60 text-[15px] mt-4">A structured path. Weekly focus. Real results.</p>
            </div>

            {isMobileRoadmap ? (
              /* Mobile roadmap */
              <div className="px-4">
                {/* Timeline dots */}
                <div className="relative grid grid-cols-5 items-end gap-0 mx-4 mb-7">
                  <div className="absolute left-[9%] right-[9%] bottom-[7px] h-px bg-white/40" />
                  {roadmapCards.map((w, i) => (
                    <button key={w.title} onClick={() => setRoadmapIdx(i)}
                      className="relative z-[1] flex flex-col items-center gap-2 bg-transparent border-0 cursor-pointer"
                      style={{ color: i === roadmapIdx ? "#07e8ef" : "rgba(255,255,255,0.72)", fontFamily: "'Bebas Neue', sans-serif" }}>
                      <span className="text-xs overflow-hidden text-ellipsis whitespace-nowrap w-full text-center">{w.title}</span>
                      <i className="not-italic w-[15px] h-[15px] rounded-full"
                        style={{
                          border: i === roadmapIdx ? "2px solid #07e8ef" : "1px solid rgba(255,255,255,0.66)",
                          background: i === roadmapIdx ? "#061018" : "#03070c",
                          boxShadow: i === roadmapIdx ? "0 0 0 4px rgba(7,180,186,0.18), 0 0 16px rgba(7,232,239,0.95)" : "none",
                        }} />
                    </button>
                  ))}
                </div>
                {/* Active card */}
                {(() => {
                  const card = roadmapCards[roadmapIdx];
                  return (
                    <div className="relative overflow-hidden rounded-xl border border-[rgba(116,225,232,0.28)] min-h-[308px] mx-1"
                      style={{ background: "#061018" }}>
                      <div className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: `url(${card.image})` }} />
                      <div className="absolute inset-0 z-[1]"
                        style={{ background: "linear-gradient(90deg, rgba(2,7,12,0.98) 0%, rgba(2,7,12,0.78) 42%, rgba(2,7,12,0.34) 76%)" }} />
                      <div className="relative z-[2] p-7 min-h-[258px]">
                        <p className="font-bebas text-xs text-[#07e8ef] tracking-wide mb-1">YOU ARE HERE</p>
                        <h3 className="font-bebas text-white text-3xl tracking-[2px] mb-3">{card.title}</h3>
                        <div className="w-14 h-0.5 bg-[#07e8ef] mb-8" style={{ boxShadow: "0 0 10px rgba(7,232,239,0.55)" }} />
                        <div className="flex flex-col gap-4">
                          {card.points.map(pt => (
                            <div key={pt} className="flex items-center gap-2.5">
                              <span className="w-3.5 h-3.5 flex-shrink-0 flex items-center justify-center border border-[#07e8ef] rounded-full text-[#07e8ef] text-[8px]">✓</span>
                              <p className="font-barlow text-white/82 text-xs leading-[1.25]">{pt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative z-[2] flex items-center justify-center gap-3 min-h-[50px] border-t border-white/12"
                        style={{ background: "rgba(3,9,15,0.72)" }}>
                        <p className="font-bebas text-[#07e8ef] text-lg tracking-wide">{card.days}</p>
                      </div>
                    </div>
                  );
                })()}
                {/* Dots nav */}
                <div className="flex justify-center gap-3 mt-4">
                  {roadmapCards.map((_, i) => (
                    <button key={i} onClick={() => setRoadmapIdx(i)}
                      className="w-2 h-2 rounded-full border-0 cursor-pointer"
                      style={{ background: i === roadmapIdx ? "#07e8ef" : "rgba(255,255,255,0.3)", boxShadow: i === roadmapIdx ? "0 0 12px rgba(7,232,239,0.7)" : "none" }} />
                  ))}
                </div>
              </div>
            ) : (
              /* Desktop roadmap */
              <div className="relative max-w-[1320px] mx-auto overflow-hidden px-[70px]">
                <button onClick={() => setRoadmapIdx(p => Math.max(p - 1, 0))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-xl border border-white/8 bg-[#0d1117] text-white text-2xl cursor-pointer flex items-center justify-center">‹</button>
                <button onClick={() => setRoadmapIdx(p => Math.min(p + 1, roadmapCards.length - 2))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-xl border border-white/8 bg-[#0d1117] text-white text-2xl cursor-pointer flex items-center justify-center">›</button>

                {/* Timeline */}
                <div className="flex justify-between mb-10 relative">
                  <div className="absolute top-[14px] left-0 right-0 h-0.5 bg-white/10" />
                  {roadmapCards.map((w, i) => (
                    <div key={i} className="relative z-[2] text-center">
                      <p className="font-bebas text-[15px] tracking-wide mb-2.5 transition-colors"
                        style={{ color: i === roadmapIdx || i === roadmapIdx + 1 ? "#07b4ba" : "rgba(255,255,255,0.45)" }}>
                        {w.title}
                      </p>
                      <div className="w-[26px] h-[26px] rounded-full border-2 border-[#07b4ba] mx-auto transition-all"
                        style={{
                          background: i === roadmapIdx || i === roadmapIdx + 1 ? "#07b4ba" : "#0b0b0b",
                          boxShadow: i === roadmapIdx || i === roadmapIdx + 1 ? "0 0 18px rgba(7,180,186,0.95)" : "none",
                        }} />
                    </div>
                  ))}
                </div>

                {/* Cards track */}
                <div className="overflow-hidden">
                  <div className="flex gap-5 transition-transform duration-[450ms] ease-out"
                    style={{ transform: `translateX(calc(-${roadmapIdx} * (50% + 10px)))` }}>
                    {roadmapCards.map((card, i) => (
                      <div key={i} className="roadmap-card flex-shrink-0 rounded-[22px] overflow-hidden border border-white/6 transition-colors"
                        style={{ minWidth: "calc(50% - 10px)", background: "linear-gradient(180deg,#10151d 0%, #0b0f14 100%)" }}>
                        <div className="grid grid-cols-2">
                          <img src={card.image} alt={card.title} className="w-full object-cover" style={{ height: 285 }} />
                          <div className="p-8 flex flex-col justify-center">
                            <h3 className="font-bebas text-white text-[42px] mb-4">{card.title}</h3>
                            <div className="w-[60px] h-[3px] bg-[#07b4ba] mb-5 rounded" />
                            <div className="flex flex-col gap-3">
                              {card.points.map((pt, j) => (
                                <div key={j} className="flex items-center gap-2.5">
                                  <div className="w-5 h-5 flex-shrink-0 rounded-full border-2 border-[#07b4ba] text-[#07b4ba] flex items-center justify-center text-[10px]">✓</div>
                                  <p className="font-barlow text-sm text-white/75 leading-[1.4]">{pt}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t border-white/6 text-center">
                          <p className="font-bebas text-[22px] text-[#07b4ba] tracking-wide">{card.days}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Promise */}
            <div className="mt-14 px-6">
              <div className="max-w-[820px] mx-auto text-center py-8">
                <p className="font-bebas text-[30px] tracking-[2px] text-white mb-3">OUR PROMISE</p>
                <div className="w-[70px] h-0.5 bg-[#07b4ba] mx-auto rounded-full mb-5" />
                <p className="font-barlow text-[19px] leading-[1.9] text-white/76 italic max-w-[720px] mx-auto">
                  <span className="text-[#07b4ba] text-[42px] leading-none mr-1 relative top-2.5" style={{ fontFamily: "serif" }}>"</span>
                  Most fighters train hard. Very few train correctly. AOF exists to close that gap — with structure, accountability, and coaching that actually evolves with you.
                </p>
              </div>
            </div>

            {/* Join strip */}
            <div className="bg-[#07b4ba] flex items-center justify-center mx-6 mt-6">
              <button onClick={scrollDown} className="w-full py-3.5 bg-transparent border-none text-white font-bebas text-xl tracking-[3px] cursor-pointer hover:bg-black/10 transition-colors">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* ══ COACH ══ */}
        <div className="bg-[#0b0b0b]">
          <div className="max-w-[1100px] mx-auto px-6 py-12">
            <Reveal>
              <p className="font-barlow font-bold text-[17px] text-[#07b4ba] tracking-[2px] uppercase mb-6">LED BY</p>
              <div className="flex gap-14 items-start flex-wrap">
                <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80" alt="Head Coach"
                  className="rounded-xl border border-white/10 flex-shrink-0 object-cover object-top"
                  style={{ width: "min(240px, 100%)", height: 300, objectFit: "cover", objectPosition: "top" }} />
                <div className="flex-1 min-w-[260px]">
                  <h2 className="font-bebas text-[clamp(32px,4vw,48px)] tracking-[2px] text-white mb-1">Head Coach</h2>
                  <p className="font-barlow font-bold text-sm tracking-[3px] uppercase text-[#07b4ba] mb-5">AOF Academy — Lead Trainer & Founder</p>
                  <div className="mb-6">
                    {coachCreds.map((c, i) => (
                      <div key={i} className="flex items-start gap-2.5 mb-3.5">
                        <span className="text-[#07b4ba] text-base flex-shrink-0 mt-0.5">✓</span>
                        <p className="font-barlow text-white/70 text-[15px] leading-[1.5]">{c}</p>
                      </div>
                    ))}
                  </div>
                  {/* Stats — 4-column grid, fixed height */}
                  <div className="grid grid-cols-4 gap-5 mt-6 max-w-[660px]">
                    {stats.map((s, i) => (
                      <div key={i} className="rounded-2xl border border-white/8 text-center py-5 px-3"
                        style={{ background: "linear-gradient(180deg,#181818 0%, #121212 100%)", height: 140 }}>
                        <p className="font-bebas text-[42px] text-[#07b4ba] tracking-wide leading-none mb-2">{s.val}</p>
                        <p className="font-barlow text-white/45 text-xs tracking-[2px] uppercase">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ══ TESTIMONIALS ══ */}
        <div className="bg-[#0b0b0b] relative overflow-hidden">
          <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-12">
            <Reveal>
              <div className="text-center mb-11">
                <p className="font-barlow font-bold text-sm tracking-[3px] uppercase text-[#07b4ba]">Real People, Real Results</p>
                <h2 className="font-bebas text-[clamp(28px,4vw,60px)] tracking-[3px] text-white mt-2 leading-none">
                  Trusted By Fighters, <span className="text-[#07b4ba]">Proven Results</span>
                </h2>
                <p className="font-barlow text-white/42 mt-2 text-[15px]">Here's What Athletes Say About Their Transformation With AOF</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="flex gap-12 items-center mb-10 flex-wrap">
                <div className="flex-1 min-w-[280px] max-w-[500px]">
                  <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&q=80" alt="Athlete"
                    className="w-full rounded-xl object-cover" style={{ aspectRatio: "16/9" }} />
                </div>
                <div className="flex-1 min-w-[260px]">
                  <h3 className="font-bebas text-[clamp(26px,3vw,42px)] tracking-wide leading-[1.1] mb-4 text-white">
                    AOF Changed The Way <span className="text-[#07b4ba]">I Train And Perform.</span>
                  </h3>
                  <p className="font-barlow text-white/65 text-[15px] leading-[1.75]">
                    The structure, the attention to detail, and the accountability took me to a level I never thought possible. I'm stronger, faster, and fight with more confidence than ever.
                  </p>
                  <p className="font-barlow font-bold text-[#07b4ba] text-sm mt-3.5">— Alex M., Amateur MMA Fighter</p>
                </div>
              </div>
            </Reveal>
            <Reveal>
              <FeedbackSlider />
            </Reveal>
          </div>
        </div>

        {/* ══ BONUSES ══ */}
        <div className="bg-[#0b0b0b] bg-grid-teal relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 py-10">
            <div className="text-center mb-10">
              <p className="font-barlow font-bold text-sm tracking-[4px] uppercase text-[#07b4ba] mb-2">EXCLUSIVE FOUNDERS BONUSES</p>
              <h2 className="font-bebas text-[clamp(28px,4vw,60px)] leading-[0.95] tracking-[2px] text-white mb-4">
                5 PREMIUM BONUSES.<span className="text-[#07b4ba]"> FREE WITH ENROLLMENT.</span>
              </h2>
              <p className="font-barlow text-white/62 text-[15px] leading-[1.7]">Join the Founder's Batch and unlock premium resources at no extra cost.</p>
            </div>

            {/* 5-col bonus grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {bonuses.map((b, i) => (
                <div key={i} className="relative flex flex-col items-center text-center rounded-[18px] p-3 overflow-hidden min-h-[220px] border border-[rgba(7,180,186,0.35)]"
                  style={{ background: "linear-gradient(180deg,#0e141c 0%, #0a0f14 100%)" }}>
                  <div className="absolute top-3.5 left-3.5 bg-[#07b4ba] text-black font-bebas text-[15px] tracking-wide px-2.5 py-1.5 rounded-[5px]">#{i + 1}</div>
                  <div className="w-[70px] h-[70px] flex items-center justify-center mt-4 mb-2">{b.icon}</div>
                  <h3 className="font-bebas text-xl leading-[1.1] tracking-[1.5px] text-white mb-2">{b.title}</h3>
                  <div className="mt-auto border-t border-white/8 pt-2 w-full">
                    <p className="font-bebas text-[28px] tracking-wide text-[#07b4ba]">{b.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total row */}
            <div className="mt-3 border border-[rgba(7,180,186,0.35)] rounded-[18px] px-7 py-5 flex flex-wrap items-center justify-center gap-6"
              style={{ background: "linear-gradient(90deg,#0f141a 0%, #0a0f14 100%)" }}>
              <div className="flex items-center gap-4">
                <img src="https://i.postimg.cc/pr1bYVdc/Chat-GPT-Image-May-22-2026-12-03-35-AM.png" alt="Gift"
                  className="w-20 h-20 object-contain" style={{ filter: "drop-shadow(0 0 10px rgba(255,215,0,0.35))" }} />
                <div>
                  <p className="font-barlow text-white/50 text-sm tracking-wide mb-1">TOTAL BONUS VALUE</p>
                  <h2 className="font-bebas text-[clamp(32px,4vw,46px)] leading-none tracking-[2px] text-[#07b4ba]">₹7,499</h2>
                </div>
              </div>
              <div className="pl-6 border-l border-white/14 flex flex-col justify-center">
                <p className="font-bebas text-[clamp(28px,3.5vw,40px)] tracking-[2px] text-white leading-none">YOURS 100% FREE</p>
                <p className="font-barlow text-white/68 text-[15px] mt-2.5">When you join the AOF 30-Day MMA Striking Program.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ══ CTA / APPLY ══ */}
        <div ref={footerRef} className="bg-[#0b0b0b] bg-grid-dot relative overflow-hidden">
          <div className="max-w-[1100px] mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
              {/* Left */}
              <div>
                <p className="font-barlow font-bold text-sm tracking-[3px] uppercase text-[#07b4ba] mb-3">Ready To Start?</p>
                <h2 className="font-bebas text-[clamp(30px,5vw,54px)] leading-none tracking-[2px] text-white mb-5">
                  APPLY FOR YOUR <br /><span className="text-[#07b4ba]">30-DAY PROGRAM</span>
                </h2>
                <p className="font-barlow text-white/52 text-sm leading-[1.7] mb-5 max-w-[380px]">
                  Spots are limited. We only take a small number of students at a time to ensure every athlete gets the attention they deserve.
                </p>
                <div className="flex flex-col gap-3.5 mb-7">
                  {["Structured step-by-step training system", "Beginner friendly progression", "Train anytime from your home", "Tamil-guided instructions"].map((t, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="text-[#07b4ba] text-lg leading-none">✓</span>
                      <p className="font-barlow text-white text-[15px]">{t}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-barlow font-bold text-[15px] text-white mb-3">Any Queries?</p>
                  <button className="inline-flex items-center gap-2.5 h-[52px] px-6 rounded-full border-none text-white font-barlow font-bold text-[15px] cursor-pointer"
                    style={{ background: "#25D366", boxShadow: "0 4px 18px rgba(37,211,102,0.35)" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.681-.513-5.21-1.408l-.374-.222-3.876.923.938-3.792-.244-.39A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    Chat On WhatsApp
                  </button>
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-[#05070b] rounded-[20px] border border-white/8 p-8 text-center"
                style={{ boxShadow: "0 0 30px rgba(0,0,0,0.4)" }}>
                <p className="font-barlow font-bold text-sm tracking-[3px] uppercase text-[#07b4ba] mb-3">LIMITED FOUNDER SPOTS</p>
                <h2 className="font-bebas text-[clamp(32px,5vw,60px)] leading-[0.95] tracking-[2px] text-white mb-5">
                  START YOUR<br /><span className="text-[#07b4ba]">TRANSFORMATION</span>
                </h2>
                <div className="flex items-center justify-center gap-5 mb-5">
                  <span className="font-bebas text-[36px] text-white/30 line-through">₹1999</span>
                  <span className="font-bebas text-[52px] tracking-[2px] text-white leading-none">₹999</span>
                </div>
                <button className="w-full h-[60px] rounded-xl border-none text-white font-bebas text-[28px] tracking-[2px] cursor-pointer"
                  style={{ background: "#16c7d0", boxShadow: "0 0 24px rgba(7,180,186,0.28)" }}>
                  JOIN NOW
                </button>
                <p className="font-barlow text-sm text-white/55 leading-[1.7] mt-4">
                  Build real striking fundamentals with a structured beginner-friendly system.
                </p>
                {/* Countdown */}
                <div className="flex justify-center gap-3 mt-5">
                  {[["01","DAYS"],["23","HOURS"],["49","MIN"]].map(([n, l]) => (
                    <div key={l} className="text-center">
                      <div className="w-16 h-16 rounded-xl border border-[rgba(7,180,186,0.25)] flex items-center justify-center font-bebas text-[32px] text-[#07b4ba] bg-[#0b1016]">{n}</div>
                      <p className="font-bebas text-xs tracking-[2px] text-white/40 mt-1.5">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ══ FAQ ══ */}
        <FAQ />

        {/* ══ FOOTER ══ */}
        <footer className="bg-[#101318] px-10 pt-8 pb-4 border-t border-white/6">
          <div className="max-w-[1220px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-bebas text-[25px] tracking-wide text-white mb-3 pt-2">CONTACT</h3>
              <div className="flex flex-col gap-2.5">
                {["+91 00000 00000","info@aofacademy.com","Chennai, Tamil Nadu, India"].map(t => (
                  <p key={t} className="font-barlow text-[15px] text-white/52 leading-[1.8]">{t}</p>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bebas text-[25px] tracking-wide text-white mb-3 pt-2">NAVIGATION</h3>
              <div className="flex flex-col gap-2.5">
                {["Home","AOF Method","Testimonials","FAQ","Apply Now"].map(t => (
                  <a key={t} href="#" className="font-barlow text-[15px] text-white/52 no-underline hover:text-[#07b4ba] transition-colors leading-[1.8]">{t}</a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-bebas text-[25px] tracking-wide mb-3 pt-2">
                <span className="text-[#07b4ba]">A</span>
                <span className="text-white">O</span>
                <span className="text-[#07b4ba]">F</span>
              </h3>
              <p className="font-barlow text-[15px] text-white/52 leading-[1.8] max-w-[320px]">
                Art of Fighting Academy — building champions through proven systems and disciplined training.
              </p>
            </div>
          </div>
          <div className="max-w-[1220px] mx-auto mt-6 pt-4 border-t border-white/6 text-center">
            <p className="font-barlow text-sm text-white/30">© 2026 AOF Academy. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}
