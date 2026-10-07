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
import BlogCard from "./ui/blogCard";
import { formatDate } from "@/lib/utils";
import { getRecentlyAddedPostsCached } from "@/lib/actions/post.action";
import Link from "next/link";
import { Button } from "./ui/button";

const Blogs = async () => {
  let result;
  try {
    result = await getRecentlyAddedPostsCached();
  } catch {
    return <DataSectionFallback title="Articles" href="/blog" />;
  }
  if (!result.posts.length)
    return <DataSectionFallback title="Articles" href="/blog" empty />;

  return (
    <section
      id="articles"
      className="dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] flex items-center justify-center scroll-mt-24 overflow-hidden px-16 py-10 max-md:p-10 flex-col"
    >
      <div className="w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
          aria-label="Articles"
        >
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-dark300_light700 h2-bold max-md:base-bold leading-7 max-md:max-w-full">
                Articles
              </p>
              <h2 className="text-dark500_light700 max-md:h2-bold h1-semihero mt-3 max-md:max-w-full  md:mt-5">
                Articles and insights
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
            {result.posts.map((component) => (
              <CarouselItem
                key={component._id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div>
                  <Card>
                    <BlogCard
                      tags={component.tags}
                      title={component.title}
                      date={formatDate(component.createdAt)}
                      image={component.image}
                      link={component._id}
                      key={component._id}
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
        <Link href="/blog">Browse all articles</Link>
      </Button>
    </section>
  );
};

export default Blogs;
