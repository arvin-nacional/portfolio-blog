import { getRecentProjects } from "@/lib/actions/project.action";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  projectId: string;
}

const RecentProjects = async ({ projectId }: Props) => {
  const result = await getRecentProjects({ projectId });
  return (
    <div>
      <p className="base-bold text-dark500_light700 mb-5">Recent Projects</p>
      <div className="flex flex-col gap-3">
        {result?.projects.map((item) => (
          <Link href={`/projects/${item._id}`} key={item.title}>
            <div className="flex gap-5 max-xl:flex-col max-md:flex-row">
              <div>
                <Image
                  src={item.mainImage}
                  alt={item.title}
                  width={55}
                  height={50}
                  className="aspect-square rounded-lg object-cover"
                />
              </div>

              <div className="group flex w-[250px] flex-col justify-center">
                <p className="paragraph-semibold text-dark500_light700 truncate ">
                  {item.title}
                </p>
                <p className="body-regular text-dark500_light500 ">
                  {formatDate(item.createdOn)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
