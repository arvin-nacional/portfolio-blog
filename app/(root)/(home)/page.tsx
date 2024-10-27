import About from "@/components/About";
import Blogs from "@/components/Blogs";
import CTA from "@/components/shared/CTA";

import Hero2 from "@/components/Hero2";
import LogoAnimation from "@/components/LogoAnimation";
// import Portfolio from "@/components/Portfolio";

import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

import React from "react";
import { getAllProjects } from "@/lib/actions/project.action";
import { SearchParamsProps } from "@/types";
import Portfolio from "@/components/Portfolio";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const params = await searchParams;
  const result = await getAllProjects({
    searchQuery: params?.q,
    page: params?.page ? +params.page : 1,
    filter: params?.filter,
    category: params?.category,
  });
  return (
    <div>
      {/* <Hero /> */}
      <Hero2 />
      <LogoAnimation />
      <About />
      <Services />
      <Portfolio
        projects={JSON.stringify(result?.projects)}
        page={params?.page ? +params.page : 1}
        isNext={result?.isNext}
      />
      <Blogs />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default Page;
