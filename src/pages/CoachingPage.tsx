import React, { useEffect, useRef, useState, CSSProperties, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface RevealProps { children: ReactNode; style?: CSSProperties; }
interface LeadForm { name: string; phone: string; goal: string; }

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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L0 24l6.335-1.508A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.681-.513-5.21-1.408l-.374-.222-3.876.922.978-3.769-.244-.387A9.959 9.959 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

/* Consistent teal stroke icon set */
const IconPlan = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="9" y1="7" x2="15" y2="7"/>
    <line x1="9" y1="11" x2="15" y2="11"/>
    <line x1="9" y1="15" x2="12" y2="15"/>
  </svg>
);
const IconChat = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="9" y1="10" x2="9" y2="10" strokeWidth="2.5"/>
    <line x1="12" y1="10" x2="12" y2="10" strokeWidth="2.5"/>
    <line x1="15" y1="10" x2="15" y2="10" strokeWidth="2.5"/>
  </svg>
);
const IconLeaf = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20 C12 20 4 16 4 9 C4 9 8 6 12 10"/>
    <path d="M12 10 C12 10 8 5 12 2 C12 2 16 5 12 10"/>
    <path d="M12 20 C12 20 20 16 20 9 C20 9 16 6 12 10"/>
    <path d="M12 20 C12 20 12 14 12 10"/>
    <path d="M8 10 C9 11 11 12 12 14" strokeWidth="1" opacity="0.7"/>
    <path d="M16 10 C15 11 13 12 12 14" strokeWidth="1" opacity="0.7"/>
  </svg>
);
const IconChart = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="20" x2="21" y2="20"/>
    <polyline points="5,20 5,13 9,13 9,20"/>
    <polyline points="10,20 10,9 14,9 14,20"/>
    <polyline points="15,20 15,5 19,5 19,20"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>
  </svg>
);

/* Method icons — teal stroke consistent */
const IconTarget = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconTrend = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
  </svg>
);
const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconTrophy = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/>
    <path d="M7 4H4v3a5 5 0 0 0 5 5h6a5 5 0 0 0 5-5V4h-3"/>
    <rect x="7" y="2" width="10" height="4" rx="1"/>
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#07b4ba" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

/* ── DATA ── */
const methodItems = [
  { icon: <IconTarget />, title: "Personalised Fight Plan", desc: "A roadmap built entirely around your body type, skill level, and competition goals." },
  { icon: <IconZap />, title: "High-Intensity Drilling", desc: "Focused repetition drills that embed proper technique into muscle memory fast." },
  { icon: <IconTrend />, title: "Progressive Overload", desc: "Structured intensity cycles to keep your body adapting and improving every week." },
  { icon: <IconUser />, title: "1-on-1 Accountability", desc: "Your coach tracks every session, reviews footage, and adjusts the plan in real time." },
  { icon: <IconTrophy />, title: "Competition Preparation", desc: "Full camp-style peaking for tournaments — physically and mentally ready to win." },
];

const whatCards = [
  { icon: <IconPlan />, title: "Personalised Training Plan", desc: "Custom program built around your goals, schedule, and current level" },
  { icon: <IconChat />, title: "Direct Coach Access", desc: "WhatsApp access for questions, check-ins, and accountability between sessions" },
  { icon: <IconLeaf />, title: "Nutrition Guidance", desc: "Simple, effective nutrition advice to support performance, recovery, and body composition" },
  { icon: <IconChart />, title: "Progress Tracking", desc: "We track your progress, adjust the plan and keep you moving in the right direction" },
  { icon: <IconGlobe />, title: "Game Plan", desc: "Opponent-based strategies tailored to your fight style" },
];

const coachCredentials = [
  "Former Professional MMA Fighter — 12+ Years Ring Experience",
  "Trained athletes who compete at national and international level",
  "Specialist in striking, grappling transitions and mental conditioning",
  "Coaches remotely across 3 continents with proven results",
];

const stats = [
  { val: "1,000+", label: "Athletes Coached" },
  { val: "10+", label: "Years Experience" },
  { val: "50+", label: "Champions Trained" },
  { val: "3", label: "Continents" },
];

const feedbackCards = [
  { text: "In 8 weeks my footwork completely changed. My coach saw things I couldn't see myself and fixed them immediately.", author: "Jordan K." },
  { text: "I was plateau'd for over a year. AOF broke that within the first month. The personalised approach is unlike anything else.", author: "Priya S." },
  { text: "Best investment I've made in my fight career. The plan, the feedback, the accountability — it's all dialled in perfectly.", author: "Carlos R." },
];

const checklistItems = [
  "Free 30-minute strategy call included",
  "No long-term contracts — cancel anytime",
  "Results guaranteed or coaching extended free",
  "Start within 48 hours of approval",
];

/* ── STYLES ── */
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
  .cp-nav-logo { color: #07b4ba; font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 4px; }
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
    background: #07b4ba; color: #000;
    font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 2px;
    border: none; cursor: pointer; transition: background 0.2s;
  }
  .cp-book-nav:hover { background: #059a9f; }

  /* HERO */
  .cp-hero {
    position: relative; min-height: 100vh;
    display: flex; flex-direction: column; overflow: hidden;
  }
  .cp-hero-bg { position: absolute; inset: 0; z-index: 0; }
  .cp-hero-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to right, #0a0a0a 42%, rgba(10,10,10,0.72) 65%, transparent 100%);
  }
  .cp-hero-content { position: relative; z-index: 2; max-width: 800px; padding: 120px 40px 60px; }
  .cp-hero-tag { color: #07b4ba; font-family: 'Barlow', sans-serif; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 3px; margin-bottom: 16px; }
  .cp-hero-h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px,7vw,90px); line-height: 0.95; text-transform: uppercase; color: #fff; margin-bottom: 20px; }
  .cp-hero-h1 span { color: #07b4ba; }
  .cp-hero-desc { color: rgba(255,255,255,0.62); font-family: 'Barlow', sans-serif; font-size: 16px; line-height: 1.7; max-width: 480px; margin-bottom: 32px; }
  .cp-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }
  .cp-btn-primary { padding: 14px 34px; border-radius: 7px; background: #07b4ba; color: #000; font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 2px; border: none; cursor: pointer; transition: background 0.2s; }
  .cp-btn-primary:hover { background: #059a9f; }
  .cp-btn-outline { padding: 14px 34px; border-radius: 7px; background: transparent; color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 19px; letter-spacing: 2px; border: 2px solid #07b4ba; cursor: pointer; transition: all 0.2s; }
  .cp-btn-outline:hover { background: rgba(7,180,186,0.1); }

  /* TRUST STRIP */
  .cp-trust {
    position: relative; z-index: 2;
    background: #07b4ba; height: 2cm;
    display: flex; align-items: center; justify-content: space-around;
    padding: 0 40px; gap: 12px; flex-wrap: wrap;
  }
  .cp-trust-item { display: flex; align-items: center; gap: 8px; }
  .cp-trust-item span {
    font-family: 'Bebas Neue', sans-serif; color: #000;
    font-size: clamp(14px,2vw,18px); letter-spacing: 2px;
    white-space: nowrap;
  }

  /* SECTION WRAPPER */
  .cp-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 45px 0px; /* 🔥 reduced side gap */
}

  /* PAIN SECTION */
  .cp-pain-grid {
  display: flex;
  gap: 28px; /* 🔥 tighter */
  align-items: center; /* 🔥 vertically aligned */
  flex-wrap: wrap;
}
  .cp-pain-media { flex: 0 0 460px; max-width: 100%; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
  .cp-pain-media img { width: 100%; display: block; aspect-ratio: 16/10; object-fit: cover; }
  .cp-pain-right { flex: 1; min-width: 260px; padding-top: 8px; }
  .cp-pain-label { color: #07b4ba; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 18px; margin-bottom: 8px; }
  .cp-pain-heading { color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: clamp(24px,3vw,32px); letter-spacing: 1px; margin-bottom: 16px; line-height: 1.1; }
  .cp-red-divider {
    width: 80px; height: 3px; margin-bottom: 24px;
    background: #e53e3e;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(229,62,62,0.7), 0 0 24px rgba(229,62,62,0.35);
  }
  
  .cp-pain-item {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}
.cp-pain-item::before {
  content: "";
  width: 3px;
  height: 18px;
  background: #ff2d2d;
  border-radius: 2px;

  box-shadow:
    0 0 6px rgba(255,45,45,0.9),
    0 0 16px rgba(255,45,45,0.6),
    0 0 28px rgba(255,45,45,0.3);
}
  .cp-pain-item p {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  line-height: 1.5;
}

  /* METHOD SECTION */
  .cp-method-bg { background: #0d0d0d; }
  .cp-method-grid {
    display: flex; gap: 48px; align-items: flex-start; flex-wrap: wrap;
  }
  .cp-method-text { flex: 1; min-width: 260px; order: 1; }
  .cp-method-image { flex: 0 0 500px; max-width: 100%; order: 2; }
  .cp-method-item {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;

  padding: 10px 12px; /* 🔥 reduced height */
  border-radius: 8px;

  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
}
.cp-method-line {
  font-family: 'Barlow', sans-serif;
  color: rgba(255,255,255,0.75);
  font-size: 14px;
  line-height: 1.5;
}
  .cp-method-item-icon { flex-shrink: 0; margin-top: 2px; }
  .cp-method-item h4 { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; color: #fff; margin-bottom: 4px; }
  .cp-method-item p { font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.52); font-size: 13px; line-height: 1.55; }

  /* WHAT YOU GET */
  .cp-what-cards { display: flex; gap: 45px; flex-wrap: wrap; justify-content: center; }
  .cp-what-card {
    width: 170px; padding: 18px 12px; border-radius: 14px;
    background: #1a1a1a; border: 2px solid #07b4ba;
    text-align: center; display: flex; flex-direction: column;
    align-items: center; gap: 10px;
  }
  .cp-what-card-icon {
    width: 50px; height: 50px; border-radius: 10px;
    border: 1.5px solid rgba(7,180,186,0.35);
    display: flex; align-items: center; justify-content: center;
    background: rgba(7,180,186,0.06);
  }
  .cp-what-card h4 { font-family: 'Bebas Neue', sans-serif; color: #07b4ba; font-size: 13px; letter-spacing: 0.8px; line-height: 1.3; }
  .cp-what-card p { font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.5); font-size: 11px; line-height: 1.5; }

  /* OUR PROMISE — quote style */
  .cp-promise {
    max-width: 620px; margin: 36px auto 0;
    text-align: center; padding: 0 20px;
    position: relative;
  }
  .cp-promise-quote-mark {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px; line-height: 0.6;
    color: #07b4ba; opacity: 0.5;
    display: block; margin-bottom: 8px;
  }
  .cp-promise h4 { font-family: 'Bebas Neue', sans-serif; color: #07b4ba; font-size: 22px; letter-spacing: 2px; margin-bottom: 10px; }
  .cp-promise p { font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.6); font-size: 15px; line-height: 1.7; font-style: italic; }

  /* COACH */
  .cp-coach-bg { background: #0a0a0a; }
  .cp-book-strip {
    background: #07b4ba; padding: 0;
    display: flex; align-items: center; justify-content: center;
  }
  .cp-book-strip button {
    width: 100%; padding: 14px;
    background: none; border: none; cursor: pointer;
    color: #000; font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 3px;
    transition: background 0.2s;
  }
  .cp-book-strip button:hover { background: rgba(0,0,0,0.08); }

  /* TESTIMONIALS */
  .cp-testi-bg { background: #0d0d0d; }
  .cp-testi-main { display: flex; gap: 48px; align-items: center; margin-bottom: 40px; flex-wrap: wrap; }
  .cp-testi-img { flex: 0 0 460px; max-width: 100%; }
  .cp-testi-img img { width: 100%; border-radius: 10px; object-fit: cover; }
  .cp-feedback-cards { display: flex; gap: 16px; flex-wrap: wrap; }
  .cp-feedback-card { flex: 1; min-width: 240px; border-radius: 14px; background: #161616; border: 1px solid rgba(255,255,255,0.08); padding: 24px; }
  .cp-feedback-card p { font-family: 'Barlow', sans-serif; color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.7; margin-bottom: 12px; }
  .cp-feedback-card .author { font-family: 'Barlow', sans-serif; color: #07b4ba; font-weight: 700; font-size: 13px; }

  /* APPLY */
  .cp-apply-bg { background: #0a0a0a; }
  .cp-form-box { background: #161616; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 40px; }
  .cp-form-box h3 { color: #07b4ba; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 6px; }
  .cp-form-stage-label { color: rgba(255,255,255,0.35); font-family: 'Barlow', sans-serif; font-size: 12px; margin-bottom: 20px; letter-spacing: 1px; }
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
    background: #07b4ba; color: #000;
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
  .cp-time-slot.selected { background: #07b4ba; color: #000; border-color: #07b4ba; font-weight: 700; }
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

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .cp-nav { padding: 14px 20px; }
    .cp-hero-content { padding: 100px 20px 48px; }
    .cp-trust { padding: 0 20px; }
    .cp-section { padding: 48px 10px; }
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
  const days: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); setSelectedDay(null); };
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); setSelectedDay(null); };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };

  return (
    <div>
      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={prevMonth} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", width: 32, height: 32, borderRadius: 6, cursor: "pointer", fontSize: 16 }}>&#8249;</button>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 2, color: "#fff" }}>{months[month]} {year}</span>
        <button onClick={nextMonth} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", width: 32, height: 32, borderRadius: 6, cursor: "pointer", fontSize: 16 }}>&#8250;</button>
      </div>

      {/* Day labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 6 }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d} style={{ textAlign: "center", fontFamily: "'Barlow', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 700, padding: "4px 0" }}>{d}</div>
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
              color: !d ? "transparent" : isPast(d) ? "rgba(255,255,255,0.15)" : d === selectedDay ? "#000" : "rgba(255,255,255,0.75)",
              border: d && !isPast(d) && d !== selectedDay ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
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
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
            Select a time
          </p>
          <div className="cp-time-slots">
            {timeSlots.map(t => (
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
          onClick={() => onConfirm(`${months[month]} ${selectedDay}, ${year}`, selectedTime)}
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
}

/* ── MAIN PAGE ── */
export default function CoachingPage() {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  const [lead, setLead] = useState<LeadForm>({ name: "", phone: "", goal: "" });
  const [stage, setStage] = useState<1 | 2 | 3>(1); // 1=lead form, 2=calendar, 3=done

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleLeadSubmit = () => {
    if (lead.name.trim() && lead.phone.trim()) setStage(2);
  };

  const handleBookingConfirm = (_date: string, _time: string) => {
    setStage(3);
  };

  const painPoints = [
    "You train 4-5 days a week but your technique isn't improving",
    "Your sparring partners are getting better — you feel stuck",
    "You have no structured plan, just random gym sessions",
    "Coaches at your gym don't give you personal attention",
    "You don't know what to fix or where to even start",
  ];

  return (
    <>
      <style>{css}</style>
      <div className="cp">

        {/* NAVBAR */}
        <nav className="cp-nav">
          <span className="cp-nav-logo">AOF</span>
          <div className="cp-nav-right">
            <button className="cp-back" onClick={() => navigate("/")}>
              <ArrowLeftIcon /> Back To Home
            </button>
            <button className="cp-book-nav" onClick={scrollToForm}>Book A Call</button>
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
              <h2 className="cp-hero-h2">
                Train Like A<br />
                <span>Champion.</span><br />
                Fight Like One
              </h2>
              <p className="cp-hero-desc">
                Stop training in the crowd. Get a personalized coaching program built around your body, your goals, and your timeline — guided by coaches who have been in the ring.
              </p>
              <div className="cp-hero-btns">
                <button className="cp-btn-primary" onClick={scrollToForm}>Book A Call</button>
                <button
                  className="cp-btn-outline"
                  onClick={() => document.getElementById("cp-testimonials")?.scrollIntoView({ behavior: "smooth" })}
                >
                  See Results
                </button>
              </div>
            </Reveal>
          </div>

          {/* TRUST STRIP — same as home page */}
          <div className="cp-trust">
            {[
              { icon: <IconShield />, label: "Personalised Program" },
              { icon: <IconTrophy />, label: "Proven Fight System" },
              { icon: <IconUsers />, label: "Direct Coach Access" },
            ].map(({ icon, label }) => (
              <div className="cp-trust-item" key={label}>
                {icon}
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
                  <p className="cp-pain-heading">You're Putting In The Work,<br />But Not Seeing The Results.</p>
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
                <p style={{ color: "#07b4ba", fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
                  The AOF Method
                </p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,5vw,54px)", letterSpacing: 2, color: "#fff", lineHeight: 1 }}>
                  A Proven System.
                </h2>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(36px,5vw,54px)", letterSpacing: 2, color: "#07b4ba", lineHeight: 1 }}>
                  Real Transformation.
                </h2>
                <p style={{ color: "rgba(255,255,255,0.38)", fontFamily: "'Barlow', sans-serif", fontSize: 11, marginTop: 10, letterSpacing: 3, textTransform: "uppercase" }}>
                  Complete Support. Every Step.
                </p>
                <div style={{ width: 48, height: 2, background: "#07b4ba", margin: "14px auto 0" }} />
              </div>
            </Reveal>

            {/* TEXT LEFT / IMAGE RIGHT on desktop | Image first on mobile */}
            <div className="cp-method-grid">
              <div className="cp-method-text">
                {methodItems.map((item, i) => (
                  <Reveal key={i}>
                  <div className="cp-method-item">
  <div className="cp-method-item-icon">{item.icon}</div>
  <p className="cp-method-line">
    {item.desc}
  </p>
</div>
                  </Reveal>
                ))}
              </div>
              <div className="cp-method-image">
                <img
                  src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=900&q=80"
                  alt="MMA Training"
                  style={{ width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", objectFit: "cover" }}
                />
              </div>
            </div>

            {/* WHAT YOU GET */}
            <Reveal style={{ marginTop: 52 }}>
              <h3 style={{ textAlign: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 2, color: "#fff", marginBottom: 20 }}>
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

            {/* OUR PROMISE — premium quote style */}
            <Reveal>
              <div className="cp-promise">
                <span className="cp-promise-quote-mark">"</span>
                <h4>Our Promise</h4>
                <p>
                  Follow the system for 30 days. If you don't improve, we extend your coaching — free.
                  We succeed when you succeed. That's not a slogan, it's our commitment.
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
              <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: "#aaa", fontWeight: 700, marginBottom: 24, letterSpacing: 2, textTransform: "uppercase" }}>
                Your Coach
              </p>
              <div style={{ display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&q=80"
                  alt="Head Coach"
                  style={{ width: 240, height: 300, objectFit: "cover", objectPosition: "top", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 280 }}>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 48, letterSpacing: 2, color: "#fff", marginBottom: 10 }}>
                    Head Coach
                  </h2>
                  <div style={{ width: 60, height: 2, background: "#07b4ba", marginBottom: 22 }} />
                  {coachCredentials.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                      <span style={{ color: "#07b4ba", fontSize: 16, flexShrink: 0 }}>★</span>
                      <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
                    {stats.map((s, i) => (
                      <div key={i} style={{ flex: "1 1 130px", background: "#1a1a1a", borderRadius: 12, padding: "20px 16px", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#07b4ba", fontSize: 30, letterSpacing: 1 }}>{s.val}</h3>
                        <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.42)", fontSize: 11, marginTop: 4, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</p>
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
                <p style={{ fontFamily: "'Barlow', sans-serif", color: "#07b4ba", fontWeight: 700, fontSize: 12, letterSpacing: 3, textTransform: "uppercase" }}>
                  Real People, Real Results
                </p>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px,5vw,56px)", letterSpacing: 2, color: "#fff", marginTop: 8, lineHeight: 1 }}>
                  Trusted By Fighters, <span style={{ color: "#07b4ba" }}>Proven Results</span>
                </h2>
                <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.42)", marginTop: 8, fontSize: 14 }}>
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
                  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px,3vw,42px)", letterSpacing: 1.5, lineHeight: 1.1, marginBottom: 16, color: "#fff" }}>
                    AOF Changed The Way{" "}
                    <span style={{ color: "#07b4ba" }}>I Train And Perform.</span>
                  </h3>
                  <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.75 }}>
                    The structure, the attention to detail, and the accountability took me to a level I never thought possible. I'm stronger, faster, and fight with more confidence than ever.
                  </p>
                  <p style={{ fontFamily: "'Barlow', sans-serif", marginTop: 14, color: "#07b4ba", fontWeight: 700, fontSize: 14 }}>
                    — Alex M., Amateur MMA Fighter
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="cp-feedback-cards">
              {feedbackCards.map((t, i) => (
                <Reveal key={i}>
                  <div className="cp-feedback-card">
                    <p>{t.text}</p>
                    <p className="author">— {t.author}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 5: APPLY FORM ── */}
        <div className="cp-apply-bg" ref={formRef}>
          <div className="cp-section">
            <div style={{ display: "flex", gap: 56, alignItems: "flex-start", flexWrap: "wrap" }}>

              {/* LEFT */}
              <div style={{ flex: 1, minWidth: 260 }}>
                <Reveal>
                  <p style={{ fontFamily: "'Barlow', sans-serif", color: "#07b4ba", fontWeight: 700, fontSize: 12, letterSpacing: 2.5, marginBottom: 12, textTransform: "uppercase" }}>
                    Ready To Start?
                  </p>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(34px,5vw,54px)", letterSpacing: 2, lineHeight: 1.0, marginBottom: 18, color: "#fff" }}>
                    Apply For Your<br />
                    <span style={{ color: "#07b4ba" }}>1-On-1 Coaching Spot</span>
                  </h2>
                  <p style={{ fontFamily: "'Barlow', sans-serif", color: "rgba(255,255,255,0.52)", fontSize: 14, lineHeight: 1.7, marginBottom: 28, maxWidth: 380 }}>
                    Spots are limited. We only take on a small number of students at a time to ensure every athlete gets the attention they deserve. Fill out the form and we'll reach out within 24 hours.
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
                        <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", color: "#fff", fontSize: 28, letterSpacing: 2, marginBottom: 8 }}>
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
                          onChange={e => setLead(f => ({ ...f, name: e.target.value }))}
                        />
                        <input
                          className="cp-input"
                          type="tel"
                          placeholder="Phone Number"
                          value={lead.phone}
                          onChange={e => setLead(f => ({ ...f, phone: e.target.value }))}
                        />
                        <select
                          className="cp-input"
                          value={lead.goal}
                          onChange={e => setLead(f => ({ ...f, goal: e.target.value }))}
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

        {/* FOOTER */}
        <footer className="cp-footer">
          <span className="cp-footer-logo">AOF</span>
          <p>© {new Date().getFullYear()} Art of Fight Academy. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}
