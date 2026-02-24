"use client";
import { useEffect } from "react";

const TawkWidget = () => {
  useEffect(() => {
    const loadTawk = () => {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://embed.tawk.to/6736f9f24304e3196ae2fcc5/1icnc0nes";
      script.setAttribute("crossorigin", "*");

      const scriptParent =
        document.getElementsByTagName("script")[0].parentNode;
      if (scriptParent) {
        scriptParent.appendChild(script);
      }
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(loadTawk, { timeout: 5000 });
      return () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(loadTawk, 5000);
      return () => clearTimeout(id);
    }
  }, []);

  return null; // This component doesn't render anything visible.
};

export default TawkWidget;
