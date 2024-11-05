import LocalSearchbar from "@/components/search/LocalSearchBar";
import BlogCard from "@/components/ui/blogCard";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/actions/post.action";
import { formatDate } from "@/lib/utils";
import { SearchParamsProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getPosts({
    searchQuery: searchParams?.q,
    page: searchParams?.page ? +searchParams?.page : 1,
  });

  return (
    <div>
      <section className="background-light400_dark300 flex items-center justify-center px-16 py-20 max-md:px-5">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10 ">
          {/* <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
            Our Recent News and Updates
          </h2> */}
          <h1 className="text-dark500_light700  h2-title max-md:h2-bold text-center max-md:max-w-full">
            Updates and Contents
          </h1>

          <div className="mt-5 flex flex-row gap-5">
            <div className="w-[900px] max-lg:w-full">
              <LocalSearchbar
                route="/blog"
                iconPosition="left"
                imgSrc="/assets/icons/search.svg"
                placeholder="Search for articles"
                otherClasses="text-dark500_light700"
              />
            </div>
            <SignedIn>
              <Button className="  mb-10 bg-primary-500 px-7 py-6 transition-all duration-300 ease-in-out hover:bg-primary-300">
                <Link
                  href="/blog/add"
                  className="paragraph-regular flex items-center gap-2 text-white"
                >
                  <Image
                    src="/assets/icons/add.svg"
                    alt="arrow-right"
                    width={24}
                    height={24}
                  />
                  Add an article
                </Link>
              </Button>
            </SignedIn>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {result.posts.map((component) => (
              <BlogCard
                tags={component.tags}
                title={component.title}
                date={formatDate(component.createdAt)}
                image={component.image}
                link={component._id}
                key={component._id}
                content={component.content}
              />
            ))}
          </div>
        </div>
      </section>
      {/* <CTA
        title="Want to know more about our products?"
        action="Ask for a free consult"
        link="/contact"
      /> */}
    </div>
  );
};

export default page;
