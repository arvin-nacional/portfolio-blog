"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
// import { motion } from "framer-motion";
// import { AuroraBackground } from "./ui/aurora-background";

const Hero2 = () => {
  return (
    // <AuroraBackground>
    //   <motion.div
    //     initial={{ opacity: 0.0, y: 40 }}
    //     whileInView={{ opacity: 1, y: 0 }}
    //     transition={{
    //       delay: 0.3,
    //       duration: 0.8,
    //       ease: "easeInOut",
    //     }}
    //   >
    <div className=" flex items-center justify-center px-16 py-10 pb-14 max-md:px-10 max-md:py-20">
      <div className=" w-[1200px] max-w-full justify-between py-20 pb-6 max-md:mt-1 max-sm:py-2">
        <div>
          <div className="flex-between max-sm:flex-col max-sm:items-start">
            <div>
              <h1 className="text-dark500_light700 h1-hero font-extrabold leading-tight max-sm:text-[60px]">
                Elevate your <br /> Brand
              </h1>
              <h2 className="text-dark500_light700 max-sm:h2-semibold mt-2 font-normal leading-tight animate-delay-500 sm:text-5xl lg:mb-12">
                Design, Develop, Dominate
              </h2>
            </div>
            <div className="max-sm:mt-5 max-sm:w-[350px]">
              <Image
                src="/assets/images/hero-image.svg"
                alt="hero-image"
                height={500}
                width={500}
              />
            </div>
          </div>

          <div className="flex-between mt-10 w-full flex-row items-start gap-5 max-sm:flex-col max-sm:items-start">
            <Link href="/contact">
              {" "}
              <Button className="primary-gradient h2-semibold w-fit cursor-pointer rounded-3xl px-9 py-6 font-light !text-light-900 ">
                {" "}
                Connect with me
              </Button>
            </Link>

            <div className=" ml-auto flex gap-5 ">
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
    //   </motion.div>
    // </AuroraBackground>
  );
};

export default Hero2;
