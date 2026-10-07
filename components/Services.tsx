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
        "I design and build responsive websites that make your services easy to explore and your business easy to contact.",
      link: "/projects?category=671a4cae3daed0abd0a8379f",
    },
    {
      title: "Social Media Content Creation",
      description:
        "I create social media visuals and content that give your brand a consistent voice across channels.",
      link: "/projects?category=67185f403daed0abd0c4e585",
    },
    {
      title: "Landing Page Design",
      description:
        "I design focused landing pages that explain your offer and guide visitors toward a clear next step.",
      link: "/projects?category=671857e73daed0abd0bd9f05",
    },
    {
      title: "Logo and Brand Design",
      description:
        "I develop logos and brand visuals that express your identity and stay consistent across digital and print materials.",
      link: "/projects?category=671880413daed0abd0e62836",
    },
  ];

  return (
    <section
      className="dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] flex items-center justify-center px-16 pt-10 max-md:p-10"
      id="services"
      style={{ scrollMarginTop: "6rem" }}
    >
      <div className="mt-14 flex w-[1200px] max-w-full flex-row max-lg:flex-col max-md:mt-0">
        <div className=" flex flex-1 items-center">
          <div className="my-auto flex animate-fade-right flex-col self-stretch max-md:mt-10 max-md:max-w-full">
            <p className="text-dark300_light700 max-sm:base-bold h2-bold leading-7 max-md:max-w-full">
              How can I contribute
            </p>
            <h2 className="text-dark300_light700 h1-semihero max-md:h2-bold mt-3 max-md:max-w-full sm:mt-10">
              Services I can help you with
            </h2>
            <p className="text-dark300_light700 mt-10 text-base leading-7 max-md:max-w-full">
              I can help with web development, design, social media content
              creation, and logo/brand design, alongside focused landing pages.
              Let&apos;s bring your vision to life online.
            </p>
            <Button
              asChild
              className=" mt-10 flex justify-center gap-4 self-start whitespace-nowrap rounded-[52.731px] py-5 text-lg font-semibold leading-7 text-blue-700 dark:text-blue-300"
            >
              <Link href="/contact">
                <Image
                  src="/assets/icons/arrow-right-contained-02.png"
                  alt=""
                  height={18}
                  width={18}
                  className=" aspect-square w-6 shrink-0"
                />
                <span className="grow">Contact me</span>
              </Link>
            </Button>
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
