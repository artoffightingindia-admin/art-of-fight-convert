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
  { text: "I used to watch YouTube tutorials and understand nothing. Everything felt confusing. But AOF's learning modules felt just like in-person training. Online was never a roadblock.", author: "Saran" },
  { text: "The step-by-step teaching was excellent. Even complex concepts like power generation and hip rotation were explained so clearly that I understood everything just by watching the videos.", author: "Mani Bharathi" },
  { text: "Whenever I wasn't sure about something, I would record my technique and send it to the coach. The feedback was quick, clear, and helped me fix mistakes immediately.", author: "Thirumurugan" },
  { text: "At first I was doubtful about online training, but as I progressed, I knew I was on the right path and improving every week. I haven't seen any other online MMA content explained with this level of clarity and detail.", author: "Afrose",image: "https://i.postimg.cc/LszHGw0Q/Adobe-Express-file.jpg" },
  { text: "From complete beginner to ring-ready in just a few months. AOF's system truly works.", author: "Karthik V" },
  { text: "My performance improved drastically. The personalised game plan made all the difference in my last fight.", author: "Rahul P" },
];

function InfiniteFeedbackSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);
  const [mobilePage, setMobilePage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
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
    const speed = 0;
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

  const currentCard = feedbackCards[mobilePage % feedbackCards.length];

  if (isMobile) {
    return (
      <div className="block w-full">
        <div className="w-full p-6 border border-white/10 rounded-2xl bg-gradient-to-b from-[#1a1d23] to-[#15181d] shadow-lg">
          <div className="flex gap-1 mb-4 text-[#07b4ba] text-sm leading-none">★★★★★</div>
          <p className="m-0 mb-5 text-white/80 font-['Barlow'] text-[15px] italic font-normal leading-[1.7]">"{currentCard.text}"</p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#202533] border border-[#07b4ba]/20 flex items-center justify-center text-lg shrink-0 shadow-inner overflow-hidden">
              {currentCard.image ? (
                <img src={currentCard.image} alt={currentCard.author} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#07b4ba] font-['Barlow'] font-bold">{currentCard.author.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <p className="m-0 mb-0.5 text-white font-['Barlow'] text-[15px] font-bold leading-none">{currentCard.author}</p>
              <span className="text-[#07b4ba]/70 font-['Barlow'] text-[12px] uppercase tracking-wider font-semibold leading-none">AOF Member</span>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-5">
          {feedbackCards.map((_, i) => (
            <button key={i} onClick={() => setMobilePage(i)}
              className={`w-2.5 h-2.5 rounded-full border-0 cursor-pointer transition-all duration-300 ${i === mobilePage % feedbackCards.length ? "bg-[#07b4ba] w-6 shadow-[0_0_8px_rgba(7,180,186,0.6)]" : "bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <button className="flex items-center justify-center w-12 h-12 border border-white/10 rounded-full bg-[#111419] text-white/70 text-2xl cursor-pointer active:border-[#07b4ba] active:text-[#07b4ba] transition-all"
            onClick={() => setMobilePage(p => (p - 1 + feedbackCards.length) % feedbackCards.length)}>‹</button>
          <button className="flex items-center justify-center w-12 h-12 border border-white/10 rounded-full bg-[#111419] text-white/70 text-2xl cursor-pointer active:border-[#07b4ba] active:text-[#07b4ba] transition-all"
            onClick={() => setMobilePage(p => (p + 1) % feedbackCards.length)}>›</button>
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
              <div className="flex gap-1 mb-4 text-[#07b4ba] text-base">★★★★★</div>
              <p className="font-['Barlow'] font-normal text-white/70 text-[15px] leading-relaxed italic mb-5">"{card.text}"</p>
              <div className="flex items-center gap-2.5 mt-auto min-h-[52px]">
                <div className="w-10 h-10 rounded-full bg-[#202533] flex items-center justify-center text-lg shrink-0 overflow-hidden">
                  {card.image ? (
                    <img src={card.image} alt={card.author} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#07b4ba] font-['Barlow'] font-bold">{card.author.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <p className="font-['Barlow'] font-bold text-white text-[15px] mb-0.5">{card.author}</p>
                  <span className="font-['Barlow'] font-normal text-white/40 text-[13px]">Member</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-7">
        <button onClick={() => { isPausedRef.current = true; posRef.current = Math.max(posRef.current - 364, 0); if (trackRef.current) { trackRef.current.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)"; trackRef.current.style.transform = `translateX(-${posRef.current}px)`; setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ""; }, 700); } setTimeout(() => { isPausedRef.current = false; }, 700); }} className="w-12 h-12 rounded-full border border-white/15 bg-[#15181d] text-white text-2xl cursor-pointer hover:border-[#07b4ba] hover:text-[#07b4ba] transition-all flex items-center justify-center">‹</button>
        <button onClick={() => { isPausedRef.current = true; posRef.current += 364; if (trackRef.current) { trackRef.current.style.transition = "transform 0.7s cubic-bezier(0.22,1,0.36,1)"; trackRef.current.style.transform = `translateX(-${posRef.current}px)`; setTimeout(() => { if (trackRef.current) trackRef.current.style.transition = ""; }, 700); } setTimeout(() => { isPausedRef.current = false; }, 700); }} className="w-12 h-12 rounded-full border border-white/15 bg-[#15181d] text-white text-2xl cursor-pointer hover:border-[#07b4ba] hover:text-[#07b4ba] transition-all flex items-center justify-center">›</button>
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
  { question: "Is there a contract or long-term commitment?", answer: "No long-term contracts. You can cancel anytime. We also back that up with a results guarantee — if you don't see measurable progress, well extend your coaching for free until you do." },
  { question: "How many sessions should I train per week?", answer: "Most athletes train between 3–6 sessions per week depending on their goals, recovery capacity, and schedule. Your coach will create the optimal structure for you." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div id="faq" className="relative overflow-hidden bg-[#0b0b0b]" style={{ backgroundImage: "linear-gradient(rgba(7,180,186,0.05) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,0.05) 1px,transparent .4px)", backgroundSize: "40px 40px" }}>
      <div style={{ width: "100%", paddingLeft: "1cm", paddingRight: "1cm", paddingTop: "64px", paddingBottom: "64px", boxSizing: "border-box", position: "relative", zIndex: 10 }}>
        <Reveal>
          <p className="text-center text-[#07b4ba] font-['Barlow'] font-bold text-[12px] tracking-[3px] uppercase mb-2">Got Questions?</p>
          <h2 className="text-center font-['Bebas_Neue'] text-[36px] md:text-[60px] tracking-[3px] text-white leading-none mb-2">
            Frequently Asked <span className="text-[#07b4ba]">Questions</span>
          </h2>
          <div className="w-14 h-0.5 bg-[#07b4ba] mx-auto mt-4 mb-12 rounded-full" />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {faqItems.map((item, i) => (
            <Reveal key={i}>
              <div className={`border rounded-xl bg-[#141414] overflow-hidden transition-colors duration-200 ${openIndex === i ? "border-[#07b4ba]/45" : "border-white/10"}`}>
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full bg-transparent border-none flex items-center justify-between py-5 px-6 cursor-pointer text-left gap-4">
                  <span className={`font-['Barlow'] font-bold text-[15px] md:text-[17px] leading-snug flex-1 ${openIndex === i ? "text-[#07b4ba]" : "text-white"}`}>{item.question}</span>
                  <span className={`w-7 h-7 rounded-full border-[1.5px] flex items-center justify-center shrink-0 text-lg transition-all duration-300 ${openIndex === i ? "border-[#07b4ba] text-[#07b4ba] rotate-45 bg-[#07b4ba]/10" : "border-white/20 text-white/60"}`}>+</span>
                </button>
                <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: openIndex === i ? 400 : 0, padding: openIndex === i ? "0 24px 20px" : "0 24px" }}>
                  <p className="font-['Barlow'] font-normal text-[14px] text-white/60 leading-[1.75]">{item.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── ICONS ── */
const IconPlan = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></svg>);
const IconChat = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>);
const IconLeaf = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z" /></svg>);
const IconChart = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>);
const IconGlobe = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>);

// New Bonus Icons Optimized
const IconStretch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 md:w-14 md:h-14">
    <circle cx="14" cy="5" r="2.5" />
    <path d="M13 8 C11 12 10 14 9 21" />
    <path d="M10.5 14 L14 21" />
    <path d="M13 8 C11 5 7 4 6 7" />
    <path d="M13 9 L16 12 L13 14" />
  </svg>
);
const IconBrain = () => (<svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 md:w-14 md:h-14"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" /><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" /></svg>);
const IconSearch = () => (<svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 md:w-14 md:h-14"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>);
const IconFlashcards = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 md:w-14 md:h-14">
    <path d="M7 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" transform="rotate(-9 11 13)" />
    <path d="M9 4h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" transform="rotate(6 13 11)" fill="#0b0b0b" />
  </svg>
);
const IconStopwatch = () => (<svg viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 md:w-14 md:h-14"><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M10 3h4" /><path d="M12 3v2" /><path d="M6 6l-2-2" /></svg>);

const IconShieldW = () => (<svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>);
const IconUsersW = () => (<svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const IconTrophyW = () => (<svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16M12 17v5M7 4v6a5 5 0 0 0 10 0V4H7z" /></svg>);

const whatCards = [
  { icon: <IconPlan />, title: "CLEAR ROADMAP", desc: "Know exactly what to train, when to train, and how to progress throughout the program." },
  { icon: <IconChart />, title: "TRAIN ON YOUR SCHEDULE", desc: "Access pre-recorded sessions and train whenever it suits you. Most sessions take just 30–40 minutes a day." },
  { icon: <IconLeaf />, title: "TRAIN WITH CONFIDENCE", desc: "Receive direct coach feedback and guidance so you know you're practicing techniques correctly." },
  { icon: <IconGlobe />, title: "BEGINNER FRIENDLY", desc: "Start with confidence, even if you've never trained MMA before." },
  { icon: <IconChat />, title: "LEARN IN Tamil", desc: "Understand concepts faster through coaching delivered in Tamil and simple English." },
];

const painPoints = [
  "Don't know where to begin",
  "Don't have access to a quality MMA gym",
  "Don't have a training partner or equipment",
  "Can't commit hours every day to training",
  "Can't find structured MMA guidance in Tamil",
];

const coachCredentials = [
  "Only Tamil MMA Fighter in MFN and Multiple-Time National Medalist",
  "Coached 2000+ Students, Including National Champions Across Multiple Disciplines",
  "Specialized in Developing Strong Fundamentals for Beginners",
];

const stats = [
  { val: "2,000+", label: "Clients Coached" },
  { val: "10+", label: "Years Experience" },
  { val: "20+", label: "MMA Fights" },
  { val: "10K+", label: "AOF Community" },
];

const GUTTER: CSSProperties = { paddingLeft: "1cm", paddingRight: "1cm" };
const SECTION_INSET_RESPONSIVE = "px-[1cm] md:px-[140px]";

export default function ProgramPage() {
  const navigate = useNavigate();
  const footerRef = useRef<HTMLDivElement>(null);
  const [roadmapIndex, setRoadmapIndex] = useState(0);

  // --- RAZORPAY PAYMENT LINK INTEGRATION ---
  const handlePayment = () => {
    // 🚨 PASTE YOUR RAZORPAY PAYMENT LINK INSIDE THESE QUOTES 🚨
    window.location.href = "https://rzp.io/rzp/aof30dayprogram";
  };

  const roadmapCards = [
    { title: "Week 01", days: "DAYS 1 - 7 : Build your foundation",   image: "https://i.postimg.cc/1zSH9ZXw/Week-1-jpg.jpg", points: ["Stance & Guard", "Core Punches", "Basic Combinations", "Strong Technical Fundamentals"] },
    { title: "Week 02", days: "DAYS 8 - 14 : Defense to Offense",  image: "https://i.postimg.cc/pdvZ2trB/Week-2-jpg.jpg", points: ["Punch Defenses", "Punch Combinations", "Punch Counters", "Roundhouse Kicks"] },
    { title: "Week 03", days: "DAYS 15 - 21 : BEYOND THE HANDS", image: "https://i.postimg.cc/0Nvf8qjn/Week-3-jpg.jpg", points: ["Push Kicks", "Switch Kick", "Kick Defenses", "Punch-Kick Combinations"] },
    { title: "Week 04", days: "DAYS 22 - 28 : Expanding Your Arsenal", image: "https://i.postimg.cc/jjTXsr2X/Week-4-jpg.jpg", points: ["Kick Counters", "Knees & Elbows", "Advanced Combinations", "Structured Shadowboxing"] },
    { title: "Week 05", days: "DAYS 29 - 30 : PUTTING IT ALL TOGETHER", image: "https://i.postimg.cc/bvPTzjrm/Week-5-jpg.jpg", points: ["Complete Striking Integration", "Shadowboxing Fundamentals", "Developing Flow", "Independent Training"] },
  ];

  const maxRoadmapIndex = roadmapCards.length - 2;

  // IMPORTANT: For the buttons below, `onClick={scrollToFooter}` has been replaced with `onClick={handlePayment}`

  return (
    <div className="font-['Barlow'] text-white bg-[#0a0a0a] overflow-x-hidden w-full antialiased">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-[62px] bg-[#111419]/80 backdrop-blur-[10px] border-b border-white/10 flex items-center justify-between" style={GUTTER}>
        <span className="font-['Bebas_Neue'] text-[30px] leading-none">
          <span className="text-[#07b4ba]">A</span><span className="text-white">O</span><span className="text-[#07b4ba]">F</span>
        </span>
        <div className="flex items-center gap-3 md:gap-5">
          <button className="hidden md:flex bg-transparent border-none text-white/65 font-['Barlow'] text-[14px] font-semibold cursor-pointer hover:text-white transition-colors items-center gap-2" onClick={() => navigate("/")}>
            ← Back To Home
          </button>
          <button
            className="h-9 px-4 md:px-6 rounded-md bg-[#07b4ba] text-white font-['Bebas_Neue'] text-[15px] md:text-[17px] tracking-[2px] border-none cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
            onClick={handlePayment}
          >
            JOIN NOW
          </button>
        </div>
      </nav>

      {/* Mobile Back Button */}
      <button className="md:hidden fixed bottom-[18px] left-[18px] z-[999] flex items-center justify-center w-[52px] h-[52px] border border-white/10 rounded-full bg-[#13171d] text-[#07b4ba] text-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md" onClick={() => navigate("/")} aria-label="Back to home">←</button>

      {/* ── HERO + TRUST BAR ── */}
      <div className="relative flex flex-col w-full overflow-hidden" ref={(el) => { if (!el) return; el.style.paddingTop = "62px"; el.style.height = "100vh"; el.style.height = "100svh"; el.style.height = "100dvh"; }}>
        <section className="relative w-full flex items-center overflow-hidden flex-1 min-h-0" style={{ background: "radial-gradient(circle at top,rgba(7,180,186,.12),transparent 45%),#06080c" }}>
          <div className="absolute inset-0 z-0 bg-center bg-cover opacity-100" style={{ backgroundImage: "url('/images/Program page Hero.jpeg')" }} />
          <div className="absolute inset-0 z-[1] bg-[repeating-linear-gradient(transparent_0px,transparent_2px,rgba(0,0,0,0.2)_2px,rgba(0,0,0,0.2)_4px)]" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#06080c] via-[#06080c]/30 to-transparent" />
          <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-[#06080c]/20 to-[#06080c] md:via-[#06080c]/20" />
          <div className="absolute bottom-0 left-0 right-0 h-1/2 z-[3] bg-gradient-to-t from-[#06080c] to-transparent md:hidden" />

          <div className="w-full relative z-10" style={GUTTER}>
            <Reveal>
              <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[11px] md:text-[12px] tracking-[3px] uppercase mb-3 md:mb-4">AOF 30-Day Online Program</p>
              <h1 className="font-['Bebas_Neue'] text-[clamp(40px,11vw,72px)] leading-[.93] tracking-[2px] uppercase text-white mb-4 md:mb-5">
                BUILD REAL<br /><span className="text-[#07b4ba]">MMA STRIKING</span><br />FUNDAMENTALS
              </h1>
              <p className="text-white/60 text-[14px] md:text-[16px] leading-[1.65] max-w-[480px] mb-6 md:mb-8">
                A step-by-step online system designed for complete beginners to learn proper MMA striking from home — Even if you've never trained before.
              </p>
              <button
                className="inline-flex items-center justify-center w-full md:w-auto px-[60px] py-4 rounded-lg bg-[#07b4ba] text-white font-['Barlow'] font-bold text-[15px] md:text-[14px] uppercase tracking-[1px] border border-[#07b4ba] cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black hover:-translate-y-0.5 active:bg-white active:text-black"
                onClick={handlePayment}
              >
                JOIN NOW
              </button>
            </Reveal>
          </div>
        </section>

        {/* Trust Bar */}
        <div className="w-full bg-[#07b4ba] relative z-20 flex items-center shrink-0" style={{ height: "1.5cm", ...GUTTER }}>
          <div className="w-full flex items-center justify-between md:justify-start gap-0">
            <div className="flex-1 flex items-center justify-center gap-1.5 md:gap-3">
              <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center shrink-0"><IconShieldW /></div>
              <span className="font-['Bebas_Neue'] text-[13px] md:text-[22px] tracking-[1px] md:tracking-[2px] text-white leading-none whitespace-nowrap">Proven System</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-1.5 md:gap-3">
              <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center shrink-0"><IconUsersW /></div>
              <span className="font-['Bebas_Neue'] text-[13px] md:text-[22px] tracking-[1px] md:tracking-[2px] text-white leading-none whitespace-nowrap">Tamil Team</span>
            </div>
            <div className="flex-1 flex items-center justify-center gap-1.5 md:gap-3">
              <div className="w-7 h-7 md:w-10 md:h-10 flex items-center justify-center shrink-0"><IconTrophyW /></div>
              <span className="font-['Bebas_Neue'] text-[13px] md:text-[22px] tracking-[1px] md:tracking-[2px] text-white leading-none whitespace-nowrap">Real Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PAIN SECTION ── */}
      <section className={`w-full py-10 md:py-12 ${SECTION_INSET_RESPONSIVE}`}>
        <div className="flex flex-col md:flex-row gap-10 md:gap-24 items-center flex-wrap">
          <div className="flex-1 max-w-full md:max-w-[500px] w-full md:order-2">
            <Reveal>
              <h3 className="mb-4 text-center italic" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "22px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.5px" }}>
                5 MINUTES THAT COULD SAVE YOU MONTHS OF CONFUSION
              </h3>
              <img src="/images/Pain Point.png" alt="MMA Training" className="w-full rounded-[14px] border border-white/10 aspect-video object-cover block" />
            </Reveal>
          </div>
          <div className="flex-1 min-w-[260px] md:order-1">
            <Reveal>
              <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[13px] md:text-[14px] tracking-[3px] uppercase mb-2">Sounds Familiar?</p>
              <h2 className="font-['Bebas_Neue'] text-[28px] md:text-[42px] tracking-[2px] text-white leading-[1.1] mb-4">
                YOU WANT TO LEARN MMA.<br />BUT <span className="text-[#FF0000]">
HAVEN'T STARTED  </span> BECAUSE YOU:
              </h2>
              <div className="w-20 h-[3px] bg-[#e53e3e] rounded mb-5 md:mb-6" style={{ boxShadow: "0 0 10px rgba(229,62,62,.7),0 0 24px rgba(229,62,62,.35)" }} />
            </Reveal>
            {painPoints.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-[3px] h-[22px] bg-[#ff2d2d] rounded shrink-0 mt-1" style={{ boxShadow: "0 0 6px rgba(255,45,45,.9),0 0 16px rgba(255,45,45,.6)" }} />
                  <p className="text-white/70 text-[14px] md:text-[15px] leading-[1.5]">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AOF INTRO SECTION ── */}
      <div className="bg-[#0b0b0b]" style={{ backgroundImage: "repeating-linear-gradient(-45deg,rgba(7,180,186,.05) 0px,rgba(7,180,186,.05) 1px,transparent 1px,transparent 5px)" }}>
        <div className={`w-full py-10 md:py-12 ${SECTION_INSET_RESPONSIVE}`}>
          <div className="flex flex-col md:flex-row gap-10 md:gap-24 items-center flex-wrap">
            <div className="flex-1 max-w-full md:max-w-[500px] w-full">
              <Reveal>
                <div className="relative aspect-video w-full rounded-[14px] overflow-hidden border border-white/10">
                  <img src="https://i.postimg.cc/kMyztfKs/Program-Intro-jpg.jpg" alt="AOF Program Intro" className="absolute inset-0 w-full h-full object-cover object-center" />
                </div>
              </Reveal>
            </div>
            <div className="flex-1 min-w-[260px]">
              <Reveal>
                <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[13px] md:text-[14px] tracking-[3px] uppercase mb-2">
                  Introducing AOF 30-Day Program
                </p>
                <h2 className="font-['Bebas_Neue'] text-[28px] md:text-[42px] tracking-[2px] text-white leading-[1.1] mb-4">
                  THE STARTING POINT <br /> <span className="text-[#07b4ba]">YOU'VE BEEN LOOKING FOR.</span>
                </h2>
                <div className="flex flex-col gap-4">
                  <p className="font-['Barlow'] text-[14px] md:text-[15px] text-white/70 leading-[1.75]">
                    The AOF 30-Day MMA Striking Program was built to make learning MMA simple, structured, and accessible.Train from home, follow a proven roadmap, receive direct support from coaches, and develop real striking fundamentals without needing a gym, training partner, or hours of free time every day.
                  </p>
                  <p className="font-['Barlow'] text-[14px] md:text-[15px] text-white/60 leading-[1.75]">
                    We've built the roadmap. You just need to follow it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES / WHAT YOU GET ── */}
      <section className="relative overflow-hidden bg-[#0b0b0b]" style={{ backgroundImage: "linear-gradient(rgba(7,180,186,.07) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,.07) 1px,transparent .4px)", backgroundSize: "30px 30px" }}>
        <div className="w-full py-10 md:py-12" style={GUTTER}>
          <Reveal>
            <p className="text-center text-[#07b4ba] font-['Barlow'] font-bold text-[13px] md:text-[14px] tracking-[3px] uppercase mb-3">WHY THIS PROGRAM WORKS?</p>
            <h2 className="font-['Bebas_Neue'] text-[clamp(28px,7vw,60px)] tracking-[2px] text-white text-center leading-none mb-8 md:mb-12">BUILT AROUND THE REAL <span className="text-[#07b4ba]">
CHALLENGES OF BEGINNERS  </span>
</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-[16px]">
            {whatCards.map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`w-full p-5 rounded-[16px] bg-gradient-to-b from-[#13171d] to-[#101318] border border-white/5 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-5 md:gap-3 md:min-h-[255px] md:p-[16px] md:rounded-[18px] ${i === 4 ? "col-span-1 md:col-span-2 lg:col-span-1" : ""}`}>
                  <div className="w-[48px] h-[48px] md:w-[70px] md:h-[70px] flex items-center justify-center shrink-0">{item.icon}</div>
                  <div className="flex flex-col items-start md:items-center w-full">
                    <h4 className="font-['Bebas_Neue'] text-[#07b4ba] text-[16px] md:text-[17.5px] tracking-[1px] md:tracking-[2px] leading-[1.3] m-0 text-left md:text-center mb-[3px]">{item.title}</h4>
                    <p className="text-[13px] md:text-[14px] leading-[1.55] text-white/60 text-left md:text-center m-0">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROADMAP SECTION ── */}
      <div className="relative overflow-hidden bg-[#0b0b0b]" style={{ backgroundImage: "repeating-linear-gradient(-45deg,rgba(7,180,186,.04) 0px,rgba(7,180,186,.04) 1px,transparent 1px,transparent 6px)" }}>
        <div className="w-full py-8 md:py-12">
          
          <div className="text-center mb-7 md:mb-12" style={GUTTER}>
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[14px] tracking-[3px] md:tracking-[4px] uppercase mb-2 md:mb-3">THE AOF BLUEPRINT</p>
            <h2 className="font-['Bebas_Neue'] text-[clamp(28px,7vw,60px)] leading-[.95] tracking-[2px] md:tracking-[3px] text-white"><span className="text-[#07b4ba]">A CLEARPATH</span>TO MMA STRIKING.</h2>
            <p className="mt-3 md:mt-4 text-white/60 text-[14px] md:text-[15px] font-['Barlow']">Follow a structured progression designed to take you from complete beginner to confidently performing fundamental MMA striking techniques.</p>
          </div>

          <div className="relative w-full max-w-full">
            {/* Timeline */}
            <div className="relative w-full px-[5%] md:px-[10%] mb-8 md:mb-12">
              <div className="absolute top-[28px] md:top-[42px] left-[10%] right-[10%] h-[1px] md:h-[2px] bg-white/10 z-0" />
              <div className="flex justify-between relative z-10 w-full">
                {roadmapCards.map((week, i) => {
                  const isActive = i === roadmapIndex || i === roadmapIndex + 1;
                  return (
                    <div key={i} className="flex flex-col items-center justify-end w-[18%] cursor-pointer group" onClick={() => setRoadmapIndex(Math.min(i, maxRoadmapIndex))}>
                      <p className={`text-[8px] md:text-[14px] font-['Bebas_Neue'] tracking-[1px] mb-2 md:mb-3 uppercase text-center line-clamp-2 h-[24px] md:h-[40px] flex items-end justify-center transition-colors ${isActive ? 'text-[#07b4ba]' : 'text-white/40 group-hover:text-white/70'}`}>
                        {week.title}
                      </p>
                      <div className={`w-[12px] h-[12px] md:w-[18px] md:h-[18px] rounded-full border-[1.5px] md:border-2 transition-all duration-300 ${isActive ? 'bg-[#07b4ba] border-[#07b4ba] shadow-[0_0_12px_rgba(7,180,186,.7)]' : 'bg-[#0b0b0b] border-white/20 group-hover:border-white/50'} relative z-10`} />
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Slider Container */}
            <div className="relative w-full overflow-visible md:overflow-hidden" style={GUTTER}>
              <button 
                onClick={() => setRoadmapIndex(p => Math.max(0, p - 1))} 
                className={`absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-[#0d1117] border border-white/10 rounded-[8px] md:rounded-[12px] flex items-center justify-center text-white/70 text-lg md:text-2xl cursor-pointer hover:text-white hover:border-[#07b4ba]/50 transition-all ${roadmapIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >‹</button>
              <button 
                onClick={() => setRoadmapIndex(p => Math.min(maxRoadmapIndex, p + 1))} 
                className={`absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 bg-[#0d1117] border border-white/10 rounded-[8px] md:rounded-[12px] flex items-center justify-center text-white/70 text-lg md:text-2xl cursor-pointer hover:text-white hover:border-[#07b4ba]/50 transition-all ${roadmapIndex === maxRoadmapIndex ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              >›</button>

              <div className="overflow-hidden w-full">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ gap: '2%', transform: `translateX(-${roadmapIndex * 47}%)` }}>
                  {roadmapCards.map((card, i) => (
                    <div key={i} className="flex-shrink-0 bg-gradient-to-b from-[#10151d] to-[#0b0f14] border border-white/5 rounded-[12px] md:rounded-[20px] overflow-hidden flex flex-col" style={{ width: '45%' }}>
                      <div className="flex flex-row h-[180px] md:h-[300px]">
                        <div className="w-[45%] h-full shrink-0">
                          <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="w-[55%] p-3 md:p-8 flex flex-col justify-center">
                          <h3 className="font-['Bebas_Neue'] text-[16px] md:text-[32px] lg:text-[40px] text-white leading-[1.05] mb-2 uppercase line-clamp-2">{card.title}</h3>
                          <div className="w-8 md:w-16 h-[2px] md:h-[3px] bg-[#07b4ba] mb-3 md:mb-5" />
                          <div className="flex flex-col gap-1.5 md:gap-3">
                            {card.points.map((pt, pi) => (
                              <div key={pi} className="flex items-center gap-1.5 md:gap-2.5">
                                <div className="w-3 h-3 md:w-5 md:h-5 rounded-full border md:border-2 border-[#07b4ba] text-[#07b4ba] flex items-center justify-center text-[7px] md:text-[10px] shrink-0">✓</div>
                                <p className="text-[10px] md:text-[14px] text-white/75 leading-none md:leading-snug truncate block w-full m-0">{pt}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="py-2.5 md:py-4 border-t border-white/5 text-center bg-[#080b10]">
                        <p className="font-['Bebas_Neue'] text-[14px] md:text-[20px] text-[#07b4ba] tracking-[1px] m-0">{card.days}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Consistency box between roadmap cards and promise strip */}
          <div className="w-full max-w-4xl mx-auto mt-10 md:mt-12" style={GUTTER}>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 md:p-6 border border-[#07b4ba]/25 rounded-[12px] md:rounded-[16px] bg-gradient-to-b from-[#0d1a24]/90 to-[#070e16]/90 relative overflow-hidden">
              <div className="flex w-10 h-10 md:w-12 md:h-12 shrink-0 items-center justify-center border border-[#07b4ba] rounded-full text-[#07b4ba] bg-[#07b4ba]/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6"><path d="M8 21h8" /><path d="M12 17v4" /><path d="M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M5 4H3v2a4 4 0 0 0 4 4" /><path d="M19 4h2v2a4 4 0 0 1-4 4" /></svg>
              </div>
              <div className="flex-1 w-full md:max-w-[620px]">
                <h3 className="text-white/90 font-['Bebas_Neue'] text-[17px] md:text-[20px] tracking-[1px] leading-none mb-2 md:mb-1.5">MORE THAN JUST THE TECHNICAL SESSIONS</h3>
                
                {/* Desktop Text */}
                <p className="hidden md:block text-[#07b4ba] font-['Barlow'] text-[14px] leading-[1.4] m-0">
                  Every week includes Movement Fundamentals and White Belt Mentality sessions,
                  along with access to the Mistake Library. Technique Cue Cards and Warm-Up & Cooldown Guide support your learning throughout the program.
                </p>

                {/* Mobile Specific UI Text */}
                <div className="md:hidden mt-3 pt-3 border-t border-[#07b4ba]/20 w-full">
                  <p className="text-white/80 font-['Barlow'] text-[13.5px] leading-[1.5] italic font-medium m-0">
                    Includes mindset coaching, movement training, and many exclusive bonus learning resources.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Promise + Join Now strip */}
          <div className="w-full mt-12 md:mt-16" style={GUTTER}>
            <div className="w-full mx-auto text-center px-5 md:px-10 py-7 md:py-8">
              <p className="font-['Bebas_Neue'] text-[26px] md:text-[30px] tracking-[2px] text-white mb-3">Our Promise</p>
              <div className="w-[70px] h-0.5 bg-[#07b4ba] mx-auto mb-5 rounded-full" />
              <p className="font-['Barlow'] text-[14px] md:text-[19px] leading-[1.85] md:leading-[1.9] text-white/75 italic">
                <span className="text-[#07b4ba] text-[36px] md:text-[42px] leading-none mr-1.5 font-serif relative top-2.5">"</span>
                In 30 days, our goal is simple: Take you from knowing nothing about MMA striking to performing fundamental techniques correctly and shadowbox confidently on your own.Commit to the process, and we'll show you the path.
                <span className="text-[#07b4ba] text-[36px] md:text-[42px] leading-none ml-1.5 font-serif relative top-2.5">"</span>
              </p>
            </div>
            <div className="mt-6 md:mt-8 overflow-hidden bg-[#07b4ba]" style={{ marginLeft: "-1cm", marginRight: "-1cm" }}>
              <button
                className="w-full py-4 bg-transparent border-none cursor-pointer text-white font-['Bebas_Neue'] text-[20px] tracking-[3px] transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
                onClick={handlePayment}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── COACH SECTION ── */}
      <div className="bg-[#0f1115]">
        <div className={`w-full py-10 md:py-12 pb-8 md:pb-10 ${SECTION_INSET_RESPONSIVE}`}>
          <Reveal>
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] md:text-[17px] tracking-[2px] uppercase mb-5 md:mb-6">LED BY</p>
            <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start flex-wrap">
              <img
                src="https://i.postimg.cc/gjQP69D1/Purushoth-Coach-jpg.jpg"
                alt="Head Coach"
                className="w-full md:w-[240px] h-[220px] md:h-[300px] object-cover object-top rounded-xl border border-[#07b4ba]/30 shrink-0"
                style={{
                  boxShadow:
                    "0 0 15px rgba(7,180,186,0.25), 0 0 40px rgba(7,180,186,0.15)",
                }}
              />
              <div className="flex-1 min-w-[260px]">
                <h2 className="font-['Bebas_Neue'] text-[28px] md:text-[48px] tracking-[2px] text-white mb-1">Purushothaman MK</h2>
                <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[14px] tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-5">Head Coach and MMA Fighter</p>
                <div className="mb-5 md:mb-6">
                  {coachCredentials.map((cred, i) => (
                    <div key={i} className="flex items-start gap-2.5 mb-3">
                      <span className="text-[#07b4ba] text-[16px] shrink-0 mt-0.5">✓</span>
                      <p className="text-white/70 text-[14px] md:text-[15px] leading-[1.5]">{cred}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-4 md:mt-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-gradient-to-b from-[#181818] to-[#121212] border border-white/10 rounded-[14px] min-h-[95px] md:h-[140px] p-3 md:p-4 text-center flex flex-col justify-center items-center shadow-[0_0_14px_rgba(0,0,0,.18)]">
                      <p className="font-['Bebas_Neue'] text-[26px] md:text-[42px] text-[#07b4ba] tracking-[1px] mb-1.5 md:mb-2 leading-none">{stat.val}</p>
                      <p className="text-white/45 text-[11px] md:text-[12px] tracking-[2px] uppercase leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div className="relative overflow-hidden bg-[#0b0b0b]" style={{ backgroundImage: "repeating-linear-gradient(-45deg,rgba(7,180,186,.05) 0px,rgba(7,180,186,.05) 1px,transparent 1px,transparent 5px)" }}>
        <div className={`w-full py-10 md:py-12 ${SECTION_INSET_RESPONSIVE}`}>
          <Reveal>
            <div className="text-center mb-8 md:mb-11">
              <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[13px] tracking-[3px] uppercase">FROM OUR FIRST BATCH</p>
              <h2 className="font-['Bebas_Neue'] text-[clamp(28px,7vw,60px)] tracking-[2px] md:tracking-[3px] text-white mt-2 leading-none">
                WHAT HAPPENED  <span className="text-[#07b4ba]">AFTER 30 DAYS</span>
              </h2>
              <p className="text-white/40 mt-2 text-[13px] md:text-[15px]">Hear directly from people who completed the AOF 30-Day MMA Striking Program</p>
            </div>
          </Reveal>
          <Reveal>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center mb-8 md:mb-10 flex-wrap">
              <div className="flex-1 max-w-full md:max-w-[550px] w-full">
                <img src="https://i.postimg.cc/BZ8Pjwr4/8B9HN-2-jpg.jpg" alt="Athlete" className="w-full rounded-[10px] object-cover aspect-video" />
              </div>
              <div className="flex-1 min-w-[260px]">
                <h3 className="font-['Bebas_Neue'] text-[clamp(24px,6vw,42px)] tracking-[1.5px] leading-[1.1] mb-4 text-white">
                  <span className="text-[#07b4ba] text-[36px] md:text-[42px] leading-none mr-1.5 font-serif relative top-0">"</span>
                  The More I Progressed,<span className="text-[#07b4ba]">The More I Wanted To Train</span>
                  <span className="text-[#07b4ba] text-[36px] md:text-[42px] leading-none ml-1.5 font-serif relative top-0">"</span>
                </h3>
                <p className="text-white/65 text-[14px] md:text-[15px] leading-[1.75]">
                  I started with doubts and made mistakes. But as I progressed through the program my technique improved and my confidence grew. I even found myself drilling techniques whenever I had free time.
                </p>
                <p className="mt-3 md:mt-3.5 text-[#07b4ba] font-['Barlow'] font-bold text-[13px] md:text-[14px]">— Palanippan, AOF 30 Days Program Member.</p>
              </div>
            </div>
          </Reveal>
          <Reveal><InfiniteFeedbackSlider /></Reveal>
        </div>
      </div>

      {/* ── BONUSES SECTION ── */}
      <div className="relative overflow-hidden bg-[#0b0b0b]" style={{ backgroundImage: "linear-gradient(rgba(7,180,186,.05) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,.05) 1px,transparent .4px)", backgroundSize: "32px 32px" }}>
        <div className="w-full py-10 md:py-12" style={GUTTER}>
          <Reveal>
            <div className="text-center mb-8 md:mb-10">
              <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[13px] tracking-[3px] uppercase mb-2">BEYOND THE CORE PROGRAM</p>
              <h2 className="font-['Bebas_Neue'] text-[clamp(26px,7vw,60px)] leading-[.95] tracking-[2px] md:tracking-[3px] text-white">
                EVERYTHING DESIGNED TO<span className="text-[#07b4ba]"> HELP YOU SUCCEED</span>
              </h2>
              <p className="text-white/50 mt-2 text-[13px] md:text-[15px]">Enroll now and receive exclusive bonus resources designed to maximize your results.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-2">
            {[
              { icon: <IconStretch />, title: "MOVEMENT FUNDAMENTALS", desc: "4 guided modules to improve your mobility, balance, coordination, and body control." },
              { icon: <IconBrain />, title: "WHITE BELT MENTALITY", desc: "4 lessons to help beginners train smarter, stay consistent, and avoid common mistakes." },
              { icon: <IconSearch />, title: "THE MISTAKE LIBRARY", desc: "50+ side-by-side corrections showing common mistakes and how to fix them." },
              { icon: <IconFlashcards />, title: "TECHNIQUE CUE CARDS", desc: "Simple visual references designed to help you remember key techniques faster." },
              { icon: <IconStopwatch />, title: "Warm Up & Cool Down Guide", desc: "Prepare your body before training and recover properly after every session." },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className={`bg-gradient-to-b from-[#0f1115] to-[#0a0f14] border border-[#07b4ba]/30 rounded-[16px] md:rounded-[18px] p-5 md:p-4 relative overflow-hidden min-h-min md:min-h-[220px] flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-5 md:gap-0 ${i === 4 ? "col-span-1 md:col-span-2 lg:col-span-1" : ""}`}>
                  <div className="absolute top-0 right-0 md:top-3 md:left-3 md:right-auto bg-[#07b4ba] text-[#111] font-['Bebas_Neue'] text-[12px] md:text-[14px] tracking-[1px] px-2.5 py-1.5 md:py-0.5 rounded-bl-[10px] md:rounded-none md:rounded-[5px] leading-none">#{i + 1}</div>
                  <div className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] flex items-center justify-center mb-0 mt-0 md:mb-2 md:mt-4 shrink-0">{item.icon}</div>
                  <div className="flex flex-col items-start md:items-center w-full mt-0 md:mt-0">
                    <h3 className="font-['Bebas_Neue'] text-[16px] md:text-[18px] leading-[1.1] tracking-[1px] md:tracking-[1.5px] text-white mb-2 md:mb-1.5">{item.title}</h3>
                    <p className="font-['Barlow'] text-[13px] md:text-[14px]text-white/60 leading-[1.55] px-0 md:px-1 m-0">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-5 md:mt-4 max-w-3xl mx-auto border border-[#07b4ba]/30 rounded-[18px] p-5 md:p-5 flex flex-wrap items-center justify-center gap-4 md:gap-5 bg-gradient-to-r from-[#0f1115] to-[#0a0f14]">
            <div className="flex items-center gap-3 md:gap-4">
              <img src="https://i.postimg.cc/pr1bYVdc/Chat-GPT-Image-May-22-2026-12-03-35-AM.png" alt="Gift Box" className="w-[55px] h-[55px] md:w-[70px] md:h-[70px] object-contain drop-shadow-[0_0_10px_rgba(255,215,0,0.35)]" />
              <div>
                <p className="text-white/45 text-[11px] md:text-[12px] tracking-[2px] uppercase mb-1 leading-none">TOTAL BONUS VALUE</p>
                <h2 className="font-['Bebas_Neue'] text-[28px] md:text-[42px] leading-none tracking-[2px] text-[#07b4ba]">₹2,999</h2>
              </div>
            </div>
            <div className="pl-4 md:pl-5 border-l border-white/10 flex flex-col justify-center">
              <p className="font-['Bebas_Neue'] text-[22px] md:text-[38px] tracking-[2px] text-[#FFD700] leading-none drop-shadow-[0_0_10px_rgba(255,215,0,0.45)]">YOURS 100% FREE</p>
              <p className="font-['Barlow'] text-[13px] md:text-[14px] text-white/70 mt-1.5 md:mt-2">When you join the AOF 30-Day MMA Striking Program.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA / APPLY SECTION ── */}
      <div ref={footerRef} className="bg-[#0a0a0a] relative overflow-hidden" style={{ backgroundImage: "radial-gradient(rgba(7,180,186,.18) .75px,transparent .75px)", backgroundSize: "20px 20px" }}>
        <div className={`w-full py-10 md:py-12 ${SECTION_INSET_RESPONSIVE}`}>
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start flex-wrap">
            <div className="flex-1 min-w-[260px]">
              <Reveal>
                  <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[13px] tracking-[2px] md:tracking-[2.5px] uppercase mb-3">Ready To Start?</p>
                <h2 className="font-['Bebas_Neue'] text-[clamp(30px,8vw,54px)] tracking-[2px] leading-none mb-4 text-white">
                  DON'T SPEND ANOTHER<br /><span className="text-[#07b4ba]">MONTH FEELING STUCK</span>
                </h2>
                <p className="text-white/50 text-[14px] md:text-[14px] leading-[1.7] mb-5 md:mb-7 max-w-[380px]">
                  No gym. No training partner. No confusion. Just a clear roadmap, proper guidance , and 30–40 minutes a day.
                </p>
                 {["Complete 30-Day MMA Striking Roadmap", "Direct Coach Support & Technique Feedback", "Train From Home In Just 30-40 Minutes A Day", "Conditional Refund Policy"].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 mb-3">
                    <span className="text-[#07b4ba] text-[16px] shrink-0 mt-0.5">✓</span>
                    <p className="text-[14px] md:text-[16px] text-white leading-[1.55]">{item}</p>
                  </div>
                ))}
                {/* ── CONDITIONAL PROGRESS GUARANTEE BOX ── */}
                <div className="mt-5 md:mt-6 flex items-start gap-4 md:gap-3.5 p-5 md:p-5 border border-[#07b4ba]/35 rounded-[14px] bg-gradient-to-b from-[#0d1a24]/80 to-[#070e16]/80">
                  <div className="flex w-10 h-10 shrink-0 items-center justify-center border border-[#07b4ba] rounded-full text-[#07b4ba] mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[12px] tracking-[2px] uppercase mb-1.5 leading-none">CONDITIONAL PROGRESS GUARANTEE</p>
                    <p className="font-['Barlow'] text-[13.5px] md:text-[14px] text-white/65 leading-[1.65] m-0">Complete the program, submit your training work, and follow the process. If you don't achieve the promised outcome, we'll make it right.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── CTA Card with offer ribbon ── */}
            <div className="flex-1 min-w-[350px] w-full">
              <Reveal>
                <div className="bg-[#05070b] border border-white/10 rounded-2xl p-7 md:p-10 text-center relative overflow-hidden">

                  {/* ── 50% OFF ANNIVERSARY RIBBON ── */}
                  <div className="absolute top-0 left-0 z-20 overflow-hidden" style={{ width: "170px", height: "170px", pointerEvents: "none" }}>
<div
  style={{
    position: "absolute",
    top: "30px",
    left: "-60px",
    width: "260px",
    transform: "rotate(-45deg)",
    background: "linear-gradient(135deg, #EFAF27 20%, #FFD700 100%, #FEEC6C 50%)",
    padding: "10px 0",
    textAlign: "center"
  }}
>                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "18px", letterSpacing: "1.5px", color: "#fff", lineHeight: "1" }}>
                      SAVE ₹1500
                      </div>
                      <div style={{ fontFamily: "'Barlow', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "1px", color: "#fff", textTransform: "uppercase", marginTop: "2px" }}>
                        Early Bird Offer
                      </div>
                    </div>
                  </div>

                  <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[13px] tracking-[2px] md:tracking-[2.5px] uppercase mb-3 mt-4 md:mt-0">LIMITED TO 20 MEMBERS</p>
                  <h2 className="font-['Bebas_Neue'] text-[clamp(30px,8vw,54px)] tracking-[2px] leading-none mb-4 md:mb-5 text-white">
                    START YOUR<br /><span className="text-[#07b4ba]">MMA JOURNEY</span>
                  </h2>
                  <div className="flex items-center justify-center gap-4 md:gap-5 mb-4 md:mb-5">
                    <span className="font-['Bebas_Neue'] text-[26px] md:text-[32px] text-white/30 line-through leading-none">₹3499</span>
                    <span className="font-['Bebas_Neue'] text-[42px] md:text-[48px] tracking-[2px] text-white leading-none">₹1,999</span>
                  </div>
                  <button
                    className="w-full py-4 md:py-4 border-none rounded-xl bg-[#07b4ba] text-white font-['Bebas_Neue'] text-[24px] md:text-[26px] tracking-[2px] cursor-pointer transition-colors duration-200 hover:bg-white hover:text-black active:bg-white active:text-black"
                    onClick={handlePayment}
                  >
                    JOIN THE NEXT BATCH
                  </button>
                  <p className="mt-3 md:mt-4 font-['Barlow'] text-[13px] md:text-[14px] leading-[1.7] text-white/70">Batch 2 Starting July 6th 2026</p>
                  <div className="flex justify-center gap-2.5 md:gap-3 mt-4 md:mt-5">
                    {[["01", "DAYS"], ["23", "HOURS"], ["49", "MIN"]].map(([num, label]) => (
                      <div key={label} className="text-center">
                        <div className="w-[54px] h-[54px] md:w-[60px] md:h-[60px] rounded-xl border border-[#07b4ba]/25 flex items-center justify-center font-['Bebas_Neue'] text-[26px] md:text-[30px] text-[#07b4ba] bg-[#0b1016]">{num}</div>
                        <p className="mt-1.5 font-['Bebas_Neue'] text-[10px] md:text-[11px] tracking-[2px] text-white/40">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Any Queries */}
          <Reveal>
            <div className="flex flex-col items-center gap-3 mt-8 md:mt-10">
              <p className="text-white font-['Barlow'] font-bold text-[14px] md:text-[15px]">Any Queries?</p>
              <button className="inline-flex items-center gap-2.5 bg-[#25D366] text-white py-3.5 px-8 rounded-full font-['Barlow'] font-bold text-[14px] md:text-[15px] border-none cursor-pointer hover:bg-[#1ebe57] transition-colors shadow-[0_4px_18px_rgba(37,211,102,.35)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                Chat On WhatsApp
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── FAQ ── */}
      <FAQSection />

      {/* ── FOOTER ── */}
      <footer className="bg-[#0f1115] pt-8 pb-2 border-t border-white/10">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" style={GUTTER}>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[22px] md:text-[24px] tracking-[1px] text-white pt-4 md:pt-5 mb-3">CONTACT</h3>
            <div className="flex flex-col gap-3 md:gap-4">
              <p className="font-['Barlow'] text-white/50 text-[14px] md:text-[15px]">+91 00000 00000</p>
              <p className="font-['Barlow'] text-white/50 text-[14px] md:text-[15px]">info@aofacademy.com</p>
              <p className="font-['Barlow'] text-white/50 text-[14px] md:text-[15px]">Chennai, Tamil Nadu, India</p>
            </div>
          </div>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[22px] md:text-[24px] tracking-[1px] text-white pt-4 md:pt-5 mb-3">NAVIGATION</h3>
            <div className="flex flex-wrap gap-x-5 gap-y-2.5 md:flex-col md:gap-2.5">
              {([["#home", "Home"], ["#method", "AOF Method"], ["#testimonials", "Testimonials"], ["#faq", "FAQ"], ["#contact", "Apply Now"]] as [string, string][]).map(([href, label]) => (
                <a key={href} href={href} className="font-['Barlow'] text-white/50 text-[14px] md:text-[15px] no-underline hover:text-[#07b4ba] active:text-[#07b4ba] transition-colors">{label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-['Bebas_Neue'] text-[22px] md:text-[24px] tracking-[1px] pt-4 md:pt-5 mb-3 flex">
              <span className="text-[#07b4ba]">A</span><span className="text-white">O</span><span className="text-[#07b4ba]">F</span>
            </h3>
            <p className="font-['Barlow'] text-white/50 text-[14px] md:text-[15px] leading-[1.8] max-w-[320px]">Art of Fighting Academy — building champions through proven systems and disciplined training.</p>
          </div>
        </div>
        <div className="w-full mt-6 pt-3 border-t border-white/10 text-center font-['Barlow'] text-[12px] md:text-[13px] text-white/30 pb-[80px] md:pb-0" style={GUTTER}>
          © 2026 AOF Academy. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
