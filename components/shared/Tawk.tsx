"use client";
import { useEffect } from "react";

const TawkWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6736f9f24304e3196ae2fcc5/1icnc0nes";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    const scriptParent = document.getElementsByTagName("script")[0].parentNode;
    if (scriptParent) {
      scriptParent.appendChild(script);
    }

    return () => {
      const tawkScript = document.querySelector(
        "script[src='https://embed.tawk.to/6736f9f24304e3196ae2fcc5/1icnc0nes']"
      );
      if (tawkScript && tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible.
};

export default TawkWidget;
