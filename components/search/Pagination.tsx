"use client";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pageNumber: string;
  isNext: string;
}

const Pagination = ({ pageNumber, isNext }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parsedPageNumber = JSON.parse(pageNumber);
  const parsedIsNext = JSON.parse(isNext);

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? parsedPageNumber - 1 : parsedPageNumber + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  if (!parsedIsNext && parsedPageNumber === 1) return null;

  return (
    <div className="mt-10 flex w-full items-center justify-center gap-2">
      <Button
        disabled={parsedPageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Prev</p>
      </Button>
      <div className="flex items-center justify-center rounded-md px-3.5 py-2 outline-1">
        <p className="body-semibold  text-primary-500">{parsedPageNumber}</p>
      </div>
      <Button
        disabled={!parsedIsNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2 btn flex min-h-[36px] items-center justify-center gap-2 border"
      >
        <p className="body-medium text-dark200_light800">Next</p>
      </Button>
    </div>
  );
};

export default Pagination;
