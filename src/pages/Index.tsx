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

const Index = () => (
  <div className="min-h-screen">
    <StickyAd />
    <Navbar />
    <HeroSection />
    <Reveal type="fade-up">
      <IntroSection />
    </Reveal>
    <Reveal type="fade-up">
      <ServicesSection />
    </Reveal>
    <Reveal type="fade-up">
      <CoachSection />
    </Reveal>
    <Reveal type="scale-up">
      <SocialProofSection />
    </Reveal>
    <Reveal type="fade-up">
      <TestimonialsSection />
    </Reveal>
    <Reveal type="scale-up">
      <CtaPairSection />
    </Reveal>
    <Reveal type="fade-up">
      <ContactSection />
    </Reveal>
    <Footer />
  </div>
);

export default Index;
