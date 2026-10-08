import React, { Suspense } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Arvin Paul | Web Development & Brand Design",
  description:
    "Custom websites, landing pages, and brand design by Arvin Paul. Explore selected projects and get in touch to discuss your business’s online presence.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark"
      // Browser extensions can add classes before React hydrates this element.
      suppressHydrationWarning
      style={{
        colorScheme: "dark",
        backgroundColor: "#0F1117",
        color: "#FFFFFF",
      }}
    >
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        {children}
        <Analytics />
        <Suspense fallback={null}>
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
