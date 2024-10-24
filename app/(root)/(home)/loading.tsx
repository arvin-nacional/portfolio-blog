import About from "@/components/About";
import CTA from "@/components/shared/CTA";
import Hero2 from "@/components/Hero2";
import React from "react";
// import LogoAnimation from "@/components/LogoAnimation";
import LogoAnimationSkeleton from "@/components/skeletons/LogoAnimationSkeleton";

const Page = () => {
  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      {/* <LogoAnimation /> */}
      <LogoAnimationSkeleton />
      <About />
      <CTA />
    </div>
  );
};

export default Page;
