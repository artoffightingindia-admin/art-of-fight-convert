import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const StickyAd = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate("/blueprint");
  };

  return (
    <div 
      className={`hidden lg:flex fixed top-32 right-6 z-50 transition-all duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-[calc(100%+24px)]"
      }`}
    >
      {/* Toggle Tab Handle (Push In / Out Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-[#0d0f12] border-y border-l border-[#07b4ba]/30 text-[#07b4ba] hover:text-white px-2 py-4 rounded-l-xl shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer"
        aria-label={isOpen ? "Push ad out" : "Push ad in"}
      >
        {isOpen ? <ChevronRight className="w-5 h-5 animate-pulse" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* Main Container styled exactly like Screenshot 2026-06-27 192223_2.png */}
      <div className="w-[310px] bg-[#0d0f12] border border-[#07b4ba]/30 rounded-xl p-5 shadow-2xl relative overflow-hidden select-none">
        
        {/* Top Header Row */}
        <div className="flex items-center gap-3.5 alignment-baseline mb-4">
          <span className="font-['Bebas_Neue'] text-[56px] text-[#07b4ba] tracking-tight leading-none">
            FREE
          </span>
          <div className="font-['Barlow'] text-white uppercase text-[13px] font-bold tracking-widest leading-[1.15]">
            Live<br />Session
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-[1px] bg-white/10 mb-5" />

        {/* Content Body */}
        <div className="space-y-4">
          {/* Main Hook Question */}
          <h2 className="font-['Bebas_Neue'] text-[34px] text-white leading-[1.05] tracking-wide uppercase font-normal">
            Don't know how<br />to start mma?
          </h2>

          {/* Subtext Statement */}
          <p className="font-['Barlow'] text-white/90 text-[16px] tracking-wide font-normal">
            Avoid months of confusion.
          </p>

          {/* Value Feature Row */}
          <div className="flex items-start gap-4 py-1">
            <Users className="w-6 h-6 text-[#07b4ba] shrink-0 mt-0.5" />
            <p className="font-['Barlow'] text-white/90 text-[15px] font-medium leading-snug">
              Join our free live beginner session.
            </p>
          </div>

          {/* CTA Action Button */}
          <button
            onClick={handleReserveClick}
            className="w-full bg-[#07b4ba] hover:bg-[#059da2] text-black font-['Barlow'] text-[14px] font-extrabold tracking-wider py-3.5 px-5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-2 shadow-[0_4px_20px_rgba(7,180,186,0.25)] hover:shadow-[0_4px_25px_rgba(7,180,186,0.4)] cursor-pointer border-none"
          >
            RESERVE MY FREE SEAT
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyAd;
