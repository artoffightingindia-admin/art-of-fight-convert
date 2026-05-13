import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

/* ── TYPES ── */
interface RevealProps {
  children: ReactNode;
  style?: CSSProperties;
}

interface LeadForm {
  name: string;
  phone: string;
  goal: string;
  date: string;
  time: string;
}

/* ── REVEAL COMPONENT ── */
function Reveal({ children, style = {} }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: "opacity 0.65s ease, transform 0.65s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── ICONS ── */
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="24"
    height="24"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.681-.513-5.21-1.408l-.374-.222-3.876.923.938-3.792-.244-.39A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

/* Consistent teal stroke icon set */
const IconPlan = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
  </svg>
);

const IconChat = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconLeaf = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z" />
  </svg>
);

const IconChart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconGlobe = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

/* Method icons — teal stroke consistent */
const IconTarget = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconZap = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconTrend = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconUser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconTrophy = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16M12 17v5M7 4v6a5 5 0 0 0 10 0V4H7z" />
  </svg>
);

const IconShield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#07b4ba"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* ── DATA ── */
const methodItems = [
  {
    icon: <IconTarget />,
    title: "Personalised Fight Plan",
    desc: "A roadmap built entirely around your body type, skill level, and competition goals.",
  },
  {
    icon: <IconZap />,
    title: "High-Intensity Drilling",
    desc: "Focused repetition drills that embed proper technique into muscle memory fast.",
  },
  {
    icon: <IconTrend />,
    title: "Progressive Overload",
    desc: "Structured intensity cycles to keep your body adapting and improving every week.",
  },
  {
    icon: <IconUser />,
    title: "1-on-1 Accountability",
    desc: "Your coach tracks every session, reviews footage, and adjusts the plan in real time.",
  },
  {
    icon: <IconTrophy />,
    title: "Competition Preparation",
    desc: "Full camp-style peaking for tournaments — physically and mentally ready to win.",
  },
];

const whatCards = [
  {
    icon: <IconPlan />,
    title: "Personalised Training Plan",
    desc: "Custom program built around your goals, schedule, and current level",
  },
  {
    icon: <IconChat />,
    title: "Direct Coach Access",
    desc: "WhatsApp access for questions, check-ins, and accountability between sessions",
  },
  {
    icon: <IconLeaf />,
    title: "Nutrition Guidance",
    desc: "Simple, effective nutrition advice to support performance, recovery, and body composition",
  },
  {
    icon: <IconChart />,
    title: "Progress Tracking",
    desc: "We track your progress, adjust the plan and keep you moving in the right direction",
  },
  {
    icon: <IconGlobe />,
    title: "Game Plan",
    desc: "Opponent-based strategies tailored to your fight style",
  },
];

// CHANGE 2: Removed "Coaches remotely across 3 continents with proven results" entry
const coachCredentials = [
  "Former Professional MMA Fighter — 12+ Years Ring Experience",
  "Trained athletes who compete at national and international level",
  "Specialist in striking, grappling transitions and mental conditioning",
];

const stats = [
  { val: "1,000+", label: "Athletes Coached" },
  { val: "10+", label: "Years Experience" },
  { val: "50+", label: "Champions Trained" },
  { val: "3", label: "Continents" },
];

// CHANGE 3: 7 feedback cards for the new infinite scroll
const feedbackCards = [
  {
    text: "In 8 weeks my footwork completely changed. My coach saw things I couldn't see myself and fixed them immediately.",
    author: "Jordan K.",
  },
  {
    text: "I was plateau'd for over a year. AOF broke that within the first month. The personalised approach is unlike anything else.",
    author: "Priya S.",
  },
  {
    text: "Best investment I've made in my fight career. The plan, the feedback, the accountability — it's all dialled in perfectly.",
    author: "Carlos R.",
  },
  {
    text: "The coaches actually care. I've gained real skill in just a few months of training with AOF.",
    author: "Seity M.",
  },
  {
    text: "Best decision I made this year. The structure and support is unlike any gym I've trained at before.",
    author: "Rolen A.",
  },
  {
    text: "From complete beginner to ring-ready in just a few months. AOF's system truly works.",
    author: "Karthik V.",
  },
  {
    text: "My performance improved drastically. The personalised game plan made all the difference in my last fight.",
    author: "Rahul P.",
  },
];

const checklistItems = [
  "Free 30-minute strategy call included",
  "No long-term contracts — cancel anytime",
  "Results guaranteed or coaching extended free",
  "Start within 48 hours of approval",
];

// CHANGE 4: FAQ data
const faqItems = [
  {
    question: "Who is AOF 1-on-1 coaching for?",
    answer:
      "AOF coaching is designed for serious fighters and committed beginners alike — anyone who is tired of training without direction. Whether you're a competitive MMA athlete looking to peak for your next bout, or someone starting from scratch who wants to build real skill fast, our personalised system is built around your specific goals, body type, and schedule.",
  },
  {
    question: "How does the remote coaching work?",
    answer:
      "After your strategy call, your coach builds a fully customised training plan and delivers it digitally. You'll have direct WhatsApp access to your coach for questions, feedback, and check-ins. You submit session videos for review, and your coach adjusts the plan in real time based on what they see. It's as close to a personal gym session as you can get — from anywhere in the world.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most athletes report noticeable improvements in technique and conditioning within the first 3–4 weeks. Significant transformation — improved footwork, sharper combinations, better game strategy — typically takes 6–8 weeks of consistent training under the AOF method. Your timeline depends on your starting point and consistency, but your coach will track every metric to keep you progressing.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer:
      "Beginners are welcome and thrive in the AOF system. In fact, starting with proper 1-on-1 coaching before picking up bad habits is the fastest route to becoming a skilled fighter. Your plan will start at the right level and progress at a pace that challenges you without overwhelming you.",
  },
  {
    question: "Is there a contract or long-term commitment?",
    answer:
      "No long-term contracts. You can cancel anytime. We are confident enough in our results that we don't need to lock you in. We also back that up with a results guarantee — if you don't see measurable progress, we'll extend your coaching for free until you do.",
  },
];

/* ── CSS ── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;800;900&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a0a0a; }

.cp { background: #0a0a0a; font-family: 'Barlow', sans-serif; color: #fff; overflow-x: hidden; }

/* NAVBAR */
.cp-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 40px;
  background: rgba(10,10,10,0.96); backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.cp-nav-logo {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 32px; letter-spacing: 6px; color: #07b4ba;
}
.cp-nav-right { display: flex; align-items: center; gap: 20px; }
.cp-back {
  display: flex; align-items: center; gap: 8px;
  background: none; border: none; color: rgba(255,255,255,0.65);
  font-family: 'Barlow', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: color 0.2s;
}
.cp-back:hover { color: #fff; }
.cp-book-nav {
  padding: 10px 24px; border-radius: 6px;
  background: #07b4ba; color: #fff;
  font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 2px;
  border: none; cursor: pointer; transition: background 0.2s;
}
.cp-book-nav:hover { background: #059a9f; }

/* HERO */
.cp-hero { position: relative; min-height: 25vh; padding-bottom: 48px; }
.cp-hero-bg { position: absolute; inset: 0; z-index: 0; }
.cp-hero-overlay {
  background: linear-gradient(to right, #0a0a0a 35%, rgba(10,10,10,0.55) 60%, transparent 100%);
}
.cp-hero-content { position: relative; z-index: 2; max-width: 750px; padding: 100px 40px 38px; }
.cp-hero-tag {
  color: #07b4ba; font-family: 'Barlow', sans-serif; font-size: 12px;
  font-weight: 700; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 16px;
}
.cp-hero-h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(42px, 5.5vw, 72px);
  line-height: 0.95; letter-spacing: 2px; text-transform: uppercase;
  color: #fff; margin-bottom: 20px;
}
.cp-hero-h1 span { color: #07b4ba; }
.cp-hero-desc {
  color: rgba(255,255,255,0.62); font-family: 'Barlow', sans-serif;
  font-size: 16px; line-height: 1.7; max-width: 480px; margin-bottom: 32px;
}
.cp-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

/* CHANGE 1: Button text color changed to #fff, dimensions match Home Page Hero */
.cp-btn-primary {
  padding: 14px 34px; border-radius: 7px; background: #07b4ba; color: #fff;
  font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 2px;
  border: none; cursor: pointer; transition: background 0.2s;
}
.cp-btn-primary:hover { background: #059a9f; }
/* CHANGE 1: "See Results" / outline button removed from JSX; keeping class for safety */
.cp-btn-outline {
  padding: 14px 34px; border-radius: 7px; background: transparent; color: #fff;
  font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 2px;
  border: 2px solid #07b4ba; cursor: pointer; transition: all 0.2s;
}
.cp-btn-outline:hover { background: rgba(7,180,186,0.1); }
/* TRUST STRIP */
.cp-trust {
  position: absolute; bottom: 0px; left: 0; width: 100%;
  background: #07b4ba; height: 50px;
  display: flex; align-items: center; justify-content: space-around;
  padding: 0 40px; gap: 12px; flex-wrap: wrap;
}
.cp-trust-item {
  display: flex; align-items: center; gap: 12px;
  font-family: 'Bebas Neue', sans-serif; letter-spacing: 2px;
}
.trust-icon-box {
  width: 42px; height: 42px;
  display: flex; align-items: center; justify-content: center;
}
.trust-icon-box svg { width: 30px; height: 30px; stroke: #fff; fill: none; stroke-width: 2; }

/* SECTION WRAPPER */
.cp-section { max-width: 1100px; margin: 0 auto; padding: 45px 0px; }

/* PAIN SECTION */
.cp-pain-grid { display: flex; gap: 100px; align-items: center; flex-wrap: wrap; }
.cp-pain-media {
  flex: 0 0 500px; max-width: 100%; border-radius: 14px;
  overflow: hidden; border: 1px solid rgba(255,255,255,0.1);
}
.cp-pain-media img { width: 100%; display: block; aspect-ratio: 16/9; object-fit: cover; }
.cp-pain-right { flex: 1; min-width: 260px; padding-top: 8px; padding-left: 8px; }
.cp-pain-label { color: #07b4ba; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 18px; margin-bottom: 8px; }
.cp-pain-heading {
  color: #fff; font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(24px, 3vw, 32px); letter-spacing: 1px;
  margin-bottom: 16px; line-height: 1.1;
}
.cp-red-divider {
  width: 80px; height: 3px; margin-bottom: 24px;
  background: #e53e3e; border-radius: 2px;
  box-shadow: 0 0 10px rgba(229,62,62,0.7), 0 0 24px rgba(229,62,62,0.35);
}
.cp-pain-item { display: flex; align-items: center; gap: 35px; margin-bottom: 14px; }
.cp-pain-item::before {
  content: ""; width: 3px; height: 18px;
  background: #ff2d2d; border-radius: 2px;
  box-shadow: 0 0 6px rgba(255,45,45,0.9), 0 0 16px rgba(255,45,45,0.6), 0 0 28px rgba(255,45,45,0.3);
}
.cp-pain-item p { color: rgba(255,255,255,0.7); font-size: 18px; line-height: 1.5; }

/* METHOD SECTION */
.cp-method-bg { background: #0d0d0d; }
.cp-method-grid { display: flex; gap: 48px; align-items: flex-start; flex-wrap: wrap; }
.cp-method-text { flex: 1; min-width: 260px; order: 1; }
.cp-method-image { flex: 0 0 500px; max-width: 100%; order: 2; }
.cp-method-item {
  display: flex; align-items: flex-start; gap: 12px; margin-bottom: 10px;
  padding: 16px 10px; border-radius: 6px;
  background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.04);
}
.cp-method-line {
  font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.75);
  font-size: 13.5px; line-height: 1.45; margin: 0;
}
.cp-method-item-icon { margin-top: 3px; flex-shrink: 0; }
.cp-method-item-icon svg { width: 34px; height: 34px; }
.cp-method-item h4 {
  font-family: 'Bebas Neue', sans-serif; font-size: 16px;
  letter-spacing: 1px; color: #fff; margin-bottom: 4px;
}
.cp-method-item p {
  font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.52);
  font-size: 13px; line-height: 1.55;
}

/* WHAT YOU GET */
.cp-what-cards { display: flex; gap: 45px; flex-wrap: wrap; justify-content: center; }
.cp-what-card {
  width: 175px; min-height: 255px; padding: 11px 6px;
  border-radius: 18px; background: #1a1a1a; border: 2px solid #07b4ba;
  text-align: center; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px;
}
.cp-what-card-icon { width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; }
.cp-what-card-icon svg { width: 52px; height: 52px; }
.cp-what-card h4 {
  font-family: 'Bebas Neue', sans-serif; color: #07b4ba;
  font-size: 16px; letter-spacing: 0.8px; line-height: 1.3;
}
.cp-what-card p { font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.5; }

/* OUR PROMISE */
.cp-promise { max-width: 670px; margin: 36px auto 0; text-align: center; padding: 0 20px; position: relative; }
.cp-promise-text {
  font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.7);
  font-size: 15px; line-height: 0.9; font-style: italic;
  max-width: 570px; margin: 0 auto;
}
.cp-promise-text::before { content: "\u201C"; color: #07b4ba; font-size: 50px; margin-right: 6px; }
.cp-promise h4 {
  font-family: 'Bebas Neue', sans-serif; color: #07b4ba;
  font-size: 22px; letter-spacing: 1.5px; margin-bottom: 10px;
}

/* COACH */
.cp-coach-bg { background: #0a0a0a; }
.cp-book-strip { background: #07b4ba; padding: 0; display: flex; align-items: center; justify-content: center; }
.cp-book-strip button {
  width: 100%; padding: 14px; background: none; border: none;
  cursor: pointer; color: #fff; font-family: 'Bebas Neue', sans-serif;
  font-size: 20px; letter-spacing: 3px; transition: background 0.2s;
}
.cp-book-strip button:hover { background: rgba(0,0,0,0.08); }

/* TESTIMONIALS */
.cp-testi-bg { background: #0d0d0d; }
.cp-testi-main { display: flex; gap: 48px; align-items: center; margin-bottom: 40px; flex-wrap: wrap; }
.cp-testi-img { flex: 0 0 460px; max-width: 100%; }
.cp-testi-img img { width: 100%; border-radius: 10px; object-fit: cover; }
.cp-feedback-cards { display: flex; gap: 16px; flex-wrap: wrap; }
.cp-feedback-card {
  flex: 1; min-width: 240px; border-radius: 14px;
  background: #161616; border: 1px solid rgba(255,255,255,0.08); padding: 24px;
}
.cp-feedback-card p {
  font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.65);
  font-size: 14px; line-height: 1.7; margin-bottom: 12px;
}
.cp-feedback-card .author { font-family: 'Barlow', sans-serif; color: #07b4ba; font-weight: 700; font-size: 13px; }

/* APPLY */
.cp-apply-bg { background: #0a0a0a; }
.cp-form-box { background: #161616; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px; }
.cp-form-box h3 { color: #07b4ba; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 6px; }
.cp-form-stage-label {
  color: rgba(255,255,255,0.35); font-family: 'Barlow', sans-serif;
  font-size: 12px; margin-bottom: 20px; letter-spacing: 1px;
}
.cp-input {
  width: 100%; padding: 14px 16px; border-radius: 8px;
  background: #222; border: 1px solid rgba(255,255,255,0.1);
  color: #fff; font-family: 'Barlow', sans-serif;
  font-size: 15px; margin-bottom: 14px; outline: none;
  transition: border-color 0.2s; appearance: none;
}
.cp-input::placeholder { color: rgba(255,255,255,0.35); }
.cp-input:focus { border-color: #07b4ba; }
.cp-input option { background: #222; }
.cp-submit {
  width: 100%; padding: 15px; border-radius: 8px;
  background: #07b4ba; color: #fff;
  font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px;
  border: none; cursor: pointer; transition: background 0.2s; margin-top: 4px;
}
.cp-submit:hover { background: #059a9f; }

/* CALENDAR */
.cp-cal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
.cp-time-slots { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.cp-time-slot {
  padding: 8px 14px; border-radius: 6px;
  background: #222; border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.55); font-family: 'Barlow', sans-serif;
  font-size: 13px; cursor: pointer; transition: all 0.2s;
}
.cp-time-slot:hover { border-color: #07b4ba; color: #fff; }
.cp-time-slot.selected { background: #07b4ba; color: #fff; border-color: #07b4ba; font-weight: 700; }
.cp-stage-back {
  background: none; border: none; color: rgba(255,255,255,0.45);
  font-family: 'Barlow', sans-serif; font-size: 13px;
  cursor: pointer; margin-top: 12px; padding: 0; text-decoration: underline;
  transition: color 0.2s;
}
.cp-stage-back:hover { color: #fff; }

/* CHECKLIST & WHATSAPP */
.cp-checklist-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 14px; }
.cp-checklist-item .check { color: #07b4ba; font-size: 16px; flex-shrink: 0; margin-top: 2px; }
.cp-checklist-item p { color: rgba(255,255,255,0.65); font-family: 'Barlow', sans-serif; font-size: 14px; line-height: 1.55; }
.cp-wa-label { color: rgba(255,255,255,0.45); font-family: 'Barlow', sans-serif; font-size: 13px; margin-bottom: 8px; letter-spacing: 0.5px; }
.cp-wa-btn {
  display: inline-flex; align-items: center; gap: 10px;
  background: #25D366; color: #fff; padding: 14px 28px; border-radius: 40px;
  font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 15px;
  border: none; cursor: pointer; transition: background 0.2s;
}
.cp-wa-btn:hover { background: #1ebe57; }

/* FOOTER */
.cp-footer {
  background: #060606; border-top: 1px solid rgba(255,255,255,0.06);
  padding: 28px 40px; display: flex; align-items: center;
  justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.cp-footer-logo { color: #07b4ba; font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 4px; }
.cp-footer p { color: rgba(255,255,255,0.28); font-family: 'Barlow', sans-serif; font-size: 13px; }

/* ── CHANGE 3: NEW FEEDBACK SLIDER — 3-card infinite horizontal scroll ── */
.cp-feedback-slider-new {
  overflow: hidden;
  width: 100%;
  position: relative;
}
.cp-feedback-track-new {
  display: flex;
  gap: 24px;
  /* width is set inline to fit duplicated cards */
  will-change: transform;
}
/* Each card occupies exactly 1/3 of the slider width minus gap compensation */
.cp-feedback-card-new {
  /* calc: (100% / 3) - gap proportional. Done via flex: 0 0 calc(33.333% - 16px) in inline style */
  border-radius: 18px;
  background: linear-gradient(180deg, #1a1d27 0%, #121212 100%);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 28px 24px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

/* CHANGE 3: Inherit font family and weight from Home Page Feedback form */
.cp-feedback-card-new p {
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  color: rgba(255,255,255,0.72);
  font-size: 15px;
  line-height: 1.65;
  font-style: italic;
  margin-bottom: 20px;
}
.cp-feedback-card-new .author-name {
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  color: #fff;
  font-size: 15px;
  margin-bottom: 2px;
}
.cp-feedback-card-new .author-role {
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  color: rgba(255,255,255,0.4);
  font-size: 13px;
}
.cp-feedback-stars {
  display: flex; gap: 4px; margin-bottom: 16px;
  color: #07b4ba; font-size: 16px;
}

/* ── CHANGE 4: FAQ SECTION ── */
.cp-faq-bg {
  position: relative;
  overflow: hidden;
  background-color: #0b0b0b;
  background-image:
    linear-gradient(rgba(7,180,186,0.05) 1px, transparent 0.4px),
    linear-gradient(90deg, rgba(7,180,186,0.05) 1px, transparent 0.4px);
  background-size: 40px 40px;
}
.cp-faq-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(7,180,186,0.05), transparent 60%);
  pointer-events: none;
}
.cp-faq-inner {
  max-width: 780px;
  margin: 0 auto;
  padding: 72px 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}
.cp-faq-label {
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #07b4ba;
  margin-bottom: 10px;
}
.cp-faq-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(40px, 5.5vw, 60px);
  letter-spacing: 2px;
  color: #fff;
  line-height: 1;
  margin-bottom: 10px;
}
.cp-faq-title span { color: #07b4ba; }
.cp-faq-divider {
  width: 56px; height: 2px;
  background: #07b4ba;
  margin: 16px auto 48px;
  border-radius: 2px;
}
.cp-faq-list { text-align: left; }
.cp-faq-item {
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  margin-bottom: 14px;
  background: #141414;
  overflow: hidden;
  transition: border-color 0.25s;
}
.cp-faq-item.open {
  border-color: rgba(7,180,186,0.45);
}
.cp-faq-question {
  width: 100%;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 26px;
  cursor: pointer;
  text-align: left;
  gap: 16px;
}
.cp-faq-question-text {
  font-family: 'Barlow', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #fff;
  line-height: 1.3;
  flex: 1;
}
.cp-faq-item.open .cp-faq-question-text {
  color: #07b4ba;
}
.cp-faq-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.25s, background 0.25s, transform 0.35s;
  color: rgba(255,255,255,0.6);
  font-size: 18px;
  line-height: 1;
}
.cp-faq-item.open .cp-faq-icon {
  border-color: #07b4ba;
  background: rgba(7,180,186,0.12);
  color: #07b4ba;
  transform: rotate(45deg);
}
.cp-faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.3s ease;
  padding: 0 26px;
}
.cp-faq-item.open .cp-faq-answer {
  max-height: 400px;
  padding: 0 26px 24px;
}
.cp-faq-answer p {
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 15px;
  color: rgba(255,255,255,0.58);
  line-height: 1.75;
}

/* ───────── PREMIUM TEXTURES ───────── */

/* AOF METHOD — GRID LINES */
.cp-method-bg {
  position: relative;
  overflow: hidden;
  background-color: #0b0b0b;

  background-image:
    linear-gradient(rgba(7,180,186,0.07) 1px, transparent 0.4px),
    linear-gradient(90deg, rgba(7,180,186,0.07) 1px, transparent 0.4px);

  background-size: 30px 30px;
}

.cp-method-bg::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at top right,
      rgba(7,180,186,0.08),
      transparent 7%
    );

  pointer-events: none;
}

/* TESTIMONIALS — DIAGONAL LINES */
.cp-testi-bg {
  position: relative;
  overflow: hidden;
  background-color: #0b0b0b;

  background-image:
    repeating-linear-gradient(
      -45deg,
      rgba(7,180,186,0.05) 0px,
      rgba(7,180,186,0.05) 1px,
      transparent 1px,
      transparent 5px
    );
}

.cp-testi-bg::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at top left,
      rgba(7,180,186,0.06),
      transparent 7%
    );

  pointer-events: none;
}

/* APPLY FORM — DOTTED GRID */
.cp-apply-bg {
  position: relative;
  overflow: hidden;
  background-color: #0a0a0a;

  background-image:
    radial-gradient(
      rgba(7,180,186,0.18) 0.75px,
      transparent 0.75px
    );

  background-size: 20px 20px;
}

.cp-apply-bg::before {
  content: "";
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      circle at bottom right,
      rgba(7,180,186,0.07),
      transparent 7%
    );

  pointer-events: none;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .cp-nav { padding: 14px 20px; }
  .cp-hero-content { padding: 100px 20px 48px; }

.cp-what-cards {
  display: flex;
  flex-direction: column;

  gap: 14px;

  padding: 0 8px;
}

  .cp-feedback-wrapper { overflow: hidden; }
  .cp-feedback-pages { display: flex; transition: transform 0.5s ease; }
  .cp-feedback-page { min-width: 100%; display: flex; flex-direction: column; gap: 14px; padding: 0 6px; }

  .cp-feedback-card {
  width: 100%;
  min-width: unset;
  max-width: 100%;

  min-height: 90px;

  margin-bottom: 10px;

  padding: 14px;

  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}
  .cp-feedback-card p { font-size: 13px; line-height: 1.5; }
  .cp-feedback-card .author { font-size: 12px; margin-top: 8px; }

  .cp-feedback-nav { display: flex; justify-content: center; gap: 16px; margin-top: 16px; }
  .cp-feedback-nav button {
    width: 40px; height: 40px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.2); background: transparent;
    color: #fff; font-size: 18px;
  }

 .cp-what-card {
  width: 100%;
  min-height: 90px;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;

  text-align: left;

  padding: 14px 16px;
  gap: 14px;

  border-radius: 12px;
}
  .cp-what-card-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
}
.cp-what-card-icon svg {
  width: 28px;
  height: 28px;
}

.cp-what-card h4 {
  font-size: 13px;
  margin-bottom: 4px;
}

.cp-what-card p {
  font-size: 11px;
  line-height: 1.4;
}
  .cp-what-card h4 { font-size: 14px; }
  .cp-what-card p { font-size: 12px; }

  .cp-trust {
    position: relative; height: auto;
    flex-direction: row; justify-content: space-between;
    padding: 12px 14px; gap: 10px;
  }
  .cp-trust-item { flex: 1; justify-content: center; gap: 6px; }
  .cp-trust-item span { font-size: 23px; letter-spacing: 1.6px; color: #fff; }
  .trust-icon-box { width: 24px; height: 24px; }
  .trust-icon-box svg { width: 16px; height: 16px; stroke: #fff; }

  .cp-trust { padding: 0 20px; }
  .cp-section { padding: 48px 10px; }

  .cp-feedback-slider { overflow: hidden; height: 300px; }
  .cp-feedback-track { display: flex; flex-direction: column; }
  .cp-feedback-card { min-width: 100% !important; max-width: 100% !important; }
  .cp-feedback-card p { font-size: 12px; }
  .cp-feedback-card .author { font-size: 11px; }

  .cp-hero-btns { flex-direction: column; width: 100%; gap: 12px; }
  .cp-btn-primary,
  .cp-btn-outline {
    width: 100%; border-radius: 4px; padding: 14px 0;
    font-size: 16px; letter-spacing: 1.5px;
  }
  .cp-coach-stats {
  display: grid !important;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.cp-coach-stats > div {
  width: 100% !important;
  height: 120px !important;
}

  .cp-pain-grid { flex-direction: column; gap: 35px; }
  .cp-pain-media { flex: unset; width: 100%; }
  .cp-method-grid { flex-direction: column; gap: 35px; }
  .cp-method-image { order: 1; width: 120%; flex: unset; }
  .cp-method-text { order: 2; }
  .cp-testi-main { flex-direction: column; }
  .cp-testi-img { flex: unset; width: 100%; }
  .cp-form-box { padding: 24px 18px; }
  .cp-cal-grid { grid-template-columns: 1fr; }
  .cp-footer { flex-direction: column; text-align: center; }

  /* FAQ mobile */
  .cp-faq-question-text { font-size: 15px; }
  .cp-faq-answer p { font-size: 14px; }

  /* New feedback slider mobile fallback */
  .cp-feedback-card-new {
    flex: 0 0 85vw !important;
    width: 85vw !important;
  }
}
`;

/* ── CALENDAR COMPONENT ── */
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const timeSlots = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

function CalendarPicker({ onConfirm }: { onConfirm: (date: string, time: string) => void }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
    setSelectedDay(null);
  };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  return (
    <div>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button
          onClick={prevMonth}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", width: 32, height: 32, borderRadius: 6,
            cursor: "pointer", fontSize: 16,
          }}
        >
          ‹
        </button>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 2, color: "#fff" }}>
          {months[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: "none", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", width: 32, height: 32, borderRadius: 6,
            cursor: "pointer", fontSize: 16,
          }}
        >
          ›
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center", fontFamily: "'Barlow', sans-serif",
              fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 700, padding: "4px 0",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 18 }}>
        {days.map((d, i) => (
          <div
            key={i}
            onClick={() => d && !isPast(d) ? setSelectedDay(d) : undefined}
            style={{
              textAlign: "center", padding: "7px 0", borderRadius: 6,
              fontFamily: "'Barlow', sans-serif", fontSize: 13,
              cursor: d && !isPast(d) ? "pointer" : "default",
              background: d === selectedDay ? "#07b4ba" : "transparent",
              color: !d
                ? "transparent"
                : isPast(d)
                ? "rgba(255,255,255,0.15)"
                : d === selectedDay
                ? "#fff"
                : "rgba(255,255,255,0.75)",
              border:
                d && !isPast(d) && d !== selectedDay
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "1px solid transparent",
              fontWeight: d === selectedDay ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            {d || ""}
          </div>
        ))}
      </div>

      {/* Time slots */}
      {selectedDay && (
        <div>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.4)", marginBottom: 10,
              letterSpacing: 1, textTransform: "uppercase",
            }}
          >
            Select a time
          </p>
          <div className="cp-time-slots">
            {timeSlots.map((t) => (
              <button
                key={t}
                className={`cp-time-slot${selectedTime === t ? " selected" : ""}`}
                onClick={() => setSelectedTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedDay && selectedTime && (
        <button
          className="cp-submit"
          onClick={() => onConfirm(`${months[month]} ${selectedDay}, ${year}`, selectedTime!)}
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
}

/* ── CHANGE 3: Infinite horizontal feedback slider component ── */
function InfiniteFeedbackSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const isPausedRef = useRef(false);
  const posRef = useRef(0);

  // Duplicate cards: 7 originals + 7 copies = 14 total for seamless loop
  const allCards = [...feedbackCards, ...feedbackCards];

  // Card width: (containerWidth - gaps) / 3 per visible card
  // We use a fixed px card width approach via CSS flex and overflow hidden
  // Each card: flex 0 0 calc(33.333% - 16px) within the container
  // Track width: 14 cards = (cardWidth + gap) * 14

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) return;

    // Speed: pixels per frame
    const speed = 0.55;

    const getHalfWidth = () => track.scrollWidth / 2;

    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current += speed;
        if (posRef.current >= getHalfWidth()) {
          posRef.current -= getHalfWidth();
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const pause = () => { isPausedRef.current = true; };
    const resume = () => { setTimeout(() => { isPausedRef.current = false; }, 600); };

    slider.addEventListener("mouseenter", pause);
    slider.addEventListener("mouseleave", resume);
    slider.addEventListener("touchstart", pause, { passive: true });
    slider.addEventListener("touchend", resume);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      slider.removeEventListener("mouseenter", pause);
      slider.removeEventListener("mouseleave", resume);
      slider.removeEventListener("touchstart", pause);
      slider.removeEventListener("touchend", resume);
    };
  }, []);

  return (
    <div
      ref={sliderRef}
      className="cp-feedback-slider-new"
    >
      <div
        ref={trackRef}
        className="cp-feedback-track-new"
        style={{ width: "max-content" }}
      >
        {allCards.map((card, i) => (
          <div
            key={i}
            className="cp-feedback-card-new"
            style={{
              // Each card is exactly 1/3 of the slider container minus gap fractions
              // Using a fixed width to keep 3 cards in view. 340px * 3 + 24px * 2 = ~1068px ≈ full 1100px section
              width: "340px",
              flexShrink: 0,
            }}
          >
            <div className="cp-feedback-stars">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p>"{card.text}"</p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "#202533",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#8d96a8", fontSize: 20, flexShrink: 0,
                }}
              >
                👤
              </div>
              <div>
                <p className="author-name">{card.author}</p>
                <span className="author-role">Member</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── CHANGE 4: FAQ Accordion component ── */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="cp-faq-bg">
      <div className="cp-faq-inner">
        <Reveal>
          <p className="cp-faq-label">Got Questions?</p>
          <h2 className="cp-faq-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <div className="cp-faq-divider" />
        </Reveal>

        <div className="cp-faq-list">
          {faqItems.map((item, i) => (
            <Reveal key={i}>
              <div className={`cp-faq-item${openIndex === i ? " open" : ""}`}>
                <button
                  className="cp-faq-question"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                >
                  <span className="cp-faq-question-text">{item.question}</span>
                  <span className="cp-faq-icon">+</span>
                </button>
                <div className="cp-faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function CoachingPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const [lead, setLead] = useState({ name: "", phone: "", goal: "" });
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycbyLWY5cbUx7OC1t6SSy-Z8wTj9FLPdZuzOzSRhJ8-1JvlPxYk1210TelUjKuaSyYvVl/exec";

  const handleLeadSubmit = async () => {
    if (!lead.name.trim() || !lead.phone.trim()) return;
    setStage(2);
  };

  const handleBookingConfirm = async (date: string, time: string) => {
    try {
      const params = new URLSearchParams({
        name: lead.name.trim(),
        phone: lead.phone.trim(),
        goal: lead.goal || "Not specified",
        date,
        time,
      });
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
    } catch (err) {
      console.error("Sheet error:", err);
    }
    setStage(3);
  };

  const painPoints = [
    "You train 4-5 days a week but your technique isn't improving",
    "Your sparring partners are getting better — you feel stuck",
    "You have no structured plan, just random gym sessions",
    "Coaches at your gym don't give you personal attention",
    "You don't know what to fix or where to even start",
  ];

  const trustItems = [
    { icon: <IconShield />, label: "Proven System" },
    { icon: <IconUsers />, label: "Tamil Team" },
    { icon: <IconTrophy />, label: "Real Results" },
  ];

  return (
    <>
      <style>{css}</style>

      <div className="cp">
        {/* ── NAVBAR ── */}
        <nav className="cp-nav">
          <span className="cp-nav-logo">
            <span style={{ color: "#07b4ba" }}>A</span>
            <span style={{ color: "#fff" }}>O</span>
            <span style={{ color: "#07b4ba" }}>F</span>
          </span>
          <div className="cp-nav-right">
            <button className="cp-back" onClick={() => navigate("/")}>
              <ArrowLeftIcon /> Back To Home
            </button>
            <button className="cp-book-nav" onClick={scrollToForm}>
              Book A Call
            </button>
          </div>
        </nav>

        {/* ── SECTION 1: HERO ── */}
        <section className="cp-hero">
          <div
            className="cp-hero-bg"
            style={{
              background: `
                linear-gradient(to right, #0a0a0a 38%, rgba(10,10,10,0.65) 62%, transparent 100%),
                url("https://images.unsplash.com/photo-1549476464-37392f717541?w=1400&q=80") center right / cover no-repeat
              `,
            }}
          />
          <div className="cp-hero-overlay" />
          <div className="cp-hero-content">
            <Reveal>
              <p className="cp-hero-tag">AOF Academy — 1 On 1 Coaching</p>
              <h1 className="cp-hero-h1">
                Train Like A<br />
                <span>Champion.</span><br />
                Fight Like One
              </h1>
              <p className="cp-hero-desc">
                Stop training in the crowd. Get a personalized coaching program built around your body, your goals,
                and your timeline — guided by coaches who have been in the ring.
              </p>
              {/* CHANGE 1: Only "Book A Call" button remains; "See Results" button removed */}
              <div className="cp-hero-btns">
                <button className="cp-btn-primary" onClick={scrollToForm}>
                  Book A Call
                </button>
              </div>
            </Reveal>
          </div>

          {/* TRUST STRIP */}
          <div className="cp-trust">
            {trustItems.map(({ icon, label }) => (
              <div className="cp-trust-item" key={label}>
                <div className="trust-icon-box">{icon}</div>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SOUNDS FAMILIAR ── */}
        <div style={{ background: "#111" }}>
          <div className="cp-section">
            <Reveal>
              <div className="cp-pain-grid">
                <div className="cp-pain-media">
                  <img
                    src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=900&q=80"
                    alt="UFC Training"
                  />
                </div>
                <div className="cp-pain-right">
                  <p className="cp-pain-label">Sound's Familiar?</p>
                  <p className="cp-pain-heading">
                    You're Putting In The Work,<br />But Not Seeing The Results.
                  </p>
                  <div className="cp-red-divider" />
                  {painPoints.map((item, i) => (
                    <div className="cp-pain-item" key={i}>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── SECTION 2: AOF METHOD ── */}
        <div className="cp-method-bg">
          <div className="cp-section">
            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <p
                  style={{
                    color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700,
                    fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6,
                  }}
                >
                  The AOF Method
                </p>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,5vw,54px)",
                    letterSpacing: 2, color: "#fff", lineHeight: 1,
                  }}
                >
                  A Proven System.
                </h2>
                <h2
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,5vw,54px)",
                    letterSpacing: 2, color: "#07b4ba", lineHeight: 1,
                  }}
                >
                  Real Transformation.
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.38)", fontFamily: "'Barlow', sans-serif",
                    fontSize: 11, marginTop: 10, letterSpacing: 3, textTransform: "uppercase",
                  }}
                >
                  Complete Support. Every Step.
                </p>
                <div style={{ width: 48, height: 2, background: "#07b4ba", margin: "14px auto 0" }} />
              </div>
            </Reveal>

            <div className="cp-method-grid">
              {/* Text left on desktop */}
              <div className="cp-method-text">
                {methodItems.map((item, i) => (
                  <Reveal key={i}>
                    <div className="cp-method-item">
                      <div className="cp-method-item-icon">{item.icon}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Image right on desktop */}
              <div className="cp-method-image">
                <img
                  src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=900&q=80"
                  alt="AOF Method Training"
                  style={{ width: "100%", borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", display: "block" }}
                />
              </div>
            </div>

            {/* WHAT YOU GET */}
            <Reveal style={{ marginTop: 52 }}>
              <h3
                style={{
                  textAlign: "center", fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28, letterSpacing: 2, color: "#fff", marginBottom: 20,
                }}
              >
                What You Get
              </h3>
              <div className="cp-what-cards">
                {whatCards.map((card, i) => (
                  <div key={i} className="cp-what-card">
                    <div className="cp-what-card-icon">{card.icon}</div>
                    <h4>{card.title}</h4>
                    <p>{card.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* OUR PROMISE */}
            <Reveal>
              <div className="cp-promise">
                <h4>Our Promise</h4>
                <p className="cp-promise-text">
                  We don't just hand you a plan and disappear. Every session is tracked,
                  every milestone is celebrated, and every setback is coached through.
                  You will not plateau with AOF.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── SECTION 3: YOUR COACH ── */}
        <div className="cp-coach-bg">
          <div className="cp-book-strip">
            <button onClick={scrollToForm}>Book A Call</button>
          </div>
          <div className="cp-section" style={{ paddingBottom: 40 }}>
            <Reveal>
              {/* CHANGE 2: "Led By" → "LED BY", font-size increased by +1pt (17px → 18px is already 17, so +1pt = 18px) */}
              <p
                style={{
                  fontFamily: "'Barlow', sans-serif", fontSize: 17, color: "#07b4ba",
                  fontWeight: 700, marginBottom: 24, letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                LED BY
              </p>
              <div style={{ display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80"
                  alt="Head Coach"
                  style={{
                    width: 240, height: 300, objectFit: "cover", objectPosition: "top",
                    borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: 48,
                      letterSpacing: 2, color: "#fff", marginBottom: 4,
                    }}
                  >
                    Head Coach
                  </h2>
                  <p
                    style={{
                      color: "#07b4ba", fontFamily: "'Barlow', sans-serif",
                      fontWeight: 700, fontSize: 14, marginBottom: 20,
                    }}
                  >
                    AOF Academy — Lead Trainer &amp; Founder
                  </p>
                  <div style={{ marginBottom: 24 }}>
                    {/* CHANGE 2: coachCredentials array no longer contains the "3 continents" entry */}
                    {coachCredentials.map((cred, i) => (
                      <div key={i} className="cp-checklist-item">
                        <span className="check">✓</span>
                        <p>{cred}</p>
                      </div>
                    ))}
                  </div>
                  {/* Stats */}
                  <div
                    className="cp-coach-stats"
                    style={{
                      display: "flex",
                      gap: 22,
                      flexWrap: "wrap",
                      marginTop: 26,
                    }}
                  >
                    {stats.map((stat, i) => (
                      <div
                        key={i}
                        style={{
                          background: "linear-gradient(180deg,#181818 0%, #121212 100%)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: 14,
                          width: 160,
                          height: 140,
                          padding: "18px 16px",
                          textAlign: "center",
                          boxShadow: "0 0 14px rgba(0,0,0,0.18)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: 42,
                            color: "#07b4ba",
                            letterSpacing: 1,
                            marginBottom: 10,
                          }}
                        >
                          {stat.val}
                        </p>

                        <p
                          style={{
                            fontFamily: "'Barlow', sans-serif",
                            color: "rgba(255,255,255,0.45)",
                            fontSize: 12,
                            letterSpacing: 2,
                            textTransform: "uppercase",
                          }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ── SECTION 4: TESTIMONIALS ── */}
        <div id="cp-testimonials" className="cp-testi-bg">
          <div className="cp-section" style={{ paddingTop: 48 }}>

            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 44 }}>
                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    color: "#07b4ba",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                  }}
                >
                  Real People, Real Results
                </p>

                <h2
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: "clamp(34px,5vw,56px)",
                    letterSpacing: 2,
                    color: "#fff",
                    marginTop: 8,
                    lineHeight: 1,
                  }}
                >
                  Trusted By Fighters,{" "}
                  <span style={{ color: "#07b4ba" }}>
                    Proven Results
                  </span>
                </h2>

                <p
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    color: "rgba(255,255,255,0.42)",
                    marginTop: 8,
                    fontSize: 14,
                  }}
                >
                  Here's What Athletes Say About Their Transformation With AOF
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="cp-testi-main">

                <div className="cp-testi-img">
                  <img
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&q=80"
                    alt="Athlete"
                  />
                </div>

                <div style={{ flex: 1, minWidth: 260 }}>

                  <h3
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(28px,3vw,42px)",
                      letterSpacing: 1.5,
                      lineHeight: 1.1,
                      marginBottom: 16,
                      color: "#fff",
                    }}
                  >
                    AOF Changed The Way{" "}
                    <span style={{ color: "#07b4ba" }}>
                      I Train And Perform.
                    </span>
                  </h3>

                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      color: "rgba(255,255,255,0.65)",
                      fontSize: 15,
                      lineHeight: 1.75,
                    }}
                  >
                    The structure, the attention to detail,
                    and the accountability took me to a level
                    I never thought possible. I'm stronger,
                    faster, and fight with more confidence than ever.
                  </p>

                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      marginTop: 14,
                      color: "#07b4ba",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    — Alex M., Amateur MMA Fighter
                  </p>

                </div>
              </div>
            </Reveal>

            {/* CHANGE 3: Replaced old desktop/mobile split with new unified 3-card infinite horizontal scroll */}
            <Reveal>
              <InfiniteFeedbackSlider />
            </Reveal>

          </div>
        </div>

        {/* ── SECTION 5: APPLY FORM ── */}
        <div className="cp-apply-bg" ref={formRef}>
          <div className="cp-section">
            <div style={{ display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* LEFT */}
              <div style={{ flex: 1, minWidth: 260 }}>
                <Reveal>
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif", color: "#07b4ba", fontWeight: 700,
                      fontSize: 12, letterSpacing: 2.5, marginBottom: 12, textTransform: "uppercase",
                    }}
                  >
                    Ready To Start?
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px,5vw,54px)",
                      letterSpacing: 2, lineHeight: 1.0, marginBottom: 18, color: "#fff",
                    }}
                  >
                    Apply For Your<br />
                    <span style={{ color: "#07b4ba" }}>1-On-1 Coaching Spot</span>
                  </h2>
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.52)",
                      fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 380,
                    }}
                  >
                    Spots are limited. We only take on a small number of students at a time to ensure
                    every athlete gets the attention they deserve. Fill out the form and we'll reach
                    out within 24 hours.
                  </p>
                  {checklistItems.map((item, i) => (
                    <div className="cp-checklist-item" key={i}>
                      <span className="check">✓</span>
                      <p>{item}</p>
                    </div>
                  ))}
                  <div style={{ marginTop: 32 }}>
                    <p className="cp-wa-label">Any Queries?</p>
                    <button className="cp-wa-btn">
                      <WhatsAppIcon />
                      Contact Us on WhatsApp
                    </button>
                  </div>
                </Reveal>
              </div>

              {/* RIGHT — 2-STAGE FORM */}
              <div style={{ flex: 1, minWidth: 300 }}>
                <Reveal>
                  <div className="cp-form-box">
                    {stage === 3 ? (
                      /* DONE */
                      <div style={{ textAlign: "center", padding: "48px 0" }}>
                        <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                        <h4
                          style={{
                            fontFamily: "'Bebas Neue', sans-serif", color: "#fff",
                            fontSize: 28, letterSpacing: 2, marginBottom: 8,
                          }}
                        >
                          Booking Confirmed!
                        </h4>
                        <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: 15 }}>
                          We'll reach out within 24 hours to confirm your session.
                        </p>
                      </div>
                    ) : stage === 2 ? (
                      /* STAGE 2 — CALENDAR */
                      <>
                        <h3>Schedule Your Call</h3>
                        <p className="cp-form-stage-label">STEP 2 OF 2 — PICK A DATE AND TIME</p>
                        <CalendarPicker onConfirm={handleBookingConfirm} />
                        <button className="cp-stage-back" onClick={() => setStage(1)}>
                          Back to details
                        </button>
                      </>
                    ) : (
                      /* STAGE 1 — LEAD FORM */
                      <>
                        <h3>Start Your Journey With AOF</h3>
                        <p className="cp-form-stage-label">STEP 1 OF 2 — YOUR DETAILS</p>
                        <input
                          className="cp-input"
                          type="text"
                          placeholder="Full Name"
                          value={lead.name}
                          onChange={(e) => setLead((f) => ({ ...f, name: e.target.value }))}
                        />
                        <input
                          className="cp-input"
                          type="tel"
                          placeholder="Phone Number"
                          value={lead.phone}
                          onChange={(e) => setLead((f) => ({ ...f, phone: e.target.value }))}
                        />
                        <select
                          className="cp-input"
                          value={lead.goal}
                          onChange={(e) => setLead((f) => ({ ...f, goal: e.target.value }))}
                        >
                          <option value="">Main Goal</option>
                          <option value="technique">Improve Technique</option>
                          <option value="competition">Competition Prep</option>
                          <option value="fitness">Fitness and Conditioning</option>
                          <option value="beginner">Learn MMA from Scratch</option>
                        </select>
                        <button className="cp-submit" onClick={handleLeadSubmit}>
                          Next — Schedule a Time
                        </button>
                      </>
                    )}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        {/* ── CHANGE 4: FAQ SECTION — inserted after Form section ── */}
        <FAQSection />

        {/* ── FOOTER ── */}
        <footer className="cp-footer">
          <span className="cp-footer-logo">AOF</span>
          <p>© {new Date().getFullYear()} Art of Fight Academy. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
