import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteContent {
  // --- HERO & INTRO ---
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  introHeading: string;
  introText: string;

  // --- COACHES ---
  coach1Name: string;
  coach1Title: string;
  coach1Image: string;
  coach1Bio: string;
  coach1Point1: string;
  coach1Point2: string;
  coach1Point3: string;
  coach2Name: string;
  coach2Title: string;
  coach2Image: string;
  coach2Bio: string;
  coach2Point1: string;
  coach2Point2: string;
  coach2Point3: string;

  // --- SERVICES & STICKY AD ---
  servicesHeading: string;
  servicesSubheading: string;
  stickyAdText: string;
  stickyAdButtonText: string;
  stickyAdLink: string;

  // --- SOCIAL PROOF & TESTIMONIALS ---
  socialProofHeading: string;
  testimonial1Name: string;
  testimonial1Role: string;
  testimonial1Text: string;
  testimonial2Name: string;
  testimonial2Role: string;
  testimonial2Text: string;

  // --- FAQ & CONTACT & FOOTER ---
  faq1Question: string;
  faq1Answer: string;
  faq2Question: string;
  faq2Answer: string;
  faq3Question: string;
  faq3Answer: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  footerTagline: string;

  // --- PROGRAM PAGE ---
  programPageHeroTitle: string;
  programPageHeroSubtitle: string;
  programPrice: string;
  programDiscountPrice: string;
  programBuyLink: string;
  programFeature1: string;
  programFeature2: string;
  programFeature3: string;
  programYoutubeUrl: string;

  // --- COACHING PAGE ---
  coachingHeroTitle: string;
  coachingHeroSubtitle: string;
  coachingPrice: string;
  coachingApplyLink: string;
  coachingYoutubeUrl: string;
}

export const defaultContent: SiteContent = {
  heroTitle: "STOP DOUBTING.\nSTART LEARNING MMA\nTHE RIGHT WAY.",
  heroSubtitle: "Whether you're starting at home or want to train with a coach, AOF provides the structure, guidance, and accountability to achieve real results.",
  heroImage: "/images/Hero.jpg",
  introHeading: "WHAT IS ART OF FIGHTING?",
  introText: "A premier academy designed to give you professional combat training without the fluff. Step-by-step progress, elite coaching, and real combat science.",

  coach1Name: "Purushothaman MK",
  coach1Title: "Head Coach | Professional MMA Fighter",
  coach1Image: "https://i.postimg.cc/gjQP69D1/Purushoth-Coach-jpg.jpg",
  coach1Bio: "Purushothaman helps beginners and athletes build real skills, confidence and discipline through structured training, clear fundamentals, and a proven path to lasting progress.",
  coach1Point1: "Only Tamil Fighter to compete in MFN and a Multiple-Time National Medalist.",
  coach1Point2: "Trained 2000+ MMA students, including national champions across multiple disciplines.",
  coach1Point3: "10+ Years in MMA with 20+ Fights Competed Nationally & Internationally.",

  coach2Name: "Kaviarasu K",
  coach2Title: "Program Development | MMA Athlete",
  coach2Image: "https://i.postimg.cc/Zn2hykcD/Kaviarasu-jpg.jpg",
  coach2Bio: "Kaviarasu oversees program development and student support at Art of Fighting, ensuring every member has the guidance, accountability, and structure needed to succeed.",
  coach2Point1: "State Boxing Champion & Pro-Am National Muay Thai Champion.",
  coach2Point2: "5+ Years of Mixed Martial Arts Experience.",
  coach2Point3: "Co-Creator of AOF's Programs & Content.",

  servicesHeading: "OUR TRAINING PROGRAMS",
  servicesSubheading: "Engineered for pure progression from ground fundamentals to championship striking.",
  stickyAdText: "Join the next AOF 30-Day Training Intake. Limited slots remaining!",
  stickyAdButtonText: "Enroll Now",
  stickyAdLink: "/program",

  socialProofHeading: "PROVEN BY CHAMPIONS & FIGHT ENTHUSIASTS",
  testimonial1Name: "Arun K.",
  testimonial1Role: "Amateur Kickboxer",
  testimonial1Text: "The structure and technical breakdowns changed my striking game completely within 4 weeks.",
  testimonial2Name: "Dinesh M.",
  testimonial2Role: "Fitness Enthusiast",
  testimonial2Text: "Started from zero martial arts background. The coaches build you up from day one.",

  faq1Question: "Can complete beginners join?",
  faq1Answer: "Yes! Every fundamental is taught step-by-step from day one.",
  faq2Question: "What gear do I need to start?",
  faq2Answer: "Comfortable workout clothes. Hand wraps and boxing gloves will be introduced as you progress.",
  faq3Question: "Is there personal feedback on techniques?",
  faq3Answer: "Yes, our coaches review your form through interactive modules and private channels.",

  contactEmail: "artoffightinginfo@gmail.com",
  contactPhone: "+91 98765 43210",
  contactAddress: "Art of Fight Combat Academy, Tamil Nadu, India",
  footerTagline: "Forging discipline, endurance, and elite combat skills.",

  programPageHeroTitle: "AOF 30 DAYS MMA PROGRAM",
  programPageHeroSubtitle: "Master the fundamental striking, defense, and conditioning drills used by professional fighters.",
  programPrice: "₹4,999",
  programDiscountPrice: "₹1,999",
  programBuyLink: "https://pages.razorpay.com/artoffight",
  programFeature1: "30 Complete Guided Video Workouts",
  programFeature2: "Daily Striking & Footwork Blueprints",
  programFeature3: "Direct Coach Accountability Group",
  programYoutubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

  coachingHeroTitle: "1 ON 1 ELITE COACHING",
  coachingHeroSubtitle: "Custom personalized fighter development plan directly mentored by Head Coach Purushothaman.",
  coachingPrice: "₹9,999 / Month",
  coachingApplyLink: "/contact",
  coachingYoutubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
};

interface CmsContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  resetContent: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem("aof_site_content");
      return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
    } catch {
      return defaultContent;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("aof_admin_auth") === "true";
    } catch {
      return false;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.metaKey &&
        (e.key === "A" || e.key === "a")
      ) {
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

  const updateContent = (newContent: Partial<SiteContent>) => {
    const updated = { ...content, ...newContent };
    setContent(updated);
    try {
      localStorage.setItem("aof_site_content", JSON.stringify(updated));
    } catch (err) {
      console.error("Storage error:", err);
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
    try {
      localStorage.removeItem("aof_site_content");
    } catch (err) {
      console.error("Storage error:", err);
    }
  };

  const login = (email: string, pass: string) => {
    if (email === "artoffightinginfo@gmail.com" && pass === "AOFADMIN24") {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem("aof_admin_auth", "true");
      } catch (err) {
        console.error("Session storage error:", err);
      }
      setIsAuthModalOpen(false);
      setIsPanelOpen(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("aof_admin_auth");
    } catch (err) {
      console.error("Session storage error:", err);
    }
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
        logout
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
