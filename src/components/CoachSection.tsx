import { Star, User, Users } from "lucide-react";

const CoachSection = () => (
  <section id="coaches" className="py-6 md:py-8 texture-diagonal">
    <div className="container max-w-6xl space-y-4">
      {/* ---------- LED BY ---------- */}
      <div>
        <p className="text-primary text-xs md:text-sm font-semibold uppercase tracking-widest mb-4">
          Led By
        </p>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Coach photo — same size as team image */}
          <div className="w-full md:w-[180px] shrink-0">
            <div className="aspect-[4/5] rounded-xl bg-muted/30 flex items-center justify-center">
              <User className="w-12 h-12 text-muted-foreground/50" />
            </div>
          </div>

          {/* Right side: name + paragraph + bullets */}
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
                Purushothaman MK
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Head Coach | PRO MMA Fighter</p>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
             Purushothaman has dedicated his career to helping people develop real skills, confidence, and discipline through structured training. From complete beginners to competitive athletes, his coaching philosophy remains the same: simplify the process, focus on fundamentals, and create lasting progress.
            </p>

            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <Star className="w-4 h-4 text-primary shrink-0 mt-1" />  Only Tamil Fighter to compete in MFN and a Multiple-Time National Medalist.
              </li>
              <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <Star className="w-4 h-4 text-primary shrink-0 mt-1" />Trained 2000+ MMA students, including national champions across multiple disciplines.
              </li>
              <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <Star className="w-4 h-4 text-primary shrink-0 mt-1" /> 10+ Years in MMA with 20+ Fights Competed Nationally \& Internationally.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- AND A TEAM ---------- */}
      <div>
        <p className="text-primary text-xs md:text-sm font-semibold uppercase tracking-widest mb-4 md:text-right">
SUPPORTED BY
        </p>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Bullets on the LEFT */}
        <div className="flex-1 order-2 md:order-1 flex md:justify-end">
            <div className="max-w-md space-y-3">
              <div>
                <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
                  Kaviarasu K
                </h2>
                <p className="text-muted-foreground text-sm mt-1">Program Development | MMA Athlete</p>
              </div>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                As the driving force behind Art of Fighting, Kaviarasu leads program development, student support, and community growth. His focus is helping students stay accountable, build strong fundamentals, and get the most out of their training.
              </p>

             <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                  <Star className="w-4 h-4 text-primary shrink-0 mt-1" /> State Boxing Champion & Pro-Am National Muay Thai Champion.
                </li>
                <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                  <Star className="w-4 h-4 text-primary shrink-0 mt-1" /> 5+ Years of Mixed Martial Arts Experience.
                </li>
                <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                  <Star className="w-4 h-4 text-primary shrink-0 mt-1" /> Co-Creator of AOF's Programs & Content.
                </li>
              </ul>
            </div>
          </div>

          {/* Team photo on the RIGHT */}
          <div className="w-full md:w-[180px] shrink-0 order-1 md:order-2">
            <div className="aspect-[4/5] rounded-xl bg-muted/30 flex items-center justify-center">
              <Users className="w-12 h-12 text-muted-foreground/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CoachSection;
