import About from "@/components/About";
import CTA from "@/components/CTA";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <CTA />
    </div>
  );
};

export default Home;
