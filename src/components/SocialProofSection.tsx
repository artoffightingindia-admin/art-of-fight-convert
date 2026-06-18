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

  const [muted, setMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);

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
    visibleCount === 1
      ? [videos[currentVideo]]
      : videos;

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
          {visibleVideos.map((videoId, index) => {
            const actualIndex =
              visibleCount === 1 ? currentVideo : index;

            return (
              <div
                key={videoId}
                className="relative aspect-[9/16] w-[70%] md:w-[28%] max-w-[260px] rounded-xl overflow-hidden bg-card border border-border"
              >
                <iframe
                  key={`${videoId}-${muted}`}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
                    muted ? 1 : 0
                  }&loop=1&playlist=${videoId}&controls=1&playsinline=1&rel=0`}
                  title={`YouTube Video ${actualIndex + 1}`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />

                {/* Mute / Unmute Button */}
                <button
                  onClick={() => setMuted(!muted)}
                  className="absolute top-3 right-3 z-20 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-1 rounded-full transition"
                >
                  {muted ? "🔇 Unmute" : "🔊 Mute"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Navigation - Below Video */}
        {visibleCount === 1 && (
          <div className="flex justify-center items-center gap-3 mt-5">
            <button
              onClick={() =>
                setCurrentVideo((prev) =>
                  prev === 0 ? videos.length - 1 : prev - 1
                )
              }
              className="px-4 py-2 rounded-full bg-[#07b4ba] text-white font-bold text-sm hover:opacity-90 transition"
            >
              ← Prev
            </button>

            <div className="text-white/60 text-sm font-medium min-w-[40px] text-center">
              {currentVideo + 1} / {videos.length}
            </div>

            <button
              onClick={() =>
                setCurrentVideo((prev) =>
                  prev === videos.length - 1 ? 0 : prev + 1
                )
              }
              className="px-4 py-2 rounded-full bg-[#07b4ba] text-white font-bold text-sm hover:opacity-90 transition"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SocialProofSection;
