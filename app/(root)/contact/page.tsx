import Contact from "@/components/forms/Contact";
// import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import Image from "next/image";
// import Image from "next/image";
import React from "react";

const Page = async () => {
  return (
    <section className=" w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center h-screenflex  px-16  py-20 max-md:px-5 max-md:py-20">
      <div className="flex w-[1200px] max-w-full  pb-6 max-md:mt-10">
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-1 flex-col items-start justify-between">
            <Image
              src="/assets/images/contact-image3.svg"
              alt="contact image"
              height={800}
              width={800}
            />
          </div>

          <div>
            <h4 className="h2-bold text-dark400_light800 mb-5 mt-8 text-center">
              Please fill up this form
            </h4>
            <div className="max-sm:w-[350px] sm:w-[600px]  ">
              <Contact />
              {/* <GoHighLevelForm /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
