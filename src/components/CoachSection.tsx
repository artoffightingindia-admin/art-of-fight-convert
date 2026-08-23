import { Star } from "lucide-react";
import { useCms } from "@/context/CmsContext";

const defaultCoach1Points = [
  "Only Tamil Fighter to compete in MFN and a Multiple-Time National Medalist.",
  "Trained 2000+ MMA students, including national champions across multiple disciplines.",
  "10+ Years in MMA with 20+ Fights Competed Nationally & Internationally."
];

const defaultCoach2Points = [
  "State Boxing Champion & Pro-Am National Muay Thai Champion.",
  "5+ Years of Mixed Martial Arts Experience.",
  "Co-Creator of AOF's Programs & Content."
];

const CoachSection = () => {
  const { content } = useCms();
  const c = content.home;

  const coach1Points = c.coach1Points?.length ? c.coach1Points : defaultCoach1Points;
  const coach2Points = c.coach2Points?.length ? c.coach2Points : defaultCoach2Points;

  return (
    <section id="coaches" className="py-6 md:py-8 texture-diagonal">
      <div className="container max-w-6xl space-y-10 md:space-y-4">
        {/* ---------- LED BY (HEAD COACH) ---------- */}
        <div>
          <p className="text-primary text-xs md:text-sm font-semibold uppercase tracking-widest mb-4">
            {c.coachSectionTagline || "Led By"}
          </p>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            {/* Coach photo */}
            <div className="w-full max-w-[150px] md:max-w-none md:w-[220px] shrink-0">
              <img
                src={c.coach1Image || "https://i.postimg.cc/gjQP69D1/Purushoth-Coach-jpg.jpg"}
                alt={c.coach1Name || "Purushothaman MK"}
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
                  {c.coach1Name || "Purushothaman MK"}
                </h2>
                <p className="text-white text-sm mt-1">
                  {c.coach1Title || "Head Coach | Professional MMA Fighter"}
                </p>
              </div>

              {/* Dynamic bio text managed from Admin Panel */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                {c.coach1Bio ||
                  "Purushothaman helps beginners and athletes build real skills, confidence and discipline through structured training, clear fundamentals, and a proven path to lasting progress."}
              </p>

              <ul className="space-y-2">
                {coach1Points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-foreground text-sm md:text-base">
                    <Star className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span>{point}</span>
                  </li>
                ))}
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
            {/* Team photo */}
            <div className="w-full max-w-[150px] md:max-w-none md:w-[220px] shrink-0 order-1 md:order-2">
              <img
                src={c.coach2Image || "https://i.postimg.cc/Zn2hykcD/Kaviarasu-jpg.jpg"}
                alt={c.coach2Name || "Kaviarasu K"}
                className="aspect-[4/5] w-full rounded-xl object-cover border border-[#07b4ba]/30"
                style={{
                  boxShadow:
                    "0 0 15px rgba(7,180,186,0.25), 0 0 40px rgba(7,180,186,0.15)",
                }}
              />
            </div>

            {/* Text content */}
            <div className="flex-1 order-2 md:order-1 flex justify-start md:justify-end w-full">
              <div className="max-w-xl w-full">
                <div className="flex justify-start md:justify-end mb-4">
                  <div className="text-left md:text-right">
                    <h2 className="font-display text-3xl md:text-5xl text-[#07b4ba] leading-tight">
                      {c.coach2Name || "Kaviarasu K"}
                    </h2>
                    <p className="text-white text-sm mt-1">
                      {c.coach2Title || "Program Development | MMA Athlete"}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl md:text-right">
                    {c.coach2Bio ||
                      "Kaviarasu oversees program development and student support at Art of Fighting, ensuring every member has the guidance, accountability, and structure needed to succeed."}
                  </p>

                  <ul className="space-y-2 flex flex-col items-start md:items-end">
                    {coach2Points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3 text-foreground text-sm md:text-base md:flex-row-reverse md:text-right">
                        <Star className="w-4 h-4 text-primary shrink-0 mt-1" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachSection;
