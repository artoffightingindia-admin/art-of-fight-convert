import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StickyAd = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate("/blueprint");
  };

  return (
    <div 
      className={`hidden lg:flex fixed top-28 right-0 z-50 transition-all duration-500 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-[320px]"
      }`}
    >
      {/* Toggle Handle Button (Push In / Out) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-[#05070b] border-y border-l border-[#07b4ba]/30 text-[#07b4ba] hover:text-white px-2 py-4 rounded-l-xl shadow-lg transition-colors duration-300 flex items-center justify-center font-bebas text-sm tracking-widest [writing-mode:vertical-lr] rotate-180 select-none cursor-pointer"
        style={{ boxShadow: "0 0 15px rgba(7,180,186,0.15)" }}
      >
        {isOpen ? "» CLOSE OFFER" : "« LIVE SESSION OFFER"}
      </button>

      {/* Sticky Ad Box (Matches Screenshot Layout & Landing Page Styling) */}
      <div className="w-80 bg-[#05070b] border-l border-y border-[#07b4ba]/30 rounded-tl-2xl rounded-bl-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 relative">
        {/* Main Wrapper matching p-6 space-y-4 structure */}
        <div className="p-6 space-y-5 relative z-10">
          
          {/* Header Area */}
          <div className="flex items-start justify-between">
            <h2 className="font-bebas text-4xl text-white leading-[0.95] tracking-wide">
              <span className="text-[#07b4ba]">FREE</span>
              <br />
              <span className="text-[17px] tracking-[3px] font-sans font-bold block mt-1 text-white/90">
                LIVE SESSION
              </span>
            </h2>
          </div>

          <div className="w-full h-[1px] bg-white/10 my-1" />

          {/* Main Hook Message */}
          <p className="text-white font-bebas text-2xl tracking-wide leading-tight uppercase">
            Don't know how to start MMA?
          </p>

          {/* Core Subtitle / Value Statement */}
          <p className="text-white/70 font-barlow text-[15px] leading-relaxed italic">
            Avoid months of confusion.
          </p>

          {/* Feature Highlight Row with Icon */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#07b4ba] bg-[#07b4ba]/10 flex items-center justify-center text-[#07b4ba] shadow-[0_0_10px_rgba(7,180,186,0.2)]">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <p className="text-white/80 font-barlow text-[14px] font-medium leading-tight">
              Join our free live beginner session.
            </p>
          </div>

          {/* Primary CTA Button (Employs landing page btn-glow characteristics) */}
          <button
            onClick={handleReserveClick}
            className="btn-glow w-full bg-[#07b4ba] hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(7,180,186,0.6)] text-white font-bebas text-lg tracking-[2px] py-3.5 px-4 rounded-xl font-bold border-none transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#07b4ba]/20"
          >
            RESERVE MY FREE SEAT
            <svg
              className="w-4 h-4 stroke-[2.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          {/* Subtext Footer Accent */}
          <div className="pt-2 border-t border-white/5">
            <p className="text-[11px] font-barlow tracking-[1.5px] uppercase text-white/40 text-center font-semibold">
              Limited spots available
            </p>
          </div>
        </div>

        {/* Diagonal Subtle Premium Ambient Glow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07b4ba]/5 via-transparent to-transparent pointer-events-none z-0" />
      </div>
    </div>
  );
};

export default StickyAd;
