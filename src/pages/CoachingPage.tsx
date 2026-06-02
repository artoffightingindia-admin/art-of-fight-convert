import { useEffect, useRef, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  Trophy,
  Play,
  Calendar,
  Activity,
  Sprout,
  Globe,
  MessageSquare,
  Check,
  Quote,
  ChevronLeft,
  ChevronRight,
  Star,
  User,
  Target,
  Headphones,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* ---------- Reveal wrapper ---------- */
const Reveal = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVisible(true), obs.disconnect()),
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={visible ? "animate-fade-up" : "opacity-0"}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

/* ---------- Program Top Bar ---------- */
const ProgramNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-display text-3xl text-primary tracking-wider">
          AOF
        </a>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="hidden sm:flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} /> Back To Home
          </button>
          <Button className="font-semibold uppercase tracking-wide">Join Now</Button>
        </div>
      </div>
    </nav>
  );
};

/* ---------- 1. HERO ---------- */
const Hero = () => (
  <section className="relative min-h-screen flex flex-col pt-16">
    <div className="absolute inset-0 z-0">
      <img src="/images/hero-fighter.jpg" alt="MMA Fighter" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
    </div>
    <div className="container relative z-10 flex-1 flex items-center py-12">
      <div className="max-w-2xl space-y-6">
        <p className="text-primary font-semibold text-sm uppercase tracking-widest">
          AOF 30-Day Online Program
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-foreground">
          Build Real<br />
          <span className="text-primary">MMA Striking</span><br />
          Fundamentals
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">
          A structured system designed to create visible improvement in your first 30 days. Built for absolute beginners.
        </p>
        <Button size="lg" className="font-semibold uppercase tracking-wide px-10">
          Join Now
        </Button>
      </div>
    </div>
    {/* Trust strip */}
    <div
      className="relative z-10 w-full grid grid-cols-3 px-4 md:px-8 gap-4"
      style={{ backgroundColor: "#07b4ba", height: "1.5cm" }}
    >
      {[
        { icon: ShieldCheck, label: "Proven System" },
        { icon: Users, label: "Tamil Team" },
        { icon: Trophy, label: "Real Results" },
      ].map((i) => (
        <div key={i.label} className="flex items-center justify-center gap-2">
          <i.icon className="w-4 h-4 md:w-5 md:h-5 text-white shrink-0" />
          <span className="font-display text-xs md:text-sm text-white tracking-wide whitespace-nowrap">
            {i.label}
          </span>
        </div>
      ))}
    </div>
  </section>
);

/* ---------- 2. Sounds Familiar ---------- */
const PainPoints = () => (
  <section className="py-16 md:py-24 texture-diagonal">
    <div className="container max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">Sounds Familiar?</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            You're Training Hard…<br /> But Still Not Improving
          </h2>
          <div className="h-1 w-16 bg-destructive rounded" />
          <ul className="space-y-3">
            {[
              "You train 4–5 days a week but your technique isn't improving",
              "Your sparring partners are getting better — you feel stuck",
              "You have no structured plan, just random gym sessions",
              "Coaches at your gym don't give you personal attention",
              "You don't know what to fix or where to even start",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <span className="w-1 h-5 bg-destructive shrink-0 mt-1 rounded" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="aspect-video rounded-xl bg-gradient-to-br from-muted to-card flex items-center justify-center">
          <Activity className="w-16 h-16 text-muted-foreground/30" />
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 3. AOF Intro ---------- */
const Intro = () => (
  <section className="py-16 md:py-24 bg-card/50 texture-diagonal">
    <div className="container max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-card" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
              <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">AOF Intro Section</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground leading-tight">
            Welcome to the <span className="text-primary">AOF Family</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            At Art of Fight, we're more than just a gym — we're a family built on discipline, respect, and relentless growth.
            Our coaches bring years of real fight experience to every session.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Whether you're a complete beginner or training for competition, you'll find a system designed to push your limits safely while building strong fundamentals, sharp technique, and fighter mentality.
          </p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 4. What You Get ---------- */
const WhatYouGet = () => {
  const items = [
    { icon: Calendar, title: "Made Exclusively For Beginners", desc: "Clear guidance from day one" },
    { icon: Activity, title: "Structured Progression", desc: "Stance → punches → kicks → combinations" },
    { icon: Sprout, title: "No Equipment Or Partner Needed", desc: "Train effectively from the comfort of your home." },
    { icon: Globe, title: "Tamil-Guided Instruction", desc: "For better understanding" },
    { icon: MessageSquare, title: "Just 30–40 Minutes A Day", desc: "Built for busy schedules" },
  ];
  return (
    <section className="py-16 md:py-24 texture-grid">
      <div className="container">
        <div className="text-center mb-12 space-y-2">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">What's Included</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">What You Get</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 100}>
              <div className="bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center gap-4 h-full hover:border-primary/50 hover:-translate-y-1 transition-all duration-300">
                <it.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                <h3 className="font-display text-sm md:text-base text-primary tracking-wider uppercase">{it.title}</h3>
                <p className="text-muted-foreground text-xs md:text-sm">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------- 5. Roadmap ---------- */
const Roadmap = () => {
  const weeks = [
    { n: "1st Week", days: "Days 1 – 7", items: ["Fundamentals", "Basic Techniques", "Conditioning", "Mindset Building"] },
    { n: "2nd Week", days: "Days 8 – 14", items: ["Skill Development", "Strength & Power", "Drills & Combos", "Recovery Focus"] },
    { n: "3rd Week", days: "Days 15 – 21", items: ["Advanced Combos", "Sparring Drills", "Defense Work", "Footwork Mastery"] },
    { n: "4th Week", days: "Days 22 – 28", items: ["Pressure Testing", "Live Drills", "Mental Toughness", "Endurance Build"] },
    { n: "5th Week", days: "Days 29 – 30+", items: ["Performance Review", "Final Assessment", "Next Steps Plan", "Graduation"] },
  ];
  const [idx, setIdx] = useState(0);
  const next = () => setIdx((p) => (p + 1) % weeks.length);
  const prev = () => setIdx((p) => (p - 1 + weeks.length) % weeks.length);
  // show 2 at a time
  const visible = [weeks[idx], weeks[(idx + 1) % weeks.length]];

  return (
    <section className="py-16 md:py-24 texture-diagonal">
      <div className="container max-w-6xl">
        <div className="text-center mb-10 space-y-2">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">30 Days Transformation Journey</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Your <span className="text-primary">5 Week</span> Roadmap
          </h2>
          <p className="text-muted-foreground text-sm">A structured path. Weekly focus. Real results.</p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto mb-10 px-4">
          <div className="absolute top-3 left-0 right-0 h-px bg-border" />
          <div className="grid grid-cols-5 relative">
            {weeks.map((w, i) => (
              <div key={w.n} className="flex flex-col items-center text-center">
                <span className={`text-[10px] md:text-xs font-display uppercase tracking-widest mb-2 ${i === idx || i === idx + 1 ? "text-primary" : "text-muted-foreground"}`}>
                  {w.n}
                </span>
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    i === idx || i === (idx + 1) % weeks.length
                      ? "bg-primary border-primary shadow-[0_0_12px_hsl(var(--primary))]"
                      : "border-primary/50 bg-transparent"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cards + arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="shrink-0 w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            {visible.map((w) => (
              <div key={w.n} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="aspect-square bg-gradient-to-br from-muted to-card flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                  <div className="p-5 flex flex-col gap-3">
                    <h3 className="font-display text-2xl text-foreground">{w.n}</h3>
                    <div className="h-px bg-primary/50 w-12" />
                    <ul className="space-y-2">
                      {w.items.map((it) => (
                        <li key={it} className="flex items-center gap-2 text-foreground text-xs md:text-sm">
                          <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="text-primary text-xs md:text-sm font-display tracking-widest text-center py-3 border-t border-border">
                  {w.days}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={next}
            className="shrink-0 w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ---------- 6. Our Promise ---------- */
const OurPromise = () => (
  <section className="py-16 md:py-20 texture-diagonal">
    <div className="container max-w-4xl text-center space-y-6">
      <h2 className="font-display text-3xl md:text-5xl text-foreground">Our Promise</h2>
      <div className="h-px w-16 bg-primary mx-auto" />
      <div className="flex justify-center">
        <Quote className="w-6 h-6 text-primary" />
      </div>
      <p className="text-base md:text-lg text-muted-foreground italic leading-relaxed">
        Most fighters train hard. Very few train correctly. AOF exists to close that gap — with structure,
        accountability, and coaching that actually evolves with you.
      </p>
      <Button size="lg" className="w-full font-semibold uppercase tracking-wide">
        Join Now
      </Button>
    </div>
  </section>
);

/* ---------- 7. Led By ---------- */
const LedBy = () => (
  <section className="py-16 md:py-24 texture-grid">
    <div className="container max-w-6xl">
      <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-6">Led By</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-muted to-card flex items-center justify-center">
          <User className="w-20 h-20 text-muted-foreground/40" />
        </div>
        <div className="md:col-span-2 space-y-5">
          <h2 className="font-display text-4xl md:text-5xl text-foreground">Head Coach</h2>
          <p className="text-primary font-semibold text-sm uppercase tracking-widest">
            AOF Academy — Lead Trainer & Founder
          </p>
          <ul className="space-y-3">
            {[
              "Former Professional MMA Fighter — 12+ Years Ring Experience",
              "Trained athletes who compete at national and international level",
              "Specialist in striking, grappling transitions and mental conditioning",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-foreground text-sm md:text-base">
                <Check className="w-4 h-4 text-primary shrink-0 mt-1" strokeWidth={3} />
                {t}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            {[
              { v: "1,000+", l: "Athletes Coached" },
              { v: "10+", l: "Years Experience" },
              { v: "50+", l: "Champions Trained" },
              { v: "3", l: "Continents" },
            ].map((s) => (
              <div key={s.l} className="bg-card border border-border rounded-xl p-4 text-center space-y-1">
                <p className="font-display text-2xl md:text-3xl text-primary">{s.v}</p>
                <p className="text-muted-foreground text-[10px] md:text-xs uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 8. Featured Result ---------- */
const FeaturedResult = () => (
  <section className="py-16 md:py-24 texture-diagonal">
    <div className="container max-w-6xl">
      <div className="text-center mb-10 space-y-2">
        <p className="text-primary text-sm font-semibold uppercase tracking-widest">Real People, Real Results</p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground">
          Trusted By Fighters, <span className="text-primary">Proven Results</span>
        </h2>
        <p className="text-muted-foreground text-sm">Here's What Athletes Say About Their Transformation With AOF</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-card flex items-center justify-center">
          <User className="w-20 h-20 text-muted-foreground/40" />
        </div>
        <div className="space-y-5">
          <h3 className="font-display text-3xl md:text-4xl text-foreground leading-tight">
            AOF Changed The Way <span className="text-primary">I Train And Perform.</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            The structure, the attention to detail, and the accountability took me to a level I never thought possible.
            I'm stronger, faster, and fight with more confidence than ever.
          </p>
          <p className="text-primary font-semibold text-sm">— Alex M., Amateur MMA Fighter</p>
        </div>
      </div>
    </div>
  </section>
);

/* ---------- 9. Testimonials Carousel ---------- */
const TestimonialsCarousel = () => {
  const data = [
    { name: "Jordan K.", role: "Member", text: "In 8 weeks my footwork completely changed. My coach saw things I couldn't see myself and fixed them immediately." },
    { name: "Priya S.", role: "Member", text: "I was plateau'd for over a year. AOF broke that within the first month. The personalised approach is unlike anything else." },
    { name: "Carlos R.", role: "Member", text: "Best investment I've made in my fight career. The plan, the focus, the accountability — it's all here." },
    { name: "Meera T.", role: "Member", text: "My striking improved drastically. The structured plan made all the difference in my fight." },
    { name: "Arun V.", role: "Fighter", text: "Real coaches, real results. Every week I felt sharper and more disciplined than the last." },
  ];
  const [start, setStart] = useState(0);
  const VISIBLE = 3;
  const next = () => setStart((s) => (s + 1) % data.length);
  const prev = () => setStart((s) => (s - 1 + data.length) % data.length);
  const visible = Array.from({ length: VISIBLE }, (_, i) => data[(start + i) % data.length]);

  return (
    <section className="py-16 md:py-24 texture-dots">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {visible.map((t, i) => (
            <div
              key={`${t.name}-${start}-${i}`}
              className="bg-card border border-border rounded-2xl p-6 space-y-4 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

/* ---------- 10. Bonuses ---------- */
const Bonuses = () => {
  const bonuses = [
    { icon: Sprout, title: "Fighter Nutrition Guide", value: "₹1499 Value" },
    { icon: Activity, title: "Daily Mobility Routine", value: "₹1299 Value" },
    { icon: Users, title: "Private Fighters Community", value: "₹1299 Value" },
    { icon: Target, title: "Advanced Shadowboxing Flows", value: "₹1299 Value" },
    { icon: Headphones, title: "Fighter Mindset Audio Pack", value: "₹1199 Value" },
  ];
  return (
    <section className="py-16 md:py-24 texture-grid">
      <div className="container max-w-6xl">
        <div className="text-center mb-10 space-y-2">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">Exclusive Founders Bonuses</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">
            5 Premium Bonuses. <span className="text-primary">Free With Enrollment.</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Join the Founder's Batch and unlock premium resources at no extra cost.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-6">
          {bonuses.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className="relative bg-card border border-primary/30 rounded-2xl p-5 flex flex-col items-center text-center gap-3 h-full">
                <span className="absolute -top-2 left-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded">
                  #{i + 1}
                </span>
                <b.icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
                <h3 className="font-display text-xs md:text-sm text-foreground uppercase tracking-wider leading-tight">{b.title}</h3>
                <div className="h-px w-full bg-border" />
                <p className="text-primary font-bold text-xs md:text-sm">{b.value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="border border-primary/40 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 bg-card/50">
          <Gift className="w-16 h-16 md:w-20 md:h-20 text-primary shrink-0" strokeWidth={1.2} />
          <div className="flex-1 text-center md:text-left">
            <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">Total Bonus Value</p>
            <p className="font-display text-3xl md:text-5xl text-primary">₹7,499</p>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-4xl text-foreground">Yours 100% Free</h3>
            <p className="text-muted-foreground text-sm mt-1">
              When you join the AOF 30-Day MMA Striking Program.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------- FAQ ---------- */
const FAQ = () => {
  const faqs = [
    { q: "Is this program suitable for absolute beginners?", a: "Yes — the entire program is designed from day one for people with no prior MMA experience." },
    { q: "How much time do I need every day?", a: "Just 30–40 minutes a day, structured to fit busy schedules." },
    { q: "Do I need a partner or equipment?", a: "No. You can complete the entire program at home with no equipment or training partner." },
    { q: "Will I have direct coach access?", a: "Yes, members get access to our private community and direct coach feedback." },
    { q: "What if I miss a day?", a: "The program is flexible — you can catch up at your own pace without losing structure." },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-3xl">
        <div className="text-center mb-10 space-y-2">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest">FAQ</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card border border-border rounded-lg px-5"
            >
              <AccordionTrigger className="text-foreground font-medium text-sm hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

/* ---------- Footer ---------- */
const ProgramFooter = () => (
  <footer className="bg-background border-t border-border">
    <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-display text-2xl text-primary">AOF</p>
      <p className="text-muted-foreground text-xs">
        © {new Date().getFullYear()} Art of Fighting Academy. All rights reserved.
      </p>
      <div className="flex gap-4 text-xs text-muted-foreground">
        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
        <a href="#" className="hover:text-primary transition-colors">Terms</a>
      </div>
    </div>
  </footer>
);

/* ---------- Page ---------- */
const CoachingPage = () => (
  <div className="min-h-screen">
    <ProgramNav />
    <Hero />
    <Reveal><PainPoints /></Reveal>
    <Reveal><Intro /></Reveal>
    <Reveal><WhatYouGet /></Reveal>
    <Reveal><Roadmap /></Reveal>
    <Reveal><OurPromise /></Reveal>
    <Reveal><LedBy /></Reveal>
    <Reveal><FeaturedResult /></Reveal>
    <TestimonialsCarousel />
    <Reveal><Bonuses /></Reveal>
    <Reveal><FAQ /></Reveal>
    <ProgramFooter />
  </div>
);

export default CoachingPage;
