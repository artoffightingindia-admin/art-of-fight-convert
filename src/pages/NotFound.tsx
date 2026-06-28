import { useLocation, useEffect } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    // Set meta tags for 404 page
    document.title = "Page Not Found (404) | Art of Fighting India";
    
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

    // Meta descriptions for 404
    updateMetaTag("description", "The page you are looking for does not exist. Return to Art of Fighting India home page to explore our MMA training programs and coaching services.");
    updateMetaTag("keywords", "404 error, page not found, error page");
    updateMetaTag("viewport", "width=device-width, initial-scale=1.0");

    // Open Graph tags
    updateOgTag("og:title", "Page Not Found | Art of Fighting India");
    updateOgTag("og:description", "The requested page could not be found. Please return to the home page.");
    updateOgTag("og:type", "website");
    updateOgTag("og:url", window.location.origin + location.pathname);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary");
    updateMetaTag("twitter:title", "Page Not Found | Art of Fighting India");
    updateMetaTag("twitter:description", "The page you're looking for does not exist.");
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
