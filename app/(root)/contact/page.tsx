import Contact from "@/components/forms/Contact";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="background-light850_dark100 flex items-center justify-center px-16  py-20 max-md:px-5 max-md:py-20">
      <div className="flex w-[1200px] max-w-full  pb-6 max-md:mt-10">
        <div className="flex items-start gap-5 max-sm:flex-col-reverse">
          <div className="flex flex-1 flex-col items-start justify-between">
            <Image
              src="/assets/images/contact-image3.svg"
              alt="contact image"
              height={800}
              width={800}
            />
          </div>
          <div className="flex-1">
            <h4 className="h2-bold text-dark400_light800 mb-5">
              Fill up this form
            </h4>
            <div className="max-sm:w-[350px]">
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
