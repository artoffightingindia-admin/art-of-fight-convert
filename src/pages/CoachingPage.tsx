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
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.48-2.435 0-.674.481-1.264 1.079-1.434.598-.17 1.184-.051 1.622.086.438.137.766.02 1.15-.296.382-.316 1.476-1.546 1.745-1.84.269-.294.538-.36.995-.122.458.238 1.92.713 2.249.836.329.122.548.183.628.286.08.103.08.598-.219 1.021-.299.422-.691.989-.987 1.27-.296.281-.598.502-1.149.798-.55.296-1.007.44-1.468.686-.46.246-.939.816-.939 1.49 0 .674.72 1.5 1.145 1.847.425.347 1.789 1.79 2.285 2.162.497.373.78.392 1.032.326.252-.067 1.274-.52 1.455-.873.18-.353.18-1.036-.119-1.336-.298-.3-1.02-.487-1.44-.636-.42-.148-1.213-.522-1.51-.672-.298-.15-.598-.224-1.085-.449z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.681-.513-5.21-1.408l-.374-.222-4.074 1.002 1.002-4.074-.222-.374C2.513 15.681 2 13.9 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
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
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const IconLeaf = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22V12M12 12C12 7 17 3 21 2c0 5-2 9-9 10zM12 12C12 7 7 3 3 2c0 5 2 9 9 10z" />
  </svg>
);
const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const IconGlobe = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconTarget = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconZap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconTrend = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconTrophy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16M12 17v5M7 4v6a5 5 0 0 0 10 0V4H7z" />
  </svg>
);
const IconShield = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconUsers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      "AOF coaching is designed for serious fighters and committed beginners alike — anyone who is tired of training without direction. Whether you're a competitive MMA athlete looking to peak at the right time or a complete novice, we provide a clear roadmap and hands-on coaching.",
  },
  {
    question: "How does the remote coaching work?",
    answer:
      "After your strategy call, your coach builds a fully customised training plan and delivers it digitally. You'll have direct WhatsApp access to your coach for questions, feedback, and check-ins, plus video reviews and weekly adjustments.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Most athletes report noticeable improvements in technique and conditioning within the first 3–4 weeks. Significant transformation — improved footwork, sharper combinations, better game sense — typically follows within 8–12 weeks with consistent work.",
  },
  {
    question: "What if I'm a complete beginner?",
    answer:
      "Beginners are welcome and thrive in the AOF system. In fact, starting with proper 1-on-1 coaching before picking up bad habits is the fastest route to becoming a skilled fighter. Your plan will begin with fundamentals and scale up safely.",
  },
  {
    question: "Is there a contract or long-term commitment?",
    answer:
      "No long-term contracts. You can cancel anytime. We are confident enough in our results that we don't need to lock you in. We also back that up with a results guarantee — if you don't see progress we extend coaching.",
  },
  {
    question: "How many sessions should I train per week?",
    answer:
      "Most athletes train between 3–6 sessions per week depending on their goals, recovery capacity, and schedule. Your coach will create the optimal structure for you to ensure consistent improvement.",
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
.cp-method-grid {
  display: flex;
  gap: 48px;
  align-items: flex-start;
  flex-wrap: wrap;

  max-width: 1100px;
  margin: 0 auto;

  padding: 0 0px 0px;
}

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
.cp-method-item-icon svg { width: 45px; height: 45px; }

.cp-method-item p {
  font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.52);
  font-size: 15px; line-height: 1.55;
}

/* WHAT YOU GET */
.cp-what-cards { display: flex; gap: 45px; flex-wrap: wrap; justify-content: center; }
.cp-what-card {
  width: 175px; min-height: 255px; padding: 11px 6px;
  border-radius: 18px; background: #0f1115; border: 2px solid #0f1115;
  text-align: center; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 18px;
}
.cp-what-card-icon { width: 70px; height: 70px; display: flex; align-items: center; justify-content: center; }
.cp-what-card-icon svg { width: 52px; height: 52px; }
.cp-what-card h4 {
  font-family: 'Bebas Neue', sans-serif; color: #07b4ba;
  font-size: 16px; letter-spacing: 1px; line-height: 1.3;
}
.cp-what-card p { font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.5; }
/* ── NEW PROMISE SECTION ── */

.cp-new-promise {
  max-width: 820px;

  margin: 0 auto;

  padding: 34px 42px;

  text-align: center;

  position: relative;
}
.cp-new-promise-line {
  width: 70px;
  height: 2px;

  background: #07b4ba;

  margin: 0 auto 22px;

  border-radius: 999px;
}

.cp-new-promise-text {
  font-family: 'Barlow', sans-serif;

  font-size: 19px;

  line-height: 1.9;

  color: rgba(255,255,255,0.76);

  font-style: italic;

  max-width: 720px;

  margin: 0 auto;
}
.cp-new-promise-title {
  font-family: 'Bebas Neue', sans-serif;

  font-size: 30px;

  letter-spacing: 2px;

  color: #fff;

  margin-bottom: 12px;

  text-align: center;
}

.cp-quote-mark {
  color: #07b4ba;

  font-size: 42px;

  line-height: 0;

  margin-right: 6px;

  font-family: serif;

  position: relative;
  top: 10px;
}

/* MOBILE */
@media (max-width: 768px) {

  .cp-new-promise {
    padding: 26px 22px;
    border-radius: 16px;
  }
  

  .cp-new-promise-text {
    font-size: 15px;
    line-height: 1.8;
  }
}


/* COACH */
.cp-coach-bg { background: #0f1115; }
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
.cp-feedback-s { display: flex; gap: 16px; flex-wrap: wrap; }
.cp-feedback-card {
  flex: 1; min-width: 240px; border-radius: 14px;
  background: #0f1115; border: 1px solid rgba(255,255,255,0.08); padding: 24px;
}
.cp-feedback-card p {
  font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.65);
  font-size: 14px; line-height: 1.7; margin-bottom: 12px;
}
.cp-feedback-card .author { font-family: 'Barlow', sans-serif; color: #07b4ba; font-weight: 700; font-size: 13px; }

/* APPLY */
.cp-apply-bg { background: #0a0a0a; }
.cp-form-box { background: #0f1115; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px; }
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
  display: flex; align-items: center; gap: 10px;
  background: #25D366; color: #fff; padding: 14px 28px; border-radius: 40px;
  font-family: 'Barlow', sans-serif; font-weight: 800; font-size: 15px;
  border: none; cursor: pointer; transition: background 0.2s;
}
.cp-wa-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 18px;
}
.cp-wa-btn:hover { background: #1ebe57; }

//* ── NEW FOOTER ── */
.cp-footer {
  background: #0f1115;

  padding: 26px 40px 8px;

  margin-top: 20px;
}

.cp-footer-inner {
  max-width: 1180px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}

.cp-footer-title {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 24px;
  letter-spacing: 1px;
  color: #fff;

  padding-top: 20px;

  margin-bottom: 14px;
}

.cp-footer-logo {
  color: #07b4ba;
}

.cp-footer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cp-footer-links a,
.cp-footer-contact p,
.cp-footer-about p {
  font-family: 'Barlow', sans-serif;
  font-size: 17px;
  color: rgba(255,255,255,0.52);

  text-decoration: none;
  transition: 0.2s;
}

.cp-footer-links a:hover {
  color: #07b4ba;
}

.cp-footer-contact {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cp-footer-about p {
  line-height: 1.8;
  max-width: 320px;
}

.cp-footer-bottom {
  margin-top: 24px;
  padding-top: 12px;

  border-top: 1px solid rgba(255,255,255,0.06);

  text-align: center;

  font-family: 'Barlow', sans-serif;
  font-size: 13px;

  color: rgba(255,255,255,0.3);
}

/* MOBILE */
@media (max-width: 768px) {

  .cp-footer {
    padding: 50px 20px 24px;
  }

  .cp-footer-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .cp-footer-title {
    margin-bottom: 16px;
  }

  .cp-footer-links a,
  .cp-footer-contact p,
  .cp-footer-about p {
    font-size: 15px;
  }

  .cp-footer-bottom {
    margin-top: 40px;
  }
}

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
  background: #1a1d23;
  border: 1px solid rgba(255,255,255,0.05);
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
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 18px;
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
/* FAQ GRID LAYOUT */
.cp-faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items: start;
}

.cp-faq-item {
  margin-bottom: 0;
  height: fit-content;
}
/* RESPONSIVE */
@media (max-width: 768px) {
  .cp-nav { padding: 14px 20px; }
  .cp-hero-content { padding: 100px 20px 48px; }
  .cp-faq-grid {
  grid-template-columns: 1fr;
}

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
/* ───────── MOBILE FEEDBACK ROW SLIDER ───────── */
@media (max-width: 768px) {

 /* ───────── MOBILE FEEDBACK STACKED ROWS ───────── */

.cp-feedback-slider-new {

  overflow: hidden;

  width: 100%;

  position: relative;

  padding-bottom: 70px;
}

.cp-feedback-track-new {

  display: flex;

  transition: transform 0.45s ease;
}

/* EACH PAGE */.cp-feedback-page-mobile {

  min-width: 100%;

  display: flex;

  flex-direction: column;

  gap: 14px;

  padding: 0 4px;
}

/* FEEDBACK CARD */
.cp-feedback-card-new {

  width: 100% !important;
  min-height: 60px;

  border-radius: 14px;

  background: #15181d;

  border: 1px solid rgba(255,255,255,0.05);

  padding: 16px 14px;

  display: flex;

  flex-direction: column;

  justify-content: space-between;
}

.cp-feedback-card-new p {

  font-size: 12px;

  line-height: 1.6;

  margin-bottom: 12px;
}

.cp-feedback-stars {

  display: flex;

  gap: 2px;

  margin-bottom: 10px;

  font-size: 11px;
}

.cp-feedback-card-new .author-name {

  font-size: 12px;
}

.cp-feedback-card-new .author-role {

  font-size: 10px;
}

/* NAVIGATION */
.cp-feedback-mobile-nav {

  position: absolute;

  bottom: 0;

  left: 50%;

  transform: translateX(-50%);

  display: flex;

  gap: 16px;
}

.cp-feedback-mobile-nav button {

  width: 42px;

  height: 42px;

  border-radius: 50%;

  border: 1px solid rgba(255,255,255,0.14);

  background: #15181d;

  color: #fff;

  font-size: 20px;

  cursor: pointer;
}

.cp-feedback-mobile-nav button:hover {

  border-color: #07b4ba;

  color: #07b4ba;
}
}
`,