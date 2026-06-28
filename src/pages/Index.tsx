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

export default Index;
