import RecentPosts from "@/components/RecentPosts";
import RelatedPosts from "@/components/RelatedPosts";
import ParseHTML from "@/components/shared/ParseHTML";
import { getPostById } from "@/lib/actions/post.action";
import { formatDate } from "@/lib/utils";
import { ParamsProps } from "@/types";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getPostById({ postId: params.id });

  const details = result?.post;

  const tagArr: Object[] = details.tags.map((item: { _id: any }) => item._id);

  return (
    <div>
      <section className="flex items-center justify-center px-16 max-md:px-5 sm:py-20">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
          <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1">
            <div className="max-md:cols-span-1 col-span-2">
              <div
                className="relative mb-10 flex min-h-[400px] w-full flex-col justify-end rounded-2xl bg-center object-cover p-12 text-white"
                style={{
                  backgroundImage: `url(${details.image})`,
                }}
              >
                <div className="absolute inset-x-0 bottom-0 h-[30%] rounded-xl bg-gradient-to-t from-black to-transparent transition-opacity duration-300"></div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-white  transition-opacity duration-300 ">
                  <div>
                    <p> {formatDate(details.createdAt)}</p>
                    <h3 className="h2-bold max-sm:base-bold">
                      {details.title}
                    </h3>
                  </div>
                </div>
              </div>

              <ParseHTML data={details.content} />
              {/* <p className="paragraph-regular mt-10">{details.content}</p> */}
            </div>
            <div className="col-span-1 flex flex-col gap-10 max-md:col-span-1">
              <RecentPosts postId={params.id} />
              {/* @ts-ignore */}
              <RelatedPosts currentPostId={params.id} tagIds={tagArr} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
