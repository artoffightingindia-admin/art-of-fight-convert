import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, MapPin, Camera, Video, Users } from "lucide-react";

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we are currently on the blueprint page
  const isBlueprintPage = location.pathname.includes("/blueprint");

  const handleYearClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Navigate on double click (2 clicks)
    if (newCount === 2) {
      navigate("/blueprint");
      setClickCount(0); // Reset counter
    }

    // Reset counter after 300ms if not double-clicked
    setTimeout(() => {
      if (newCount === 1) {
        setClickCount(0);
      }
    }, 300);
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Contact Section */}
        <div>
          <h4 className="font-display text-sm text-foreground uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary" /> +91 93854 31051
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-primary" /> info@artoffighting.in
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="text-primary mt-0.5" /> Chennai, Tamil Nadu, India
            </li>
          </ul>
        </div>

        {/* Dynamic Quick Links Section */}
        <div>
          <h4 className="font-display text-sm text-foreground uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {isBlueprintPage ? (
              // Navigation ONLY for the Blueprint Page
              <>
                <li>
                  <button onClick={() => navigate("/")} className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/program")} className="hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0 text-left">
                    30 Days Program 
                  </button>
                </li>
              </>
            ) : (
              // Default Navigation for the rest of the site
              <>
                <li>
                  <a href="#home" className="hover:text-primary transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-primary transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#programs" className="hover:text-primary transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Dynamic Programs Section */}
        <div>
          <h4 className="font-display text-sm text-foreground uppercase tracking-wider mb-4">Programs</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {isBlueprintPage ? (
              // Custom text or links for the Blueprint page program section
              <li>
                <span className="text-muted-foreground/70">
                  Currently viewing: MMA Beginners Blueprint
                </span>
              </li>
            ) : (
              // Default Program links
              <>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    30 Days Program
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    1-on-1 Coaching
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Brand Section */}
        <div className="space-y-3">
          <p className="font-display text-2xl text-primary">AOF</p>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Art of Fighting Academy — building champions through proven systems and disciplined training.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Camera size={16} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Video size={16} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
            >
              <Users size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Art of Fighting Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>
              <span onClick={handleYearClick} className="cursor-pointer hover:text-primary transition-colors">
                {new Date().getFullYear()}
              </span>{" "}
              Art of Fighting Academy
            </span>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
