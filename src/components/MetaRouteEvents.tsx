import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// The base pixel in index.html records the first page view. React Router
// changes pages without reloading, so later page views need an explicit event.
export default function MetaRouteEvents() {
  const { pathname } = useLocation();
  const firstRoute = useRef(true);

  useEffect(() => {
    if (firstRoute.current) firstRoute.current = false;
    else window.fbq?.("track", "PageView");

    if (pathname === "/program") {
      window.fbq?.("track", "ViewContent", {
        content_name: "30-Day MMA Striking Program",
      });
    }
  }, [pathname]);

  return null;
}
