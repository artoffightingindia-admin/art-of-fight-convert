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
import { useCms } from "@/context/CmsContext";

const Index = () => {
  const { content } = useCms();
  const v = content.visibility;

  return (
    <div className="min-h-screen">
      {v.stickyAd && <StickyAd />}
      <Navbar />

      {v.heroSection && <HeroSection />}

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

      <Reveal type="fade-up">
        <ContactSection />
      </Reveal>

      <Footer />
    </div>
  );
};

export default Index;
