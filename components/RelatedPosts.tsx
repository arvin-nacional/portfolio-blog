import { getPostsByTagId } from "@/lib/actions/tag.action";
import { formatDate } from "@/lib/utils";
import { RelatedPostsProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedPosts = async ({ currentPostId, tagIds }: RelatedPostsProps) => {
  const result = await getPostsByTagId({ tagIds, currentPostId });

  return (
    <div>
      <p className="base-bold text-dark500_light700 mb-5">Related Posts</p>
      <div className="flex flex-col gap-3">
        {result?.posts.map((item) => (
          <Link href={`/blog/${item._id}`} key={item.title}>
            <div className="flex gap-5 max-xl:flex-col max-sm:flex-row">
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={55}
                  height={50}
                  className="aspect-square rounded-lg object-cover"
                />
              </div>

              <div className=" flex w-[250px] flex-col justify-center">
                <p className="paragraph-semibold text-dark500_light700 truncate">
                  {item.title}
                </p>
                <p className="body-regular text-dark500_light500 ">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
