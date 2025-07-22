"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always use dark mode
  const [mode, setMode] = useState("dark");

  // Force dark mode regardless of any settings
  const enforceDarkMode = () => {
    setMode("dark");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  };

  // Keep this function for API compatibility, but it will always set dark mode
  const changeTheme = (newMode: string) => {
    // Ignore the requested mode and always use dark
    enforceDarkMode();
  };

  useEffect(() => {
    // Apply dark mode on mount and whenever this effect runs
    enforceDarkMode();
    
    // No need to listen for system preference changes since we're always using dark mode
    return () => {};
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, setMode: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
