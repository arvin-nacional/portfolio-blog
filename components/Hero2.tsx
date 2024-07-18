import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
const Hero2 = () => {
  return (
    <div className="background-light850_dark100 flex items-center justify-center px-16 pb-10 max-md:px-10">
      <div className=" w-[1200px] max-w-full justify-between py-20 pb-6 max-md:mt-1 max-sm:py-2">
        <div>
          <div className="flex-between max-sm:flex-col">
            <div>
              <h1 className="text-dark500_light700 h1-hero animate-fade-up font-extrabold leading-tight max-sm:text-[60px]">
                Elevate your <br /> Brand
              </h1>
              <h2 className="text-dark500_light700 max-sm:h2-semibold mt-2 animate-fade-up font-normal leading-tight animate-delay-500 sm:text-5xl lg:mb-12">
                Design, Develop, Dominate
              </h2>
            </div>
            <div className="animate-fade-up animate-delay-[800ms] max-sm:mt-5 max-sm:w-[350px]">
              <Image
                src="/assets/images/hero-image.svg"
                alt="hero-image"
                height={500}
                width={500}
              />
            </div>
          </div>

          <div className="flex-between mt-10 w-full flex-row items-start gap-5 max-sm:flex-col max-sm:items-start">
            <Button className="primary-gradient h2-semibold w-fit animate-fade-up cursor-pointer rounded-3xl px-9 py-6 font-light !text-light-900 animate-delay-[2000ms]">
              {" "}
              Connect with me
            </Button>

            <div className=" ml-auto flex animate-fade-left gap-5 animate-delay-[2000ms]">
              <Image
                src="/assets/icons/arrow-up-left-contained.svg"
                width={80}
                height={80}
                alt="icon "
                className="invert-colors "
              />
              <h3 className="text-dark300_light700 paragraph-regular max-sm:body-regular  md:w-[440px]">
                From captivating visuals to powerful functionality, we empower
                your brand to stand out, leaving a lasting impression and
                dominating your market.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
