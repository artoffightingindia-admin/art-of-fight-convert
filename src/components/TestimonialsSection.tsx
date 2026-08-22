import { Star, ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Pause, RotateCcw, RotateCw, Maximize } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCms, TestimonialItem } from "@/context/CmsContext";

const defaultTestimonials: TestimonialItem[] = [
  { 
    id: "1",
    author: "Pradeep",    
    role: "Member",  
    text: "Even as a complete beginner, I was able to understand the techniques clearly and execute them with confidence.",
    image: "https://i.postimg.cc/ZYjqbkYs/Pradeep-(1).jpg" 
  },
  { 
    id: "2",
    author: "Rahul",   
    role: "Member",  
    text: "He breaks down even complex techniques into simple steps, which made it easy to understand and apply.",
    image: "https://i.postimg.cc/7PXLHvPV/Rahul-(1).jpg"  
  },
  { 
    id: "3",
    author: "Bharathwaj",   
    role: "Member",  
    text: "I'm a slow learner, but he was patient and made sure I understood every technique before moving forward.",
    image: "https://i.postimg.cc/bYLvyXYF/Bharathwaj-(1).jpg"  
  },
  { 
    id: "4",
    author: "Surya", 
    role: "Fighter", 
    text: "He gives individual attention to everyone, whether you're a beginner learning the basics or an experienced fighter preparing to compete.",
    image: "https://i.postimg.cc/mZVrLxZd/Surya-(1).jpg"  
  },
  { 
    id: "5",
    author: "Madhan",    
    role: "Member",  
    text: "He doesn't just coach MMA. He guides you like a mentor with training, fitness, mindset, and long-term development.",
    image: "https://i.postimg.cc/q7HbD53j/Madan-jpg.jpg"
  },
  { 
    id: "6",
    author: "Sohail Mohammad",  
    role: "Athlete", 
    text: "I was doubtful when I started, but his guidance and structured approach helped me improve far more than I expected.",
    image: "https://i.postimg.cc/Dz3jpMXj/sohail.jpg" 
  },
];

const VISIBLE = 3;

// Helper to convert any YouTube URL into an embed link
const getYoutubeEmbedUrl = (url: string) => {
  if (!url) return "https://www.youtube.com/embed/KTlqLcAeisU";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
};

const TiltCard = ({ t, animClass, delay }: { t: TestimonialItem; animClass: string; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, scale: 1 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * 10, y: cx * -10, scale: 1.03 });
  };
  const onLeave = () => setTilt({ x: 0, y: 0, scale: 1 });

  return (
    <div
      ref={ref}
      className={`rounded-xl border border-white/[0.07] p-[18px_22px] transition-[transform,box-shadow] duration-[180ms] ease-in-out cursor-default ${animClass}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${delay}ms`,
        backgroundColor: "#131c27",
        transform: `rotate(-2deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scale})`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: tilt.scale > 1
          ? "0 16px 40px rgba(7,180,186,0.15), 0 4px 16px rgba(0,0,0,0.5)"
          : "0 2px 12px rgba(0,0,0,0.4)",
      }}
    >
      {/* Stars */}
      <div className="flex gap-[3px] mb-[10px]">
        {[...Array(5)].map((_, s) => (
          <Star key={s} className="w-[15px] h-[15px]" style={{ color: "#07b4ba", fill: "#07b4ba" }} />
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-sm leading-[1.65] italic mb-[14px]"
        style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.75)" }}
      >
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-[10px]">
        <div
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 overflow-hidden"
          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
        >
          {t.image ? (
            <img src={t.image} alt={t.author} className="w-full h-full object-cover" />
          ) : (
            <span
              className="text-[14px] font-bold"
              style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif" }}
            >
              {t.author?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p
            className="text-sm font-bold text-white m-0"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            {t.author}
          </p>
          <p
            className="text-[12px] m-0"
            style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.4)" }}
          >
            {t.role || "Member"}
          </p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const { content } = useCms();
  const rawList = content.home.testimonials?.length
    ? content.home.testimonials
    : defaultTestimonials;

  const testimonials = rawList;

  const [start, setStart]         = useState(0);
  const [paused, setPaused]       = useState(false);
  const [animDir, setAnimDir]     = useState<string | null>(null);
  const [animating, setAnimating] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isMuted, setIsMuted]     = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const revealControls = () => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowControls(false), 5000);
  };

  useEffect(() => {
    revealControls();
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const createPlayer = () => {
      if ((window as any).YT && (window as any).YT.Player) {
        playerRef.current = new (window as any).YT.Player(iframeRef.current, {
          events: {
            onReady: () => setPlayerReady(true),
            onStateChange: (e: any) => {
              setIsPlaying(e.data === (window as any).YT.PlayerState.PLAYING);
            },
          },
        });
      }
    };

    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      const prevCallback = (window as any).onYouTubeIframeAPIReady;
      (window as any).onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === "function") prevCallback();
        createPlayer();
      };
    }
  }, []);

  useEffect(() => {
    if (paused || testimonials.length <= VISIBLE) return;
    const id = setInterval(() => triggerNext(), 3500);
    return () => clearInterval(id);
  }, [paused, start, testimonials.length]);

  const triggerNext = () => {
    if (animating || testimonials.length === 0) return;
    setAnimDir("next");
    setAnimating(true);
    setTimeout(() => {
      setStart((s) => (s + 1) % testimonials.length);
      setAnimating(false);
    }, 320);
  };

  const triggerPrev = () => {
    if (animating || testimonials.length === 0) return;
    setAnimDir("prev");
    setAnimating(true);
    setTimeout(() => {
      setStart((s) => (s - 1 + testimonials.length) % testimonials.length);
      setAnimating(false);
    }, 320);
  };

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  };

  const skip = (seconds: number) => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    const current = player.getCurrentTime();
    player.seekTo(current + seconds, true);
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player || !playerReady) return;
    if (isMuted) player.unMute();
    else player.mute();
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement || (document as any).webkitFullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if ((document as any).webkitExitFullscreen) (document as any).webkitExitFullscreen();
    } else {
      if (el.requestFullscreen) el.requestFullscreen();
      else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
    }
  };

  const visibleCount = Math.min(VISIBLE, testimonials.length);
  const visible = Array.from({ length: visibleCount }, (_, i) =>
    testimonials[(start + i) % testimonials.length]
  );

  const controlBtnClass =
    "flex items-center justify-center w-9 h-9 bg-black/60 hover:bg-[#07b4ba] text-white hover:text-black rounded-full border border-white/20 transition-all duration-300 backdrop-blur-sm cursor-pointer";

  const videoSrc = getYoutubeEmbedUrl(content.home.socialProofVideos?.[0] || "https://www.youtube.com/embed/KTlqLcAeisU");

  return (
    <section
      id="testimonials"
      className="py-16 md:py-[72px]"
      style={{
        backgroundColor: "#0a0f14",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <style>{`
        @keyframes slideInBottom {
          from { opacity: 0; transform: rotate(-2deg) translateY(24px); }
          to   { opacity: 1; transform: rotate(-2deg) translateY(0); }
        }
        @keyframes slideInTop {
          from { opacity: 0; transform: rotate(-2deg) translateY(-24px); }
          to   { opacity: 1; transform: rotate(-2deg) translateY(0); }
        }
        .card-next { animation: slideInBottom 0.32s ease both; }
        .card-prev { animation: slideInTop    0.32s ease both; }

        .testimonial-video-container:fullscreen,
        .testimonial-video-container:-webkit-full-screen {
          width: 100vw;
          height: 100vh;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testimonial-video-container:fullscreen .video-frame,
        .testimonial-video-container:-webkit-full-screen .video-frame {
          width: 100%;
          height: 100%;
          aspect-ratio: unset;
          border-radius: 0;
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section heading */}
        <div className="text-center mb-[52px]">
          <p
            className="text-sm font-bold uppercase tracking-[4px] mb-2"
            style={{ fontFamily: "'Barlow', sans-serif", color: "#07b4ba" }}
          >
            {content.home.testimonialsTagline || "Results and Success Stories"}
          </p>
          <h2
            className="uppercase m-0 leading-[1.2]"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              letterSpacing: 2,
              color: "#fff",
            }}
          >
            {content.home.testimonialsHeading || "Real People, "}{" "}
            <br className="md:hidden" />
            <span className="text-[#07b4ba]">
              {content.home.testimonialsSubheading ? "" : "Real Progress"}
            </span>
          </h2>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT: Video frame with custom control bar */}
          <div className="flex flex-col">
            <h3
              className="mb-4 text-center italic"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "22px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.5px",
              }}
            >
              {content.home.testimonialsSubheading || "Hear Directly From People Who Have Trained Under Coach Purushothaman"}
            </h3>

            <div ref={containerRef} className="testimonial-video-container w-full relative group">
              <div className="video-frame relative w-full aspect-video overflow-hidden rounded-[14px] border border-white/[0.06] bg-black shadow-[0_0_30px_rgba(7,180,186,0.1)]">
                <iframe
                  ref={iframeRef}
                  id="testimonials-yt-player"
                  className="absolute inset-0 w-full h-full border-0 scale-105"
                  src={`${videoSrc}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1`}
                  title="MMA Training Testimonials"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {/* Click-to-reveal surface */}
                <div
                  className="absolute inset-0 bg-transparent z-10 cursor-pointer"
                  onClick={revealControls}
                />
              </div>

              {/* Custom control bar */}
              <div
                onClick={revealControls}
                className={`absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-2 transition-opacity duration-300 ${
                  showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => skip(-10)}
                    className={controlBtnClass}
                    aria-label="Rewind 10 seconds"
                  >
                    <RotateCcw className="w-[16px] h-[16px]" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className={controlBtnClass}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-[16px] h-[16px]" /> : <Play className="w-[16px] h-[16px]" />}
                  </button>

                  <button
                    onClick={() => skip(10)}
                    className={controlBtnClass}
                    aria-label="Forward 10 seconds"
                  >
                    <RotateCw className="w-[16px] h-[16px]" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className={controlBtnClass}
                    aria-label={isMuted ? "Unmute testimonials video" : "Mute testimonials video"}
                  >
                    {isMuted ? <VolumeX className="w-[16px] h-[16px]" /> : <Volume2 className="w-[16px] h-[16px]" />}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className={controlBtnClass}
                    aria-label="Fullscreen"
                  >
                    <Maximize className="w-[16px] h-[16px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: cards + nav */}
          <div
            className="[perspective:800px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex flex-col gap-[14px]">
              {visible.map((t, i) => (
                <TiltCard
                  key={`${t.author}-${start}-${i}`}
                  t={t}
                  animClass={animating ? (animDir === "next" ? "card-next" : "card-prev") : ""}
                  delay={i * 50}
                />
              ))}
            </div>

            {/* Nav arrows */}
            {testimonials.length > VISIBLE && (
              <div className="flex gap-[10px] mt-5 justify-end">
                {[
                  { label: "Previous", icon: <ChevronLeft size={17} />, fn: triggerPrev },
                  { label: "Next",     icon: <ChevronRight size={17} />, fn: triggerNext },
                ].map(({ label, icon, fn }) => (
                  <button
                    key={label}
                    onClick={fn}
                    aria-label={label}
                    className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-transparent transition-[border-color,color] duration-200 hover:border-[#07b4ba] hover:text-[#07b4ba]"
                    style={{
                      borderColor: "rgba(255,255,255,0.18)",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
