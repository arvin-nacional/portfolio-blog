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
  const result = await (await getRecentlyAddedPostsCached())();

  return (
    <section className="dark:bg-grid-small-white/[0.1] bg-grid-small-black/[0.1] flex items-center justify-center overflow-hidden px-16 py-10 max-md:p-10 flex-col">
      <div className="w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <div className="flex-between mb-12 flex items-end">
            <div>
              <h2 className="text-dark300_light700 h2-bold max-md:base-bold leading-7 max-md:max-w-full">
                Blogs
              </h2>
              <h1 className="text-dark500_light700 max-md:h2-bold h1-semihero mt-3 max-md:max-w-full  md:mt-5">
                Recent news and updates
              </h1>
            </div>
            <div className="flex items-end justify-end">
              <div className="mt-12 flex flex-row justify-end gap-5 max-sm:pt-10">
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
      <Link href="/blog">
        <Button className="bg-primary-500 text-white font-regular">
          Read more
        </Button>
      </Link>
    </section>
  );
};

export default Blogs;
