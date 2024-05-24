import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <CTA />
    </div>
  );
};

export default Home;
