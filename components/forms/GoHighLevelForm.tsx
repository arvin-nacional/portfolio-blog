"use client";

import { useEffect } from "react";

const GoHighLevelForm = () => {
  useEffect(() => {
    // Append the external script for form functionality
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Remove script on component unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="size-full animate-fade shadow-md animate-duration-[500ms] animate-once animate-ease-in">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/riTWHwgp3vqF987Z9g9n"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: "3px",
        }}
        id="inline-riTWHwgp3vqF987Z9g9n"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="RvinPaul Contact Form"
        data-height="886"
        data-layout-iframe-id="inline-riTWHwgp3vqF987Z9g9n"
        data-form-id="riTWHwgp3vqF987Z9g9n"
        title="RvinPaul Contact Form"
      />
    </div>
  );
};

export default GoHighLevelForm;
