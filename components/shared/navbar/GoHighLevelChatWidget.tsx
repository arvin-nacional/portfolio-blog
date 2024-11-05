"use client";
import { useEffect } from "react";

const GoHighLevelChatWidget = () => {
  useEffect(() => {
    // Create the script element for the chat widget
    const script = document.createElement("script");
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.async = true;

    // Set additional attributes
    script.setAttribute(
      "data-resources-url",
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js"
    );
    script.setAttribute("data-widget-id", "672a134105dded34e695dec9");

    // Append the script to the document body
    document.body.appendChild(script);

    return () => {
      // Remove script on component unmount to avoid duplicates
      document.body.removeChild(script);
    };
  }, []);

  return null; // No visible UI needed for the chat widget, it will load as an overlay
};

export default GoHighLevelChatWidget;
