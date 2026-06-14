import { useState, useEffect } from "react";

const videos = [
  "zjcVWjWSJog",
  "xuAeRmO82Gk",
  "H49Y6b7wn58",
];

const SocialProofSection = () => {
  const [visibleCount, setVisibleCount] = useState(
    typeof window !== "undefined" && window.innerWidth < 768 ? 1 : 3
  );

  const [muted, setMuted] = useState([true, true, true]);

  useEffect(() => {
    const onResize = () => {
      setVisibleCount(window.innerWidth < 768 ? 1 : 3);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const visibleVideos =
    visibleCount === 1 ? [videos[0]] : videos;

  return (
    <section className="py-12 md:py-16 bg-card/50 w-full">
      <div className="w-[92%] md:w-[60%] mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
          <h2 className="font-display text-[clamp(30px,4vw,60px)] text-foreground leading-none">
  SEE HOW WE TEACH.
  <br />
  <span className="text-primary">
    SEE HOW WE TRAIN.
  </span>
</h2>

          <p className="text-muted-foreground text-xs md:text-sm">
           5,000+ MMA fans follow AOF to learn, improve, and stay connected to the sport.
          </p>
        </div>

        {/* Videos */}
        <div className="flex justify-center md:justify-between items-center gap-4 w-full">
          {visibleVideos.map((videoId, index) => (
            <div
              key={videoId}
              className="relative aspect-[9/16] w-[70%] md:w-[28%] max-w-[260px] rounded-xl overflow-hidden bg-card border border-border"
            >
              <iframe
                key={`${videoId}-${muted[index]}`}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
                  muted[index] ? 1 : 0
                }&loop=1&playlist=${videoId}&controls=1&playsinline=1&rel=0`}
                title={`YouTube Video ${index + 1}`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />

              {/* Mute / Unmute Button */}
              <button
                onClick={() => {
                  const updated = [...muted];
                  updated[index] = !updated[index];
                  setMuted(updated);
                }}
                className="absolute top-3 right-3 z-20 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-1 rounded-full transition"
              >
                {muted[index] ? "🔇 Unmute" : "🔊 Mute"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
