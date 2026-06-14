const IntroSection = () => (
  <section id="about" className="pt-6 pb-6 md:pt-8 md:pb-8 bg-card/50">
    <div className="container max-w-6xl">

      {/* Section Caption */}
      <p
        className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-3 "
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
 You don't struggle because you lack motivation. You struggle because you lack structure.Without the right structure,At Art of Fighting, We simplify the learning process through structured training, clear progressions, and direct mentorship.
  <br />
          <br />
Whether you're training to learn MMA, improve your fitness, build confidence, develop self-defense skills, or eventually compete, our goal is simple: Help you make measurable progress without wasting months figuring things out on your own.
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
