const IntroSection = () => (
  <section id="about" className="pt-6 pb-6 md:pt-8 md:pb-8 bg-card/50">
    <div className="container max-w-6xl">

      {/* Section Caption */}
      <p
        className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-3"
        style={{ transform: "translateY(30px)" }}
      >
        AOF Intro Section
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left: intro wordings */}
        <div className="space-y-4">
          <h2 className="font-['Bebas_Neue'] text-[32px] md:text-[42px] tracking-[2px] text-white leading-[1.1] mb-4">
  Welcome to the <span className="text-primary">AOF Family</span>
</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            At Art of Fight, we're more than just a gym — we're a family built
            on discipline, respect, and relentless growth. Our coaches bring
            years of real fight experience to every session, guiding you through
            proven techniques that work inside and outside the ring. Whether
            you're a complete beginner or training for competition, you'll find
            a system designed to push your limits safely. We focus on building
            strong fundamentals, sharp technique, and the mental toughness that
            defines a true fighter. Step in, train hard, and become part of a
            community that wins together.
          </p>
        </div>

        {/* Right: video */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-card" />

          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
              <div
                className="w-0 h-0 border-t-[8px] border-b-[8px] border-t-transparent border-b-transparent ml-1"
                style={{
                  borderLeftWidth: "14px",
                  borderLeftColor: "hsl(var(--primary-foreground))",
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default IntroSection;
