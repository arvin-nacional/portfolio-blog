import React from "react";
// import PortfolioCard from "./ui/portfolio-card";
import { getAllCategoryNamesAndIds } from "@/lib/actions/project.action";
import ProjectCard from "./ui/projectCard";
import { formatDate } from "@/lib/utils";
import Filter from "./search/Filter";
import Pagination from "./search/Pagination";

interface Props {
  projects: string;
  page: number;
  isNext: boolean | undefined;
}

const Portfolio = async ({ projects, page, isNext }: Props) => {
  const categories = await getAllCategoryNamesAndIds();

  const parsedProjects = JSON.parse(projects);

  return (
    <section className=" flex items-center justify-center px-16 py-20 max-md:px-10 max-sm:py-10">
      <div className="mt-14 w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <div className="flex flex-wrap items-end justify-between max-sm:flex-col max-sm:items-start">
          <div>
            <h2 className="text-dark300_light700 h2-bold max-md:base-bold leading-7 max-md:max-w-full">
              Portfolio
            </h2>
            <h1 className="text-dark300_light700 h1-semihero max-md:h2-bold mt-3 leading-tight text-zinc-700 max-md:max-w-full md:mt-10">
              Some of recent work
            </h1>
          </div>
          <div className="text-dark300_light700 mt-10 flex flex-row items-center justify-end gap-5 max-md:mt-5">
            <Filter
              filters={JSON.stringify(categories)}
              otherClasses="min-h-[56px] sm:min-w-[170px]"
            />
          </div>
        </div>
        <div className=" mt-10 grid grid-cols-3 gap-5 max-sm:grid-cols-1">
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

          {parsedProjects?.map((item: any) => (
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
        <Pagination pageNumber={page} isNext={isNext} />
      </div>
    </section>
  );
};

export default Portfolio;
