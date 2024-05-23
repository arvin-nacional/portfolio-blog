"use client";

import React from "react";
import Image from "next/image";
import { HoverEffect } from "./ui/card-hover-effect";

const Services: React.FC = () => {
  const testServices = [
    {
      title: "Web Development and Design",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Social Media Content Creation",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Landing Page Design",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "Logo and Brand Design",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
  ];

  return (
    <section className="flex items-center justify-center bg-white px-16 py-10 max-md:px-5">
      <div className="mt-14 flex w-[1200px] max-w-full flex-row max-lg:flex-col max-md:mt-10">
        <div className=" flex flex-1 items-center">
          <div className="my-auto flex flex-col self-stretch max-md:mt-10 max-md:max-w-full">
            <h2 className="text-2xl font-bold leading-7 text-neutral-600 max-md:max-w-full">
              {" "}
              How can I contribute{" "}
            </h2>
            <h1 className="mt-10 text-5xl font-extrabold text-zinc-700 max-md:max-w-full max-md:text-4xl">
              {" "}
              Services I can help you with{" "}
            </h1>
            <p className="mt-10 text-base leading-7 text-black max-md:max-w-full">
              {" "}
              Transform your online presence with our services. We offer expert
              web development, design, social media content creation, and
              logo/brand design. Elevate your brand with captivating landing
              page designs. Let&apos;s bring your vision to life online.{" "}
            </p>
            <a
              href="/services"
              className="mt-10 flex justify-center gap-4 self-start whitespace-nowrap rounded-[52.731px] py-5 text-lg font-semibold leading-7 text-blue-700"
              tabIndex={0}
            >
              <Image
                src="/assets/icons/arrow-right-contained-02.png"
                width={18}
                height={18}
                alt="arrow-right"
                className="my-auto aspect-square w-6 shrink-0"
              />
              <span className="grow">See all services</span>
            </a>
          </div>
        </div>
        <div className="ml-5 flex flex-1 flex-col max-md:ml-0 max-md:w-full">
          <div className="mx-auto max-w-5xl px-8">
            <HoverEffect items={testServices} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
