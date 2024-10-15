// "use client";

import React from "react";
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
import { PostProps } from "@/types";

interface Posts {
  posts: PostProps[];
}

const BlogContent = ({ posts }: Posts) => {
  console.log(posts);
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <div className="flex-between mb-12 flex items-end">
          <div>
            <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
              Blogs
            </h2>
            <h1 className="text-dark500_light700 mt-5 text-5xl font-extrabold max-md:max-w-full max-md:text-4xl">
              Our recent news and updates
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
          {posts.map((component) => (
            <CarouselItem
              key={component._id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="px-2 py-5">
                <Card>
                  {/* <CardContent className="flex aspect-square items-center justify-center"> */}
                  <BlogCard
                    tags={component.tags}
                    title={component.title}
                    date={formatDate(component.createdAt)}
                    image={component.image}
                    link={component._id}
                    key={component._id}
                    content={component.content}
                  />
                  {/* </CardContent> */}
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BlogContent;
