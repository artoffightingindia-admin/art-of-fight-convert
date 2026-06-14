const IntroSection = () => (
  <section id="about" className="pt-6 pb-6 md:pt-8 md:pb-8 bg-card/50">
    <div className="container max-w-6xl">

      {/* Section Caption */}
      <p
        className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-3"
        style={{ transform: "translateY(10px)" }}
      >
        WHY AOF ?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left: intro wordings */}
        <div className="space-y-4">
          <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[42px] tracking-[2px] text-white leading-[1.1] mb-4">
            A SYSTEM FOR <span className="text-primary">REAL PROGRESS.</span>
          </h2>

          <p className="font-['Barlow'] text-[16px] text-white/70 leading-relaxed">
            You don't struggle because you lack motivation. You struggle because you
            lack structure. Without the right structure, At Art of Fighting, we
            simplify the learning process through structured training, clear
            progressions, and direct mentorship.
            <br />
            <br />
            Whether you're training to learn MMA, improve your fitness, build
            confidence, develop self-defense skills, or eventually compete, our goal
            is simple: Help you make measurable progress without wasting months
            figuring things out on your own.
          </p>
        </div>

        {/* Right: Image */}
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-white/10">

          <img
            src="https://i.postimg.cc/gjQP69D1/Purushoth-Coach-jpg.jpg"
            alt="Purushothaman MK"
            className="w-full h-full object-cover object-center"
          />

          {/* Optional dark gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        </div>

      </div>
    </div>
  </section>
);

export default IntroSection;
