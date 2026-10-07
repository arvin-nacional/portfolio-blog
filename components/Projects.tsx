import DataSectionFallback from "./shared/DataSectionFallback";
import * as React from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatDate } from "@/lib/utils";
import { getRecentProjectsCached } from "@/lib/actions/project.action";
import ProjectCard from "./ui/projectCard";
import { Button } from "./ui/button";
import Link from "next/link";

const Projects = async () => {
  // Fetch the recent projects from the server
  let result;
  try {
    result = await getRecentProjectsCached({});
  } catch {
    return <DataSectionFallback title="Projects" href="/projects" />;
  }
  if (!result.projects.length)
    return <DataSectionFallback title="Projects" href="/projects" empty />;

  return (
    <section
      id="projects"
      className="dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] flex items-center justify-start scroll-mt-24 overflow-hidden px-16 py-10 max-md:p-10 flex-col"
    >
      <div className="w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          aria-label="Projects"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-dark300_light700 h2-bold max-md:base-bold leading-7 max-md:max-w-full">
                Projects
              </p>
              <h2 className="text-dark500_light700 max-md:h2-bold h1-semihero mt-3 max-md:max-w-full  md:mt-5">
                My recent projects
              </h2>
            </div>
            <div className="flex items-end justify-end">
              <div className="flex flex-row justify-end gap-4">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>
          <CarouselContent>
            {result.projects.map((component) => (
              <CarouselItem
                key={component._id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div>
                  <Card>
                    <ProjectCard
                      title={component.title}
                      image={component.mainImage}
                      date={formatDate(component.dateFinished)}
                      _id={component._id}
                      category={component.category}
                      content={component.content}
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <Button asChild className="bg-primary-500 text-white font-regular">
        <Link href="/projects">See all Projects</Link>
      </Button>
    </section>
  );
};

export default Projects;
