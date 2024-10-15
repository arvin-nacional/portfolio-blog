"use client";

import React, { useState } from "react";
import PortfolioCard from "./ui/portfolio-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Portfolio = () => {
  const [active, setActive] = useState("all");
  const [itemShow] = useState(10);

  const portfolioData = [
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/website1.png",
      category: "landing_page",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "logo_design",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "web_design",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "social_media",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "landing_page",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "web_design",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "logo_design",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "landing_page",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "logo_design",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "web_design",
    },
  ];
  const categoryMenu = [
    {
      title: "Web Design",
      category: "web_design",
    },
    {
      title: "Landing Page",
      category: "landing_page",
    },
    {
      title: "Social Media",
      category: "social_media",
    },
    {
      title: "Logo Design",
      category: "logo_design",
    },
  ];

  return (
    <section className="background-light850_dark100 flex items-center justify-center px-16 py-20 max-md:px-5">
      <div className="mt-14 w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <div className="flex flex-wrap items-end justify-between">
          <div>
            <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
              Portfolio
            </h2>
            <h1 className="text-dark300_light700 mt-10 text-4xl font-extrabold leading-tight text-zinc-700 max-md:max-w-full max-md:text-4xl">
              Some of recent work
            </h1>
          </div>
          <div className="text-dark300_light700">
            <ul className="flex-center mb-3 flex cursor-pointer gap-5">
              <li className={active === "all" ? "primary-text-gradient" : ""}>
                <span onClick={() => setActive("all")}>All</span>
              </li>
              {categoryMenu.map((item, index) => (
                <li
                  className={
                    active === item.category ? "primary-text-gradient" : ""
                  }
                  key={index}
                >
                  <span onClick={() => setActive(item.category)}>
                    {item.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className=" mt-10 grid grid-cols-3 gap-5 ">
          {portfolioData.slice(0, itemShow).map((item, index) => (
            <div
              className={` ${index === 3 || index === 6 ? "col-span-2" : ""}${
                active === "all"
                  ? ""
                  : !(active === item.category)
                  ? "hidden"
                  : ""
              } transition duration-300 ease-in-out`}
              key={index}
            >
              <PortfolioCard
                title={"asdfasdfasdfasdf"}
                subtitle={"asdfasdfadsf"}
                href={"asdfasdfasdf"}
                src={item.src}
              />
              {/* <div className="size-2"></div> */}
            </div>
          ))}
        </div>
        <Pagination className="text-dark300_light700 mt-10">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default Portfolio;
