import About from "@/components/About";
import Blogs from "@/components/Blogs";
import CTA from "@/components/shared/CTA";

import Hero2 from "@/components/Hero2";
import LogoAnimation from "@/components/LogoAnimation";

import Services from "@/components/Services";

import React, { Suspense } from "react";
import Projects from "@/components/Projects";
import BlogsSkeleton from "@/components/BlogsSkeleton";
import ProjectsSkeleton from "@/components/skeletons/ProjectsSkeleton";
// import Hero from "@/components/Hero";

const Page = async () => {
  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>
      <About />
      <Services />
      <LogoAnimation />
      <Suspense fallback={<BlogsSkeleton />}>
        <Blogs />
      </Suspense>
      {/* <Testimonials /> */}
      <CTA />
    </div>
  );
};

export default Page;
