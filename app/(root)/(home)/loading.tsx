import About from "@/components/About";
import CTA from "@/components/shared/CTA";
import Hero2 from "@/components/Hero2";
import React from "react";
// import LogoAnimation from "@/components/LogoAnimation";
import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton";
import BlogsSkeleton from "@/components/BlogsSkeleton";

const Page = () => {
  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      {/* <LogoAnimation /> */}
      <ProjectsSkeleton />
      <About />
      <Services />
      <BlogsSkeleton />
      {/* <Testimonials /> */}
      <CTA />
    </div>
  );
};

export default Page;
