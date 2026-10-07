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
import AdminOnly from "@/components/auth/AdminOnly";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import { cache } from "react";
import { getCardExcerpt } from "@/lib/card-excerpt";

const getDetails = cache(async (id: string) => (await getPostById({ postId: id }))?.post);

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { id } = await params;
  const details = await getDetails(id);
  if (!details) return {};
  return {
    title: details.title,
    description: getCardExcerpt(details.content),
    openGraph: {
      type: "article",
      title: details.title,
      description: getCardExcerpt(details.content),
      images: [details.image],
      url: `https://www.rvinpaul.com/blog/${id}`,
    },
  };
}

const page = async ({ params }: ParamsProps) => {
  const { id } = await params;
  const details = await getDetails(id);

  const tagArr: Object[] = details?.tags.map((item: { _id: any }) => item._id);
  console.log(details?.image);

  return (
    <>
      <div>
        <section className="flex flex-col items-center px-16 py-12 max-md:px-5 sm:py-24">
          <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              <div className="col-span-2 max-md:col-span-1">
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
                    <AdminOnly>
                      <div className="flex items-center gap-2 ">
                        <Link href={`/blog/edit/${id}`}>
                          <Image
                            src="/assets/icons/edit.svg"
                            alt="edit"
                            height={20}
                            width={20}
                            className="hover:text-primary-500"
                          />
                        </Link>
                        <DeletePost
                          id={JSON.stringify(id)}
                          type="project"
                        />
                      </div>
                    </AdminOnly>
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
                <RecentPosts postId={id} />
                {/* @ts-ignore */}
                <RelatedPosts currentPostId={id} tagIds={tagArr} />
              </div>
            </div>
            <ProjectImages images={JSON.stringify(details?.images)} />
          </div>
        </section>
        <div className="w-full px-16 max-md:px-0"></div>
        <CTA />
      </div>
    </>
  );
};

export default page;
