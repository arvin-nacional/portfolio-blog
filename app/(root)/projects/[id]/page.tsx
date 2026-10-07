import ProjectImages from "@/components/ProjectImages";
import CTA from "@/components/shared/CTA";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import { ParamsProps } from "@/types";
import { formatDate } from "@/lib/utils";
import ParseHTML from "@/components/shared/ParseHTML";
import Link from "next/link";
import AdminOnly from "@/components/auth/AdminOnly";
import DeletePost from "@/components/DeletePost";
import RecentProjects from "@/components/RecentProjects";
import type { Metadata } from "next";
import { publicProject } from "@/lib/public-content";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getCardExcerpt } from "@/lib/card-excerpt";
const getDetails = publicProject;

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
      images: [details.mainImage],
      url: `https://www.rvinpaul.com/projects/${id}`,
    },
  };
}

const page = async ({ params }: ParamsProps) => {
  const { id } = await params;
  const details = await getDetails(id);
  if (!details) notFound();

  return (
    <>
      <div>
        <section className="flex items-center justify-center px-16 py-20 max-md:px-5 sm:py-[100px]">
          <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10 ">
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              <Image
                src={details?.mainImage}
                alt={details.title}
                width={1200}
                height={675}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 767px) 100vw, 800px"

                style={{ borderRadius: "20px" }}
                className="col-span-2 h-auto w-full rounded-xl max-md:col-span-1"
              />
              <div className="col-span-1 flex flex-col gap-10 max-md:hidden ">
                <Suspense fallback={<p className="text-sm text-light-500">Loading recent content…</p>}><RecentProjects projectId={id} /></Suspense>
              </div>
            </div>

            <div className="flex gap-10 px-2 py-10 max-lg:flex-col lg:flex-row">
              <div className=" flex-1">
                <h4 className="base-semibold text-dark400_light700 mb-5">
                  {details.category[0]?.name}
                </h4>
                <h1 className="h2-bold text-dark400_light700 mb-5">
                  {details?.title}{" "}
                  <AdminOnly>
                    <div className="flex items-center gap-5">
                      <Link href={`/projects/edit/${id}`}>
                        <Image
                          src="/assets/icons/edit.svg"
                          alt="edit"
                          height={20}
                          width={20}
                          className="hover:text-primary-500"
                        />
                      </Link>
                      <DeletePost id={JSON.stringify(id)} type="project" />
                    </div>
                  </AdminOnly>
                </h1>

                <ParseHTML data={details?.content} />
              </div>
              <div className=" flex-1 flex-col ">
                <p className="h3-bold text-dark400_light700 mb-5 mt-12">
                  Project Information
                </p>
                <div className="flex flex-wrap gap-10">
                  <div className="flex w-[250px] flex-col gap-8">
                    <div className="">
                      <p className="h3-bold mb-2 text-primary-500">Category</p>
                      <div className="flex flex-wrap gap-2">
                        {details?.category.map((item: any) => (
                          <Badge variant="secondary" key={item._id}>
                            {item.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="h3-bold mb-2 text-primary-500">Software</p>

                      <div className="flex flex-wrap gap-2">
                        {details?.softwareUsed.map((item: any) => (
                          <Badge variant="secondary" key={item}>
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      {details?.url && (
                        <>
                          <p className="h3-bold mb-2 text-primary-500">
                            Website Link
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <Link
                              href={details.url}
                              target="_blank"
                              className="paragraph-medium text-dark400_light700"
                            >
                              {details.url}
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex w-[250px] flex-col  gap-8">
                    <div>
                      <p className="h3-bold my-2 text-primary-500">Date</p>
                      <p className="paragraph-medium text-dark400_light700">
                        {formatDate(details?.dateFinished)}
                      </p>
                    </div>
                    <div>
                      <p className="h3-bold mb-2 text-primary-500">Client</p>
                      <p className="paragraph-medium text-dark400_light700">
                        {details?.clientName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProjectImages images={JSON.stringify(details?.images)} />
          </div>
        </section>
        <CTA />
      </div>
    </>
  );
};

export default page;
