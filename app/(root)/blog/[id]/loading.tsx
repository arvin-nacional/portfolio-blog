import CTA from "@/components/shared/CTA";

import React from "react";

const page = async () => {
  return (
    <div>
      <section className="flex flex-col items-center px-16 py-12 max-md:px-5 sm:py-24">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
          <div className="grid w-full grid-cols-3 gap-5 max-md:grid-cols-1">
            <div className="col-span-2 max-md:col-span-1">
              <div className="mb-5 aspect-video w-full rounded-lg bg-slate-100 "></div>

              <div className="px-3">
                <div className="mb-5 h-6 w-[200px] animate-fade bg-gray-100 transition-all duration-500 animate-duration-[2000ms] animate-infinite animate-ease-linear"></div>
                <div className="mb-5 h-12 w-full  animate-fade bg-gray-100 transition-all duration-500 animate-duration-[2000ms] animate-infinite animate-ease-linear"></div>

                <div className="mt-2 flex flex-row gap-2">
                  {[1, 2, 3].map((component) => (
                    <div key={component}>
                      <div className="h-4 w-[60px] animate-fade rounded-md bg-slate-400 transition-all duration-500 animate-duration-[2000ms] animate-infinite animate-ease-linear"></div>
                    </div>
                  ))}
                </div>

                <div className="mt-2 flex flex-row gap-2">
                  {[1, 2, 3, 4, 5].map((component) => (
                    <div key={component}>
                      <div className="h-6 w-full rounded-md bg-slate-300"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <p className="paragraph-regular mt-10">{details.content}</p> */}
            </div>
            <div className="col-span-1 flex flex-col max-md:hidden ">
              <div className="mb-5 h-6 w-[250px] rounded-lg bg-gray-200"></div>
              <div className="mb-5 mt-2 flex flex-col gap-2">
                {[1, 2, 3].map((component) => (
                  <div
                    key={component}
                    className="flex flex-row items-center gap-2"
                  >
                    <div className="h-[50px] w-[55px] rounded-sm bg-gray-300"></div>
                    <div className="flex w-[250px] flex-col items-center justify-center">
                      <div className="my-2 h-4 w-[250px] rounded-lg bg-gray-200 "></div>
                      <div className="mb-2 h-4 w-[250px] rounded-lg bg-gray-200 "></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-5 h-6 w-[250px] rounded-lg bg-gray-200"></div>
              <div className="mt-2 flex flex-col gap-2">
                {[1, 2, 3].map((component) => (
                  <div
                    key={component}
                    className="flex flex-row items-center gap-2"
                  >
                    <div className="h-[50px] w-[55px] rounded-sm bg-gray-300 "></div>
                    <div className="flex w-[250px] flex-col items-center justify-center">
                      <div className="my-2 h-4 w-[250px] rounded-lg bg-gray-200 "></div>
                      <div className="mb-2 h-4 w-[250px] rounded-lg bg-gray-200 "></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full px-16 max-md:px-0">
        <CTA />
      </div>
    </div>
  );
};

export default page;
