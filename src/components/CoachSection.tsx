import { Star } from "lucide-react";

const CoachSection = () => (
  <section id="coaches" className="py-6 md:py-8 texture-diagonal">
    <div className="container max-w-6xl space-y-8 md:space-y-4">
      {/* ---------- LED BY ---------- */}
      <div>
        <p className="text-primary text-xs md:text-sm font-semibold uppercase tracking-widest mb-4">
          Led By
        </p>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Coach photo — reduced desktop width to 150px */}
          <div className="w-full max-w-[200px] md:w-[150px] shrink-0 mx-auto md:mx-0">
            <img
              src="https://i.postimg.cc/gjQP69D1/Purushoth-Coach-jpg.jpg"
              alt="Purushothaman MK"
              className="aspect-[4/5] w-full rounded-xl object-cover border border-[#07b4ba]/30"
              style={{
                boxShadow:
                  "0 0 15px rgba(7,180,186,0.25), 0 0 40px rgba(7,180,186,0.15)",
              }}
            />
          </div>

          {/* Right side: name + paragraph + bullets */}
          <div className="flex-1 space-y-3 w-full">
            <div>
              <h2 className="font-display text-3xl md:text-5xl text-[#07b4ba] leading-tight">
                Purushothaman MK
              </h2>
              <p className="text-white text-sm mt-1">
                Head Coach | Professional MMA Fighter
              </p>
            </div>

            <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
              Purushothaman helps beginners and athletes build real skills, confidence and discipline through structured training, clear fundamentals, and a proven path to lasting progress.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <Star className="w-4 h-4 text-primary shrink-0 mt-1" /> Only Tamil Fighter to compete in MFN and a Multiple-Time National Medalist.
              </li>
              <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <Star className="w-4 h-4 text-primary shrink-0 mt-1" /> Trained 2000+ MMA students, including national champions across multiple disciplines.
              </li>
              <li className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <Star className="w-4 h-4 text-primary shrink-0 mt-1" /> 10+ Years in MMA with 20+ Fights Competed Nationally & Internationally.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- AND A TEAM ---------- */}
      <div>
        <p className="text-primary text-xs md:text-sm font-semibold uppercase tracking-widest mb-4 text-left md:text-right">
          And
        </p>
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
          {/* Team photo - scales on mobile, matches coach on desktop */}
          <div className="w-full max-w-[200px] md:w-[150px] shrink-0 order-1 md:order-2 mx-auto md:mx-0">
            <img
              src="https://i.postimg.cc/Zn2hykcD/Kaviarasu-jpg.jpg"
              alt="Kaviarasu K"
              className="aspect-[4/5] w-full rounded-xl object-cover border border-[#07b4ba]/30"
              style={{
                boxShadow:
                  "0 0 15px rgba(7,180,186,0.25), 0 0 40px rgba(7,180,186,0.15)",
              }}
            />
          </div>

          {/* Bullets & Text: Left on mobile, Right on desktop */}
          <div className="flex-1 order-2 md:order-1 flex justify-start md:justify-end w-full">
            <div className="max-w-xl w-full">
              <div className="flex justify-start md:justify-end mb-4">
                <div className="text-left md:text-right">
                  <h2 className="font-display text-3xl md:text-5xl text-[#07b4ba] leading-tight">
                    Kaviarasu K
                  </h2>
                  <p className="text-white text-sm mt-1">
                    Program Development | MMA Athlete
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl md:text-right">
                  Kaviarasu oversees program development and student support at Art of Fighting, ensuring every member has the guidance, accountability, and structure needed to succeed.
                </p>

                <ul className="space-y-2 flex flex-col items-start md:items-end">
                  <li className="flex items-start gap-3 text-foreground text-sm md:text-base md:flex-row-reverse md:text-right">
                    <Star className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>State Boxing Champion & Pro-Am National Muay Thai Champion.</span>
                  </li>

                  <li className="flex items-start gap-3 text-foreground text-sm md:text-base md:flex-row-reverse md:text-right">
                    <Star className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>5+ Years of Mixed Martial Arts Experience.</span>
                  </li>

                  <li className="flex items-start gap-3 text-foreground text-sm md:text-base md:flex-row-reverse md:text-right">
                    <Star className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>Co-Creator of AOF's Programs & Content.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CoachSection;
