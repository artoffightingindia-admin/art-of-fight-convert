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
      <div className="block w-full">
        <div className="flex flex-col gap-7 px-1">
          {pageCards.map((card, i) => (
            <div key={`${card.author}-${mobilePage}-${i}`} className="w-full p-7 border border-[#8d96a8]/20 rounded-2xl bg-[#171a21]">
              <div className="flex gap-2 mb-5 text-[#07b4ba] text-2xl leading-none">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="m-0 mb-5 text-[#bdc3d0]/80 font-['Barlow'] text-lg italic font-normal leading-relaxed">"{card.text}"</p>
              <div className="flex items-center gap-3">
                <div className="relative w-[52px] h-[52px] shrink-0 rounded-full bg-[#262b35] before:content-[''] before:absolute before:top-[14px] before:left-1/2 before:-translate-x-1/2 before:w-[10px] before:h-[10px] before:border-[3px] before:border-[#929aaa] before:rounded-full after:content-[''] after:absolute after:left-1/2 after:bottom-[13px] after:w-[18px] after:h-[12px] after:-translate-x-1/2 after:border-[3px] after:border-[#929aaa] after:border-b-0 after:rounded-t-[10px]" />
                <div>
                  <p className="m-0 mb-1 text-white font-['Barlow'] text-base font-extrabold leading-none">{card.author}</p>
                  <span className="text-[#9da5b6] font-['Barlow'] text-sm leading-none">Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <button className="flex items-center justify-center w-[52px] h-[52px] border-[1.5px] border-[#8d96a8]/30 rounded-full bg-[#070a10]/35 text-[#a6adbd] text-3xl cursor-pointer" onClick={() => setMobilePage(p => (p - 1 + feedbackCards.length) % feedbackCards.length)}>‹</button>
          <button className="flex items-center justify-center w-[52px] h-[52px] border-[1.5px] border-[#8d96a8]/30 rounded-full bg-[#070a10]/35 text-[#a6adbd] text-3xl cursor-pointer" onClick={() => setMobilePage(p => (p + 1) % feedbackCards.length)}>›</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full hidden md:block">
      <div ref={sliderRef} className="overflow-hidden w-full relative">
        <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
          {allCards.map((card, i) => (
            <div key={i} className="w-[340px] shrink-0 rounded-[18px] bg-[#1a1d23] border border-white/5 py-7 px-6 flex flex-col">
              <div className="flex gap-1 mb-4 text-[#07b4ba] text-base">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <p className="font-['Barlow'] font-normal text-white/70 text-[15px] leading-relaxed italic mb-5">"{card.text}"</p>
              <div className="flex items-center gap-3 mt-auto min-h-[52px]">
                <div className="w-11 h-11 rounded-full bg-[#202533] flex items-center justify-center text-[#8d96a8] text-xl shrink-0">👤</div>
                <div>
                  <p className="font-['Barlow'] font-bold text-white text-[15px] mb-0.5">{card.author}</p>
                  <span className="font-['Barlow'] font-normal text-white/40 text-[13px]">Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-8">
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
          className="w-[52px] h-[52px] rounded-full border border-white/10 bg-[#0f1218]/90 text-white text-2xl flex items-center justify-center cursor-pointer backdrop-blur-md transition hover:bg-[#1a1f29]"
        >‹</button>
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
          className="w-[52px] h-[52px] rounded-full border border-white/10 bg-[#0f1218]/90 text-white text-2xl flex items-center justify-center cursor-pointer backdrop-blur-md transition hover:bg-[#1a1f29]"
        >›</button>
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
    <div id="faq" className="relative overflow-hidden bg-[#0b0b0b]">
      <div className="max-w-[1180px] mx-auto py-16 px-5 md:px-10 text-center relative z-10">
        <Reveal>
          <p className="font-['Barlow'] font-bold text-xs tracking-[3px] uppercase text-[#07b4ba] mb-2.5">Got Questions?</p>
          <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl lg:text-6xl tracking-wide text-white leading-none mb-2.5">
            Frequently Asked <span className="text-[#07b4ba]">Questions</span>
          </h2>
          <div className="w-14 h-0.5 bg-[#07b4ba] mx-auto mt-4 mb-12 rounded-sm" />
        </Reveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-left">
          {faqItems.map((item, i) => (
            <Reveal key={i}>
              <div className={`border rounded-xl bg-[#141414] overflow-hidden transition-colors duration-250 ${openIndex === i ? "border-[#07b4ba]/45" : "border-white/10"}`}>
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)} 
                  className="w-full bg-transparent border-none flex items-center justify-between py-5 px-6 cursor-pointer text-left gap-4"
                >
                  <span className={`font-['Barlow'] font-bold text-base md:text-lg leading-snug flex-1 ${openIndex === i ? "text-[#07b4ba]" : "text-white"}`}>
                    {item.question}
                  </span>
                  <span className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center shrink-0 text-lg transition-all duration-350 ${openIndex === i ? "border-[#07b4ba] text-[#07b4ba] rotate-45 bg-[#07b4ba]/10" : "border-white/20 text-white/60"}`}>
                    +
                  </span>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-400 ease-in-out" 
                  style={{ maxHeight: openIndex === i ? 400 : 0, padding: openIndex === i ? "0 26px 24px" : "0 26px" }}
                >
                  <p className="font-['Barlow'] font-normal text-sm md:text-[15px] text-white/60 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

const IconPlan = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-[52px] md:h-[52px]">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);
const IconChat = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-[52px] md:h-[52px]">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconLeaf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-[52px] md:h-[52px]">
    <path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z" />
  </svg>
);
const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-[52px] md:h-[52px]">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 md:w-[52px] md:h-[52px]">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconNutrition = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[52px] h-[52px]">
    <path d="M12 22V12" /><path d="M12 12C12 7 17 3 21 2c0 5-2 9-9 10z" /><path d="M12 12C12 7 7 3 3 2c0 5 2 9 9 10z" />
  </svg>
);
const IconMobility = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[52px] h-[52px]">
    <circle cx="12" cy="5" r="2" /><path d="M12 7v5" /><path d="M12 12l-4 4" /><path d="M12 12l4 4" /><path d="M12 10l5-2" />
  </svg>
);
const IconCommunity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[52px] h-[52px]">
    <circle cx="8" cy="8" r="3" /><circle cx="16" cy="8" r="3" />
    <path d="M3 20c0-3 3-5 5-5s5 2 5 5" /><path d="M11 20c0-3 3-5 5-5s5 2 5 5" />
  </svg>
);
const IconShadowboxing = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[52px] h-[52px]">
    <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconAudio = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[52px] h-[52px]">
    <path d="M4 12a8 8 0 0 1 16 0" /><rect x="2" y="12" width="4" height="8" rx="2" /><rect x="18" y="12" width="4" height="8" rx="2" />
  </svg>
);

const whatCards = [
  { icon: <IconPlan />, title: "MADE EXCLUSIVELY FOR BEGINNERS", desc: "Clear guidance from day one" },
  { icon: <IconChart />, title: "STRUCTURED PROGRESSION", desc: "Stance → punches → kicks → combinations" },
  { icon: <IconLeaf />, title: "NO EQUIPMENT OR PARTNER NEEDED", desc: "Train effectively from the comfort of your home." },
  { icon: <IconGlobe />, title: "TAMIL-GUIDED INSTRUCTION", desc: "For better understanding" },
  { icon: <IconChat />, title: "JUST 30-40 MINUTES A DAY", desc: "Built for busy schedules" },
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
    { title: "5TH WEEK", days: "DAYS 29 - 30", image: "https://images.unsplash.com/photo-1517438984742-1262db08379e?q=80&w=1200", points: ["Full Integration", "Fight Simulation", "Peak Conditioning", "Program Completion"] },
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
    <div className="font-['Barlow'] text-white bg-[#0a0a0a] overflow-x-hidden w-full max-w-[1440px] mx-auto scroll-smooth antialiased">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-14 md:h-[62px] px-4 md:px-6 bg-[#111419]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="font-['Bebas_Neue'] text-[26px] md:text-[30px] leading-none m-0 flex">
            <span className="text-[#07b4ba]">A</span><span className="text-white">O</span><span className="text-[#07b4ba]">F</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-[18px]">
          <button className="hidden md:block bg-transparent border-none text-white/65 font-['Barlow'] text-[13px] font-bold cursor-pointer transition-colors hover:text-white" onClick={() => navigate("/")}>← Back To Home</button>
          <button className="h-[38px] md:h-auto px-4 md:px-[22px] py-0 md:py-2 rounded-md bg-[#07b4ba] text-white font-['Bebas_Neue'] text-[14px] md:text-[17px] tracking-[1px] md:tracking-[3px] border-none cursor-pointer transition-all hover:bg-[#075e61] hover:-translate-y-0.5" onClick={scrollToFooter}>JOIN NOW</button>
        </div>
      </nav>
      <button className="md:hidden fixed bottom-[18px] left-[18px] z-[999] flex items-center justify-center w-[52px] h-[52px] border border-white/10 rounded-full bg-gradient-to-b from-[#13171d] to-[#0d1117] text-[#07b4ba] text-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md" onClick={() => navigate("/")} aria-label="Back to home">←</button>

      {/* ── HERO ── */}
      <section className="relative min-h-[auto] md:min-h-[78vh] flex items-start md:items-center justify-start overflow-hidden pt-[100px] md:pt-[110px] pb-[110px] md:pb-[60px] px-6 bg-[radial-gradient(circle_at_top,rgba(7,180,186,0.12),transparent_45%),#06080c]">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(6,8,12,0.65),rgba(6,8,12,0.92)),url('https://i.postimg.cc/HWBD3qMR/Chat-GPT-Image-May-1-2026-12-14-18-AM.png')] bg-center bg-cover opacity-100" />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#06080c]/55 via-[#06080c]/78 to-[#06080c]" />
        <div className="relative z-[2] flex flex-col items-start text-left w-full max-w-full md:max-w-[640px]">
          <Reveal>
            <p className="text-[#07b4ba] font-['Barlow'] text-[12px] font-bold uppercase tracking-[2px] md:tracking-[3px] mb-4">AOF 30-Day Online Program</p>
            <h1 className="font-['Bebas_Neue'] text-[42px] md:text-[60px] lg:text-[72px] leading-[0.95] tracking-[2px] uppercase text-white mb-5">
              Build Real <br />
              <span className="text-[#07b4ba]">MMA Striking</span> <br />
              Fundamentals
            </h1>
            <p className="text-white/60 font-['Barlow'] text-[14px] md:text-[16px] leading-[1.7] w-full md:max-w-[480px] mb-8">
              A structured system designed to create visible improvement in your first 30 days.
              Built for absolute beginners.
            </p>
            <button className="flex w-full md:w-auto items-center justify-center px-6 md:px-[60px] py-4 rounded-[7px] md:rounded-[10px] bg-[#07b4ba] text-white font-['Barlow'] text-[18px] md:text-[13px] font-bold uppercase tracking-[1px] border border-[#07b4ba] cursor-pointer transition-all duration-250 hover:bg-[#057e82] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(7,180,186,0.38)]" onClick={scrollToFooter}>Join Now</button>
          </Reveal>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className="w-full mt-[33px] min-h-[60px] md:h-[60px] bg-[#07b4ba] flex flex-wrap md:flex-nowrap items-center justify-center px-4 md:px-6 py-3 md:py-0 gap-3 md:gap-[60px] relative z-20">
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <span className="w-7 h-7 md:w-[45px] md:h-[45px] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
            </svg>
          </span>
          <p className="font-['Bebas_Neue'] text-[13px] md:text-[22px] tracking-[0.5px] md:tracking-[2px] text-white leading-none m-0">PROVEN SYSTEM</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <span className="w-7 h-7 md:w-[45px] md:h-[45px] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </span>
          <p className="font-['Bebas_Neue'] text-[13px] md:text-[22px] tracking-[0.5px] md:tracking-[2px] text-white leading-none m-0">TAMIL TEAM</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-center">
          <span className="w-7 h-7 md:w-[45px] md:h-[45px] flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 md:w-[30px] md:h-[30px]" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M5 4H3v2a4 4 0 0 0 4 4"/><path d="M19 4h2v2a4 4 0 0 1-4 4"/>
            </svg>
          </span>
          <p className="font-['Bebas_Neue'] text-[13px] md:text-[22px] tracking-[0.5px] md:tracking-[2px] text-white leading-none m-0">REAL RESULTS</p>
        </div>
      </div>

      {/* ── PAIN SECTION ── */}
      <div className="bg-[#0b0b0b]">
        <div className="max-w-[1100px] mx-auto py-12 px-4 md:px-[10px]">
          <Reveal>
            <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[3px] uppercase mb-2">Sounds Familiar?</p>
                <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[42px] tracking-[2px] text-white mb-4 leading-[1.1]">
                  You're Training Hard...<br />But Still Not Improving
                </h2>
                <div className="w-20 h-[3px] bg-[#e53e3e] rounded-sm mb-6 shadow-[0_0_10px_rgba(229,62,62,0.7)]" />
                {painPoints.map((p, i) => (
                  <Reveal key={i} delay={i * 80}>
                    <div className="flex items-start gap-2.5 mb-3.5">
                      <div className="w-[3px] h-[18px] bg-[#ff2d2d] rounded-sm shrink-0 mt-[3px] shadow-[0_0_6px_rgba(255,45,45,0.9),0_0_16px_rgba(255,45,45,0.6)]" />
                      <p className="text-white/70 text-[16px] leading-[1.5] m-0">{p}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="flex-1 w-full max-w-full md:max-w-[500px]">
                <img src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=900&q=80" alt="MMA Training" className="w-full rounded-[14px] border border-white/10 aspect-video object-cover block" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── AOF INTRO SECTION ── */}
      <div className="bg-[#0b0b0b]" style={{ backgroundImage: "repeating-linear-gradient(-45deg, rgba(7,180,186,0.05) 0px, rgba(7,180,186,0.05) 1px, transparent 1px, transparent 5px)" }}>
        <div className="max-w-[1100px] mx-auto py-12 px-4 md:px-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-[60px] items-center">
            <div className="relative aspect-video rounded-[10px] overflow-hidden bg-gradient-to-br from-[#1c2230] to-[#202632]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[90px] h-[90px] rounded-full bg-[#07b4ba] flex items-center justify-center cursor-pointer">
                  <div className="w-0 h-0 border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent border-l-[15px] border-l-white ml-1.5" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[3px] uppercase mb-2.5">AOF Intro Section</p>
              <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[42px] tracking-[2px] text-white leading-[1.1] mb-5">
                Welcome to the <span className="text-[#07b4ba]">AOF Family</span>
              </h2>
              <div className="flex flex-col gap-[18px]">
                <p className="font-['Barlow'] text-[16px] text-white/70 leading-[1.8] m-0">
                  At Art of Fight, we're more than just a gym — we're a family built on discipline, respect, and relentless growth. Our coaches bring years of real fight experience to every session.
                </p>
                <p className="font-['Barlow'] text-[15px] text-white/60 leading-[1.8] m-0">
                  Whether you're a complete beginner or training for competition, you'll find a system designed to push your limits safely while building strong fundamentals, sharp technique, and fighter mentality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section className="relative overflow-hidden bg-[#0b0b0b]" style={{ backgroundImage: "linear-gradient(rgba(7,180,186,0.07) 1px, transparent 0.4px), linear-gradient(90deg, rgba(7,180,186,0.07) 1px, transparent 0.4px)", backgroundSize: "30px 30px" }}>
        <div className="max-w-[1100px] mx-auto py-12 px-4 md:px-[10px]">
          <Reveal>
            <p className="font-['Barlow'] font-bold text-[14px] tracking-[3px] uppercase text-[#07b4ba] mb-0 text-center">
              WHAT'S INCLUDED
            </p>
            <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[42px] lg:text-[52px] tracking-[2px] text-white text-center mb-8 md:mb-12 mt-1">WHAT YOU GET</h2>
          </Reveal>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-5 gap-3.5 md:gap-4">
            {whatCards.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="w-full min-h-auto md:min-h-[255px] p-4 md:p-[16px_10px] rounded-[18px] bg-gradient-to-b md:bg-none from-[#13171d] to-[#101318] md:bg-[#111417] border border-white/5 md:border-2 md:border-[#111417] text-left md:text-center flex flex-row md:flex-col items-center justify-start md:justify-center gap-4 md:gap-[18px]">
                  <div className="w-[46px] h-[46px] md:w-[70px] md:h-[70px] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex flex-col md:items-center w-full">
                    <h4 className="font-['Bebas_Neue'] text-[#07b4ba] text-[16px] md:text-[17.5px] tracking-[2px] leading-[1.3] m-0 md:min-h-[58px] flex items-start justify-start md:justify-center text-left md:text-center mb-1">
                      {item.title}
                    </h4>
                    <p className="text-[13px] md:text-[14px] leading-[1.55] text-white/60 text-left md:text-center m-0 md:min-h-[44px] flex items-start justify-start md:justify-center">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP SECTION ── */}
      <div className={`relative overflow-hidden ${isMobileRoadmap ? "border-y border-[#07b4ba]/15" : "bg-[#0b0b0b]"}`} style={isMobileRoadmap ? { background: "radial-gradient(circle at 50% 9%, rgba(7,180,186,0.12), transparent 28%), linear-gradient(180deg, #02070d 0%, #061018 52%, #03070c 100%)" } : {}}>
        <div className="max-w-[1400px] mx-auto py-[30px]" style={isMobileRoadmap ? { backgroundImage: "linear-gradient(rgba(7,180,186,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(7,180,186,0.035) 1px, transparent 1px)", backgroundSize: "26px 26px" } : { backgroundImage: "repeating-linear-gradient(-45deg, rgba(7,180,186,0.04) 0px, rgba(7,180,186,0.04) 1px, transparent 1px, transparent 6px)" }}>
          
          <div className="text-center mb-8 px-6">
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[10px] md:text-[14px] tracking-[1px] md:tracking-[4px] uppercase mb-2 md:mb-3.5 inline-flex items-center gap-2">
              30 DAYS TRANSFORMATION JOURNEY
            </p>
            <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[50px] lg:text-[60px] leading-[0.9] md:leading-[0.95] tracking-[1px] md:tracking-[3px] text-white m-0">
              YOUR <span className="text-[#07b4ba]">5 WEEK</span> ROADMAP
            </h2>
            <p className="mt-3 md:mt-4.5 text-white/60 font-['Barlow'] text-[12px] md:text-[15px] m-0">
              A structured path. Weekly focus. Real results.
            </p>
          </div>

          {isMobileRoadmap ? (
             <div className="w-full overflow-hidden pb-0.5">
               <div className="relative grid grid-cols-5 items-end gap-0 mx-3.5 mb-7 pt-1">
                 <div className="absolute left-[9%] right-[9%] bottom-[7px] h-[1px] bg-white/40" />
                 {roadmapCards.map((week, i) => (
                   <button key={week.title} className={`relative z-10 flex flex-col items-center gap-2.5 min-w-0 border-0 bg-transparent font-['Bebas_Neue'] cursor-pointer ${i === roadmapIndex ? "text-[#07e8ef]" : "text-white/70"}`} onClick={() => setRoadmapIndex(i)}>
                     <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs">{week.title}</span>
                     <i className={`w-[15px] h-[15px] rounded-full border ${i === roadmapIndex ? "border-2 border-[#07e8ef] bg-[#061018] shadow-[0_0_0_4px_rgba(7,180,186,0.18),0_0_16px_rgba(7,232,239,0.95)]" : "border-white/65 bg-[#03070c]"}`} />
                   </button>
                 ))}
               </div>
               <div className="relative">
                 <button className="absolute top-1/2 left-0 z-[8] w-[34px] h-[34px] -translate-y-1/2 border border-[#07e8ef]/55 rounded-lg bg-[#030b12]/90 text-[#07e8ef] text-lg cursor-pointer disabled:opacity-35 disabled:cursor-default" onClick={() => setRoadmapIndex((prev) => Math.max(prev - 1, 0))} disabled={roadmapIndex === 0}>{"<"}</button>
                 <button className="absolute top-1/2 right-0 z-[8] w-[34px] h-[34px] -translate-y-1/2 border border-[#07e8ef]/55 rounded-lg bg-[#030b12]/90 text-[#07e8ef] text-lg cursor-pointer disabled:opacity-35 disabled:cursor-default" onClick={() => setRoadmapIndex((prev) => Math.min(prev + 1, roadmapCards.length - 1))} disabled={roadmapIndex === roadmapCards.length - 1}>{">"}</button>
                 <div className="w-full overflow-hidden pl-5">
                   <div className="flex gap-4 transition-transform duration-400 ease-out will-change-transform" style={{ transform: `translateX(calc(-${roadmapIndex} * (82vw + 16px)))` }}>
                     {roadmapCards.map((card, i) => (
                       <div key={card.title} className="relative flex-none w-[82vw] min-h-[308px] overflow-hidden border border-[#74e1e8]/30 rounded-[10px] bg-[#061018] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02),0_18px_38px_rgba(0,0,0,0.34)]">
                         <div className="absolute inset-0 bg-cover bg-[62%_center] opacity-60" style={{ backgroundImage: `url(${card.image})` }} />
                         <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(90deg, rgba(2,7,12,0.98) 0%, rgba(2,7,12,0.78) 42%, rgba(2,7,12,0.34) 76%), linear-gradient(180deg, rgba(2,7,12,0.1) 0%, rgba(2,7,12,0.9) 100%)" }} />
                         <div className="relative z-[2] min-h-[258px] p-[28px_16px_16px]">
                           {i === roadmapIndex && <p className="m-0 mb-1.5 text-[#07e8ef] font-['Bebas_Neue'] text-xs">YOU ARE HERE</p>}
                           <h3 className="m-0 mb-3.5 text-white font-['Bebas_Neue'] text-[28px] leading-[1.05] tracking-[2px] min-h-[64px] flex items-start">{card.title}</h3>
                           <div className="w-[54px] h-[2px] mb-7 bg-[#07e8ef] shadow-[0_0_10px_rgba(7,232,239,0.55)]" />
                           <div className="flex flex-col gap-3.5">
                             {card.points.map((point) => (
                               <div key={point} className="flex items-center gap-2.5">
                                 <span className="flex w-3.5 h-3.5 shrink-0 items-center justify-center border border-[#07e8ef] rounded-full text-[#07e8ef] text-[8px]">✓</span>
                                 <p className="m-0 text-white/80 text-[11px] leading-[1.25]">{point}</p>
                               </div>
                             ))}
                           </div>
                         </div>
                         <div className="relative z-[2] flex items-center justify-center gap-3 min-h-[50px] border-t border-white/10 bg-[#03090f]/70">
                           <span className="w-5 h-5 text-[#07e8ef]">
                             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                               <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                             </svg>
                           </span>
                           <p className="m-0 text-[#07e8ef] font-['Bebas_Neue'] text-lg tracking-[1px]">{card.days}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
               <div className="flex justify-center gap-3 mt-4.5">
                 {roadmapCards.map((card, i) => (
                   <button key={card.title} className={`w-2 h-2 p-0 border-0 rounded-full cursor-pointer transition ${i === roadmapIndex ? "bg-[#07e8ef] shadow-[0_0_12px_rgba(7,232,239,0.7)]" : "bg-white/30"}`} onClick={() => setRoadmapIndex(i)} aria-label={`Go to ${card.title}`} />
                 ))}
               </div>
               <div className="flex items-center gap-3.5 m-[20px_16px_0] p-[16px_18px] border border-white/5 rounded-lg bg-gradient-to-b from-[#0d1a24]/90 to-[#070e16]/90">
                 <div className="flex w-[38px] h-[38px] shrink-0 items-center justify-center border border-[#07e8ef] rounded-full text-[#07e8ef]">
                   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                     <path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M5 4H3v2a4 4 0 0 0 4 4" /><path d="M19 4h2v2a4 4 0 0 1-4 4" />
                   </svg>
                 </div>
                 <div>
                   <h3 className="m-0 mb-1 text-white/90 font-['Bebas_Neue'] text-[16px] tracking-[0.8px] leading-none">STAY CONSISTENT. TRUST THE PROCESS.</h3>
                   <p className="m-0 text-[#07e8ef] text-[11px] leading-[1.3]">Become the best version of yourself.</p>
                 </div>
               </div>
             </div>
            ) : (
              <div className="relative max-w-[1320px] mx-auto overflow-hidden px-[70px]">
                <button onClick={() => setRoadmapIndex((prev) => Math.max(prev - 1, 0))} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-xl border border-white/10 bg-[#0d1117] text-white text-2xl cursor-pointer">‹</button>
                <button onClick={() => setRoadmapIndex((prev) => Math.min(prev + 1, roadmapCards.length - 2))} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-xl border border-white/10 bg-[#0d1117] text-white text-2xl cursor-pointer">›</button>
                
                <div className="flex justify-between mb-10 relative">
                  <div className="absolute top-[14px] left-0 right-0 h-[2px] bg-white/10" />
                  {roadmapCards.map((week, i) => (
                    <div key={i} className="relative z-10 text-center">
                      <p className={`font-['Bebas_Neue'] text-[15px] tracking-[1px] mb-2.5 transition-colors duration-300 ${i === roadmapIndex || i === roadmapIndex + 1 ? "text-[#07b4ba]" : "text-white/45"}`}>{week.title}</p>
                      <div className={`w-[26px] h-[26px] mx-auto rounded-full border-2 border-[#07b4ba] transition-all duration-300 ${i === roadmapIndex || i === roadmapIndex + 1 ? "bg-[#07b4ba] shadow-[0_0_18px_rgba(7,180,186,0.95)]" : "bg-[#0b0b0b]"}`} />
                    </div>
                  ))}
                </div>
                
                <div className="overflow-hidden">
                  <div className="flex gap-5 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${roadmapIndex * 47}%)` }}>
                    {roadmapCards.map((card, i) => (
                      <div key={i} className="min-w-[45%] rounded-[22px] overflow-hidden bg-gradient-to-b from-[#10151d] to-[#0b0f14] border border-white/5">
                        <div className="grid grid-cols-2 min-h-[90px]">
                          <img src={card.image} alt={card.title} className="w-full h-[285px] object-cover" />
                          <div className="p-8 flex flex-col justify-center">
                            <h3 className="font-['Bebas_Neue'] text-[42px] text-white mb-4 leading-none">{card.title}</h3>
                            <div className="w-[60px] h-[3px] bg-[#07b4ba] mb-5" />
                            <div className="flex flex-col gap-3">
                              {card.points.map((point, idx) => (
                                <div key={idx} className="flex items-center gap-2.5">
                                  <div className="w-5 h-5 rounded-full border-2 border-[#07b4ba] text-[#07b4ba] flex items-center justify-center text-[10px] shrink-0">✓</div>
                                  <p className="text-[14px] text-white/75 leading-[1.4] m-0">{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="p-4 border-t border-white/5 text-center">
                          <p className="font-['Bebas_Neue'] text-[22px] text-[#07b4ba] tracking-[1px] m-0">{card.days}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── PROMISE ── */}
            <div className="relative overflow-hidden bg-[#0b0b0b] mt-[60px]">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,rgba(7,180,186,0.04)_0px,rgba(7,180,186,0.04)_1px,transparent_1px,transparent_6px)] pointer-events-none z-0" />
              <div className="max-w-[820px] mx-auto p-[24px_20px] md:p-[1px_42px] text-center relative z-10">
                <p className="font-['Bebas_Neue'] text-[24px] md:text-[30px] tracking-[2px] text-white mb-3 text-center">OUR PROMISE</p>
                <div className="w-[70px] h-[2px] bg-[#07b4ba] mx-auto mb-5 rounded-full" />
                <p className="font-['Barlow'] text-[15px] md:text-[19px] leading-[1.8] md:leading-[1.9] text-white/75 italic max-w-[720px] mx-auto m-0">
                  <span className="text-[#07b4ba] text-[42px] leading-none mr-1.5 font-serif relative top-2.5">"</span>
                  Most fighters train hard. Very few train correctly. AOF exists to close that gap — with structure, accountability, and coaching that actually evolves with you.
                </p>
              </div>
            </div>

            {/* ── JOIN NOW STRIP ── */}
            <div className="mt-6 flex items-center justify-center bg-[#07b4ba]">
              <button className="w-full p-3.5 bg-transparent border-none cursor-pointer text-white font-['Bebas_Neue'] text-xl tracking-[3px] transition hover:bg-[#075e61]" onClick={scrollToFooter}>Join Now</button>
            </div>
          </div>
        </div>

      {/* ── COACH SECTION ── */}
      <div className="bg-[#0b0b0b]">
        <div className="max-w-[1100px] mx-auto py-12 px-4 md:px-[10px] pb-10">
          <Reveal>
            <p className="font-['Barlow'] text-[17px] text-[#07b4ba] font-bold mb-6 tracking-[2px] uppercase">LED BY</p>
            <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start flex-wrap">
              <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80" alt="Head Coach" className="w-full md:w-[240px] h-auto md:h-[300px] object-cover object-top rounded-xl border border-white/10 shrink-0" />
              <div className="flex-1 min-w-[260px] w-full">
                <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[48px] tracking-[2px] text-white mb-1">Head Coach</h2>
                <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[3px] uppercase mb-5">AOF Academy — Lead Trainer &amp; Founder</p>
                <div className="mb-6">
                  {coachCredentials.map((cred, i) => (
                    <div key={i} className="flex items-start gap-2.5 mb-3.5">
                      <span className="text-[#07b4ba] text-[16px] shrink-0 mt-0.5">✓</span>
                      <p className="text-white/70 text-[15px] leading-[1.5] m-0">{cred}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-[22px] mt-[26px]">
                  {stats.map((stat, i) => (
                    <div key={i} className="w-full min-h-[110px] md:h-[140px] p-4 bg-gradient-to-b from-[#181818] to-[#121212] border border-white/10 rounded-[14px] text-center shadow-[0_0_14px_rgba(0,0,0,0.18)] flex flex-col justify-center items-center">
                      <p className="font-['Bebas_Neue'] text-[32px] md:text-[42px] text-[#07b4ba] tracking-[1px] mb-2.5 leading-none">{stat.val}</p>
                      <p className="font-['Barlow'] text-white/45 text-[12px] tracking-[2px] uppercase m-0 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="relative overflow-hidden bg-[#0b0b0b]">
        <div className="max-w-[1100px] mx-auto py-12 px-4 md:px-[10px] pt-12">
          <Reveal>
            <div className="text-center mb-11">
              <p className="font-['Barlow'] text-[#07b4ba] font-bold text-[14px] tracking-[3px] uppercase m-0">Real People, Real Results</p>
              <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[46px] lg:text-[60px] tracking-[3px] text-white mt-2 leading-none">
                Trusted By Fighters, <span className="text-[#07b4ba]">Proven Results</span>
              </h2>
              <p className="font-['Barlow'] text-white/40 mt-2 text-[15px]">Here's What Athletes Say About Their Transformation With AOF</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col md:flex-row gap-12 items-center mb-10 flex-wrap">
              <div className="flex-1 w-full md:max-w-[500px] aspect-video">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&q=80" alt="Athlete" className="w-full rounded-lg object-cover" />
              </div>
              <div className="flex-1 min-w-[260px]">
                <h3 className="font-['Bebas_Neue'] text-[26px] md:text-[34px] lg:text-[42px] tracking-[1.5px] leading-[1.1] mb-4 text-white">
                  AOF Changed The Way <span className="text-[#07b4ba]">I Train And Perform.</span>
                </h3>
                <p className="font-['Barlow'] text-white/65 text-[15px] leading-[1.75] m-0">
                  The structure, the attention to detail, and the accountability took me to a level I never thought possible. I'm stronger, faster, and fight with more confidence than ever.
                </p>
                <p className="font-['Barlow'] mt-3.5 text-[#07b4ba] font-bold text-[14px] m-0">— Alex M., Amateur MMA Fighter</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <InfiniteFeedbackSlider />
          </Reveal>
        </div>
      </div>

      {/* ── BONUSES SECTION ── */}
      <div className="relative overflow-hidden bg-[#0b0b0b]" style={{ backgroundImage: "linear-gradient(rgba(7,180,186,0.05) 1px, transparent 0.4px), linear-gradient(90deg, rgba(7,180,186,0.05) 1px, transparent 0.4px)", backgroundSize: "32px 32px" }}>
        <div className="max-w-[1280px] mx-auto py-10 px-6">
          <div className="text-center mb-10">
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-2.5">EXCLUSIVE FOUNDERS BONUSES</p>
            <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[46px] lg:text-[60px] leading-[0.95] tracking-[2px] text-white mb-4">
              5 PREMIUM BONUSES.<span className="text-[#07b4ba]"> FREE WITH ENROLLMENT.</span>
            </h2>
            <p className="font-['Barlow'] text-[15px] text-white/60 leading-[1.7] m-0">Join the Founder's Batch and unlock premium resources at no extra cost.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {[
              { title: "FIGHTER NUTRITION GUIDE", value: "₹1499 VALUE" },
              { title: "DAILY MOBILITY ROUTINE", value: "₹1299 VALUE" },
              { title: "PRIVATE FIGHTERS COMMUNITY", value: "₹1299 VALUE" },
              { title: "ADVANCED SHADOWBOXING FLOWS", value: "₹1299 VALUE" },
              { title: "FIGHTER MINDSET AUDIO PACK", value: "₹1199 VALUE" },
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-b from-[#0e141c] to-[#0a0f14] border border-[#07b4ba]/35 rounded-[18px] p-4 relative overflow-hidden min-h-[220px] flex flex-col items-center text-center">
                <div className="absolute top-3.5 left-3.5 bg-[#07b4ba] text-black font-['Bebas_Neue'] text-[15px] tracking-[1px] px-2.5 py-1 rounded-md leading-none">#{i + 1}</div>
                <div className="w-[70px] h-[70px] flex items-center justify-center mb-2 mt-4">
                  {i === 0 ? <IconNutrition /> : i === 1 ? <IconMobility /> : i === 2 ? <IconCommunity /> : i === 3 ? <IconShadowboxing /> : <IconAudio />}
                </div>
                <h3 className="font-['Bebas_Neue'] text-[16px] md:text-[20px] leading-[1.1] tracking-[1.5px] text-white mb-2">{item.title}</h3>
                <div className="mt-auto border-t border-white/10 pt-2.5 w-full">
                  <p className="text-[#07b4ba] font-['Bebas_Neue'] text-[26px] tracking-[1px] m-0 leading-none">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border border-[#07b4ba]/35 rounded-[18px] p-5 md:p-6 flex flex-wrap items-center justify-center gap-5 bg-gradient-to-r from-[#0f141a] to-[#0a0f14]">
            <div className="flex items-center gap-4">
              <img src="https://i.postimg.cc/pr1bYVdc/Chat-GPT-Image-May-22-2026-12-03-35-AM.png" alt="Gift Box" className="w-20 h-20 object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.35)]" />
              <div>
                <p className="font-['Barlow'] text-white/50 text-[13px] tracking-[1px] mb-1 leading-none">TOTAL BONUS VALUE</p>
                <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[46px] leading-none tracking-[2px] text-[#07b4ba] m-0">₹7,499</h2>
              </div>
            </div>
            <div className="pl-6 border-l border-white/15 flex flex-col justify-center">
              <p className="font-['Bebas_Neue'] text-[28px] md:text-[40px] tracking-[2px] text-white leading-none m-0">YOURS 100% FREE</p>
              <p className="font-['Barlow'] text-[15px] text-white/70 mt-2.5 m-0">When you join the AOF 30-Day MMA Striking Program.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── APPLY / CTA SECTION ── */}
      <div ref={footerRef} className="bg-[#0b0b0b] relative overflow-hidden" style={{ backgroundImage: "radial-gradient(rgba(7,180,186,0.22) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
        <div className="max-w-[1100px] mx-auto py-12 px-4 md:px-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] items-center">
            <div>
              <p className="font-['Barlow'] font-bold text-[13px] tracking-[3px] text-[#07b4ba] mb-3 uppercase">Ready To Start?</p>
              <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[46px] lg:text-[54px] leading-none tracking-[2px] text-white mb-5">
                APPLY FOR YOUR <br /><span className="text-[#07b4ba]">30-DAY PROGRAM</span>
              </h2>
              <p className="font-['Barlow'] text-white/50 text-[14px] leading-[1.7] mb-5 max-w-[380px] m-0">
                Spots are limited. We only take a small number of students at a time to ensure every athlete gets the attention they deserve.
              </p>
              <div className="flex flex-col gap-3.5 mb-7">
                {[
                  "Structured step-by-step training system",
                  "Beginner friendly progression",
                  "Train anytime from your home",
                  "Tamil-guided instructions"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="text-[#07b4ba] text-[18px] leading-none">✓</span>
                    <p className="font-['Barlow'] text-[15px] text-white m-0">{item}</p>
                  </div>
                ))}

                <div className="mt-3">
                  <p className="font-['Barlow'] text-[15px] font-bold text-white mb-3 ml-3 m-0">
                    Any Queries?
                  </p>
                  <button
                    className="inline-flex items-center gap-2.5 h-[52px] px-6 rounded-full border-none bg-[#25D366] text-white font-['Barlow'] font-bold text-[15px] cursor-pointer shadow-[0_4px_18px_rgba(37,211,102,0.35)] w-full md:w-auto justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    Chat On WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* CTA CARD */}
            <div className="bg-[#05070b] rounded-2xl border border-white/10 p-8 text-center shadow-[0_0_30px_rgba(0,0,0,0.4)]">
              <p className="font-['Barlow'] font-bold text-[13px] tracking-[3px] uppercase text-[#07b4ba] mb-3.5 m-0">LIMITED FOUNDER SPOTS</p>
              <h2 className="font-['Bebas_Neue'] text-[36px] md:text-[50px] lg:text-[60px] leading-[0.95] tracking-[2px] mb-5 text-white m-0">
                START YOUR<br /><span className="text-[#07b4ba]">TRANSFORMATION</span>
              </h2>
              <div className="flex items-center justify-center gap-5 mb-5">
                <span className="font-['Bebas_Neue'] text-[36px] text-white/30 line-through leading-none">₹1999</span>
                <span className="font-['Bebas_Neue'] text-[52px] tracking-[2px] text-white leading-none">₹999</span>
              </div>
              <button className="w-full h-[60px] border-none rounded-xl bg-[#16c7d0] text-white font-['Bebas_Neue'] text-[28px] tracking-[2px] cursor-pointer shadow-[0_0_24px_rgba(7,180,186,0.28)] hover:bg-[#13b5bd] transition">
                JOIN NOW
              </button>
              <p className="mt-4.5 font-['Barlow'] text-[13px] leading-[1.7] text-white/55 m-0">
                Build real striking fundamentals with a structured beginner-friendly system.
              </p>
              <div className="flex justify-center gap-3 mt-5">
                {[["01","DAYS"],["23","HOURS"],["49","MIN"]].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <div className="w-16 h-16 rounded-xl border border-[#07b4ba]/25 flex items-center justify-center font-['Bebas_Neue'] text-[32px] text-[#07b4ba] bg-[#0b1016]">{num}</div>
                    <p className="mt-1.5 font-['Bebas_Neue'] text-[12px] tracking-[2px] text-white/40 m-0">{label}</p>
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
      <footer className="bg-[#101318] pt-10 pb-5 px-5 md:px-10 border-t border-white/5">
        <div className="max-w-[1220px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-10">
          <div>
            <h3 className="font-['Bebas_Neue'] text-[25px] tracking-[1px] text-white pt-2 mb-2.5">CONTACT</h3>
            <div className="flex flex-col gap-2.5">
              <p className="font-['Barlow'] text-[15px] text-white/50 leading-[1.8] m-0">+91 00000 00000</p>
              <p className="font-['Barlow'] text-[15px] text-white/50 leading-[1.8] m-0">info@aofacademy.com</p>
              <p className="font-['Barlow'] text-[15px] text-white/50 leading-[1.8] m-0">Chennai, Tamil Nadu, India</p>
            </div>
          </div>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[25px] tracking-[1px] text-white pt-2 mb-2.5">NAVIGATION</h3>
            <div className="flex flex-col gap-2.5">
              <a href="#home" className="font-['Barlow'] text-[15px] text-white/50 no-underline transition-colors hover:text-[#07b4ba] leading-[1.8]">Home</a>
              <a href="#method" className="font-['Barlow'] text-[15px] text-white/50 no-underline transition-colors hover:text-[#07b4ba] leading-[1.8]">AOF Method</a>
              <a href="#testimonials" className="font-['Barlow'] text-[15px] text-white/50 no-underline transition-colors hover:text-[#07b4ba] leading-[1.8]">Testimonials</a>
              <a href="#faq" className="font-['Barlow'] text-[15px] text-white/50 no-underline transition-colors hover:text-[#07b4ba] leading-[1.8]">FAQ</a>
              <a href="#contact" className="font-['Barlow'] text-[15px] text-white/50 no-underline transition-colors hover:text-[#07b4ba] leading-[1.8]">Apply Now</a>
            </div>
          </div>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[25px] tracking-[1px] pt-2 mb-2.5 flex">
              <span className="text-[#07b4ba]">A</span>
              <span className="text-white">O</span>
              <span className="text-[#07b4ba]">F</span>
            </h3>
            <div className="flex flex-col gap-2.5">
              <p className="font-['Barlow'] text-[15px] text-white/50 leading-[1.8] m-0">Art of Fighting Academy — building champions through proven systems and disciplined training.</p>
            </div>
          </div>
        </div>
        <div className="mt-7 md:mt-6 pt-4 border-t border-white/5 text-center font-['Barlow'] text-[13px] text-white/30">
          © 2026 AOF Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
