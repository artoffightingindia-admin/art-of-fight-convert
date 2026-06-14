const CtaPairSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden h-[280px]"
      style={{
  backgroundImage: `url('https://i.postimg.cc/g2KvzG4M/CTA-Image-jpg.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
}}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.72)" }} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">

        {/* Blue eyebrow */}
        <p
          className="uppercase font-bold text-sm tracking-[4px] mb-1"
          style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif" }}
        >
          Start Your New Journey
        </p>

        {/* Main heading */}
        <h2
          className="uppercase text-white leading-[1.05] m-0 mb-1"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(28px, 3vw, 48px)",
            letterSpacing: 2,
          }}
        >
          How Do You Want To T  rain?
        </h2>

        {/* Subtitle */}
        <p
          className="text-sm mb-[18px]"
          style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.55)" }}
        >
          Choose The Coaching Experience That Fits Your Goals.
        </p>

       {/* Button row */}
<div className="flex items-start justify-center w-full max-w-[680px]">

  {/* Left CTA */}
  <div className="flex flex-1 flex-col items-center gap-2">
    <button
      onClick={() => { window.location.href = "/coaching"; }}
      className="flex items-center justify-between gap-[10px] text-white uppercase rounded-[10px] px-[22px] py-[10px] border-none cursor-pointer whitespace-nowrap w-full max-w-[240px] hover:opacity-90 transition-opacity"
      style={{
        backgroundColor: "#07b4ba",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 18,
        letterSpacing: 3,
      }}
    >
      <span className="flex items-center gap-[9px]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        1-1 Coaching
      </span>
      <span className="text-base">→</span>
    </button>

    <p
      className="text-[12px] leading-[1.5] text-center max-w-[200px] m-0"
      style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.5)" }}
    >
      Personalized coaching tailored to your
      <br />
      goals, lifestyle, and schedule.
    </p>
  </div>

  {/* Vertical divider */}
  <div className="flex items-center justify-center w-12 shrink-0">
    <div
      className="w-px h-[80px]"
      style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
    />
  </div>

  {/* Right CTA */}
  <div className="flex flex-1 flex-col items-center gap-2">
    <button
      onClick={() => { window.location.href = "/program"; }}
      className="flex items-center justify-between gap-[10px] text-white uppercase rounded-[10px] px-[22px] py-[10px] border-none cursor-pointer whitespace-nowrap w-full max-w-[240px] hover:opacity-90 transition-opacity"
      style={{
        backgroundColor: "#07b4ba",
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 18,
        letterSpacing: 3,
      }}
    >
      <span className="flex items-center gap-[9px]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        30-Days Program
      </span>
      <span className="text-base">→</span>
    </button>

    <p
      className="text-[12px] leading-[1.5] text-center max-w-[200px] m-0"
      style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.5)" }}
    >
      Learn MMA online from anywhere with
      <br />
      a structured, beginner-friendly roadmap.
    </p>
  </div>

</div>

{/* Bottom text */}
<div className="mt-[14px]">
  <span
    className="text-[12px]"
    style={{
      fontFamily: "'Barlow', sans-serif",
      color: "rgba(255,255,255,0.55)"
    }}
  >
    Progress starts when you stop guessing and start training.
  </span>
</div>

      </div>
    </section>
  );
};

export default CtaPairSection;
