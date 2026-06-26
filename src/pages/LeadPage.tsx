import { useState, useEffect } from "react";
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

/* ── CUSTOM BRAND DESIGN SYSTEM SVGs ── */
const IconClock = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconDumbbell = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M6.5 6.5h11M6.5 17.5h11M3 8.5h3.5v7h-3.5zM17.5 8.5H21v7h-3.5zM6.5 12h11" strokeWidth="2.2" />
  </svg>
);

const IconAimWithArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
    <path d="M19 4l-7 7m0 0h4m-4 0V7" strokeWidth="2" />
  </svg>
);

const IconWarningTriangle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <circle cx="12" cy="17" r="0.5" fill="#07b4ba" />
  </svg>
);

const IconConfidenceMindset = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 19 8 22 11" />
    <line x1="19" y1="16" x2="19" y2="8" />
  </svg>
);

/* ── CONTEXT PARAMETER SVGs ── */
const IconBroadcast = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M4.93 19.07a10 10 0 0 1 0-14.14M7.76 16.24a6 6 0 0 1 0-8.49M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM16.24 7.76a6 6 0 0 1 0 8.49M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>);
const IconTarget = () => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="m22 22-4.3-4.3"/></svg>);

const IconCalendar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconMessage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconRocket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 mx-auto">
    {/* Real Structured Rocket Body Nosecone */}
    <path d="M12 2s3 4 3 9H9c0-5 3-9 3-9z" />
    {/* Main Cylindrical Engine Hull */}
    <rect x="9" y="11" width="6" height="7" />
    {/* Left and Right Aerodynamic Wing Fins */}
    <path d="M9 14l-3 4v2h3v-6zM15 14l3 4v2h-3v-6z" />
    {/* Rocket Propulsion Exhaust Ports */}
    <path d="M10 18h4v2h-4z" />
    <line x1="11" y1="20" x2="11" y2="22" />
    <line x1="13" y1="20" x2="13" y2="22" />
  </svg>
);

const LeadPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [situation, setSituation] = useState("");
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
    { icon: <IconClock />, title: "Where To Start", desc: "Know exactly how to begin your MMA journey with confidence." },
    { icon: <IconDumbbell />, title: "How To Choose The Right Gym", desc: "Avoid wasting time and money on the wrong coach or gym." },
    { icon: <IconAimWithArrow />, title: "What To Train First", desc: "Learn what actually matters as a beginner—and what doesn't." },
    { icon: <IconWarningTriangle />, title: "Beginner Mistakes To Avoid", desc: "Learn the common mistakes that slow progress before you make them." },
    { icon: <IconConfidenceMindset />, title: "How To Build Confidence", desc: "Overcome the fear and self-doubt that's stopping you from getting started." },
  ];

  const painPoints = [
    "You don't know where to begin",
    "You're self-training but feel stuck and confused",
    "You don't know how to find the right MMA gym",
    "You don't feel fit or confident enough to start",
    "You're worried about wasting time learning the wrong things",
  ];

  const coachCredentials = [
    "Only Tamil MFN Fighter and Multiple-Time National Medalist",
    "Helped 2,000+ beginners build strong MMA fundamentals",
    "Created the MMA Beginners Blueprint to help you start with clarity",
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
            
            <Reveal type="fade-down" delay={100} duration={1000} className="mb-6 mt-2 inline-block">
              <span className="bg-[#111419]/90 border border-white/10 rounded-full px-4 py-2 text-[10px] md:text-[12px] font-bold tracking-[2px] md:tracking-[3px] text-[#07b4ba] uppercase shadow-lg">
                FREE MMA Beginners Blueprint Session • <span className="text-white">July 05</span>
              </span>
            </Reveal>

            <Reveal type="fade-up" delay={300} duration={1200}>
              <h1 className="font-['Bebas_Neue'] text-[clamp(28px,8vw,56px)] leading-[1] md:leading-[.93] tracking-[1.5px] md:tracking-[2px] uppercase text-white mb-4">
                CONFUSED ABOUT HOW TO START MMA? <br />
                <span className="text-[#07b4ba] drop-shadow-[0_0_15px_rgba(7,180,186,0.25)]">
                  GET THE CLARITY TO FINALLY BEGIN.
                </span>
              </h1>
            </Reveal>

            <Reveal type="fade-up" delay={400} duration={1200}>
              <p className="text-white/60 font-medium font-['Barlow'] text-[14px] md:text-[18px] mb-6 md:mb-8 italic">
                Learn what to train first, what mistakes to avoid, and how to begin your MMA journey with confidence.
              </p>
            </Reveal>

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

            {/* Injected Horizontal Single-Line Checkmark Grid */}
            <Reveal type="fade-up" delay={600} duration={1200}>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-8 text-[14px] md:text-[15px] font-semibold text-white/90 font-['Barlow']">
                <span className="flex items-center gap-1.5">
                  <span className="text-[#07b4ba] font-bold text-[16px]">✓</span> MMA Roadmap
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#07b4ba] font-bold text-[16px]">✓</span> Live Q&A
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-[#07b4ba] font-bold text-[16px]">✓</span> On Google Meet
                </span>
              </div>
              <p className="text-[14px] md:text-[15px] font-semibold text-white/90 mb-8 font-['Barlow']">
                <span className="text-[#07b4ba] underline decoration-2 underline-offset-4 font-bold">Live with Tamilnadu's first MFN Fighter Purushothaman MK.</span>
              </p>
            </Reveal>

            <Reveal type="fade-up" delay={700} duration={1200} className="mb-8 md:mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 max-w-md mx-auto sm:max-w-none">
                <div className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#13171d] border border-white/10 rounded-lg px-4 py-2.5 text-[11px] md:text-[12px] font-bold tracking-[1px] text-[#07b4ba]">
                  <span>📅</span> Sunday, July 05 11:00 a.m. IST
                </div>
                <div className="w-full sm:w-auto bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-2.5 text-[10px] md:text-[11px] font-black tracking-[1px] md:tracking-[1.5px] text-red-500 uppercase">
                  Limited seats to keep the session interactive
                </div>
              </div>
              <button
                onClick={scrollToForm}
                className="btn-glow inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-[50px] py-4 rounded-lg bg-[#07b4ba] text-white font-['Barlow'] font-bold text-[14px] md:text-[15px] uppercase tracking-[1px] border border-[#07b4ba] cursor-pointer"
              >
                Join The Free Blueprint
              </button>
            </Reveal>

          </div>
        </section>
      </div>

      {/* ================= SOUNDS FAMILIAR SECTION ================= */}
      <section className={`w-full py-10 md:py-14 ${SECTION_INSET_RESPONSIVE} border-t border-zinc-200 bg-white`}>
        
        <div className="w-full text-center max-w-3xl mx-auto mb-10">
          <p className="text-[#FF0000] font-['Barlow'] font-bold text-[15px] md:text-[14px] tracking-[3px] uppercase mb-2">SOUNDS FAMILIAR?</p>
          <h2 className="font-['Bebas_Neue'] text-[clamp(24px,7vw,54px)] tracking-[1.5px] md:tracking-[2px] text-zinc-900 leading-none uppercase">
            YOU WANT TO LEARN MMA BUT<br />
            <span className="text-[#FF0000]">SOMETHING'S HOLDING YOU BACK?</span>
          </h2>
          <div className="w-14 h-0.5 bg-[#07b4ba] mx-auto mt-4 rounded-full" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-24 items-center">
          
          <div className="flex-1 w-full lg:max-w-[500px] lg:order-2">
            <Reveal type="fade-left" duration={1200}>
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

          {/* Bullet points shifted to text-black color constraints */}
          <div className="flex-1 w-full lg:order-1">
            <Reveal type="fade-right" duration={1000}>
              <h3 className="font-['Bebas_Neue'] text-[28px] md:text-[42px] tracking-[1px] text-zinc-900 leading-[1.1] mb-4 text-left uppercase">
                YOU MIGHT RELATE TO THIS..
              </h3>
            </Reveal>
            {painPoints.map((p, i) => (
              <Reveal key={i} type="fade-right" delay={200 + (i * 120)} duration={800}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-[3px] h-[22px] bg-[#e53e3e] rounded shrink-0 mt-1" />
                  <p className="text-black font-medium text-[15px] md:text-[16px] leading-[1.5] text-left">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WHY THIS PROGRAM WORKS GRID ================= */}
      <section className="relative overflow-hidden bg-[#0b0b0b] border-t border-white/5" style={{ backgroundImage: "linear-gradient(rgba(7,180,186,.07) 1px,transparent .4px),linear-gradient(90deg,rgba(7,180,186,.07) 1px,transparent .4px)", backgroundSize: "30px 30px" }}>
        <div className="w-full py-10 md:py-14 px-4 md:px-0" style={GUTTER}>
          <Reveal type="fade-down" duration={1000}>
            <p className="text-center text-[#07b4ba] font-['Barlow'] font-bold text-[13px] md:text-[14px] tracking-[3px] uppercase mb-3 drop-shadow-[0_0_5px_rgba(7,180,186,0.3)]">AFTER THIS SESSION</p>
            <h2 className="font-['Bebas_Neue'] text-[clamp(24px,7vw,54px)] tracking-[1.5px] md:tracking-[2px] text-white text-center leading-none mb-8 md:mb-12">
              You'll Leave With A Clear <span className="text-[#07b4ba] drop-shadow-[0_0_15px_rgba(7,180,186,0.15)]">Roadmap To Start MMA</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-[16px]">
            {whatCards.map((item, i) => (
              <Reveal key={i} type="scale-up" delay={i * 150} duration={800}>
                <div className={`w-full p-5 rounded-[16px] bg-gradient-to-b from-[#13171d] to-[#101318] border border-white/5 flex flex-row md:flex-col items-center md:items-center text-left md:text-center gap-5 md:gap-3 md:min-h-[255px] md:p-[16px] md:rounded-[18px] premium-hover ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
                  <div className="w-[48px] h-[48px] md:w-[70px] md:h-[70px] flex items-center justify-center shrink-0 transition-transform duration-500 hover:scale-110">{item.icon}</div>
                  <div className="flex flex-col items-start md:items-center w-full">
                    <h4 className="font-['Bebas_Neue'] text-[#07b4ba] text-[16px] md:text-[17.5px] tracking-[1px] md:tracking-[2px] leading-[1.3] m-0 text-left md:text-center mb-[3px]">{item.title}</h4>
                    <p className="text-[14px] md:text-[15px] leading-[1.55] text-white/60 text-left md:text-center m-0">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLICKABLE STRIP BUTTON ================= */}
      <button 
        onClick={scrollToForm}
        className="w-full h-12 bg-[#07b4ba] text-white font-['Bebas_Neue'] text-[16px] md:text-[18px] tracking-[3px] flex items-center justify-center shadow-md cursor-pointer uppercase border-none focus:outline-none transition-all duration-300 hover:bg-white hover:text-[#07b4ba] hover:tracking-[5px] active:bg-white active:text-[#07b4ba]"
      >
        JOIN NOW
      </button>

      {/* ================= COACH SECTION ================= */}
      <div className="bg-[#0f1115] border-t border-b border-white/5">
        <div className={`w-full py-10 md:py-14 ${SECTION_INSET_RESPONSIVE}`}>
          <Reveal type="fade-down" duration={1000}>
            <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] md:text-[17px] tracking-[2px] uppercase mb-6">YOUR GUIDE FOR THIS SESSION</p>
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
                <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[12px] md:text-[14px] tracking-[2px] md:tracking-[3px] uppercase mb-4 md:mb-5">MMA Fighter & AOF Co-Founder</p>
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
          
          {/* Left Block Content */}
          <div className="p-6 md:p-14 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 space-y-6">
            
            <div className="text-left">
              <span className="text-[#07b4ba] font-['Barlow'] font-bold text-[11px] md:text-[12px] tracking-[3px] uppercase block mb-2">
                FROM CONFUSION TO CLARITY
              </span>
              <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[48px] tracking-[1.5px] text-white leading-[1.05] uppercase">
                Everything You Need To Start MMA <br />
                <span className="text-[#07b4ba]">In One Live Session</span>
              </h2>
              <div className="w-16 h-[2px] bg-[#07b4ba] mt-3" />
            </div>

            {/* Workshop Details Parameters */}
            <div className="bg-[#111419] border border-white/10 p-5 md:p-8 rounded-xl shadow-2xl">
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
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">Duration: </p>
                  <p className="text-[14px] md:text-[15px] font-bold text-white mt-0.5 flex items-center gap-2">
                    <span className="text-[#07b4ba]">🔹</span> 30 Mins + Q&A
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest">TIME</p>
                  <p className="text-[14px] md:text-[15px] font-bold text-white mt-0.5">8:30 PM IST</p>
                </div>
              </div>
            </div>

            {/* Live Quote Container */}
            <div className="bg-zinc-950/60 border border-zinc-900 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-2.5">
                <IconBroadcast />
                <h3 className="font-['Barlow'] font-extrabold text-[17px] md:text-[19px] uppercase tracking-wide text-white">
                  THIS IS <span className="text-[#07b4ba]">LIVE</span> FOR A REASON
                </h3>
              </div>
              
              <p className="text-zinc-400 font-medium text-[13.5px] md:text-[14.5px] font-['Barlow'] leading-relaxed mb-6">
                Everyone starts from a different place. Join live to ask questions, get personal guidance, and leave with the clarity to take your very first step into MMA.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-zinc-900/50 text-center">
                <div className="flex flex-col items-center px-1">
                  <div className="mb-2"><IconTarget /></div>
                  <p className="text-[11px] md:text-[12px] font-semibold text-zinc-300 leading-tight">
                    Leave with clarity
                  </p>
                </div>

                <div className="flex flex-col items-center px-1 border-x border-zinc-900/50">
                  <div className="mb-2">
                    <IconMessage />
                  </div>
                  <p className="text-[11px] md:text-[12px] font-semibold text-zinc-300 leading-tight">
                    Get Your Questions Answered
                  </p>
                </div>

                <div className="flex flex-col items-center px-1">
                  <div className="mb-2">
                    <IconRocket />
                  </div>
                  <p className="text-[11px] md:text-[12px] font-semibold text-zinc-300 leading-tight">
                    Start With Confidence
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Panel: REGISTRATION FORM */}
          <div className="p-4 sm:p-8 md:p-14 lg:p-20 bg-[#0d1117] flex items-center justify-center">
            <div className="bg-white border border-zinc-200 text-zinc-950 rounded-2xl p-5 sm:p-6 md:p-9 w-full max-w-md shadow-2xl relative overflow-hidden">
              
              {!submitted && (
                <div className="text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-[#07b4ba]/10 rounded-full flex items-center justify-center border border-[#07b4ba]/20 text-[#07b4ba] mb-3">
                    <IconCalendar />
                  </div>
                  
                  <h3 className="font-['Bebas_Neue'] text-[28px] md:text-[34px] tracking-[1.5px] text-zinc-950 uppercase leading-none mb-1">
                    RESERVE YOUR SPOT
                  </h3>
                  <p className="text-center text-[13px] text-zinc-600 mb-6 font-['Barlow'] leading-relaxed">
                    Fill out the form below to reserve your live workshop invitation link.
                  </p>
                </div>
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
                    if (!name || !email || !phone || !situation) return;
                    setIsSubmitting(true);
                    try {
                      const GOOGLE_SCRIPT_WEBAPP_URL = "YOUR_DEPLOYED_APPS_SCRIPT_WEBAPP_URL";
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
                      placeholder="Your Name"
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
                      placeholder="Email Address"
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
                      placeholder="+91 9XXXXXXXXX"
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

                  <button
                    type="submit"
                    disabled={!name || !email || !phone || !situation || isSubmitting}
                    className="btn-glow w-full py-3.5 border-none rounded-xl bg-[#07b4ba] hover:bg-[#06a2a7] text-white font-['Bebas_Neue'] text-[20px] tracking-[1.5px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed uppercase transition-colors"
                  >
                    {isSubmitting ? "Processing..." : "SAVE MY SEAT"}
                  </button>
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
