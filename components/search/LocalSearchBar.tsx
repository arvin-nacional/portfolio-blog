"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props { route: string; iconPosition: string; imgSrc: string; placeholder: string; otherClasses?: string }

export default function LocalSearchbar({ route, iconPosition, imgSrc, placeholder, otherClasses = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [search, setSearch] = useState(query);
  const [pending, startTransition] = useTransition();
  const edited = useRef(false);
  useEffect(() => {
    if (!edited.current) setSearch(query);
  }, [query]);
  useEffect(() => {
    if (!edited.current || pathname !== route || search.trim() === query) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const nextQuery = search.trim();
      if (nextQuery) params.set("q", nextQuery); else params.delete("q");
      params.delete("page");
      edited.current = false;
      startTransition(() => router.replace(`${pathname}${params.size ? `?${params}` : ""}`, { scroll: false }));
    }, 300);
    return () => clearTimeout(timer);
  }, [search, query, searchParams, pathname, route, router]);

  const icon = <Image src={imgSrc} alt="" width={24} height={24} aria-hidden="true" />;
  return <div className={`background-light800_darkgradient mb-5 flex min-h-[50px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`} aria-busy={pending}>
    {iconPosition === "left" && icon}
    <Input type="search" aria-label={placeholder} placeholder={placeholder} value={search} maxLength={120}
      onChange={event => { edited.current = true; setSearch(event.target.value); }}
      className="paragraph-regular text-dark500_light500 border-none bg-transparent shadow-none outline-none" />
    {iconPosition === "right" && icon}
    {pending && <span role="status" className="sr-only">Updating results…</span>}
  </div>;
}
