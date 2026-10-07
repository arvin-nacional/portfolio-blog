import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const About = () => {
  return (
    <div
      className="w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center scroll-mt-24 px-16 py-20 max-md:p-10"
      id="about"
    >
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
      <div className="mt-14 w-[1200px] max-w-full justify-between pb-6 max-md:mt-10 max-sm:mt-0">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <Image
              src="/assets/images/about-img2.png"
              alt="Arvin Paul"
              height={563}
              width={500}
              className=" max-md:mt-10 max-md:max-w-full max-sm:mt-0 "
            />
          </div>
          <div className="ml-5 flex w-6/12 animate-fade-left flex-col max-md:ml-0 max-md:w-full">
            <div className="mt-6 flex grow flex-col max-md:mt-10 max-md:max-w-full">
              <p className="text-dark300_light700 h2-bold max-sm:base-bold leading-7 max-md:max-w-full">
                About me
              </p>
              <h2 className="text-dark300_light700 max-md:h2-bold h1-semihero mt-3 max-md:max-w-full sm:mt-10">
                Design and development, working together
              </h2>
              <p className="text-dark300_light700 mt-10 text-base leading-7  max-md:max-w-full">
                I’m Arvin Paul, a web developer with a passion for creating
                visually stunning designs and developing seamless web
                experiences.
                <br /> <br />
                With a background in graphic design and a strong understanding
                of digital marketing, I combine creativity with strategy to
                produce effective and engaging campaigns.{" "}
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
        </div>
      </div>
    </div>
  );
};

export default About;
