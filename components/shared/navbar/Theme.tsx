"use client";
import React from "react";
import Image from "next/image";
// import { useTheme } from "@/context/ThemeProvider";

// Simplified Theme component - dark mode only
const Theme = () => {
  // const { mode } = useTheme(); // We still use the theme context for consistency
  
  return (
    <div className="relative cursor-default">
      <Image
        src="/assets/icons/moon.svg"
        alt="dark mode"
        width={20}
        height={20}
        className="active-theme"
      />
    </div>
  );
};

export default Theme;
