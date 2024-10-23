import Portfolio from "@/components/Portfolio";
import { getAllProjects } from "@/lib/actions/project.action";
import { SearchParamsProps } from "@/types";
import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllProjects({
    searchQuery: searchParams?.q,
    page: searchParams?.page ? +searchParams.page : 1,
    filter: searchParams?.filter,
    category: searchParams?.category,
  });

  return (
    <div>
      <Portfolio projects={JSON.stringify(result.projects)} />
    </div>
  );
};

export default Page;
