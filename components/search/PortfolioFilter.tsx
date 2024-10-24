"use client";

import { cn, formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  filters: string;
  otherClasses?: string;
}

const PortfolioFilter = ({ filters, otherClasses }: Props) => {
  const parsedFilters = JSON.parse(filters);
  const searchParams = useSearchParams();
  const router = useRouter();

  //   const [filter, setFilter] = useState<string | null>(
  //     searchParams.get("category")
  //   );

  const paramFilter = searchParams.get("category");
  console.log("paramFilter", paramFilter);

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "category",
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex-center mb-2 gap-2 max-sm:hidden">
      <div onClick={() => handleUpdateParams("All")}>
        <Button
          className={cn(
            "hover:bg-primary-500 hover:text-white",
            paramFilter === "All" ? "bg-primary-500 text-white" : ""
          )}
        >
          All Projects
        </Button>
      </div>
      {parsedFilters.map((item: any) => (
        <div onClick={() => handleUpdateParams(item._id)} key={item._id}>
          <Button
            className={cn(
              "transition-all duration-150 hover:bg-primary-500 hover:text-white",
              paramFilter === item._id ? "bg-primary-500 text-white" : ""
            )}
          >
            {item.name}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PortfolioFilter;
