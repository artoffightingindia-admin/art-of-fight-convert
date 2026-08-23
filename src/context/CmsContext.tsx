import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  role?: string;
  image?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  days: string;
  image: string;
  points: string[];
}

export interface WhyCardItem {
  id: string;
  title: string;
  desc: string;
}

export interface BonusItem {
  id: string;
  title: string;
  desc: string;
}

export interface SiteContent {
  visibility: {
    heroSection: boolean;
    trustIndicators: boolean;
    introSection: boolean;
    servicesSection: boolean;
    coachSection: boolean;
    socialProofSection: boolean;
    testimonialsSection: boolean;
    ctaPairSection: boolean;
    contactSection: boolean;
    stickyAd: boolean;

    programHero: boolean;
    programTrust: boolean;
    programPain: boolean;
    programIntro: boolean;
    programWhy: boolean;
    programRoadmap: boolean;
    programPromise: boolean;
    programCoach: boolean;
    programTestimonials: boolean;
    programBonuses: boolean;
    programCta: boolean;
    programFaq: boolean;
  };

  home: {
    heroTagline: string;
    heroTitle: string;
    heroSubtitle: string;
    heroImage: string;
    heroBtn1Text: string;
    heroBtn2Text: string;
    trust1: string;
    trust2: string;
    trust3: string;
    introTagline: string;
    introHeading: string;
    introParagraph1: string;
    introParagraph2: string;
    servicesTagline: string;
    servicesHeading: string;
    servicesSubtitle: string;
    card1Badge: string;
    card1Title: string;
    card1Desc: string;
    card1Points: string[];
    card1BtnText: string;
    card2Badge: string;
    card2Title: string;
    card2Desc: string;
    card2Points: string[];
    card2BtnText: string;
    coachSectionTagline: string;
    coach1Name: string;
    coach1Title: string;
    coach1Image: string;
    coach1Bio: string;
    coach1Points: string[];
    coach2Name: string;
    coach2Title: string;
    coach2Image: string;
    coach2Bio: string;
    coach2Points: string[];
    socialProofTitle: string;
    socialProofSubheading: string;
    socialProofCount: string;
    socialProofVideo1: string;
    socialProofVideo2: string;
    socialProofVideo3: string;
    testimonialVideoUrl: string;
    testimonialVideoHeading: string;
    testimonialsTagline: string;
    testimonialsHeading: string;
    testimonialsSubheading: string;
    testimonials: TestimonialItem[];
    ctaPairHeading: string;
    ctaPairSubtitle: string;
    ctaPairDesc: string;
    ctaPairBgImage: string;
    ctaCard1Title: string;
    ctaCard1Desc: string;
    ctaCard2Title: string;
    ctaCard2Desc: string;
    ctaBottomText: string;
    stickyAdText: string;
    stickyAdBtnText: string;
    stickyAdLink: string;
  };

  program: {
    heroTagline: string;
    heroTitle: string;
    heroSubtitle: string;
    heroBgImage: string;
    heroBtnText: string;
    trust1: string;
    trust2: string;
    trust3: string;
    painTitle: string;
    painTagline: string;
    painSubheading: string;
    painVideoUrl: string;
    painPoints: string[];
    introTagline: string;
    introHeading: string;
    introImage: string;
    introText1: string;
    introText2: string;
    whyTagline: string;
    whyHeading: string;
    whyCards: WhyCardItem[];
    roadmapTagline: string;
    roadmapHeading: string;
    roadmapSubtitle: string;
    roadmapFootnote: string;
    roadmapCards: RoadmapItem[];
    promiseHeading: string;
    promiseQuote: string;
    promiseBtnText: string;
    coachTagline: string;
    coachName: string;
    coachTitle: string;
    coachImage: string;
    coachCreds: string[];
    stats: { val: string; label: string }[];
    testimonialTagline: string;
    testimonialHeading: string;
    testimonialSubheading: string;
    testimonialVideoUrl: string;
    testimonialQuote: string;
    testimonialText: string;
    testimonialAuthor: string;
    feedbacks: TestimonialItem[];
    bonusTagline: string;
    bonusHeading: string;
    bonusSubtitle: string;
    bonusWorth: string;
    bonuses: BonusItem[];
    ctaTagline: string;
    ctaHeading: string;
    ctaDesc: string;
    ctaFeatures: string[];
    guaranteeTitle: string;
    guaranteeText: string;
    ribbonSaveText: string;
    ribbonOfferText: string;
    membersLimitText: string;
    ctaCardHeading: string;
    originalPrice: string;
    showOriginalPriceStrike: boolean;
    priceDiscount: string;
    ctaBtnText: string;
    batchNotice: string;
    targetCountdownDate: string;
    buyNowUrl: string;
    whatsappNumber: string;
    whatsappMessage: string;
    faqs: FaqItem[];
  };

  contact: {
    phone: string;
    email: string;
    address: string;
    footerTagline: string;
  };
}

export const defaultContent: SiteContent = {
  visibility: {
    heroSection: true,
    trustIndicators: true,
    introSection: true,
    servicesSection: true,
    coachSection: true,
    socialProofSection: true,
    testimonialsSection: true,
    ctaPairSection: true,
    contactSection: true,
    stickyAd: true,
    programHero: true,
    programTrust: true,
    programPain: true,
    programIntro: true,
    programWhy: true,
    programRoadmap: true,
    programPromise: true,
    programCoach: true,
    programTestimonials: true,
    programBonuses: true,
    programCta: true,
    programFaq: true,
  },
  home: {
    heroTagline: "Art of Fighting Academy",
    heroTitle: "STOP DOUBTING.\nSTART LEARNING MMA\nTHE RIGHT WAY.",
    heroSubtitle: "Whether you're starting at home or want to train with a coach, AOF provides the structure, guidance, and accountability to achieve real results.",
    heroImage: "/images/Hero.jpg",
    heroBtn1Text: "1 on 1 Coaching (Coming Soon)",
    heroBtn2Text: "AOF 30 Days Program",
    trust1: "Proven System",
    trust2: "Real Results",
    trust3: "Tamil Team",
    introTagline: "WHY AOF ?",
    introHeading: "A SYSTEM FOR REAL PROGRESS.",
    introParagraph1: "You don't struggle because you lack motivation. You struggle because you lack structure. At Art of Fighting, we simplify the learning process through structured training, clear progressions, and direct mentorship.",
    introParagraph2: "Whether you're looking to learn MMA, improve your fitness, build confidence, develop self-defense skills, or eventually compete, our goal is simple: Help you make progress without wasting months figuring things out on your own.",
    servicesTagline: "CHOOSE YOUR PATH",
    servicesHeading: "TWO PATHS.ONE GOAL. REAL TRANSFORMATION.",
    servicesSubtitle: "Choose the coaching experience that best matches your goals, schedule, and lifestyle.",
    card1Badge: "Most Personalized",
    card1Title: "1-ON-1 HOME TRANSFORMATION",
    card1Desc: "A fully customized coaching experience combining MMA training, fitness, nutrition, accountability, and lifestyle guidance.",
    card1Points: ["Personalized Coaching", "Tailored to your goal", "Built Around Your Lifestyle"],
    card1BtnText: "START YOUR TRANSFORMATION (COMING SOON)",
    card2Badge: "BEST FOR SELF-LEARNERS",
    card2Title: "30-DAY MMA STRIKING PROGRAM",
    card2Desc: "A structured online coaching experience designed to help beginners learn MMA striking fundamentals from home with confidence.",
    card2Points: ["Step-by-step roadmap", "Learn at your own pace", "Coach feedback included"],
    card2BtnText: "SEE HOW IT WORKS",
    coachSectionTagline: "Led By",
    coach1Name: "Purushothaman MK",
    coach1Title: "Head Coach | Professional MMA Fighter",
    coach1Image: "https://i.postimg.cc/gjQP69D1/Purushoth-Coach-jpg.jpg",
    coach1Bio: "Purushothaman helps beginners and athletes build real skills, confidence and discipline through structured training, clear fundamentals, and a proven path to lasting progress.",
    coach1Points: [
      "Only Tamil Fighter to compete in MFN and a Multiple-Time National Medalist.",
      "Trained 2000+ MMA students, including national champions across multiple disciplines.",
      "10+ Years in MMA with 20+ Fights Competed Nationally & Internationally."
    ],
    coach2Name: "Kaviarasu K",
    coach2Title: "Program Development | MMA Athlete",
    coach2Image: "https://i.postimg.cc/Zn2hykcD/Kaviarasu-jpg.jpg",
    coach2Bio: "Kaviarasu oversees program development and student support at Art of Fighting, ensuring every member has the guidance, accountability, and structure needed to succeed.",
    coach2Points: [
      "State Boxing Champion & Pro-Am National Muay Thai Champion.",
      "5+ Years of Mixed Martial Arts Experience.",
      "Co-Creator of AOF's Programs & Content."
    ],
    socialProofTitle: "SEE HOW WE TEACH.\nSEE HOW WE TRAIN.",
    socialProofSubheading: "MMA fans follow AOF to learn, improve, and stay connected to the sport.",
    socialProofCount: "5,000+",
    socialProofVideo1: "zjcVWjWSJog",
    socialProofVideo2: "xuAeRmO82Gk",
    socialProofVideo3: "H49Y6b7wn58",
    testimonialVideoUrl: "KTlqLcAeisU",
    testimonialVideoHeading: "Hear Directly From People Who Have Trained Under Coach Purushothaman",
    testimonialsTagline: "Results and Success Stories",
    testimonialsHeading: "Real People, Real Progress",
    testimonialsSubheading: "Hear Directly From People Who Have Trained Under Coach Purushothaman",
    testimonials: [
      { id: "1", text: "Even as a complete beginner, I was able to understand the techniques clearly and execute them with confidence.", author: "Pradeep", role: "Member", image: "https://i.postimg.cc/ZYjqbkYs/Pradeep-(1).jpg" },
      { id: "2", text: "He breaks down even complex techniques into simple steps, which made it easy to understand and apply.", author: "Rahul", role: "Member", image: "https://i.postimg.cc/7PXLHvPV/Rahul-(1).jpg" },
      { id: "3", text: "I'm a slow learner, but he was patient and made sure I understood every technique before moving forward.", author: "Bharathwaj", role: "Member", image: "https://i.postimg.cc/bYLvyXYF/Bharathwaj-(1).jpg" },
      { id: "4", text: "He gives individual attention to everyone, whether you're a beginner learning the basics or an experienced fighter preparing to compete.", author: "Surya", role: "Fighter", image: "https://i.postimg.cc/mZVrLxZd/Surya-(1).jpg" },
      { id: "5", text: "He doesn't just coach MMA. He guides you like a mentor with training, fitness, mindset, and long-term development.", author: "Madhan", role: "Member", image: "https://i.postimg.cc/q7HbD53j/Madan-jpg.jpg" },
      { id: "6", text: "I was doubtful when I started, but his guidance and structured approach helped me improve far more than I expected.", author: "Sohail Mohammad", role: "Athlete", image: "https://i.postimg.cc/Dz3jpMXj/sohail.jpg" }
    ],
    ctaPairHeading: "Start Your New Journey",
    ctaPairSubtitle: "How Do You Want To Train?",
    ctaPairDesc: "Choose The Coaching Experience That Fits Your Goals.",
    ctaPairBgImage: "https://i.postimg.cc/g2KvzG4M/CTA-Image-jpg.jpg",
    ctaCard1Title: "1-1 Coaching (Coming Soon)",
    ctaCard1Desc: "Personalized coaching tailored to your goals, lifestyle, and schedule.",
    ctaCard2Title: "30-Days Program",
    ctaCard2Desc: "Learn MMA online with a structured, beginner-friendly roadmap.",
    ctaBottomText: "Progress starts when you stop guessing and start training.",
    stickyAdText: "Join the next AOF 30-Day Training Intake. Limited slots remaining!",
    stickyAdBtnText: "Enroll Now",
    stickyAdLink: "/program"
  },
  program: {
    heroTagline: "AOF 30-Day Online Program",
    heroTitle: "BUILD REAL\nMMA STRIKING\nFUNDAMENTALS",
    heroSubtitle: "A step-by-step online system designed for complete beginners to learn proper MMA striking from home — Even if you've never trained before.",
    heroBgImage: "/images/Program page Hero.jpeg",
    heroBtnText: "JOIN NOW",
    trust1: "Proven System",
    trust2: "Tamil Team",
    trust3: "Real Results",
    painTitle: "5 MINUTES THAT COULD SAVE YOU MONTHS OF CONFUSION",
    painTagline: "Sounds Familiar?",
    painSubheading: "YOU WANT TO LEARN MMA.\nBUT HAVEN'T STARTED BECAUSE YOU:",
    painVideoUrl: "79xvYiiBFfk",
    painPoints: [
      "Don't know where to begin",
      "Don't have access to a quality MMA gym",
      "Don't have a training partner or equipment",
      "Can't commit hours every day to training",
      "Can't find structured MMA guidance in Tamil"
    ],
    introTagline: "Introducing AOF 30-Day Program",
    introHeading: "THE STARTING POINT\nYOU'VE BEEN LOOKING FOR.",
    introImage: "https://i.postimg.cc/kMyztfKs/Program-Intro-jpg.jpg",
    introText1: "The AOF 30-Day MMA Striking Program was built to make learning MMA simple, structured, and accessible. Train from home, follow a proven roadmap, receive direct support from coaches, and develop real striking fundamentals without needing a gym, training partner, or hours of free time every day.",
    introText2: "We've built the roadmap. You just need to follow it.",
    whyTagline: "WHY THIS PROGRAM WORKS?",
    whyHeading: "BUILT AROUND THE REAL CHALLENGES OF BEGINNERS",
    whyCards: [
      { id: "1", title: "CLEAR ROADMAP", desc: "Know exactly what to train, when to train, and how to progress throughout the program." },
      { id: "2", title: "TRAIN ON YOUR SCHEDULE", desc: "Access pre-recorded sessions and train whenever it suits you. Most sessions take just 30–40 minutes a day." },
      { id: "3", title: "TRAIN WITH CONFIDENCE", desc: "Receive direct coach feedback and guidance so you know you're practicing techniques correctly." },
      { id: "4", title: "BEGINNER FRIENDLY", desc: "Start with confidence, even if you've never trained MMA before." },
      { id: "5", title: "LEARN IN Tamil", desc: "Understand concepts faster through coaching delivered in Tamil and simple English." }
    ],
    roadmapTagline: "THE AOF BLUEPRINT",
    roadmapHeading: "A CLEARPATH TO MMA STRIKING.",
    roadmapSubtitle: "Follow a structured progression designed to take you from complete beginner to confidently performing fundamental MMA striking techniques.",
    roadmapFootnote: "Every week includes Movement Fundamentals and White Belt Mentality sessions, along with access to the Mistake Library. Technique Cue Cards and Warm-Up & Cooldown Guide support your learning throughout the program.",
    roadmapCards: [
      { id: "1", title: "Week 01", days: "DAYS 1 - 7 : Build your foundation", image: "https://i.postimg.cc/1zSH9ZXw/Week-1-jpg.jpg", points: ["Stance & Guard", "Core Punches", "Basic Combinations", "Strong Technical Fundamentals"] },
      { id: "2", title: "Week 02", days: "DAYS 8 - 14 : Defense to Offense", image: "https://i.postimg.cc/pdvZ2trB/Week-2-jpg.jpg", points: ["Punch Defenses", "Punch Combinations", "Punch Counters", "Roundhouse Kicks"] },
      { id: "3", title: "Week 03", days: "DAYS 15 - 21 : BEYOND THE HANDS", image: "https://i.postimg.cc/0Nvf8qjn/Week-3-jpg.jpg", points: ["Push Kicks", "Switch Kick", "Kick Defenses", "Punch-Kick Combinations"] },
      { id: "4", title: "Week 04", days: "DAYS 22 - 28 : Expanding Your Arsenal", image: "https://i.postimg.cc/jjTXsr2X/Week-4-jpg.jpg", points: ["Kick Counters", "Knees & Elbows", "Advanced Combinations", "Structured Shadowboxing"] },
      { id: "5", title: "Week 05", days: "DAYS 29 - 30 : PUTTING IT ALL TOGETHER", image: "https://i.postimg.cc/bvPTzjrm/Week-5-jpg.jpg", points: ["Complete Striking Integration", "Shadowboxing Fundamentals", "Developing Flow", "Independent Training"] }
    ],
    promiseHeading: "Our Promise",
    promiseQuote: "In 30 days, our goal is simple: Take you from knowing nothing about MMA striking to performing fundamental techniques correctly and shadowbox confidently on your own.Commit to the process, and we'll show you the path.",
    promiseBtnText: "Join Now",
    coachTagline: "LED BY",
    coachName: "Purushothaman MK",
    coachTitle: "Head Coach and MMA Fighter",
    coachImage: "https://i.postimg.cc/dV05DLwc/IMG-20260628-WA0108.jpg",
    coachCreds: [
      "Only Tamil MMA Fighter in MFN and Multiple-Time National Medalist",
      "Coached 2000+ Students, Including National Champions Across Multiple Disciplines",
      "Specialized in Developing Strong Fundamentals for Beginners"
    ],
    stats: [
      { val: "2,000+", label: "Clients Coached" },
      { val: "10+", label: "Years Experience" },
      { val: "20+", label: "MMA Fights" },
      { val: "10K+", label: "AOF Community" }
    ],
    testimonialTagline: "FROM OUR FIRST BATCH",
    testimonialHeading: "WHAT HAPPENED AFTER 30 DAYS",
    testimonialSubheading: "Hear directly from people who completed the AOF 30-Day MMA Striking Program",
    testimonialVideoUrl: "4Z8PSdk6Ak0",
    testimonialQuote: "The More I Progressed,The More I Wanted To Train",
    testimonialText: "I started with doubts and made mistakes. But as I progressed through the program my technique improved and my confidence grew. I even found myself drilling techniques whenever I had free time.",
    testimonialAuthor: "Palanippan, AOF 30 Days Program Member.",
    feedbacks: [
      { id: "1", text: "I used to watch YouTube tutorials and understand nothing. Everything felt confusing. But AOF's learning modules felt just like in-person training. Online was never a roadblock.", author: "Saran", role: "Member" },
      { id: "2", text: "The step-by-step teaching was excellent. Even complex concepts like power generation and hip rotation were explained so clearly that I understood everything just by watching the videos.", author: "Mani Bharathi", role: "Member" },
      { id: "3", text: "Whenever I wasn't sure about something, I would record my technique and send it to the coach. The feedback was quick, clear, and helped me fix mistakes immediately.", author: "Thirumurugan", role: "Member" },
      { id: "4", text: "At first I was doubtful about online training, but as I progressed, I knew I was on the right path and improving every week. I haven't seen any other online MMA content explained with this level of clarity and detail.", author: "Afrose", role: "Member", image: "https://i.postimg.cc/LszHGw0Q/Adobe-Express-file.jpg" }
    ],
    bonusTagline: "BEYOND THE CORE PROGRAM",
    bonusHeading: "EVERYTHING DESIGNED TO HELP YOU SUCCEED",
    bonusSubtitle: "Enroll now and receive exclusive bonus resources designed to maximize your results.",
    bonusWorth: "₹2,999",
    bonuses: [
      { id: "1", title: "MOVEMENT FUNDAMENTALS", desc: "4 guided modules to improve your mobility, balance, coordination, and body control." },
      { id: "2", title: "WHITE BELT MENTALITY", desc: "4 lessons to help beginners train smarter, stay consistent, and avoid common mistakes." },
      { id: "3", title: "THE MISTAKE LIBRARY", desc: "50+ side-by-side corrections showing common mistakes and how to fix them." },
      { id: "4", title: "TECHNIQUE CUE CARDS", desc: "Simple visual references designed to help you remember key techniques faster." },
      { id: "5", title: "Warm Up & Cool Down Guide", desc: "Prepare your body before training and recover properly after every session." }
    ],
    ctaTagline: "Ready To Start?",
    ctaHeading: "DON'T SPEND ANOTHER\nMONTH FEELING STUCK",
    ctaDesc: "No gym. No training partner. No confusion. Just a clear roadmap, proper guidance , and 30–40 minutes a day.",
    ctaFeatures: [
      "Complete 30-Day MMA Striking Roadmap",
      "Direct Coach Support & Technique Feedback",
      "Train From Home In Just 30-40 Minutes A Day",
      "Conditional Refund Policy"
    ],
    guaranteeTitle: "CONDITIONAL PROGRESS GUARANTEE",
    guaranteeText: "Complete the program, submit your training work, and follow the process. If you don't achieve the promised outcome, we'll make it right.",
    ribbonSaveText: "SAVE ₹1200",
    ribbonOfferText: "2Yrs of AOF Offer",
    membersLimitText: "LIMITED TO 20 MEMBERS",
    ctaCardHeading: "START YOUR\nMMA JOURNEY",
    originalPrice: "₹6,199",
    showOriginalPriceStrike: true,
    priceDiscount: "₹4,999",
    ctaBtnText: "JOIN THE NEXT BATCH",
    batchNotice: "Batch 3 Starting 7th September",
    targetCountdownDate: "2026-09-07T23:59:59",
    buyNowUrl: "https://rzp.io/rzp/aof30dayprogram",
    whatsappNumber: "919385431051",
    whatsappMessage: "Hey Team, I've a doubt about AOF 30 days program.",
    faqs: [
      { id: "1", question: "Is this program beginner friendly?", answer: "Absolutely. The program is designed to guide beginners step-by-step while still providing value to more experienced trainee." },
      { id: "2", question: "What will I learn in 30 days?", answer: "You'll build striking fundamentals, footwork, combinations, defensive awareness, conditioning, and training discipline through a structured progression system." },
      { id: "3", question: "How much time do I need each day?", answer: "Most sessions take around 30–45 minutes, making it easy to fit into a busy schedule." },
      { id: "4", question: "What equipment do I need?", answer: "Comfortable training clothes and a small training space are enough to get started. Additional equipment is optional." },
      { id: "5", question: "What happens after I join?", answer: "You'll receive access to the program, onboarding instructions, and a clear roadmap showing exactly what to do each day." },
      { id: "6", question: "How many sessions should I train per week?", answer: "You can reach out through the designated support channels and receive guidance from the AOF team." }
    ]
  },
  contact: {
    phone: "+91 93854 31051",
    email: "info@artoffighting.in",
    address: "Chennai, Tamil Nadu, India",
    footerTagline: "Art of Fighting Academy — building champions through proven systems and disciplined training."
  }
};

interface CmsContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => Promise<boolean>;
  resetContent: () => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem("aof_master_cms_v7");
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // 1. Session check & Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Fetch site config from Supabase on load
  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        const { data, error } = await supabase
          .from("site_config")
          .select("data")
          .eq("id", "aof_master_config")
          .single();

        if (error) {
          console.warn("Supabase fetch warning:", error.message);
          return;
        }

        if (data && data.data && typeof data.data === "object" && Object.keys(data.data).length > 0) {
          const merged: SiteContent = {
            visibility: { ...defaultContent.visibility, ...(data.data.visibility || {}) },
            home: { ...defaultContent.home, ...(data.data.home || {}) },
            program: { ...defaultContent.program, ...(data.data.program || {}) },
            contact: { ...defaultContent.contact, ...(data.data.contact || {}) },
          };
          setContent(merged);
          localStorage.setItem("aof_master_cms_v7", JSON.stringify(merged));
        }
      } catch (err) {
        console.error("Supabase load error:", err);
      }
    };

    fetchRemoteConfig();
  }, []);

  // 3. Realtime listener for cross-tab sync
  useEffect(() => {
    const channel = supabase
      .channel("site_config_live")
      .on(
        "postgres_changes" as any,
        {
          event: "UPDATE",
          schema: "public",
          table: "site_config",
          filter: "id=eq.aof_master_config",
        },
        (payload: any) => {
          if (payload.new && payload.new.data) {
            const remoteData = payload.new.data;
            setContent((prev) => ({
              visibility: { ...prev.visibility, ...(remoteData.visibility || {}) },
              home: { ...prev.home, ...(remoteData.home || {}) },
              program: { ...prev.program, ...(remoteData.program || {}) },
              contact: { ...prev.contact, ...(remoteData.contact || {}) },
            }));
            localStorage.setItem("aof_master_cms_v7", JSON.stringify(remoteData));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 4. Admin shortcut (Ctrl + Shift + Meta + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.metaKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        if (isAuthenticated) {
          setIsPanelOpen((prev) => !prev);
        } else {
          setIsAuthModalOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthenticated]);

  // 5. Update content in local cache & Supabase
  const updateContent = async (newContent: Partial<SiteContent>): Promise<boolean> => {
    const updated: SiteContent = {
      visibility: { ...content.visibility, ...(newContent.visibility || {}) },
      home: { ...content.home, ...(newContent.home || {}) },
      program: { ...content.program, ...(newContent.program || {}) },
      contact: { ...content.contact, ...(newContent.contact || {}) },
    };

    // Instant local UI state reflection
    setContent(updated);
    try {
      localStorage.setItem("aof_master_cms_v7", JSON.stringify(updated));
    } catch (err) {
      console.error("Storage error:", err);
    }

    // Persist to Supabase
    try {
      const { error } = await supabase
        .from("site_config")
        .upsert({
          id: "aof_master_config",
          data: updated,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Supabase update error:", error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error("Supabase upsert failed:", err);
      return false;
    }
  };

  // 6. Reset content
  const resetContent = async () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem("aof_master_cms_v7");
      await supabase
        .from("site_config")
        .upsert({
          id: "aof_master_config",
          data: defaultContent,
          updated_at: new Date().toISOString(),
        });
    } catch (err) {
      console.error("Reset error:", err);
    }
  };

  // 7. Supabase Authentication Login
  const login = async (emailInput: string, passInput: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.trim(),
        password: passInput,
      });

      if (error || !data.user) {
        console.error("Supabase login failed:", error?.message);
        return false;
      }

      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      setIsPanelOpen(true);
      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  // 8. Supabase Authentication Logout
  const logout = () => {
    supabase.auth.signOut().catch((err) => console.error("Signout error:", err));
    setIsAuthenticated(false);
    setIsPanelOpen(false);
  };

  return (
    <CmsContext.Provider
      value={{
        content,
        updateContent,
        resetContent,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isPanelOpen,
        setIsPanelOpen,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) throw new Error("useCms must be used within a CmsProvider");
  return context;
};
