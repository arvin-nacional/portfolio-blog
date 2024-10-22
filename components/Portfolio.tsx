import React from "react";
// import PortfolioCard from "./ui/portfolio-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  getAllCategoryNamesAndIds,
  getAllProjects,
} from "@/lib/actions/project.action";
import { SearchParamsProps } from "@/types";
import ProjectCard from "./ui/projectCard";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn } from "@clerk/nextjs";
import Filter from "./search/Filter";

const Portfolio = async ({ searchParams = {} }: SearchParamsProps) => {
  const result = await getAllProjects({
    searchQuery: searchParams.q,
    page: searchParams.page ? +searchParams.page : 1,
    filter: searchParams.filter,
  });

  const categories = await getAllCategoryNamesAndIds();

  return (
    <section className="background-light850_dark100 flex items-center justify-center px-16 py-20 max-md:px-5">
      <div className="mt-14 w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <div className="flex flex-wrap items-start justify-between">
          <div>
            <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
              Portfolio
            </h2>
            <h1 className="text-dark300_light700 mt-10 text-4xl font-extrabold leading-tight text-zinc-700 max-md:max-w-full max-md:text-4xl">
              Some of recent work
            </h1>
          </div>
          <div className="text-dark300_light700">
            <SignedIn>
              <Link href="/projects/add">
                <Button variant="outline" className="bg-primary-500 text-white">
                  Create
                </Button>
              </Link>
            </SignedIn>
            <Filter
              filters={categories}
              otherClasses="min-h-[56px] sm:min-w-[170px]"
            />
          </div>
        </div>
        <div className=" mt-10 grid grid-cols-3 gap-5 ">
          {/* <div>
            {portfolioData.slice(0, itemShow).map((item, index) => (
              <div
                className={` ${index === 3 || index === 6 ? "col-span-2" : ""}${
                  active === "all"
                    ? ""
                    : !(active === item.category)
                      ? "hidden"
                      : ""
                } `}
                key={index}
              >
                <PortfolioCard
                  title={"asdfasdfasdfasdf"}
                  subtitle={"asdfasdfadsf"}
                  href={"asdfasdfasdf"}
                  src={item.src}
                />
              </div>
            ))}
          </div> */}

          {result.projects.map((item) => (
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
        <Pagination className="text-dark300_light700 mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default Portfolio;
