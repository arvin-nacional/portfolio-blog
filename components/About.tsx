import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const About = () => {
  return (
    <div
      className=" flex items-center justify-center px-16 py-20 max-md:p-10"
      id="about"
    >
      <div className="mt-14 w-[1200px] max-w-full justify-between pb-6 max-md:mt-10 max-sm:mt-0">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-6/12 flex-col max-md:ml-0 max-md:w-full">
            <Image
              src="/assets/images/about-img2.png"
              alt="About Me"
              height={563}
              width={500}
              className=" max-md:mt-10 max-md:max-w-full max-sm:mt-0 "
            />
          </div>
          <div className="ml-5 flex w-6/12 animate-fade-left flex-col max-md:ml-0 max-md:w-full">
            <div className="mt-6 flex grow flex-col max-md:mt-10 max-md:max-w-full">
              <h2 className="text-dark300_light700 h2-bold max-sm:base-bold leading-7 max-md:max-w-full">
                About me
              </h2>
              <h1 className="text-dark300_light700 max-md:h2-bold h1-semihero mt-3 max-md:max-w-full sm:mt-10">
                Your Reliable Ally in the Business Realm
              </h1>
              <p className="text-dark300_light700 mt-10 text-base leading-7  max-md:max-w-full">
                Meet Arvin Paul, a web developer with a passion for creating
                visually stunning designs and developing seamless web
                experiences.
                <br /> <br />
                With a background in graphic design and a strong understanding
                of digital marketing, Arvin Paul has a unique ability to combine
                creativity with strategy to produce effective and engaging
                campaigns.{" "}
              </p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
