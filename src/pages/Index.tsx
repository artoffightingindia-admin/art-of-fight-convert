import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import ServicesSection from "@/components/ServicesSection";
import CoachSection from "@/components/CoachSection";
import SocialProofSection from "@/components/SocialProofSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaPairSection from "@/components/CtaPairSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import StickyAd from "@/components/StickyAd";

const Index = () => {
  useEffect(() => {
    // Set meta tags for Home page
    document.title = "Art of Fighting India - MMA Training & Coaching";
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updateOgTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Meta descriptions
    updateMetaTag("description", "Learn professional MMA training with Art of Fighting India. Expert coaching, proven programs, and community support for beginners and advanced fighters.");
    updateMetaTag("keywords", "MMA training, MMA coaching, martial arts, fighting, MMA classes, Art of Fighting");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph tags
    updateOgTag("og:title", "Art of Fighting India - Premier MMA Training Platform");
    updateOgTag("og:description", "Join thousands of fighters learning professional MMA with expert coaches and proven programs.");
    updateOgTag("og:type", "website");
    updateOgTag("og:url", window.location.origin);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", "Art of Fighting India - MMA Training & Coaching");
    updateMetaTag("twitter:description", "Professional MMA training with expert coaching and community support.");
  }, []);

  return (
    <div className="min-h-screen">
      <StickyAd />
      <Navbar />
      <HeroSection />
      <Reveal animation="fade-up">
        <IntroSection />
      </Reveal>
      <Reveal animation="fade-up">
        <ServicesSection />
      </Reveal>
      <Reveal animation="fade-up">
        <CoachSection />
      </Reveal>
      <Reveal animation="scale-in">
        <SocialProofSection />
      </Reveal>
      <Reveal animation="fade-up">
        <TestimonialsSection />
      </Reveal>
      <Reveal animation="scale-in">
        <CtaPairSection />
      </Reveal>
      <Reveal animation="fade-up">
        <ContactSection />
      </Reveal>
      <Footer />
    </div>
  );
};

export default Index;
