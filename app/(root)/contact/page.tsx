import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
// import Image from "next/image";
import React from "react";

const Page = async () => {
  return (
    <section className="background-light850_dark100 flex items-center justify-center px-16  py-20 max-md:px-5 max-md:py-20">
      <div className="flex w-[1200px] max-w-full  pb-6 max-md:mt-10">
        <div className="flex items-center justify-center w-full">
          {/* <div className="flex flex-1 flex-col items-start justify-between">
            <Image
              src="/assets/images/contact-image3.svg"
              alt="contact image"
              height={800}
              width={800}
            />
          </div> */}

          <div>
            <h4 className="h2-bold text-dark400_light800 mb-5 mt-8 text-center">
              Please fill up this form
            </h4>
            <div className="max-sm:w-[350px] sm:w-[600px]  ">
              {/* <Contact /> */}
              <GoHighLevelForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
