import React from "react";
import { Skeleton } from "../ui/skeleton";

const LogoAnimation = () => {
  return (
    <div className=" background-light400_dark300 flex items-center justify-center px-16 max-md:px-5 max-sm:pb-20 sm:py-20">
      <div className=" flex w-[1200px] max-w-full flex-col justify-center px-28 max-md:mt-10 max-md:px-12 max-sm:px-5 sm:mb-10">
        <h2 className="h1-bold text-dark100_light900 max-sm:base-bold mb-10">
          In today&apos;s competitive landscape{" "}
          <span className="text-primary-500"> effective branding</span>, is the
          key to standing out and making your mark.
        </h2>
        <div className="relative w-full">
          <Skeleton className="h-full flex-1 " />
          <div className="hidden max-md:block">
            <Skeleton className="h-full w-28" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LogoAnimation;
