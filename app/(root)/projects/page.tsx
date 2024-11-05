import LocalSearchbar from "@/components/search/LocalSearchBar";
import Pagination from "@/components/search/Pagination";
import PortfolioFilter from "@/components/search/PortfolioFilter";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/ui/projectCard";
import {
  getAllCategoryNamesAndIds,
  getAllProjects,
} from "@/lib/actions/project.action";
import { formatDate } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllProjects({
    searchQuery: searchParams?.q,
    page: searchParams?.page ? +searchParams.page : 1,
    filter: searchParams?.filter,
    category: searchParams?.category,
  });

  const categories = await getAllCategoryNamesAndIds();

  return (
    <div>
      <section className="background-light400_dark300 flex items-center justify-center px-16 py-20 max-md:px-5">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10 ">
          {/* <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
            Portfolio
          </h2> */}
          <h1 className="text-dark500_light700 h2-title max-md:h2-bold text-center max-md:max-w-full">
            Our Projects
          </h1>

          <div className="mt-5 flex flex-row gap-5">
            <div className="w-[900px] max-lg:w-full">
              <LocalSearchbar
                route="/projects"
                iconPosition="left"
                imgSrc="/assets/icons/search.svg"
                placeholder="Search for articles"
                otherClasses="text-dark500_light500"
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
                  Add an Project
                </Link>
              </Button>
            </SignedIn>
          </div>
          <PortfolioFilter filters={JSON.stringify(categories)} />

          <div className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {result?.projects?.map((item: any) => (
              <div key={item._id}>
                <ProjectCard
                  title={item.title}
                  image={item.mainImage}
                  date={formatDate(item.dateFinished)}
                  _id={item._id}
                  category={item.category}
                  content={item.content}
                />
              </div>
            ))}
          </div>
          <Pagination
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result?.isNext}
          />
        </div>
      </section>
    </div>
  );
};

export default Page;
