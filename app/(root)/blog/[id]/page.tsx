import DeletePost from "@/components/DeletePost";
import ProjectImages from "@/components/ProjectImages";
import RecentPosts from "@/components/RecentPosts";
import RelatedPosts from "@/components/RelatedPosts";
import CTA from "@/components/shared/CTA";
import ParseHTML from "@/components/shared/ParseHTML";
import { Badge } from "@/components/ui/badge";
import { getPostById } from "@/lib/actions/post.action";
import { formatDate } from "@/lib/utils";
import { ParamsProps } from "@/types";
import { SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: ParamsProps) => {
  const result = await getPostById({ postId: params.id });

  const details = result?.post;

  const tagArr: Object[] = details?.tags.map((item: { _id: any }) => item._id);

  return (
    <div>
      <section className="flex flex-col items-center px-16 py-12 max-md:px-5 sm:py-24">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
          <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
            <div className="max-md:cols-span-1 col-span-2">
              <Image
                src={details?.image}
                alt="projectImage"
                width={1200}
                height={300}
                style={{ borderRadius: "10px" }}
              />
              <div className="px-3">
                <p className="small-regular text-dark500_light500 mt-10">
                  {formatDate(details?.createdAt)}
                </p>
                <div className="mb-3 flex flex-row items-center  gap-2 ">
                  <h3 className="h2-bold text-dark400_light700 ">
                    {details?.title}
                  </h3>
                  <SignedIn>
                    <div className="flex items-center gap-2 ">
                      <Link href={`/blog/edit/${params.id}`}>
                        <Image
                          src="/assets/icons/edit.svg"
                          alt="edit"
                          height={20}
                          width={20}
                          className="hover:text-primary-500"
                        />
                      </Link>
                      <DeletePost
                        id={JSON.stringify(params.id)}
                        type="project"
                      />
                    </div>
                  </SignedIn>
                </div>

                <h4 className="base-semibold text-dark400_light700 mb-5 flex flex-wrap gap-2 ">
                  {details?.tags.map((tag: any) => (
                    <Badge key={tag._id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ))}
                </h4>

                <ParseHTML data={details?.content} />
              </div>

              {/* <p className="paragraph-regular mt-10">{details.content}</p> */}
            </div>
            <div className="col-span-1 flex flex-col gap-10 max-md:hidden ">
              <RecentPosts postId={params.id} />
              {/* @ts-ignore */}
              <RelatedPosts currentPostId={params.id} tagIds={tagArr} />
            </div>
          </div>
          <ProjectImages images={JSON.stringify(details?.images)} />
        </div>
      </section>
      <div className="w-full px-16 max-md:px-0">
        <CTA />
      </div>
    </div>
  );
};

export default page;
