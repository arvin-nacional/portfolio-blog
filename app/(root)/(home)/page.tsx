import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import React from "react";

const Home = () => {
  return (
    <div>
      {/* <Hero /> */}
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Home;
