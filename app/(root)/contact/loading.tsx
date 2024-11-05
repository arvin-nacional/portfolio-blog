import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="background-light850_dark100 flex items-center justify-center px-16  py-20 max-md:px-5 max-md:py-20">
      <div className="flex w-[1200px] max-w-full  pb-6 max-md:mt-10">
        <div className="flex items-center justify-center w-full">
          <Image
            src="/assets/images/contact-image3.svg"
            alt="contact image"
            height={800}
            width={800}
          />
        </div>
      </div>
    </section>
  );
};

export default page;
