import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

/* ── PREMIUM UNIFIED STYLES INJECTION ── */
const premiumStyles = `
  @keyframes subtle-pan {
    0% { transform: scale(1.1); opacity: 0; }
    10% { opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  @keyframes pulse-glow-red {
    0%, 100% { box-shadow: 0 0 10px rgba(229,62,62,0.7), 0 0 24px rgba(229,62,62,0.35); }
    50% { box-shadow: 0 0 20px rgba(229,62,62,0.9), 0 0 40px rgba(229,62,62,0.6); }
  }
  @keyframes shimmer-bg {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  @keyframes dash {
    to { stroke-dashoffset: 0; }
  }
  .animate-subtle-pan { animation: subtle-pan 12s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-red { animation: pulse-glow-red 3s ease-in-out infinite; }
  
  .premium-hover {
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.6s ease;
  }
  .premium-hover:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(7,180,186,0.15);
    border-color: rgba(7,180,186,0.4) !important;
  }
  
  .shimmer-ribbon {
    background: linear-gradient(135deg, #EFAF27 25%, #FFF9D2 50%, #EFAF27 75%, #FFD700 100%);
    background-size: 200% auto;
    animation: shimmer-bg 3s linear infinite;
  }
  
  .btn-glow {
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
  }
  .btn-glow:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(7,180,186,0.4);
  }
`;

/* ── REUSED DESIGN SYSTEM BRAND SVGs ── */
const IconPlan = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" /></svg>);
const IconChat = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>);
const IconLeaf = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z" /></svg>);
const IconChart = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>);
const IconGlobe = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>);

const LeadPage = () => {
  // Functional Form Interactive States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    const element = document.getElementById("email-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ── DATA MODELS FROM BRAND DESIGN SYSTEM ── */
  const whatCards = [
    { icon: <IconPlan />, title: "CLEAR ROADMAP", desc: "Know exactly what to train, when to train, and how to progress throughout the program." },
    { icon: <IconChart />, title: "TRAIN ON YOUR SCHEDULE", desc: "Access pre-recorded sessions and train whenever it suits you. Most sessions take just 30–40 minutes a day." },
    { icon: <IconLeaf />, title: "TRAIN WITH CONFIDENCE", desc: "Receive direct coach feedback and guidance so you know you're practicing techniques correctly." },
    { icon: <IconGlobe />, title: "BEGINNER FRIENDLY", desc: "Start with confidence, even if you've never trained MMA before." },
    { icon: <IconChat />, title: "LEARN IN TAMIL", desc: "Understand concepts faster through coaching delivered in Tamil and simple English." },
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

  const GUTTER: React.CSSProperties = { paddingLeft: "1cm", paddingRight: "1cm" };
  const SECTION_INSET_RESPONSIVE = "px-4 md:px-[140px]";

  return (
    <div className="font-['Barlow'] text-white bg-[#0a0a0a] overflow-x-hidden w-full antialiased">
      <style>{premiumStyles}</style>
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <div className="relative flex flex-col w-full overflow-hidden pt-[82px] min-h-[100dvh]" style={{ background: "radial-gradient(circle at top,rgba(7,180,186,.12),transparent 45%),#06080c" }}>
        <section className="relative w-full flex items-center overflow-hidden flex-1 min-h-0">
          <div className="w-full relative z-10 text-center px-4 md:px-0">
            
            {/* Top Badge safely lower than fixed header context */}
            <Reveal type="fade-down" delay={100} duration={1000} className="mb-6 mt-2 inline-block">
              <span className="bg-[#111419]/90 border border-white/10 rounded-full px-4 py-2 text-[10px] md:text-[12px] font-bold tracking-[2px] md:tracking-[3px] text-[#07b4ba] uppercase shadow-lg">
                FREE LIVE WORKSHOP FOR COACHES & FIGHTERS • <span className="text-white">JUNE 23</span>
              </span>
            </Reveal>

            <Reveal type="fade-up" delay={300} duration={1200}>
              <h1 className="font-['Bebas_Neue'] text-[clamp(28px,8vw,56px)] leading-[1] md:leading-[.93] tracking-[1.5px] md:tracking-[2px] uppercase text-white mb-4">
                HOW TO TURN YOUR IN-PERSON COACHING INTO <br />
                <span className="text-[#07b4ba] drop-shadow-[0_0_15px_rgba(7,180,186,0.25)]">
                  $5K/MONTH
                </span>{" "}
                ONLINE
              </h1>
            </Reveal>

            <Reveal type="fade-up" delay={400} duration={1200}>
              <p className="text-white/60 font-medium font-['Barlow'] text-[14px] md:text-[18px] mb-6 md:mb-8 italic">
                (Without Quitting What Already Works)
              </p>
            </Reveal>

            {/* Glowing Brand Feature Container Box - Explicit 16:9 Aspect Ratio Alignment */}
            <Reveal type="scale-up" delay={500} duration={1200}>
              <div className="w-full max-w-xl mx-auto aspect-video mb-8 bg-gradient-to-b from-[#13171d] to-[#101318] border border-[#07b4ba]/20 shadow-[0_0_30px_rgba(7,180,186,0.1)] rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center premium-hover">
                <p className="text-[#07b4ba] text-[10px] md:text-[11px] font-bold uppercase tracking-[2px] md:tracking-[3px] mb-2 md:mb-3">
                  This live workshop will show you how to earn
                </p>
                <p className="font-['Bebas_Neue'] text-[38px] md:text-[76px] tracking-[1px] text-white leading-none mb-2">
                  $5K/MONTH
                </p>
                <p className="text-white/40 text-[11px] md:text-[13px] italic font-['Barlow']">The number most coaches are chasing</p>
              </div>
            </Reveal>

            <Reveal type="fade-up" delay={600} duration={1200}>
              <p className="text-white/70 text-[13px] md:text-[16px] leading-[1.6] max-w-3xl mx-auto mb-[18px]">
                A free live workshop for coaches and fighters who already get paid for what they know, and want to add online income without burning out on more hours.
              </p>
              <p className="text-[14px] md:text-[15px] font-semibold text-white/90 mb-8 font-['Barlow']">
                Live with <span className="text-[#07b4ba] underline decoration-2 underline-offset-4 font-bold">Sean Fagan</span>
              </p>
            </Reveal>

            {/* Adjusted Down Padding on CTA Action Segment Wrapper */}
            <Reveal type="fade-up" delay={700} duration={1200} className="mb-12 md:mb-16">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 max-w-md mx-auto sm:max-w-none">
                <div className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#13171d] border border-white/10 rounded-lg px-4 py-2.5 text-[11px] md:text-[12px] font-bold tracking-[1px] text-[#07b4ba]">
                  <span>📅</span> TUESDAY JUNE 23, 8:30PM EST.
                </div>
                <div className="w-full sm:w-auto bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-2.5 text-[10px] md:text-[11px] font-black tracking-[1px] md:tracking-[1.5px] text-red-500 uppercase">
                  REAL Q&A. REPLAY ONLY IF YOU REGISTER.
                </div>
              </div>
              <button
                onClick={scrollToForm}
                className="btn-glow inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-[50px] py-4 rounded-lg bg-[#07b4ba] text-white font-['Barlow'] font-bold text-[14px] md:text-[15px] uppercase tracking-[1px] border border-[#07b4ba] cursor-pointer"
              >
                SAVE MY FREE SEAT NOW
              </button>
            </Reveal>

          </div>
        </section>
      </div>

      {/* ================= SOUNDS FAMILIAR SECTION (HIGH LEGIBILITY CONTRAST FOR WHITE BG) ================= */}
      <section className={`w-full py-14 md:py-20 ${SECTION_INSET_RESPONSIVE} border-t border-zinc-200 bg-white`}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
          <div className="flex-1 w-full lg:max-w-[500px] lg:order-2">
            <Reveal type="fade-left" duration={1200}>
              <h3 className="mb-4 text-center italic font-semibold text-zinc-900 tracking-[0.5px] text-[18px] md:text-[22px]">
                5 MINUTES THAT COULD SAVE YOU MONTHS OF CONFUSION
              </h3>
              <div className="premium-hover rounded-[14px] overflow-hidden border border-zinc-200 shadow-xl bg-zinc-100">
                <div className="relative w-full aspect-video">
                  <img 
                    src="https://i.postimg.cc/kMyztfKs/Program-Intro-jpg.jpg" 
                    alt="Art of Fighting Program Overview Illustration"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </Reveal>
          </div>
          <div className="flex-1 w-full lg:order-1">
            <Reveal type="fade-right" duration={1000}>
              <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[13px] md:text-[14px] tracking-[3px] uppercase mb-2">Sounds Familiar?</p>
              <h2 className="font-['Bebas_Neue'] text-[26px] md:text-[42px] tracking-[1.5px] md:tracking-[2px] text-zinc-900 leading-[1.1] mb-4">
                YOU WANT TO LEARN MMA.<br />BUT <span className="text-[#e53e3e]">HAVEN'T STARTED </span> BECAUSE YOU:
              </h2>
              <div className="w-20 h-[3px] bg-[#e53e3e] rounded mb-5 md:mb-6" />
            </Reveal>
            {painPoints.map((p, i) => (
              <Reveal key={i} type="fade-right" delay={400 + (i * 150)} duration={800}>
                <div className="flex items-start gap-4 mb-3.5">
                  <div className="w-[3px] h-[22px] bg-[#e53e3e] rounded shrink-0 mt-1" />
                  <p className="text-zinc-800 font-medium text-[14px] md:text-[15px] leading-[1.5]">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY THIS PROGRAM WORKS GRID (UNIFIED MATCH) ================= */}
      <section className="relative overflow-hidden bg-[#0b0b0b] border-t border-white/5" style={{ backgroundImage: "linear-gradient(rgba(7,180,186,.07) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,.07) 1px,transparent .4px)", backgroundSize: "30px 30px" }}>
        <div className="w-full py-14 md:py-20 px-4 md:px-0" style={GUTTER}>
          <Reveal type="fade-down" duration={1000}>
            <p className="text-center text-[#07b4ba] font-['Barlow'] font-bold text-[13px] md:text-[14px] tracking-[3px] uppercase mb-3 drop-shadow-[0_0_5px_rgba(7,180,186,0.3)]">WHY THIS PROGRAM WORKS?</p>
            <h2 className="font-['Bebas_Neue'] text-[clamp(24px,7vw,54px)] tracking-[1.5px] md:tracking-[2px] text-white text-center leading-none mb-8 md:mb-12">
              BUILT AROUND THE REAL <span className="text-[#07b4ba] drop-shadow-[0_0_15px_rgba(7,180,186,0.15)]">CHALLENGES OF BEGINNERS</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-[16px]">
            {whatCards.map((item, i) => (
              <Reveal key={i} type="scale-up" delay={i * 150} duration={800}>
                <div className={`w-full p-5 rounded-[16px] bg-gradient-to-b from-[#13171d] to-[#101318] border border-white/5 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-5 md:gap-3 md:min-h-[255px] md:p-[16px] md:rounded-[18px] premium-hover ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                  <div className="w-[48px] h-[48px] md:w-[70px] md:h-[70px] flex items-center justify-center shrink-0 transition-transform duration-500 hover:scale-110">{item.icon}</div>
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

      {/* ================= INTERACTIVE CLICKABLE ANCHOR JOIN NOW STRIP ================= */}
      <button 
        onClick={scrollToForm}
        className="w-full h-12 bg-[#07b4ba] hover:bg-[#06a2a7] transition-colors duration-200 text-white font-['Bebas_Neue'] text-[16px] md:text-[18px] tracking-[3px] md:tracking-[4px] flex items-center justify-center shadow-md cursor-pointer uppercase border-none focus:outline-none"
      >
        JOIN NOW
      </button>

      {/* ================= COACH SECTION (UNIFIED BRAND SOURCE) ================= */}
      <div className="bg-[#0f1115] border-t border-b border-white/5">
        <div className={`w-full py-14 md:py-20 ${SECTION_INSET_RESPONSIVE}`}>
          <Reveal type="fade-down" duration={1000}>
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] md:text-[17px] tracking-[2px] uppercase mb-6">LED BY</p>
          </Reveal>
          <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-start flex-wrap">
            <Reveal type="fade-right" duration={1200} className="w-full md:w-auto">
              <img
                src="https://i.postimg.cc/gjQP69D1/Purushoth-Coach-jpg.jpg"
                alt="Head Coach"
                className="w-full md:w-[240px] h-[260px] md:h-[300px] object-cover object-top rounded-xl border border-[#07b4ba]/30 shrink-0 premium-hover"
                style={{ boxShadow: "0 0 15px rgba(7,180,186,0.25), 0 0 40px rgba(7,180,186,0.15)" }}
              />
            </Reveal>
            <div className="flex-1 w-full md:min-w-[260px]">
              <Reveal type="fade-left" delay={100} duration={1000}>
                <h2 className="font-['Bebas_Neue'] text-[28px] md:text-[48px] tracking-[2px] text-white mb-1">Purushothaman MK</h2>
                <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[14px] tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-5">Head Coach and MMA Fighter</p>
              </Reveal>
              <div className="mb-5 md:mb-6">
                {coachCredentials.map((cred, i) => (
                  <Reveal key={i} type="fade-up" delay={200 + i * 150} duration={800}>
                    <div className="flex items-start gap-2.5 mb-3">
                      <span className="text-[#07b4ba] text-[16px] shrink-0 mt-0.5">✓</span>
                      <p className="text-white/70 text-[14px] md:text-[15px] leading-[1.5]">{cred}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-4 md:mt-6">
                {stats.map((stat, i) => (
                  <Reveal key={i} type="scale-up" delay={400 + i * 100} duration={800}>
                    <div className="bg-gradient-to-b from-[#181818] to-[#121212] border border-white/10 rounded-[14px] min-h-[95px] md:h-[140px] p-3 md:p-4 text-center flex flex-col justify-center items-center shadow-[0_0_14px_rgba(0,0,0,.18)] premium-hover">
                      <p className="font-['Bebas_Neue'] text-[24px] md:text-[42px] text-[#07b4ba] tracking-[1px] mb-1 leading-none drop-shadow-[0_0_8px_rgba(7,180,186,0.3)]">{stat.val}</p>
                      <p className="text-white/45 text-[10px] md:text-[12px] tracking-[1.5px] uppercase leading-tight">{stat.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SPLIT INTERACTION FOOTER SECTION ================= */}
      <section id="email-form-section" className="border-t border-white/5 bg-[#0a0a0a]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Block Content Metrics & Description Handles */}
          <div className="p-6 md:p-14 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
            <div className="mb-8 lg:mb-10 bg-[#111419] border border-white/10 p-5 md:p-8 rounded-xl shadow-2xl">
              <h4 className="text-[#07b4ba] font-['Bebas_Neue'] text-[16px] tracking-[2px] mb-5">WORKSHOP DETAILS</h4>
              <div className="grid grid-cols-2 gap-y-5 gap-x-4">
                <div>
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">LIVE SESSION</p>
                  <p className="text-[14px] md:text-[15px] font-bold text-white mt-0.5 flex items-center gap-2">
                    <span className="text-[#07b4ba]">🔹</span> On Zoom
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">DATE</p>
                  <p className="text-[14px] md:text-[15px] font-bold text-white mt-0.5">Tuesday, June 24</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">LIVE Q&A</p>
                  <p className="text-[14px] md:text-[15px] font-bold text-white mt-0.5 flex items-center gap-2">
                    <span className="text-[#07b4ba]">🔹</span> Ask anything
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">TIME</p>
                  <p className="text-[14px] md:text-[15px] font-bold text-white mt-0.5">8:30 PM IST</p>
                </div>
                <div className="col-span-2 pt-3 border-t border-white/5">
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">BONUS</p>
                  <p className="text-[14px] font-bold text-[#07b4ba] mt-0.5">MMA Beginners Blueprint (PDF)</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b0b0b] border border-white/5 rounded-xl p-5 md:p-6">
              <p className="text-[12px] font-bold text-[#07b4ba] tracking-[2px] uppercase mb-2">THIS IS LIVE FOR A REASON</p>
              <blockquote className="text-[14px] md:text-[15px] font-normal text-white/70 leading-relaxed italic mb-3 font-['Barlow']">
                "You can ask me anything about your own situation in real time. At the end, I'm opening up something not going in the replay. You need to be in the room."
              </blockquote>
              <p className="text-[11px] font-bold text-white/30 tracking-[1.5px] uppercase">— SEAN FAGAN, COACH</p>
            </div>
          </div>

          {/* Right Panel: REGISTRATION FORM (OPTIMIZED COLOR CONTRAST & MOBILE INPUT SCALING) */}
          <div className="p-4 sm:p-8 md:p-14 lg:p-20 bg-[#0d1117] flex items-center justify-center">
            <div className="bg-white border border-zinc-200 text-zinc-950 rounded-2xl p-5 sm:p-6 md:p-9 w-full max-w-md shadow-2xl relative overflow-hidden">
              
              {!submitted && (
                <>
                  <div className="text-center mb-5">
                    <span className="bg-[#07b4ba]/10 text-[#07b4ba] px-3 py-1 rounded text-[11px] font-bold tracking-[2px] uppercase inline-block mb-2">
                      REGISTRATION FORM
                    </span>
                    <h3 className="font-['Bebas_Neue'] text-[26px] md:text-[32px] tracking-[1.5px] text-zinc-950 uppercase leading-none">
                      ENTER YOUR DETAILS
                    </h3>
                  </div>
                  <p className="text-center text-[13px] text-zinc-600 mb-6 font-['Barlow'] leading-relaxed">
                    Fill out the form below to reserve your live workshop invitation link.
                  </p>
                </>
              )}

              {submitted ? (
                <div className="text-center py-6 flex flex-col items-center justify-center space-y-5 animate-[scale-up_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]">
                  <div className="w-16 h-16 bg-[#07b4ba]/10 border-2 border-[#07b4ba] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(7,180,186,0.3)]">
                    <svg className="w-8 h-8 text-[#07b4ba] stroke-current stroke-[3] fill-none" viewBox="0 0 24 24">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M5 13l4 4L19 7" 
                        strokeDasharray="50"
                        strokeDashoffset="50"
                        className="animate-[dash_0.5s_ease-in-out_0.1s_forwards]" 
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-['Bebas_Neue'] text-[24px] text-[#07b4ba] tracking-[1.5px] mb-1">YOUR SEAT IS CONFIRMED!</p>
                    <p className="text-[13px] text-zinc-600 font-['Barlow'] max-w-xs mx-auto">
                      Awesome! Your setup details have been submitted. Let's make it official below.
                    </p>
                  </div>
                  <div className="w-full pt-5 border-t border-zinc-100 flex flex-col items-center">
                    <p className="text-[11px] font-bold text-[#07b4ba] tracking-[2px] uppercase mb-3">FINAL STEP</p>
                    <a
                      href="https://chat.whatsapp.com/G0rrNtZAYOkAFpOjqEv4nL"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-glow inline-flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366] text-white font-['Bebas_Neue'] text-[18px] tracking-[1.5px] rounded-xl cursor-pointer hover:bg-[#1ebe57] transition-all shadow-[0_10px_20px_rgba(37,211,102,0.2)]"
                    >
                      JOIN TO START YOUR JOURNEY WITH US
                    </a>
                    <p className="mt-2.5 text-[10px] text-zinc-500 font-['Barlow'] italic text-center leading-normal">
                      Click above to receive direct event links & connect with coaches inside the community.
                    </p>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!name || !email || !phone || !situation || !agreed) return;
                    setIsSubmitting(true);
                    try {
                      const GOOGLE_SCRIPT_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzsRr-TJAtfF2nVhxNBAlGgnphTFdg_7LCmbgPfh05Q297MMdJZzVOj5VvmWIFCil9K/exec";
                      await fetch(GOOGLE_SCRIPT_WEBAPP_URL, {
                        method: "POST",
                        mode: "no-cors", 
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name, email, phone, situation })
                      });
                      setSubmitted(true);
                    } catch (error) {
                      console.error("Error storing details:", error);
                      setSubmitted(true);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }} 
                  className="space-y-4 font-['Barlow']"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-1.5">FULL NAME</label>
                    <input
                      type="text"
                      placeholder="e.g. Bhupathi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg text-base lg:text-[14px] text-zinc-950 placeholder-zinc-400 font-medium focus:outline-none focus:border-[#07b4ba] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-1.5">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="e.g. sean@mygym.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg text-base lg:text-[14px] text-zinc-950 placeholder-zinc-400 font-medium focus:outline-none focus:border-[#07b4ba] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Mobile Phone Number */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-1.5">MOBILE NUMBER</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 93854 31051"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg text-base lg:text-[14px] text-zinc-950 placeholder-zinc-400 font-medium focus:outline-none focus:border-[#07b4ba] focus:bg-white transition-all mb-1.5"
                    />
                    <p className="text-[11px] text-[#07b4ba] font-semibold leading-tight px-1">
                      Session details and important updates will be shared here.
                    </p>
                  </div>

                  {/* Custom Dropdown Setup */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-widest mb-1.5">WHICH DESCRIBES YOU RIGHT NOW?</label>
                    <div className="relative">
                      <select
                        value={situation}
                        onChange={(e) => setSituation(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-lg text-base lg:text-[13px] text-zinc-900 font-medium focus:outline-none focus:border-[#07b4ba] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-zinc-400">Select an option...</option>
                        <option value="a. I want to start mma and need clear direction">I want to start MMA and need clear direction</option>
                        <option value="b. I'm interested in mma but unsure how to begin properly">I'm interested in MMA but unsure how to begin properly</option>
                        <option value="c. I train another combat sport and want to understand mma basics">I train another combat sport and want to understand MMA basics</option>
                        <option value="d. I'm just exploring and learning for now">I'm just exploring and learning for now</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* Verification Consent */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="lead-agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 shrink-0 rounded border-zinc-300 bg-zinc-50 text-[#07b4ba] focus:ring-[#07b4ba]"
                    />
                    <label htmlFor="lead-agree" className="text-[10px] text-zinc-500 leading-relaxed text-left cursor-pointer select-none">
                      Yes, text me. I agree to receive automated notification logs from <span className="text-zinc-700 font-semibold">Champion of Business</span> at the number provided. Reply STOP to opt out.
                    </label>
                  </div>

                  <div className="pt-2">
                    <a href="#" className="block text-center text-[11px] font-bold text-[#07b4ba] hover:underline mb-4 tracking-[0.5px]">
                      See our Terms, Conditions & Privacy details
                    </a>
                    <button
                      type="submit"
                      disabled={!name || !email || !phone || !situation || !agreed || isSubmitting}
                      className="btn-glow w-full py-3.5 border-none rounded-xl bg-[#07b4ba] hover:bg-[#06a2a7] text-white font-['Bebas_Neue'] text-[20px] tracking-[1.5px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed uppercase transition-colors"
                    >
                      {isSubmitting ? "Processing..." : "SAVE MY SEAT"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeadPage;
