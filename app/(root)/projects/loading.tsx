import LocalSearchbar from "@/components/search/LocalSearchBar";
import PortfolioFilter from "@/components/search/PortfolioFilter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCategoryNamesAndIds } from "@/lib/actions/project.action";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const categories = await getAllCategoryNamesAndIds();

  return (
    <div>
      <section className="background-light400_dark300 flex items-center justify-center px-16 py-20 max-md:px-5">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10 ">
          {/* <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
            Portfolio
          </h2> */}
          <h1 className="text-dark500_light700  text-center h2-title max-md:max-w-full max-md:h2-bold">
            Our Projects
          </h1>

          <div className="mt-5 flex flex-row gap-5">
            <div className="w-[900px] max-lg:w-full">
              <LocalSearchbar
                route="/projects"
                iconPosition="left"
                imgSrc="/assets/icons/search.svg"
                placeholder="Search for articles"
                otherClasses="text-dark300_light700"
              />
            </div>
            <SignedIn>
              <Button className="  mb-10 bg-primary-500 px-7 py-6 transition-all duration-300 ease-in-out hover:bg-primary-300">
                <Link
                  href="/projects/add"
                  className="paragraph-regular flex items-center gap-2 text-white"
                >
                  <Image
                    src="/assets/icons/add.svg"
                    alt="arrow-right"
                    width={24}
                    height={24}
                  />
                  Add a Project
                </Link>
              </Button>
            </SignedIn>
          </div>
          <PortfolioFilter filters={JSON.stringify(categories)} />

          <div className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
