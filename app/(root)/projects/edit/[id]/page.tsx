import Project from "@/components/forms/Project";
import { getProjectById } from "@/lib/actions/project.action";
import { ParamsProps } from "@/types";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { id } = await params;
  const result = await getProjectById({ projectId: id });
  return (
    <div>
      <section className=" flex items-center justify-center px-16 max-md:px-5 sm:py-20">
        <div className="flex w-[1200px] max-w-full flex-col items-center justify-center pb-6 max-md:mt-10">
          <h4 className="base-bold mb-10">Edit Project</h4>
          <div className="w-[600px] max-sm:w-full">
            <Project
              type="Edit"
              projectId={params.id}
              projectDetails={JSON.stringify(result?.project)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
