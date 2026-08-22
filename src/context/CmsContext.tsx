aimport React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  youtubeVideoUrl: string;
  aboutText: string;
  coachBio: string;
}

const defaultContent: SiteContent = {
  heroTitle: "BECOME A FIGHTER",
  heroSubtitle: "Transform your body, mind, and spirit with premier MMA training.",
  heroImage: "/images/Hero.jpg",
  youtubeVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  aboutText: "Art of Fight provides world-class combat training for all skill levels.",
  coachBio: "Certified professional trainers with extensive combat experience."
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
      return saved ? JSON.parse(saved) : defaultContent;
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
