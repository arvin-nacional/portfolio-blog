"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function DataSectionFallback({
  title,
  href,
  empty = false,
}: {
  title: string;
  href: string;
  empty?: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <section
      className="text-dark300_light700 scroll-mt-24 px-6 py-16 sm:px-10"
      id={title === "Projects" ? "projects" : "articles"}
    >
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="my-5" role="status">
          {empty
            ? "New work will appear here soon."
            : "This section couldn't load. Please try again."}
        </p>
        <div className="flex flex-wrap gap-4">
          {!empty && (
            <Button
              disabled={pending}
              onClick={() => startTransition(() => router.refresh())}
              className="bg-primary-500 text-white"
            >
              {pending ? "Retrying…" : "Try again"}
            </Button>
          )}
          <Button asChild className="bg-primary-500 text-white">
            <Link href={href}>Browse {title.toLowerCase()}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
