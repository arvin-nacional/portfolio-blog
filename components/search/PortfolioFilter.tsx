"use client";

import { cn, formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Button } from "../ui/button";

interface Props {
  filters: string;
  otherClasses?: string;
}

const PortfolioFilter = ({ filters, otherClasses }: Props) => {
  const parsedFilters = JSON.parse(filters);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  //   const [filter, setFilter] = useState<string | null>(
  //     searchParams.get("category")
  //   );

  const paramFilter = searchParams.get("category");


  const handleUpdateParams = (value: string) => {
    if ((paramFilter || "All") === value) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const newUrl = formUrlQuery({
      params: params.toString(),
      key: "category",
      value,
    });

    startTransition(() => router.push(newUrl, { scroll: false }));
  };

  return (
    <div aria-label="Project categories" aria-busy={pending} className="mb-2 flex flex-wrap justify-center gap-2">

        <Button
          onClick={() => handleUpdateParams("All")}
          aria-pressed={paramFilter === "All" || !paramFilter}
          className={cn(
            "hover:bg-primary-500 hover:text-white text-dark500_light500",
            paramFilter === "All" || !paramFilter
              ? "bg-primary-500 text-white"
              : ""
          )}
        >
          All Projects
        </Button>
      {parsedFilters.map((item: any) => (
        <React.Fragment key={item._id}>
          <Button
            onClick={() => handleUpdateParams(item._id)}
            aria-pressed={paramFilter === item._id}
            className={cn(
              "transition-all duration-150 hover:bg-primary-500 hover:text-white text-dark500_light500",
              paramFilter === item._id ? "bg-primary-500 text-white" : ""
            )}
          >
            {item.name}
          </Button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PortfolioFilter;
