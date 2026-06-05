import { useState, useEffect } from "react";

const shorts = [1, 2, 3];

const SocialProofSection = () => {
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3
  );

  useEffect(() => {
    const onResize = () => setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const visibleShorts = visibleCount === 1 ? [shorts[0]] : shorts;

  return (
    <section className="py-12 md:py-16 bg-card/50 w-full">
      <div className="w-[92%] md:w-[60%] mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <h2 className="font-display text-[clamp(30px,4vw,60px)] text-foreground leading-none">
  See Us in <span className="text-primary">Action</span>
</h2>
          <p className="text-muted-foreground text-xs md:text-sm">
            Subscribe on YouTube and join 5,000+ MMA enthusiasts on Instagram for weekly tips, training, and pad work.
          </p>
        </div>

        {/* Row 1: portrait shorts (autoplay) — 1 on mobile, 3 on md+ */}
        <div className="flex justify-center md:justify-between items-center gap-4 w-full mb-8">
          {visibleShorts.map((v) => (
            <div
              key={v}
              className="relative bg-muted rounded-lg overflow-hidden group aspect-[9/16] w-[70%] md:w-[28%] max-w-[260px]"
            >
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-muted to-card" />
              <div className="absolute bottom-2 left-2 right-2 text-[10px] text-foreground/80 uppercase tracking-wider">
                Short {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
