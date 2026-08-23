import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustIndicators from "@/components/TrustIndicators";
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
import { AdminPanel } from "@/components/AdminPanel";
import { useCms } from "@/context/CmsContext";

const Index = () => {
  const { content } = useCms();
  const v = content.visibility || {};

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-[#07b4ba]/30 selection:text-white">
      {v.stickyAd && <StickyAd />}
      <Navbar />

      {v.heroSection && <HeroSection />}
      {v.trustIndicators && <TrustIndicators />}

      {v.introSection && (
        <Reveal type="fade-up">
          <IntroSection />
        </Reveal>
      )}

      {v.servicesSection && (
        <Reveal type="fade-up">
          <ServicesSection />
        </Reveal>
      )}

      {v.coachSection && (
        <Reveal type="fade-up">
          <CoachSection />
        </Reveal>
      )}

      {v.socialProofSection && (
        <Reveal type="scale-up">
          <SocialProofSection />
        </Reveal>
      )}

      {v.testimonialsSection && (
        <Reveal type="fade-up">
          <TestimonialsSection />
        </Reveal>
      )}

      {v.ctaPairSection && (
        <Reveal type="scale-up">
          <CtaPairSection />
        </Reveal>
      )}

      {v.contactSection && (
        <Reveal type="fade-up">
          <ContactSection />
        </Reveal>
      )}

      <Footer />
      <AdminPanel />
    </div>
  );
};

export default Index;
