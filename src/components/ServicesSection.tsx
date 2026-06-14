import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const services = [
  {
    title: "1-ON-1 HOME TRANSFORMATION",
    desc: "A fully customized coaching experience combining MMA training, fitness, nutrition, accountability, and lifestyle guidance.",
    bullets: [
      "Personalized Coaching",
      "Tailored to your goal",
      "Built Around Your Lifestyle",
    ],
    cta: "START YOUR TRANSFORMATION",
    badge: "Most Personalized",
  },
  {
    title: "30-DAY MMA STRIKING PROGRAM",
    desc: "A structured online coaching experience designed to help beginners learn MMA striking fundamentals from home with confidence.",
    bullets: [
      "Step-by-step roadmap",
      "Learn at your own pace",
      "Coach feedback included",
    ],
    cta: "SEE HOW IT WORKS",
    badge: "BEST FOR SELF-LEARNERS",
  },
];

const ServicesSection = () => (
  <section id="programs" className="pt-4 pb-16 md:pt-6 md:pb-24 bg-card/50 texture-grid">
    <div className="container">
   <p className="text-[#07b4ba] font-['Barlow'] font-bold text-[14px] tracking-[4px] uppercase mb-3 text-center">
 CHOOSE YOUR PATH
</p>
     <h2 className="font-display text-4xl md:text-5xl text-foreground text-center mb-3">
TWO PATHS.ONE GOAL.REAL TRANSFORMATION.
</h2>

<p className="text-muted-foreground text-sm leading-relaxed text-center max-w-2xl mx-auto mb-10">
  Choose the coaching experience that best matches your goals, schedule, and lifestyle.
</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((s, idx) => (
          <div
            key={s.title}
            style={{ animationDelay: `${idx * 150}ms` }}
            className="relative bg-card border border-border rounded-lg p-8 flex flex-col items-start text-left gap-5 hover:border-primary/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 animate-fade-up"
          >
           {s.badge && (
  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-wide px-4 py-1 rounded-full">
    {s.badge}
  </span>
)}
            <h3 className="font-display text-3xl text-foreground">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            <ul className="flex flex-col gap-3 w-full">
              {s.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="text-primary mt-0.5 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <Button className="font-semibold uppercase text-xs tracking-wide mt-auto w-full transition-transform hover:scale-[1.02]">
              {s.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
