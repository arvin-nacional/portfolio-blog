import About from "@/components/About";

import Hero2 from "@/components/Hero2";
import LogoAnimation from "@/components/LogoAnimation";
import Portfolio from "@/components/Portfolio";

import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

// import Services from "@/components/Services";

import React from "react";

const Home = () => {
  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      <LogoAnimation />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />

      {/* <CTA /> */}
    </div>
  );
};

export default Home;
