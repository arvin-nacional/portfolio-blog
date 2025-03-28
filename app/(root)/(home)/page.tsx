import About from "@/components/About";
import Blogs from "@/components/Blogs";
import CTA from "@/components/shared/CTA";

import Hero2 from "@/components/Hero2";
import LogoAnimation from "@/components/LogoAnimation";
// import Portfolio from "@/components/Portfolio";

import Services from "@/components/Services";
// import Testimonials from "@/components/Testimonials";

import React from "react";
import { getAllProjectsCached } from "@/lib/actions/project.action";
import { SearchParamsProps } from "@/types";
import Portfolio from "@/components/Portfolio";
import console from "console";
// import Hero from "@/components/Hero";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllProjectsCached({
    searchQuery: searchParams?.q,
    page: searchParams?.page ? +searchParams.page : 1,
    filter: searchParams?.filter,
    category: searchParams?.category,
  });

  console.log(result);
  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      <LogoAnimation />
      <About />
      <Services />
      <Portfolio
        projects={JSON.stringify(result?.projects)}
        page={searchParams?.page ? +searchParams.page : 1}
        isNext={result?.isNext}
      />
      <Blogs />
      {/* <Testimonials /> */}
      <CTA />
    </div>
  );
};

export default Page;
