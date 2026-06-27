import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StickyAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  if (!isVisible) return null;

  const handleReserveClick = () => {
    navigate("/blueprint");
  };

  return (
    <div className="hidden lg:fixed lg:right-0 lg:top-24 lg:w-80 lg:z-40 lg:flex lg:flex-col">
      {/* Sticky Ad Container */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 rounded-lg overflow-hidden shadow-2xl shadow-cyan-500/20 mx-4">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 z-50 bg-slate-700/80 hover:bg-slate-600 rounded-full p-1.5 transition-all duration-200 group"
          aria-label="Close ad"
        >
          <X className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
        </button>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              Limited Offer
            </h3>
            <h2 className="font-bebas text-2xl text-white leading-none">
              FREE
              <br />
              <span className="text-cyan-400">LIVE SESSION</span>
            </h2>
          </div>

          {/* Main Message */}
          <p className="text-white font-bebas text-lg leading-tight">
            DON'T KNOW HOW TO START MMA?
          </p>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed font-barlow">
            Avoid months of confusion.
          </p>

          {/* Benefits / Icon */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-400/10 border border-cyan-400/30">
                <svg
                  className="h-6 w-6 text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <p className="text-slate-200 text-sm font-barlow">
              Join our free live beginner session.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleReserveClick}
            className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-900 font-bebas text-sm tracking-wider py-3 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-400/70"
          >
            RESERVE MY FREE SEAT
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          {/* Bottom accent */}
          <div className="pt-2 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 text-center">
              Limited spots available
            </p>
          </div>
        </div>

        {/* Gradient overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default StickyAd;
