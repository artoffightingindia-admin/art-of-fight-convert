import { Button } from "@/components/ui/button";
import TrustIndicators from "@/components/TrustIndicators";
import { useNavigate } from "react-router-dom";
import { useCms } from "@/context/CmsContext";

const HeroSection = () => {
  const navigate = useNavigate();
  const { content } = useCms();

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}`
      : url;
  };

  const embedUrl = getYoutubeEmbedUrl(content.youtubeVideoUrl);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
    >
      {/* Background Image (Managed by Admin Panel) */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.heroImage || "/images/Hero.jpg"}
          alt="MMA Fighter"
          className="w-full h-full object-cover opacity-50 md:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between pt-24 pb-12 gap-8">
        <div className="max-w-xl space-y-5">
          <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-3">
            Art of Fighting Academy
          </p>

          <h1 className="font-display text-4xl md:text-6xl leading-[0.95] text-foreground uppercase whitespace-pre-line">
            {content.heroTitle || "STOP DOUBTING.\nSTART LEARNING MMA\nTHE RIGHT WAY."}
          </h1>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
            {content.heroSubtitle ||
              "Whether you're starting at home or want to train with a coach, AOF provides the structure, guidance, and accountability to achieve real results."}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              variant="outline"
              disabled
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-sm uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
            >
              1 on 1 Coaching (Coming Soon)
            </Button>

            <Button
              size="lg"
              onClick={() => navigate("/program")}
              className="font-semibold text-sm uppercase tracking-wide"
            >
              AOF 30 Days Program
            </Button>
          </div>
        </div>

        {/* Featured YouTube Video (Optional - Shows if a valid URL exists) */}
        {embedUrl && (
          <div className="w-full max-w-md lg:max-w-lg aspect-video rounded-xl overflow-hidden shadow-2xl border border-zinc-800 bg-black/40">
            <iframe
              className="w-full h-full"
              src={embedUrl}
              title="AOF Featured Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Trust Strip */}
      <div className="relative z-10 w-full">
        <TrustIndicators />
      </div>
    </section>
  );
};

export default HeroSection;
