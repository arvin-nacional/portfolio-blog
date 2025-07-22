import React from "react";
import Image from "next/image";
import { HoverEffect } from "./ui/card-hover-effect";
import Link from "next/link";
import { Button } from "./ui/button";

const Services: React.FC = () => {
  const testServices = [
    {
      title: "Web Development and Design",
      description:
        "Transform your online presence with our expert web development and design services. We create stunning, responsive websites that captivate your audience and drive results.",
      link: "/projects?category=671a4cae3daed0abd0a8379f",
    },
    {
      title: "Social Media Content Creation",
      description:
        "Elevate your brand's voice with engaging and impactful social media content. Our creative team crafts posts that resonate, build community, and boost your online visibility.",
      link: "/projects?category=67185f403daed0abd0c4e585",
    },
    {
      title: "Landing Page Design",
      description:
        "Maximize conversions with our high-converting landing page designs. We design focused, persuasive pages that turn visitors into loyal customers.",
      link: "/projects?category=671857e73daed0abd0bd9f05",
    },
    {
      title: "Logo and Brand Design",
      description:
        "Define your brand identity with our professional logo and brand design services. We create memorable, unique visuals that set you apart and leave a lasting impression.",
      link: "/projects?category=671880413daed0abd0e62836",
    },
  ];

  return (
    <section
      className="dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] flex items-center justify-center px-16 pt-10 max-md:p-10"
      id="services"
    >
      <div className="mt-14 flex w-[1200px] max-w-full flex-row max-lg:flex-col max-md:mt-0">
        <div className=" flex flex-1 items-center">
          <div className="my-auto flex animate-fade-right flex-col self-stretch max-md:mt-10 max-md:max-w-full">
            <h2 className="text-dark300_light700 max-sm:base-bold h2-bold leading-7 max-md:max-w-full">
              How can I contribute
            </h2>
            <h1 className="text-dark300_light700 h1-semihero max-md:h2-bold mt-3 max-md:max-w-full sm:mt-10">
              Services I can help you with
            </h1>
            <p className="text-dark300_light700 mt-10 text-base leading-7 max-md:max-w-full">
              Transform your online presence with our services. We offer expert
              web development, design, social media content creation, and
              logo/brand design. Elevate your brand with captivating landing
              page designs. Let&apos;s bring your vision to life online.
            </p>
            <Link href="/contact">
              <Button className=" mt-10 flex justify-center gap-4 self-start whitespace-nowrap rounded-[52.731px] py-5 text-lg font-semibold leading-7 text-blue-700">
                <Image
                  src="/assets/icons/arrow-right-contained-02.png"
                  alt="Contact Me Icon"
                  height={18}
                  width={18}
                  className=" aspect-square w-6 shrink-0"
                />
                <span className="grow">Contact me</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 flex-col max-md:ml-0 max-md:w-full">
          <div className="max-w-5xl">
            <HoverEffect items={testServices} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
