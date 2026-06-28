import { useEffect } from "react";
// ... rest of imports remain the same

// Use this hook at the beginning of CoachingPage component:
useEffect(() => {
  // Set meta tags for Coaching page
  document.title = "Professional MMA Coaching | Art of Fighting India";
  
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
  updateMetaTag("description", "Get professional one-on-one MMA coaching from certified instructors. Personalized training programs tailored to your goals and experience level.");
  updateMetaTag("keywords", "MMA coaching, personal training, boxing coaching, martial arts instruction, beginner coaching");
  updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

  // Open Graph tags
  updateOgTag("og:title", "Professional MMA Coaching | Art of Fighting India");
  updateOgTag("og:description", "Expert one-on-one coaching sessions tailored to your skill level and goals.");
  updateOgTag("og:type", "website");
  updateOgTag("og:url", window.location.origin + "/coaching");

  // Twitter Card tags
  updateMetaTag("twitter:card", "summary_large_image");
  updateMetaTag("twitter:title", "Professional MMA Coaching | Art of Fighting India");
  updateMetaTag("twitter:description", "Get expert coaching from certified MMA instructors with personalized programs.");
}, []);

// ... rest of the component code
