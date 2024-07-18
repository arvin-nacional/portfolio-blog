import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero2 from "@/components/Hero2";
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
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      {/* <CTA /> */}
      <Footer />
    </div>
  );
};

export default Home;
