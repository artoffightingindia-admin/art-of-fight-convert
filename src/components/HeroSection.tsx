import { Button } from "@/components/ui/button";
import TrustIndicators from "@/components/TrustIndicators";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
<img
  src="/images/Hero.jpg.jpeg"
  alt="MMA Fighter"
  className="w-full h-full object-cover"
/>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/20 to-transparent" /> */}
      </div>

      {/* Content */}
      <div className="container relative z-10 flex-1 flex items-center pt-16">
        <div className="max-w-lg space-y-5">
          
          <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-3">
            Art of Fighting Academy
          </p>

          <h1 className="font-display text-4xl md:text-6xl leading-[0.95] text-foreground">
         STOP DOUBTING.
            <br />
          START LEARNING MMA THE RIGHT WAY.
          </h1>

          <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md">
            Whether you want to learn striking at home or transform your fitness with personal coaching, AOF gives you a proven path to train smarter, stay consistent, and see real progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/coaching")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-sm uppercase tracking-wide"
            >
              1 on 1 Coaching
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
      </div>

      {/* Trust Strip */}
      <div className="relative z-10 w-full">
        <TrustIndicators />
      </div>
    </section>
  );
};

export default HeroSection;
