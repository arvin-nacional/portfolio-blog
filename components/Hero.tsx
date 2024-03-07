import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex-center background-light850_dark100 w-full">
      <div className="p-9 max-xl:w-full sm:px-12 xl:min-w-[1200px]">
        <h1 className="text-dark500_light700 text-8xl font-extrabold leading-tight">
          Elevate your <br /> Brand
        </h1>
        <h2 className="text-dark500_light700 mt-2 text-5xl font-normal leading-tight">
          Design, Develop, Dominate
        </h2>
        <div className="flex-between mt-9 w-full">
          <Button className="primary-gradient w-fit rounded-3xl px-9 font-light !text-light-900">
            {" "}
            Connect with me
          </Button>
          <div className="flex-center gap-5">
            <Image
              src="/assets/icons/arrow-up-left-contained.svg"
              width={80}
              height={80}
              alt="icon "
              className="invert-colors "
            />
            <h3 className="text-dark300_light700 w-[440px]">
              From captivating visuals to powerful functionality, we empower
              your brand to stand out, leaving a lasting impression and
              dominating your market.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
