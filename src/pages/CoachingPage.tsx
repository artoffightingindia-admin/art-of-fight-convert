import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const NAVBAR_H = 62;

const GUTTER: CSSProperties = { paddingLeft: "1cm", paddingRight: "1cm" };
const SECTION_INSET: CSSProperties = { paddingLeft: "120px", paddingRight: "120px" };

/* ── REVEAL ── */
interface RevealProps { children: ReactNode; style?: CSSProperties; }
function Reveal({ children, style = {} }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translateY(0)"; } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.65s ease, transform 0.65s ease", ...style }}>
      {children}
    </div>
  );
}

/* ── ICONS ── */
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.681-.513-5.21-1.408l-.374-.222-3.876.923.938-3.792-.244-.39A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const stroke = { fill: "none", stroke: "#07b4ba", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const strokeW = { fill: "none", stroke: "#fff", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const IconPlan     = () => <svg viewBox="0 0 24 24" className="w-12 h-12" {...stroke}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>;
const IconChat     = () => <svg viewBox="0 0 24 24" className="w-12 h-12" {...stroke}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconLeaf     = () => <svg viewBox="0 0 24 24" className="w-12 h-12" {...stroke}><path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z"/></svg>;
const IconChart    = () => <svg viewBox="0 0 24 24" className="w-12 h-12" {...stroke}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconGlobe    = () => <svg viewBox="0 0 24 24" className="w-12 h-12" {...stroke}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconTarget   = () => <svg viewBox="0 0 24 24" className="w-11 h-11" {...stroke}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const IconZap      = () => <svg viewBox="0 0 24 24" className="w-11 h-11" {...stroke}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconTrend    = () => <svg viewBox="0 0 24 24" className="w-11 h-11" {...stroke}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
const IconUser     = () => <svg viewBox="0 0 24 24" className="w-11 h-11" {...stroke}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconTrophy   = () => <svg viewBox="0 0 24 24" className="w-11 h-11" {...stroke}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M12 17v5M7 4v6a5 5 0 0 0 10 0V4H7z"/></svg>;
const IconShield   = () => <svg viewBox="0 0 24 24" className="w-7 h-7" {...strokeW}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
const IconUsers    = () => <svg viewBox="0 0 24 24" className="w-7 h-7" {...strokeW}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconTrophyW  = () => <svg viewBox="0 0 24 24" className="w-7 h-7" {...strokeW}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16M12 17v5M7 4v6a5 5 0 0 0 10 0V4H7z"/></svg>;

/* ── DATA ── */
const whatCards = [
  { icon: <IconPlan />, title: "Personalised Training Plan", desc: "Custom program built around your goals, schedule, and current level" },
  { icon: <IconChat />, title: "Direct Coach Access", desc: "WhatsApp access for questions, check-ins, and accountability between sessions" },
  { icon: <IconLeaf />, title: "Nutrition Guidance", desc: "Simple, effective nutrition advice to support performance, recovery, and body composition" },
  { icon: <IconChart />, title: "Progress Tracking", desc: "We track your progress, adjust the plan and keep you moving in the right direction" },
  { icon: <IconGlobe />, title: "Game Plan", desc: "Opponent-based strategies tailored to your fight style" },
];
const coachCredentials = [
  "Former Professional MMA Fighter — 12+ Years Ring Experience",
  "Trained athletes who compete at national and international level",
  "Specialist in striking, grappling transitions and mental conditioning",
];
const stats = [
  { val: "1,000+", label: "Athletes Coached" },
  { val: "10+",   label: "Years Experience"  },
  { val: "50+",   label: "Champions Trained" },
  { val: "3",     label: "Continents"        },
];
const feedbackCards = [
  { text: "In 8 weeks my footwork completely changed. My coach saw things I couldn't see myself and fixed them immediately.", author: "Jordan K." },
  { text: "I was plateau'd for over a year. AOF broke that within the first month. The personalised approach is unlike anything else.", author: "Priya S." },
  { text: "Best investment I've made in my fight career. The plan, the feedback, the accountability — it's all dialled in perfectly.", author: "Carlos R." },
  { text: "The coaches actually care. I've gained real skill in just a few months of training with AOF.", author: "Seity M." },
  { text: "Best decision I made this year. The structure and support is unlike any gym I've trained at before.", author: "Rolen A." },
  { text: "From complete beginner to ring-ready in just a few months. AOF's system truly works.", author: "Karthik V." },
  { text: "My performance improved drastically. The personalised game plan made all the difference in my last fight.", author: "Rahul P." },
];
const checklistItems = [
  "Free 30-minute strategy call included",
  "No long-term contracts — cancel anytime",
  "Results guaranteed or coaching extended free",
  "Start within 48 hours of approval",
];
const faqItems = [
  { question: "Who is AOF 1-on-1 coaching for?", answer: "AOF coaching is designed for serious fighters and committed beginners alike — anyone who is tired of training without direction. Whether you're a competitive MMA athlete looking to peak for your next bout, or someone starting from scratch who wants to build real skill fast, our personalised system is built around your specific goals, body type, and schedule." },
  { question: "How does the remote coaching work?", answer: "After your strategy call, your coach builds a fully customised training plan and delivers it digitally. You'll have direct WhatsApp access to your coach for questions, feedback, and check-ins. You submit session videos for review, and your coach adjusts the plan in real time based on what they see." },
  { question: "How quickly will I see results?", answer: "Most athletes report noticeable improvements in technique and conditioning within the first 3–4 weeks. Significant transformation typically takes 6–8 weeks of consistent training under the AOF method." },
  { question: "What if I'm a complete beginner?", answer: "Beginners are welcome and thrive in the AOF system. In fact, starting with proper 1-on-1 coaching before picking up bad habits is the fastest route to becoming a skilled fighter." },
  { question: "Is there a contract or long-term commitment?", answer: "No long-term contracts. You can cancel anytime. We also back that up with a results guarantee — if you don't see measurable progress, we'll extend your coaching for free until you do." },
  { question: "How many sessions should I train per week?", answer: "Most athletes train between 3–6 sessions per week depending on their goals, recovery capacity, and schedule. Your coach will create the optimal structure for you." },
];
const roadmapCards = [
  { title: "1ST PHASE", days: "DAYS 1 - 7",   image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200", points: ["Fundamentals", "Basic Techniques", "Conditioning", "Mindset Building"] },
  { title: "2ND PHASE", days: "DAYS 8 - 14",  image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200", points: ["Skill Development", "Strength & Power", "Drills & Combos", "Recovery Focus"] },
  { title: "3RD PHASE", days: "DAYS 15 - 21", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200", points: ["Advanced Techniques", "Sparring Practice", "Endurance Boost", "Mental Toughness"] },
  { title: "4TH PHASE", days: "DAYS 22 - 28", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200", points: ["Fight IQ", "Combination Chains", "Counter Attacks", "Explosive Training"] },
  { title: "5TH PHASE", days: "DAYS 29 - 30", image: "https://images.unsplash.com/photo-1517438984742-1262db08379e?q=80&w=1200", points: ["Full Integration", "Fight Simulation", "Peak Conditioning", "Program Completion"] },
];

/* ── CALENDAR ── */
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const timeSlots = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
function CalendarPicker({ onConfirm }: { onConfirm: (d: string, t: string) => void }) {
  const today = new Date();
  const [year, setYear]     = useState(today.getFullYear());
  const [month, setMonth]   = useState(today.getMonth());
  const [selDay, setSelDay] = useState<number | null>(null);
  const [selTime, setSelTime] = useState<string | null>(null);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = new Date(year, month, 1).getDay();
  const days: (number|null)[] = [...Array(firstDay).fill(null), ...Array.from({length:daysInMonth},(_,i)=>i+1)];
  const prevM = () => { if (month===0) { setMonth(11); setYear(y=>y-1); } else { setMonth(m=>m-1); } setSelDay(null); };
  const nextM = () => { if (month===11) { setMonth(0); setYear(y=>y+1); } else { setMonth(m=>m+1); } setSelDay(null); };
  const isPast = (d:number) => { const x=new Date(year,month,d); x.setHours(0,0,0,0); const n=new Date(); n.setHours(0,0,0,0); return x<n; };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevM} className="w-8 h-8 border border-white/10 rounded text-white bg-transparent cursor-pointer text-base">‹</button>
        <span className="font-['Bebas_Neue'] text-[18px] tracking-[2px] text-white">{months[month]} {year}</span>
        <button onClick={nextM} className="w-8 h-8 border border-white/10 rounded text-white bg-transparent cursor-pointer text-base">›</button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d=><div key={d} className="text-center text-[11px] text-white/30 font-bold py-1">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((d,i)=>(
          <div key={i} onClick={()=>{ if(d && !isPast(d)) setSelDay(d); }}
            className={`text-center py-1.5 rounded text-[13px] cursor-pointer transition-all
              ${!d?"invisible":isPast(d)?"text-white/15 cursor-default":d===selDay?"bg-[#07b4ba] text-white font-bold":"text-white/75 border border-white/5 hover:border-[#07b4ba]/50"}`}>
            {d||""}
          </div>
        ))}
      </div>
      {selDay && (
        <div>
          <p className="text-[12px] text-white/40 mb-2 tracking-wider uppercase">Select a time</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {timeSlots.map(t=>(
              <button key={t} onClick={()=>setSelTime(t)}
                className={`px-3 py-2 rounded text-[13px] border cursor-pointer transition-all
                  ${selTime===t?"bg-[#07b4ba] text-white border-[#07b4ba] font-bold":"bg-[#222] border-white/10 text-white/55 hover:border-[#07b4ba] hover:text-white"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
      {selDay && selTime && (
        <button onClick={()=>onConfirm(`${months[month]} ${selDay}, ${year}`, selTime!)}
          className="w-full py-3.5 rounded-lg bg-[#07b4ba] text-white font-['Bebas_Neue'] text-xl tracking-[2px] border-none cursor-pointer hover:bg-[#059a9f] transition-colors mt-1">
          Confirm Booking
        </button>
      )}
    </div>
  );
}

/* ── FEEDBACK SLIDER ── */
function InfiniteFeedbackSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const animRef   = useRef<number>(0);
  const pausedRef = useRef(false);
  const posRef    = useRef(0);
  const [mPage, setMPage]     = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const allCards = [...feedbackCards, ...feedbackCards];

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const slider = sliderRef.current;
    const track  = trackRef.current;
    if (!slider || !track) return;
    const speed = 0.55;
    const half = () => track.scrollWidth / 2;
    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += speed;
        if (posRef.current >= half()) posRef.current -= half();
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    const pause  = () => { pausedRef.current = true; };
    const resume = () => { setTimeout(() => { pausedRef.current = false; }, 600); };
    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    return () => {
      cancelAnimationFrame(animRef.current);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
    };
  }, [isMobile]);

  const mCards = Array.from({length:3}, (_,i) => feedbackCards[(mPage+i) % feedbackCards.length]);

  if (isMobile) return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        {mCards.map((c,i) => (
          <div key={`${c.author}-${mPage}-${i}`} className="bg-[#1a1d23] border border-white/5 rounded-2xl p-6">
            <div className="flex gap-1 text-[#07b4ba] text-base mb-3">★★★★★</div>
            <p className="text-white/70 text-[14px] leading-relaxed italic mb-4">"{c.text}"</p>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#202533] flex items-center justify-center text-base">👤</div>
              <div><p className="text-white font-bold text-[14px]">{c.author}</p><span className="text-white/40 text-[12px]">Member</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-10 mt-8">
        <button onClick={()=>setMPage(p=>(p-1+feedbackCards.length)%feedbackCards.length)} className="w-14 h-14 rounded-full border-2 border-white/20 bg-[#070a10]/35 text-white/70 text-3xl cursor-pointer flex items-center justify-center">‹</button>
        <button onClick={()=>setMPage(p=>(p+1)%feedbackCards.length)} className="w-14 h-14 rounded-full border-2 border-white/20 bg-[#070a10]/35 text-white/70 text-3xl cursor-pointer flex items-center justify-center">›</button>
      </div>
    </div>
  );

  return (
    <div ref={sliderRef} className="w-full overflow-hidden">
      <div ref={trackRef} className="flex gap-6 w-max will-change-transform">
        {allCards.map((c,i) => (
          <div key={i} className="w-[340px] shrink-0 rounded-[18px] bg-[#1a1d23] border border-white/5 py-7 px-6 flex flex-col">
            <div className="flex gap-1 text-[#07b4ba] text-base mb-4">★★★★★</div>
            <p className="text-white/70 text-[15px] leading-relaxed italic mb-5">"{c.text}"</p>
            <div className="flex items-center gap-2.5 mt-auto">
              <div className="w-10 h-10 rounded-full bg-[#202533] flex items-center justify-center text-lg shrink-0">👤</div>
              <div><p className="text-white font-bold text-[15px]">{c.author}</p><span className="text-white/40 text-[13px]">Member</span></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-7">
        <button onClick={()=>{
          pausedRef.current=true;
          posRef.current=Math.max(posRef.current-364,0);
          if(trackRef.current){ trackRef.current.style.transition="transform 0.7s cubic-bezier(0.22,1,0.36,1)"; trackRef.current.style.transform=`translateX(-${posRef.current}px)`; setTimeout(()=>{ if(trackRef.current) trackRef.current.style.transition=""; },700); }
          setTimeout(()=>{ pausedRef.current=false; },700);
        }} className="w-12 h-12 rounded-full border border-white/15 bg-[#15181d] text-white text-2xl cursor-pointer hover:border-[#07b4ba] hover:text-[#07b4ba] transition-all flex items-center justify-center">‹</button>
        <button onClick={()=>{
          pausedRef.current=true;
          posRef.current+=364;
          if(trackRef.current){ trackRef.current.style.transition="transform 0.7s cubic-bezier(0.22,1,0.36,1)"; trackRef.current.style.transform=`translateX(-${posRef.current}px)`; setTimeout(()=>{ if(trackRef.current) trackRef.current.style.transition=""; },700); }
          setTimeout(()=>{ pausedRef.current=false; },700);
        }} className="w-12 h-12 rounded-full border border-white/15 bg-[#15181d] text-white text-2xl cursor-pointer hover:border-[#07b4ba] hover:text-[#07b4ba] transition-all flex items-center justify-center">›</button>
      </div>
    </div>
  );
}

/* ── FAQ — GUTTER ── */
function FAQSection() {
  const [open, setOpen] = useState<number|null>(null);
  return (
    <div id="faq" className="relative overflow-hidden bg-[#0b0b0b]" style={{backgroundImage:"linear-gradient(rgba(7,180,186,0.05) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,0.05) 1px,transparent .4px)",backgroundSize:"40px 40px"}}>
      <div className="w-full py-16 relative z-10" style={GUTTER}>
        <Reveal>
          <p className="text-center text-[#07b4ba] font-bold text-[12px] tracking-[3px] uppercase mb-2">Got Questions?</p>
          <h2 className="text-center font-['Bebas_Neue'] text-[36px] md:text-[60px] tracking-[3px] text-white leading-none mb-2">
            Frequently Asked <span className="text-[#07b4ba]">Questions</span>
          </h2>
          <div className="w-14 h-0.5 bg-[#07b4ba] mx-auto mt-4 mb-12 rounded-full" />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqItems.map((item,i) => (
            <Reveal key={i}>
              <div className={`border rounded-xl bg-[#141414] overflow-hidden transition-colors duration-200 ${open===i?"border-[#07b4ba]/45":"border-white/10"}`}>
                <button onClick={()=>setOpen(open===i?null:i)} className="w-full bg-transparent border-none flex items-center justify-between py-5 px-6 cursor-pointer text-left gap-4">
                  <span className={`font-bold text-[15px] md:text-[17px] leading-snug flex-1 font-['Barlow'] ${open===i?"text-[#07b4ba]":"text-white"}`}>{item.question}</span>
                  <span className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center shrink-0 text-lg transition-all duration-300 ${open===i?"border-[#07b4ba] text-[#07b4ba] rotate-45 bg-[#07b4ba]/10":"border-white/20 text-white/60"}`}>+</span>
                </button>
                <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{maxHeight:open===i?400:0,padding:open===i?"0 24px 20px":"0 24px"}}>
                  <p className="text-[14px] text-white/60 leading-[1.75] font-['Barlow']">{item.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── ROADMAP — title + cards both use GUTTER ── */
function RoadmapSection({ scrollToForm }: { scrollToForm: () => void }) {
  const [idx, setIdx]         = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  useEffect(() => {
    const max = isMobile ? roadmapCards.length-1 : roadmapCards.length-2;
    setIdx(p => Math.min(p, max));
  }, [isMobile]);

  return (
    <div className={`relative overflow-hidden mt-12 ${isMobile?"border-y border-[#07b4ba]/15":"bg-[#0b0b0b]"}`}
      style={isMobile?{background:"radial-gradient(circle at 50% 9%,rgba(7,180,186,.12),transparent 28%),linear-gradient(180deg,#02070d 0%,#061018 52%,#03070c 100%)"}:{}}>
      <div className="w-full py-8" style={{backgroundImage:"repeating-linear-gradient(-45deg,rgba(7,180,186,.04) 0px,rgba(7,180,186,.04) 1px,transparent 1px,transparent 6px)"}}>
        {/* Title — GUTTER */}
        <div className="text-center mb-9" style={GUTTER}>
          <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-3">YOUR TRAINING JOURNEY</p>
          <h2 className="font-['Bebas_Neue'] text-[clamp(30px,4vw,60px)] leading-[.95] tracking-[3px] text-white">
            THE <span className="text-[#07b4ba]">5 WEEK</span> ROADMAP
          </h2>
          <p className="mt-4 text-white/60 text-[15px] font-['Barlow']">A structured path. Weekly focus. Real results.</p>
        </div>

        {isMobile ? (
          <div className="w-full overflow-hidden pb-0.5">
            <div className="relative grid grid-cols-5 items-end gap-0 mx-3.5 mb-7 pt-1">
              <div className="absolute left-[9%] right-[9%] bottom-[7px] h-px bg-white/40" />
              {roadmapCards.map((w,i) => (
                <button key={w.title} onClick={()=>setIdx(i)}
                  className={`relative z-10 flex flex-col items-center gap-2.5 min-w-0 border-0 bg-transparent font-['Bebas_Neue'] cursor-pointer ${i===idx?"text-[#07b4ba]":"text-white/70"}`}>
                  <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[12px]">{w.title}</span>
                  <i className={`w-[15px] h-[15px] rounded-full border not-italic ${i===idx?"border-2 border-[#07b4ba] bg-[#061018] shadow-[0_0_0_4px_rgba(7,180,186,.18),0_0_16px_rgba(7,180,186,.95)]":"border-white/65 bg-[#03070c]"}`} />
                </button>
              ))}
            </div>
            <div className="relative">
              <button disabled={idx===0} onClick={()=>setIdx(p=>Math.max(p-1,0))}
                className="absolute top-1/2 left-0 z-10 w-[34px] h-[34px] -translate-y-1/2 border border-[#07b4ba]/55 rounded-lg bg-[#030b12]/90 text-[#07b4ba] text-lg cursor-pointer disabled:opacity-35 flex items-center justify-center">{"<"}</button>
              <button disabled={idx===roadmapCards.length-1} onClick={()=>setIdx(p=>Math.min(p+1,roadmapCards.length-1))}
                className="absolute top-1/2 right-0 z-10 w-[34px] h-[34px] -translate-y-1/2 border border-[#07b4ba]/55 rounded-lg bg-[#030b12]/90 text-[#07b4ba] text-lg cursor-pointer disabled:opacity-35 flex items-center justify-center">{">"}</button>
              <div className="overflow-hidden pl-5">
                <div className="flex gap-4 transition-transform duration-[420ms] ease-out will-change-transform"
                  style={{transform:`translateX(calc(-${idx} * (82vw + 16px)))`}}>
                  {roadmapCards.map((card,i) => (
                    <div key={card.title} className="relative flex-none w-[82vw] min-h-[308px] overflow-hidden border border-[#74e1e8]/30 rounded-[10px] bg-[#061018]"
                      style={{boxShadow:"inset 0 0 0 1px rgba(255,255,255,.02),0 18px 38px rgba(0,0,0,.34)"}}>
                      <div className="absolute inset-0 bg-cover bg-[62%_center] opacity-[.62]" style={{backgroundImage:`url(${card.image})`}} />
                      <div className="absolute inset-0 z-[1]" style={{background:"linear-gradient(90deg,rgba(2,7,12,.98) 0%,rgba(2,7,12,.78) 42%,rgba(2,7,12,.34) 76%),linear-gradient(180deg,rgba(2,7,12,.1) 0%,rgba(2,7,12,.9) 100%)"}} />
                      <div className="relative z-[2] min-h-[258px] p-7 pb-4 pt-7">
                        {i===idx && <p className="text-[#07b4ba] font-['Bebas_Neue'] text-[12px] mb-1.5">YOU ARE HERE</p>}
                        <h3 className="text-white font-['Bebas_Neue'] text-[28px] leading-[1.05] tracking-[2px] mb-3.5 min-h-[64px] flex items-start">{card.title}</h3>
                        <div className="w-14 h-0.5 mb-7 bg-[#07b4ba]" style={{boxShadow:"0 0 10px rgba(7,180,186,.55)"}} />
                        <div className="flex flex-col gap-3.5">
                          {card.points.map(pt => (
                            <div key={pt} className="flex items-center gap-2.5">
                              <span className="flex w-3.5 h-3.5 shrink-0 items-center justify-center border border-[#07b4ba] rounded-full text-[#07b4ba] text-[8px]">✓</span>
                              <p className="text-white/80 text-[11px] leading-[1.25]">{pt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative z-[2] flex items-center justify-center gap-3 min-h-[50px] border-t border-white/10 bg-[#03090f]/70">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        <p className="text-[#07b4ba] font-['Bebas_Neue'] text-[18px] tracking-[1px]">{card.days}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-4">
              {roadmapCards.map((_,i) => (
                <button key={i} onClick={()=>setIdx(i)}
                  className={`w-2 h-2 p-0 border-0 rounded-full cursor-pointer transition-all ${i===idx?"bg-[#07b4ba] shadow-[0_0_12px_rgba(7,180,186,.7)]":"bg-white/30"}`} />
              ))}
            </div>
            <div className="flex items-center gap-3.5 mx-4 mt-5 p-4 border border-white/10 rounded-lg bg-gradient-to-b from-[#0d1a24]/90 to-[#070e16]/90">
              <div className="flex w-9 h-9 shrink-0 items-center justify-center border border-[#07b4ba] rounded-full text-[#07b4ba]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M5 4H3v2a4 4 0 0 0 4 4"/><path d="M19 4h2v2a4 4 0 0 1-4 4"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white/90 font-['Bebas_Neue'] text-[16px] tracking-[.8px] leading-none mb-1">STAY CONSISTENT. TRUST THE PROCESS.</h3>
                <p className="text-[#07b4ba] text-[11px] leading-[1.3]">Become the best version of yourself.</p>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop cards — GUTTER with arrow-button offsets */
          <div className="relative overflow-hidden" style={{paddingLeft:"calc(1cm + 18px)",paddingRight:"calc(1cm + 18px)"}}>
            <button onClick={()=>setIdx(p=>Math.max(p-1,0))}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-[14px] border border-white/10 bg-[#0d1117] text-white text-2xl cursor-pointer flex items-center justify-center">‹</button>
            <button onClick={()=>setIdx(p=>Math.min(p+1,roadmapCards.length-2))}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-[52px] h-[52px] rounded-[14px] border border-white/10 bg-[#0d1117] text-white text-2xl cursor-pointer flex items-center justify-center">›</button>
            <div className="flex justify-between mb-10 relative">
              <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-white/10" />
              {roadmapCards.map((w,i) => (
                <div key={i} className="relative z-10 text-center">
                  <p className={`font-['Bebas_Neue'] text-[15px] tracking-[1px] mb-2.5 transition-colors ${i===idx||i===idx+1?"text-[#07b4ba]":"text-white/45"}`}>{w.title}</p>
                  <div className={`w-[26px] h-[26px] mx-auto rounded-full border-2 border-[#07b4ba] transition-all ${i===idx||i===idx+1?"bg-[#07b4ba] shadow-[0_0_18px_rgba(7,180,186,.95)]":"bg-[#0b0b0b]"}`} />
                </div>
              ))}
            </div>
            <div className="overflow-hidden">
              <div className="flex gap-5 transition-transform duration-[450ms] ease-in-out" style={{transform:`translateX(-${idx*47}%)`}}>
                {roadmapCards.map((card,i) => (
                  <div key={i} className="min-w-[45%] rounded-[22px] overflow-hidden bg-gradient-to-b from-[#10151d] to-[#0b0f14] border border-white/5">
                    <div className="grid grid-cols-2">
                      <img src={card.image} alt={card.title} className="w-full h-[285px] object-cover" />
                      <div className="p-8 flex flex-col justify-center">
                        <h3 className="font-['Bebas_Neue'] text-[42px] text-white mb-4 leading-none">{card.title}</h3>
                        <div className="w-16 h-[3px] bg-[#07b4ba] mb-5" />
                        <div className="flex flex-col gap-3">
                          {card.points.map((pt,pi) => (
                            <div key={pi} className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-full border-2 border-[#07b4ba] text-[#07b4ba] flex items-center justify-center text-[10px] shrink-0">✓</div>
                              <p className="text-[14px] text-white/75 leading-snug">{pt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="py-4 border-t border-white/5 text-center">
                      <p className="font-['Bebas_Neue'] text-[22px] text-[#07b4ba] tracking-[1px]">{card.days}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── METHOD SECTION — SECTION_INSET for method cards only; Roadmap + What You Get + Promise use GUTTER ── */
function MethodSection({ scrollToForm }: { scrollToForm: () => void }) {
  const methodCards = [
    { icon: <IconTarget />, title: "CUSTOMISED & GOAL-DRIVEN",  desc: "A roadmap built entirely around your body type, skill level, and competition goals." },
    { icon: <IconZap />,    title: "TECHNICAL MASTERY",         desc: "Focused drills that embed proper technique into muscle memory." },
    { icon: <IconTrend />,  title: "STRUCTURED PROGRESSION",    desc: "Step-by-step intensity cycles to keep your body adapting and improving every week." },
    { icon: <IconUser />,   title: "REAL-TIME COACHING",        desc: "Your coach tracks every session, reviews footage, and adjusts the plan in real time." },
  ];
  return (
    <div id="method" className="relative overflow-hidden bg-[#0b0b0b]"
      style={{backgroundImage:"linear-gradient(rgba(7,180,186,.07) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,.07) 1px,transparent .4px)",backgroundSize:"30px 30px"}}>

      {/* Method header + cards — SECTION_INSET */}
      <section className="w-full pt-12 pb-0" style={SECTION_INSET}>
        <Reveal>
          <div className="text-center mb-9">
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-2">THE AOF METHOD</p>
            <h2 className="font-['Bebas_Neue'] text-[clamp(30px,4vw,60px)] tracking-[2px] text-white leading-none">
              A PROVEN SYSTEM. <span className="text-[#07b4ba]">REAL TRANSFORMATION.</span>
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="relative max-w-4.2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 rounded-xl overflow-hidden mb-6">
              <div className="relative aspect-video border-2 border-[#e53e3e]/75 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage:"url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200')"}} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/65" />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#e53e3e]/20 border-2 border-[#e53e3e] text-[#e53e3e] flex items-center justify-center font-black text-lg">✕</div>
                  <span className="font-['Bebas_Neue'] text-[18px] tracking-[2px] text-white uppercase">Training Without Direction</span>
                </div>
              </div>
              <div className="relative aspect-video border-2 border-[#07b4ba]/75 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{backgroundImage:"url('https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1200')"}} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/65" />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#07b4ba]/20 border-2 border-[#07b4ba] text-[#07b4ba] flex items-center justify-center font-black text-lg">✓</div>
                  <span className="font-['Bebas_Neue'] text-[18px] tracking-[2px] text-white uppercase">Training The Right Way</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[52px] h-[52px] rounded-full bg-[#1a1d23] border-2 border-white/20 flex items-center justify-center font-['Bebas_Neue'] text-[20px] tracking-[1px] text-white/75 shadow-[0_4px_20px_rgba(0,0,0,.5)]">VS</div>
          </div>
        </Reveal>
        <Reveal style={{marginTop:24}}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-3.5">
            {methodCards.map((c,i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-[10px] bg-white/5 border border-white/10 hover:border-[#07b4ba]/30 transition-colors">
                <div className="w-[45px] h-[45px] shrink-0 flex items-center justify-center">{c.icon}</div>
                <div>
                  <h4 className="font-['Bebas_Neue'] text-[18px] tracking-[2px] text-white mb-1.5 leading-snug">{c.title}</h4>
                  <p className="text-[14px] text-white/50 leading-[1.55]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="flex items-start gap-4 p-5 rounded-[10px] bg-white/5 border border-white/10 hover:border-[#07b4ba]/30 transition-colors max-w-[560px] w-full">
              <div className="w-[45px] h-[45px] shrink-0 flex items-center justify-center"><IconTrophy /></div>
              <div>
                <h4 className="font-['Bebas_Neue'] text-[18px] tracking-[2px] text-white mb-1.5 leading-snug">PERFORMANCE-FIRST</h4>
                <p className="text-[14px] text-white/50 leading-[1.55]">Peak your body and mind for real fights — physically, mentally, and strategically.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Roadmap — full bleed, uses GUTTER internally */}
      <RoadmapSection scrollToForm={scrollToForm} />

      {/* What You Get + Promise — GUTTER */}
      <div className="w-full" style={GUTTER}>
        <Reveal style={{marginTop:64}}>
          <div className="text-center mb-12">
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[3px] uppercase mb-3">WHAT'S INCLUDED</p>
            <h2 className="font-['Bebas_Neue'] text-[clamp(30px,4vw,60px)] tracking-[2px] text-white leading-none">WHAT YOU GET</h2>
          </div>
          <div className="hidden md:flex gap-4 justify-between">
            {whatCards.map((c,i) => (
              <div key={i} className="flex-1 min-h-[255px] p-5 rounded-[18px] bg-[#0f1115] border border-white/5 flex flex-col items-center text-center gap-3.5">
                <div className="w-[70px] h-[70px] flex items-center justify-center">{c.icon}</div>
                <h4 className="font-['Bebas_Neue'] text-[#07b4ba] text-[16px] tracking-[2px] leading-snug">{c.title}</h4>
                <p className="text-[14px] text-white/50 leading-[1.55]">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3.5 md:hidden px-2">
            {whatCards.map((c,i) => (
              <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#0f1115] border border-white/5 min-h-[90px]">
                <div className="w-12 h-12 flex items-center justify-center shrink-0">{c.icon}</div>
                <div>
                  <h4 className="font-['Bebas_Neue'] text-[#07b4ba] text-[13px] tracking-[2px] leading-snug mb-1">{c.title}</h4>
                  <p className="text-[11px] text-white/50 leading-[1.4]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal style={{marginTop:50}}>
          <div className="w-full mx-auto text-center px-10 py-8">
            <p className="font-['Bebas_Neue'] text-[30px] tracking-[2px] text-white mb-3">Our Promise</p>
            <div className="w-[70px] h-0.5 bg-[#07b4ba] mx-auto mb-5 rounded-full" />
            <p className="font-['Barlow'] text-[16px] md:text-[19px] leading-[1.9] text-white/75 italic">
              <span className="text-[#07b4ba] text-[42px] leading-none mr-1.5 font-serif relative top-2.5">"</span>
Most fighters train hard. Very few train correctly.
              <br />
AOF exists to close that gap — with structure, accountability, and coaching that actually evolves with you.
              <span className="text-[#07b4ba] text-[42px] leading-none ml-1.5 font-serif relative top-2.5">"</span>
            </p>
          </div>
        </Reveal>

        {/* Book A Call strip — breaks out of GUTTER to full bleed */}
        <div className="mt-8 overflow-hidden bg-[#07b4ba]" style={{marginLeft:"-1cm",marginRight:"-1cm"}}>
          <button onClick={scrollToForm} className="w-full py-3.5 bg-transparent border-none cursor-pointer text-white font-['Bebas_Neue'] text-[20px] tracking-[3px] hover:bg-black/10 transition-colors">
            Book A Call
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function CoachingPage() {
  const navigate = useNavigate();
  const formRef  = useRef<HTMLDivElement>(null);
  const [lead, setLead]         = useState({ name: "", phone: "", goal: "" });
  const [stage, setStage]       = useState<1|2|3>(1);
  const [isSubmitting, setSubmit] = useState(false);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbyLWY5cbUx7OC1t6SSy-Z8wTj9FLPdZuzOzSRhJ8-1JvlPxYk1210TelUjKuaSyYvVl/exec";

  const handleLeadSubmit = () => { if (!lead.name.trim() || !lead.phone.trim()) return; setStage(2); };
  const handleBookingConfirm = async (date: string, time: string) => {
    if (isSubmitting) return;
    setSubmit(true);
    try {
      const params = new URLSearchParams({ name:lead.name.trim(), phone:lead.phone.trim(), goal:lead.goal||"Not specified", date, time });
      fetch(SHEET_URL, {method:"POST", mode:"no-cors", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:params.toString()});
      setStage(3);
    } catch(e) { console.error(e); }
    finally { setTimeout(()=>setSubmit(false), 2000); }
  };

  const painPoints = [
    "You train 4-5 days a week but your technique isn't improving",
    "Your sparring partners are getting better — you feel stuck",
    "You have no structured plan, just random gym sessions",
    "You feel lost without proper coaching guidance",
    "Your conditioning fails before your skill does",
  ];

  return (
    <div className="font-['Barlow'] text-white bg-[#0a0a0a] overflow-x-hidden w-full antialiased">

      {/* ── NAVBAR — GUTTER ── */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-[62px] bg-[#111419]/80 backdrop-blur-[10px] border-b border-white/10 flex items-center justify-between" style={GUTTER}>
        <span className="font-['Bebas_Neue'] text-[30px] leading-none">
          <span className="text-[#07b4ba]">A</span><span className="text-white">O</span><span className="text-[#07b4ba]">F</span>
        </span>
        <div className="flex items-center gap-5">
          <button onClick={()=>navigate("/")} className="hidden md:flex items-center gap-2 bg-transparent border-none text-white/65 font-['Barlow'] text-[14px] font-semibold cursor-pointer hover:text-white transition-colors">
            <ArrowLeftIcon /> Back To Home
          </button>
          <button onClick={scrollToForm} className="h-9 px-6 rounded-md bg-[#07b4ba] text-white font-['Bebas_Neue'] text-[17px] tracking-[2px] border-none cursor-pointer hover:bg-[#059a9f] transition-colors">
            Book A Call
          </button>
        </div>
      </nav>

      {/* ── HERO — GUTTER ── */}
      <div
        className="relative flex flex-col w-full overflow-hidden"
        ref={(el) => {
          if (!el) return;
          el.style.paddingTop = `${NAVBAR_H}px`;
          el.style.height = "100vh";
          el.style.height = "100svh";
          el.style.height = "100dvh";
        }}
      >
        <section id="home" className="relative w-full flex items-center overflow-hidden flex-1 min-h-0"
          style={{background:"radial-gradient(circle at top,rgba(7,180,186,.12),transparent 45%),#06080c"}}>
          <div className="absolute inset-0 z-0 opacity-[.42]"
            style={{background:"linear-gradient(to bottom,rgba(6,8,12,.65),rgba(6,8,12,.92)),url('https://images.unsplash.com/photo-1549476464-37392f717541?w=1400&q=80') center/cover no-repeat"}} />
          <div className="absolute inset-0 z-[1]"
            style={{background:"linear-gradient(180deg,rgba(6,8,12,.55) 0%,rgba(6,8,12,.78) 55%,#06080c 100%)"}} />
          <div className="w-full relative z-10" style={GUTTER}>
            <Reveal>
              <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] tracking-[3px] uppercase mb-4">AOF Academy — 1 On 1 Coaching</p>
              <h1 className="font-['Bebas_Neue'] text-[clamp(48px,5vw,72px)] leading-[.95] tracking-[2px] uppercase text-white mb-5">
                Train Like A<br/><span className="text-[#07b4ba]">Champion.</span><br/>Fight Like One
              </h1>
              <p className="text-white/60 text-[16px] leading-[1.7] max-w-[480px] mb-8">
                Stop training in the crowd. Get a personalised coaching program built around your body, your goals, and your timeline — guided by coaches who have been in the ring.
              </p>
              <button onClick={scrollToForm}
                className="inline-flex items-center justify-center px-[60px] py-4 rounded-lg bg-[#07b4ba] text-white font-['Barlow'] font-bold text-[14px] uppercase tracking-[1px] border border-[#07b4ba] cursor-pointer hover:bg-[#057e82] hover:-translate-y-0.5 transition-all duration-200">
                Book A Call
              </button>
            </Reveal>
          </div>
        </section>
        <div className="w-full bg-[#07b4ba] relative z-20 flex items-center shrink-0" style={{height:"1.5cm", ...GUTTER}}>
          <div className="w-full flex items-center justify-center md:justify-start gap-0">
            <div className="flex-1 flex items-center justify-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0"><IconShield /></div>
              <span className="font-['Bebas_Neue'] text-[22px] tracking-[2px] text-white leading-none whitespace-nowrap">Proven System</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0"><IconUsers /></div>
              <span className="font-['Bebas_Neue'] text-[22px] tracking-[2px] text-white leading-none whitespace-nowrap">Tamil Team</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center shrink-0"><IconTrophyW /></div>
              <span className="font-['Bebas_Neue'] text-[22px] tracking-[2px] text-white leading-none whitespace-nowrap">Real Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAIN SECTION — SECTION_INSET (unchanged) ── */}
      <section className="w-full py-12" style={SECTION_INSET}>
        <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-center flex-wrap">
          <div className="flex-1 min-w-[260px]">
            <Reveal>
              <p className="text-[#07b4ba] font-bold text-[14px] tracking-[3px] uppercase mb-2">Sounds Familiar?</p>
              <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[42px] tracking-[2px] text-white leading-[1.1] mb-4">
                You're Training Hard...<br/>But Still Not Improving
              </h2>
              <div className="w-20 h-[3px] bg-[#e53e3e] rounded mb-6" style={{boxShadow:"0 0 10px rgba(229,62,62,.7),0 0 24px rgba(229,62,62,.35)"}} />
            </Reveal>
            {painPoints.map((p,i) => (
              <Reveal key={i} style={{transitionDelay:`${i*70}ms`}}>
                <div className="flex items-start gap-4 mb-3.5">
                  <div className="w-[3px] h-[22px] bg-[#ff2d2d] rounded shrink-0 mt-1" style={{boxShadow:"0 0 6px rgba(255,45,45,.9),0 0 16px rgba(255,45,45,.6)"}} />
                  <p className="text-white/70 text-[15px] leading-[1.5]">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="flex-1 max-w-[500px] w-full">
            <Reveal>
              <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop"
                alt="AOF Training" className="w-full rounded-[14px] border border-white/10 aspect-video object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── METHOD + ROADMAP + WHAT YOU GET ── */}
      <MethodSection scrollToForm={scrollToForm} />

      {/* ── COACH SECTION — SECTION_INSET (unchanged) ── */}
      <div className="bg-[#0f1115]">
        <div className="w-full py-12 pb-10" style={SECTION_INSET}>
          <Reveal>
            <p className="text-[#07b4ba] font-bold text-[17px] tracking-[2px] uppercase mb-6">LED BY</p>
            <div className="flex flex-col md:flex-row gap-14 items-start flex-wrap">
              <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80" alt="Head Coach"
                className="w-full md:w-[240px] h-auto md:h-[300px] object-cover object-top rounded-xl border border-white/10 shrink-0" />
              <div className="flex-1 min-w-[280px]">
                <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[48px] tracking-[2px] text-white mb-1">Head Coach</h2>
                <p className="text-[#07b4ba] font-bold text-[14px] tracking-[3px] uppercase mb-5">AOF Academy — Lead Trainer &amp; Founder</p>
                <div className="mb-6">
                  {coachCredentials.map((c,i) => (
                    <div key={i} className="flex items-start gap-2.5 mb-3.5">
                      <span className="text-[#07b4ba] text-[16px] shrink-0 mt-0.5">✓</span>
                      <p className="text-white/70 text-[15px] leading-[1.5]">{c}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-6">
                  {stats.map((s,i) => (
                    <div key={i} className="bg-gradient-to-b from-[#181818] to-[#121212] border border-white/10 rounded-[14px] min-h-[110px] md:h-[140px] p-4 text-center flex flex-col justify-center items-center shadow-[0_0_14px_rgba(0,0,0,.18)]">
                      <p className="font-['Bebas_Neue'] text-[32px] md:text-[42px] text-[#07b4ba] tracking-[1px] mb-2 leading-none">{s.val}</p>
                      <p className="text-white/45 text-[12px] tracking-[2px] uppercase leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── TESTIMONIALS — SECTION_INSET (unchanged) ── */}
      <div id="testimonials" className="relative overflow-hidden bg-[#0b0b0b]"
        style={{backgroundImage:"repeating-linear-gradient(-45deg,rgba(7,180,186,.05) 0px,rgba(7,180,186,.05) 1px,transparent 1px,transparent 5px)"}}>
        <div className="w-full py-12" style={SECTION_INSET}>
          <Reveal>
            <div className="text-center mb-11">
              <p className="text-[#07b4ba] font-bold text-[13px] tracking-[3px] uppercase">Real People, Real Results</p>
              <h2 className="font-['Bebas_Neue'] text-[clamp(30px,4vw,60px)] tracking-[3px] text-white mt-2 leading-none">
                Trusted By Fighters, <span className="text-[#07b4ba]">Proven Results</span>
              </h2>
              <p className="text-white/40 mt-2 text-[15px]">Here's What Athletes Say About Their Transformation With AOF</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col md:flex-row gap-12 items-center mb-10 flex-wrap">
              <div className="flex-1 max-w-[550px] w-full">
                <img src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&q=80" alt="Athlete"
                  className="w-full rounded-[10px] object-cover aspect-video" />
              </div>
              <div className="flex-1 min-w-[260px]">
                <h3 className="font-['Bebas_Neue'] text-[clamp(28px,3vw,42px)] tracking-[1.5px] leading-[1.1] mb-4 text-white">
                  <span className="text-[#07b4ba] text-[42px] leading-none mr-[6px] font-serif relative top-[8px]">"</span>
                  AOF Changed The Way <span className="text-[#07b4ba]">I Train And Perform.</span>
                  <span className="text-[#07b4ba] text-[42px] leading-none ml-[6px] font-serif relative top-[8px]">"</span>
                </h3>
                <p className="text-white/65 text-[15px] leading-[1.75]">
                  The structure, the attention to detail, and the accountability took me to a level I never thought possible. I'm stronger, faster, and fight with more confidence than ever.
                </p>
                <p className="mt-3.5 text-[#07b4ba] font-bold text-[14px]">— Alex M., Amateur MMA Fighter</p>
              </div>
            </div>
          </Reveal>
          <Reveal><InfiniteFeedbackSlider /></Reveal>
        </div>
      </div>

      {/* ── APPLY FORM — SECTION_INSET (unchanged) ── */}
      <div id="contact" ref={formRef} className="relative overflow-hidden bg-[#0a0a0a]"
        style={{backgroundImage:"radial-gradient(rgba(7,180,186,.18) .75px,transparent .75px)",backgroundSize:"20px 20px"}}>
        <div className="w-full py-12" style={SECTION_INSET}>
          <div className="flex flex-col md:flex-row gap-14 items-start flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <Reveal>
                <p className="text-[#07b4ba] font-bold text-[13px] tracking-[2.5px] uppercase mb-3">Ready To Start?</p>
                <h2 className="font-['Bebas_Neue'] text-[clamp(34px,5vw,54px)] tracking-[2px] leading-none mb-4 text-white">
                  Apply For Your<br/><span className="text-[#07b4ba]">1-On-1 Coaching Spot</span>
                </h2>
                <p className="text-white/50 text-[14px] leading-[1.7] mb-7 max-w-[380px]">
                  Spots are limited. We only take on a small number of students at a time to ensure every athlete gets the attention they deserve.
                </p>
                {checklistItems.map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3.5">
                    <span className="text-[#07b4ba] text-[16px] shrink-0 mt-0.5">✓</span>
                    <p className="text-[16px] text-white leading-[1.55]">{item}</p>
                  </div>
                ))}
                {/* ── ANY QUERIES — centered, matching screenshot ── */}
              
              </Reveal>
            </div>
            <div className="flex-1 min-w-[300px]">
              <Reveal>
                <div className="bg-[#05070b] border border-white/10 rounded-2xl p-10">
                  {stage===3 ? (
                    <div className="text-center py-12">
                      <div className="text-[52px] mb-4">✅</div>
                      <h4 className="font-['Bebas_Neue'] text-white text-[28px] tracking-[2px] mb-2">Booking Confirmed!</h4>
                      <p className="text-white/50 text-[15px]">We'll reach out within 24 hours to confirm your session.</p>
                    </div>
                  ) : stage===2 ? (
                    <>
                      <h3 className="font-bold text-[13px] tracking-[3px] text-[#07b4ba] mb-1.5 uppercase">Schedule Your Call</h3>
                      <p className="text-white/35 text-[12px] mb-5 tracking-[1px]">STEP 2 OF 2 — PICK A DATE AND TIME</p>
                      <CalendarPicker onConfirm={handleBookingConfirm} />
                      <button onClick={()=>setStage(1)} className="mt-3 bg-transparent border-none text-white/45 text-[13px] cursor-pointer underline hover:text-white transition-colors">Back to details</button>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold text-[13px] tracking-[3px] text-[#07b4ba] mb-1.5 uppercase">Start Your Journey With AOF</h3>
                      <p className="text-white/35 text-[12px] mb-5 tracking-[1px]">STEP 1 OF 2 — YOUR DETAILS</p>
                      {([
                        {placeholder:"Full Name", type:"text", key:"name"},
                        {placeholder:"Phone Number", type:"tel", key:"phone"},
                      ] as {placeholder:string; type:string; key:"name"|"phone"}[]).map(f => (
                        <input key={f.key} type={f.type} placeholder={f.placeholder}
                          value={lead[f.key]} onChange={e=>setLead(l=>({...l,[f.key]:e.target.value}))}
                          className="w-full px-4 py-3.5 rounded-lg bg-[#222] border border-white/10 text-white placeholder-white/35 text-[15px] mb-3.5 outline-none focus:border-[#07b4ba] transition-colors appearance-none" />
                      ))}
                      <select value={lead.goal} onChange={e=>setLead(l=>({...l,goal:e.target.value}))}
                        className="w-full px-4 py-3.5 rounded-lg bg-[#222] border border-white/10 text-white text-[15px] mb-3.5 outline-none focus:border-[#07b4ba] transition-colors appearance-none cursor-pointer">
                        <option value="">Main Goal</option>
                        <option value="technique">Improve Technique</option>
                        <option value="competition">Competition Prep</option>
                        <option value="fitness">Fitness and Conditioning</option>
                        <option value="beginner">Learn MMA from Scratch</option>
                      </select>
                      <button onClick={handleLeadSubmit}
                        className="w-full py-3.5 mt-1 rounded-lg bg-[#07b4ba] text-white font-['Bebas_Neue'] text-[20px] tracking-[2px] border-none cursor-pointer hover:bg-[#059a9f] transition-colors">
                        Next — Schedule a Time
                      </button>
                    </>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
          <div className="mt-7 flex flex-col items-center gap-3 w-full">
  <p className="text-white font-bold text-[15px]">
    Any Queries?
  </p>

  <button className="inline-flex items-center gap-2.5 bg-[#25D366] text-white py-3.5 px-10 rounded-full font-bold text-[15px] border-none cursor-pointer hover:bg-[#1ebe57] transition-colors shadow-[0_4px_18px_rgba(37,211,102,35)]">
    <WhatsAppIcon />
    Chat On WhatsApp
  </button>
</div>
        </div>
      </div>

      {/* ── FAQ — GUTTER ── */}
      <FAQSection />

      {/* ── FOOTER — GUTTER ── */}
      <footer className="bg-[#0f1115] pt-8 pb-2 border-t border-white/10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10" style={GUTTER}>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[24px] tracking-[1px] text-white pt-5 mb-3.5">CONTACT</h3>
            <div className="flex flex-col gap-4">
              <p className="text-white/50 text-[17px]">+91 00000 00000</p>
              <p className="text-white/50 text-[17px]">info@aofacademy.com</p>
              <p className="text-white/50 text-[17px]">Chennai, Tamil Nadu, India</p>
            </div>
          </div>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[24px] tracking-[1px] text-white pt-5 mb-3.5">NAVIGATION</h3>
            <div className="flex flex-col gap-2.5">
              {([["#home","Home"],["#method","AOF Method"],["#testimonials","Testimonials"],["#faq","FAQ"],["#contact","Apply Now"]] as [string,string][]).map(([href,label]) => (
                <a key={href} href={href} className="text-white/50 text-[17px] no-underline hover:text-[#07b4ba] transition-colors">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[24px] tracking-[1px] pt-5 mb-3.5 flex">
              <span className="text-[#07b4ba]">A</span><span className="text-white">O</span><span className="text-[#07b4ba]">F</span>
            </h3>
            <p className="text-white/50 text-[15px] leading-[1.8] max-w-[320px]">
              Art of Fighting Academy — building champions through proven systems and disciplined training.
            </p>
          </div>
        </div>
        <div className="w-full mt-6 pt-3 border-t border-white/10 text-center text-[13px] text-white/30" style={GUTTER}>
          © 2026 AOF Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
