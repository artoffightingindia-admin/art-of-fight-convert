import React from "react";
import { useCms } from "@/context/CmsContext";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const { content } = useCms();
  const h = content.home;

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={h.heroImage || "/images/Hero.jpg"}
          alt="Hero Background"
          className="w-full h-full object-cover object-center filter brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-background/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
        {h.heroTagline !== "" && (
          <Reveal type="fade-down" delay={100}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#07b4ba]/10 border border-[#07b4ba]/30 text-[#07b4ba] text-xs md:text-sm font-semibold tracking-widest uppercase mb-6">
              {h.heroTagline ?? "Art of Fighting Academy"}
            </span>
          </Reveal>
        )}

        {h.heroTitle !== "" && (
          <Reveal type="fade-up" delay={200}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05] whitespace-pre-line">
              {h.heroTitle ?? "STOP DOUBTING.\nSTART LEARNING MMA\nTHE RIGHT WAY."}
            </h1>
          </Reveal>
        )}

        {h.heroSubtitle !== "" && (
          <Reveal type="fade-up" delay={300}>
            <p className="text-base sm:text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-normal leading-relaxed whitespace-pre-line">
              {h.heroSubtitle ?? "Whether you're starting at home or want to train with a coach, AOF provides the structure, guidance, and accountability to achieve real results."}
            </p>
          </Reveal>
        )}

        <Reveal type="scale-up" delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {h.heroBtn1Text !== "" && (
              <button
                disabled
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-400 font-bold text-sm tracking-wider uppercase cursor-not-allowed opacity-80"
              >
                {h.heroBtn1Text ?? "1 on 1 Coaching (Coming Soon)"}
              </button>
            )}

            {h.heroBtn2Text !== "" && (
              <Link
                to="/program"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#07b4ba] hover:bg-[#069ca1] text-black font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(7,180,186,0.3)] hover:shadow-[0_0_30px_rgba(7,180,186,0.5)] flex items-center justify-center"
              >
                {h.heroBtn2Text ?? "AOF 30 Days Program"}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default HeroSection;
