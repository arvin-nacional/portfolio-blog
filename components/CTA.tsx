"use client";
import React from "react";
import { Boxes } from "./ui/background-boxes";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="background-light850_dark100 flex items-center justify-center px-16 py-10 max-md:px-5">
      <div className="background-light850_dark100 relative flex h-96 w-full flex-col items-center justify-center gap-10 overflow-hidden rounded-lg">
        <div className="background-light850_dark100 pointer-events-none absolute inset-0 z-20 size-full [mask-image:radial-gradient(transparent,white)]" />

        <Boxes />
        <h1 className="text-dark500_light700 z-20 text-center text-4xl font-extrabold leading-tight max-sm:text-2xl">
          LET&apos;S DISCUSS AND MAKE <br /> SOMETHING COOL TOGETHER
        </h1>
        {/* <p className="relative z-20 mt-2 text-center text-neutral-300">
          Framer motion is the best animation library ngl
        </p> */}
        <Button className="primary-gradient z-20  w-fit cursor-pointer rounded-3xl px-9 font-light !text-light-900 ">
          {" "}
          Connect with me
        </Button>
      </div>
    </section>
  );
};

export default CTA;
