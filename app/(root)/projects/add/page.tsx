import Post from "@/components/forms/Post";
import Project from "@/components/forms/Project";
import React from "react";

const Page = () => {
  return (
    <div>
      <section className=" flex items-center justify-center px-16 max-md:px-5 sm:py-20">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
          <h4 className="base-bold mb-10">Create an Project</h4>
          <div className="w-[600px] max-sm:w-full">
            <Project />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
