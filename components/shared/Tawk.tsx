"use client";
import { useEffect } from "react";

type TawkApi = {
  onLoad?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
  }
}

const TawkWidget = ({ enabled }: { enabled: boolean }) => {
  useEffect(() => {
    const api = (window.Tawk_API ??= {});
    const hideWidget = () => window.Tawk_API?.hideWidget?.();
    const updateVisibility = () => {
      if (enabled) window.Tawk_API?.showWidget?.();
      else hideWidget();
    };
    api.onLoad = updateVisibility;
    updateVisibility();

    const cleanup = () => {
      api.onLoad = hideWidget;
      hideWidget();
    };

    if (!enabled) return cleanup;

    const loadTawk = () => {
      if (document.getElementById("tawk-widget-script")) return;
      const script = document.createElement("script");
      script.id = "tawk-widget-script";
      script.async = true;
      script.src = "https://embed.tawk.to/6736f9f24304e3196ae2fcc5/1icnc0nes";
      script.setAttribute("crossorigin", "*");

      document.head.appendChild(script);
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(loadTawk, { timeout: 5000 });
      return () => {
        cancelIdleCallback(id);
        cleanup();
      };
    } else {
      const id = setTimeout(loadTawk, 5000);
      return () => {
        clearTimeout(id);
        cleanup();
      };
    }
  }, [enabled]);

  return null; // This component doesn't render anything visible.
};

export default TawkWidget;
