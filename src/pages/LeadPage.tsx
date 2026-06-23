import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const LeadPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && phone && agreed) {
      setSubmitted(true);
      console.log("Form submitted:", { email, phone });
      setTimeout(() => {
        setEmail("");
        setPhone("");
        setAgreed(false);
        setSubmitted(false);
      }, 2000);
    }
  };

  // Helper to quickly scroll down to the sticky form card
  const scrollToForm = () => {
    const element = document.getElementById("email-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased font-sans">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section className="relative w-full pt-12 pb-20 px-4 flex flex-col items-center justify-center overflow-hidden bg-black">
        {/* Top Badge */}
        <div className="mb-6 inline-block bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
          FREE LIVE WORKSHOP FOR COACHES & FIGHTERS • <span className="text-cyan-400">JUNE 23</span>
        </div>

        <div className="container mx-auto max-w-4xl text-center z-10">
          <Reveal animation="fade-up">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight leading-tight uppercase">
              HOW TO TURN YOUR IN-PERSON COACHING INTO{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500">
                $5K/MONTH
              </span>{" "}
              ONLINE
            </h1>
          </Reveal>

          <Reveal animation="fade-up" delay={0.1}>
            <p className="text-lg md:text-xl text-cyan-400/80 font-medium mb-10 italic">
              (Without Quitting What Already Works)
            </p>
          </Reveal>

          {/* Centralized CTA Glowing Box */}
          <Reveal animation="scale-in" delay={0.2}>
            <div className="bg-slate-950/60 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.05)] rounded-2xl p-6 md:p-10 max-w-2xl mx-auto mb-10">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
                This live workshop will show you how to earn
              </p>
              <p className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
                $5K/MONTH
              </p>
              <p className="text-gray-400 text-sm italic">The number most coaches are chasing</p>
            </div>
          </Reveal>

          <Reveal animation="fade-up" delay={0.3}>
            <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
              A free live workshop for coaches and fighters who already get paid for what they know, and want to add online income without burning out on more hours.
            </p>
            <p className="text-base font-medium text-gray-300 mb-8">
              Live with <span className="text-white font-semibold underline decoration-cyan-500 decoration-2">Sean Fagan</span>
            </p>
          </Reveal>

          {/* Hero Meta Badges */}
          <Reveal animation="fade-up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 rounded-lg px-4 py-2.5 text-xs font-semibold text-cyan-400">
                <span>📅</span> TUESDAY JUNE 23, 8:30PM EST.
              </div>
              <div className="bg-red-950/40 border border-red-900/50 rounded-lg px-4 py-2.5 text-xs font-bold tracking-wider text-red-400 uppercase">
                REAL Q&A. REPLAY ONLY IF YOU REGISTER.
              </div>
            </div>
          </Reveal>

          {/* Primary Action Button (Scrolls to Form) */}
          <Reveal animation="scale-in" delay={0.5}>
            <button
              onClick={scrollToForm}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 px-10 rounded-lg transition-all duration-200 text-lg shadow-[0_4px_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] active:scale-[0.98] tracking-wide uppercase"
            >
              SAVE MY FREE SEAT NOW
            </button>
          </Reveal>
        </div>
      </section>

      {/* ================= PAIN POINT / VIDEO SECTION ================= */}
      <section className="py-20 px-4 bg-zinc-950 border-t border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-cyan-500 text-xs font-bold uppercase tracking-widest">
                SOUNDS FAMILIAR?
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight uppercase">
                YOU WANT TO LEARN MMA. <br />
                BUT <span className="text-red-500">HAVEN'T STARTED</span> BECAUSE YOU:
              </h2>
              
              <ul className="space-y-3.5 pt-4 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">|</span>
                  <span>Don't know where to begin</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">|</span>
                  <span>Don't have access to a quality MMA gym</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">|</span>
                  <span>Don't have a training partner or equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">|</span>
                  <span>Don't commit hours every day to training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 font-bold text-lg leading-none">|</span>
                  <span>Don't find structured MMA guidance in Tamil</span>
                </li>
              </ul>
            </div>

            {/* Right Column Video Frame Component placeholder matching image */}
            <div className="lg:col-span-7 w-full">
              <div className="space-y-3 text-center lg:text-left mb-4">
                <p className="text-white text-base md:text-lg font-bold uppercase tracking-wide italic">
                  5 MINUTES THAT COULD SAVE YOU MONTHS OF CONFUSION
                </p>
              </div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-zinc-800 shadow-2xl group">
                {/* Mock Image Overlay mimicking a customized YouTube configuration */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-cyan-500 text-black flex items-center justify-center pl-1 font-bold shadow-lg transition-transform group-hover:scale-110">
                    ▶
                  </div>
                </div>
                {/* Simulated video poster background */}
                <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-zinc-600 text-xs">
                  [Embed Code or Video Preview: AOF 30-Days MMA Striking Video Layout]
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BENEFIT GRID SECTION ================= */}
      <section className="py-20 px-4 bg-black border-t border-zinc-900">
        <div className="container mx-auto max-w-6xl">
          <Reveal animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-2">
                WHY THIS PROGRAM WORKS?
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
                BUILT AROUND THE REAL <span className="text-cyan-400">CHALLENGES OF BEGINNERS</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                title: "Clear Roadmap",
                desc: "Know exactly what to train, when to train, and how to progress throughout the program.",
                icon: "📅",
              },
              {
                title: "Train on Your Schedule",
                desc: "Access pre-recorded sessions and tools whenever it suits you. Most sessions take just 30-45 minutes a day.",
                icon: "⚡",
              },
              {
                title: "Train with Confidence",
                desc: "Receive direct coach feedback and guidance so you know you're practicing techniques correctly.",
                icon: "🌱",
              },
              {
                title: "Beginner Friendly",
                desc: "Start with confidence, even if you've never trained MMA before.",
                icon: "🌐",
              },
              {
                title: "Learn in Tamil",
                desc: "Lessons and concepts structured through coaching delivered in Tamil and simple English.",
                icon: "💬",
              },
            ].map((item, idx) => (
              <Reveal key={idx} animation="fade-up" delay={idx * 0.05}>
                <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 h-full text-center flex flex-col items-center justify-start hover:border-zinc-800 transition-colors">
                  <div className="text-3xl text-cyan-400 mb-4 bg-zinc-900 w-12 h-12 rounded-lg flex items-center justify-center border border-zinc-800">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Divider Accent strip from visual hierarchy layout */}
      <div className="w-full h-11 bg-cyan-500 text-black flex items-center justify-center font-black tracking-widest text-xs uppercase shadow-inner">
        JOIN NOW
      </div>

      {/* ================= BIO / INSTRUCTOR SECTION ================= */}
      <section className="py-20 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-2 mb-10 text-left">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">LED BY</p>
          </div>

          <Reveal animation="scale-in">
            <div className="bg-black rounded-2xl p-6 md:p-10 border border-zinc-900">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                
                {/* Coach Portrait Visual */}
                <div className="w-48 h-56 shrink-0 rounded-xl overflow-hidden border-2 border-cyan-500/30 bg-zinc-900 shadow-xl">
                  <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-semibold">
                    [Purushothaman MK Photo]
                  </div>
                </div>

                {/* Profile Breakdown Info */}
                <div className="flex-1 w-full">
                  <h3 className="text-3xl font-black text-white mb-1 tracking-tight uppercase">
                    PURUSHOTHAMAN MK
                  </h3>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
                    HEAD COACH AND MMA FIGHTER
                  </p>
                  
                  <ul className="space-y-3 text-xs md:text-sm text-gray-300 mb-8 list-none pl-0">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>Only Tamil MMA Fighter in IMP and Multiple-Time National Medalist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>Coached 2000+ Students, Including National Champions Across Multiple Disciplines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span>Specialized in Developing Strong Fundamentals for Beginners</span>
                    </li>
                  </ul>

                  {/* Operational Metric Data Blocks */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { val: "2,000+", label: "CLIENTS COACHED" },
                      { val: "10+", label: "YEARS EXPERIENCE" },
                      { val: "20+", label: "MMA FIGHTS" },
                      { val: "10K+", label: "AOF COMMUNITY" },
                    ].map((metric, i) => (
                      <div key={i} className="bg-zinc-950 border border-zinc-900 rounded-xl p-3 text-center">
                        <p className="text-xl font-black text-cyan-400">{metric.val}</p>
                        <p className="text-[9px] text-gray-500 font-bold tracking-wider mt-0.5 uppercase">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= SPLIT SCREEN FOOTER INTERACTION ================= */}
      <section id="email-form-section" className="border-t border-zinc-900 bg-black">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Panel: Information & Live Session Details */}
          <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-900">
            
            {/* Top: Workshop Info Sub-component */}
            <div className="mb-12 bg-white text-zinc-900 p-8 rounded-xl shadow-xl">
              <h4 className="text-cyan-600 font-extrabold text-xs uppercase tracking-widest mb-6">
                WORKSHOP DETAILS
              </h4>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LIVE SESSION</p>
                  <p className="text-sm font-black text-zinc-900 flex items-center gap-1.5 mt-0.5">
                    <span className="text-cyan-600">🔹</span> On Zoom
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">DATE</p>
                  <p className="text-sm font-black text-zinc-900 mt-0.5">Tuesday, June 24</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">LIVE Q&A</p>
                  <p className="text-sm font-black text-zinc-900 flex items-center gap-1.5 mt-0.5">
                    <span className="text-cyan-600">🔹</span> Ask anything
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">TIME</p>
                  <p className="text-sm font-black text-zinc-900 mt-0.5">8:30 PM IST</p>
                </div>
                <div className="col-span-2 pt-2 border-t border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">BONUS</p>
                  <p className="text-sm font-black text-zinc-900 mt-0.5">MMA Beginners Blueprint (PDF)</p>
                </div>
              </div>
            </div>

            {/* Bottom: Why Registered Quote Panel */}
            <div className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-3 right-3 text-[10px] uppercase font-bold tracking-widest text-zinc-700 px-2 py-0.5 border border-zinc-900 rounded bg-black">
                LIVE BROADCAST
              </div>
              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3">
                THIS IS LIVE FOR A REASON
              </p>
              <blockquote className="text-sm text-gray-300 leading-relaxed italic mb-4">
                "You can ask me anything about your own situation in real time. At the end, I'm opening up something not going in the replay. You need to be in the room."
              </blockquote>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                — SEAN FAGAN, COACH
              </p>
            </div>

          </div>

          {/* Right Panel: Functional Form Interface */}
          <div className="p-8 md:p-16 lg:p-20 bg-zinc-950 flex items-center justify-center">
            <div className="bg-white text-zinc-900 rounded-2xl p-8 md:p-10 w-full max-w-md shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-black text-center tracking-tight text-zinc-900 mb-1 uppercase">
                ENTER YOUR EMAIL
              </h3>
              <p className="text-center text-xs text-zinc-500 mb-6 max-w-xs mx-auto leading-relaxed">
                You'll receive a private invitation & link to join the live workshop on Tuesday, June 23. Workshop begins at 8:30pm EST.
              </p>

              {submitted ? (
                <div className="text-center py-12 bg-emerald-50 rounded-xl border border-emerald-200">
                  <p className="text-2xl font-black text-emerald-600 mb-2">✓ YOU'RE IN!</p>
                  <p className="text-sm text-zinc-600 px-4">
                    Check your inbox shortly for confirmation details and your links.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-zinc-700 uppercase tracking-wider mb-1">
                      EMAIL ADDRESS
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3.5 text-gray-400 text-sm">✉</span>
                      <input
                        type="email"
                        placeholder="e.g. sean@mygym.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-9 pr-4 py-3 bg-white border border-gray-300 rounded-lg t
