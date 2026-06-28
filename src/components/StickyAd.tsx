import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown 
} from "lucide-react";

const StickyAd = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleReserveClick = () => {
    navigate("/blueprint");
  };

  return (
    <div 
      className={`fixed z-50 flex transition-transform duration-500 ease-in-out
        /* Mobile: Bottom aligned, full width */
        bottom-0 left-0 right-0 w-full
        /* Desktop: Right aligned, auto width */
        lg:bottom-auto lg:top-32 lg:left-auto lg:right-6 lg:w-auto
        /* Visibility transforms based on screen size */
        ${
          isOpen 
            ? "translate-y-0 lg:translate-x-0" 
            : "translate-y-full lg:translate-y-0 lg:translate-x-[calc(100%+24px)]"
        }
      `}
    >
      {/* ---------------------------------------------------- */}
      {/* DESKTOP TOGGLE HANDLE (Left side, hidden on mobile) */}
      {/* ---------------------------------------------------- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden lg:flex absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 bg-[#0d0f12] border-y border-l border-[#07b4ba]/30 text-[#07b4ba] hover:text-white px-2 py-4 rounded-l-xl shadow-xl transition-all duration-300 items-center justify-center cursor-pointer"
        aria-label={isOpen ? "Push ad out" : "Push ad in"}
      >
        {isOpen ? <ChevronRight className="w-5 h-5 animate-pulse" /> : <ChevronLeft className="w-5 h-5" />}
      </button>

      {/* ---------------------------------------------------- */}
      {/* MOBILE TOGGLE HANDLE (Top center, hidden on desktop) */}
      {/* ---------------------------------------------------- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-[#0d0f12] border-t border-x border-[#07b4ba]/30 text-[#07b4ba] hover:text-white px-5 py-2 rounded-t-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
        aria-label={isOpen ? "Push ad down" : "Pull ad up"}
      >
        <span className="font-['Barlow'] uppercase text-[12px] font-bold tracking-widest">
          Free Session
        </span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4 animate-pulse" />}
      </button>

      {/* ---------------------------------------------------- */}
      {/* MAIN CONTAINER */}
      {/* ---------------------------------------------------- */}
      <div className="w-full lg:w-[310px] bg-[#0d0f12] border-t lg:border border-[#07b4ba]/30 rounded-t-2xl lg:rounded-xl p-5 shadow-2xl relative overflow-hidden select-none">
        
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
