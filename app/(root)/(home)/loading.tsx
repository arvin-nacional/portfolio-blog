import About from "@/components/About";
import CTA from "@/components/shared/CTA";
import Hero2 from "@/components/Hero2";
import React from "react";
// import LogoAnimation from "@/components/LogoAnimation";
import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";
import PortfolioSkeleton from "@/components/PortfolioSkeleton";
import BlogsSkeleton from "@/components/BlogsSkeleton";

const Page = () => {
  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      {/* <LogoAnimation /> */}
      <About />
      <Services />
      <PortfolioSkeleton />
      <BlogsSkeleton />
      {/* <Testimonials /> */}
      <CTA />
    </div>
  );
};

export default Page;
