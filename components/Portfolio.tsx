"use client";

import React, { useState } from "react";
import PortfolioCard from "./ui/portfolio-card";

const Portfolio = () => {
  const [active, setActive] = useState("all");
  const [itemShow, setItemShow] = useState(7);
  const portfolioData = [
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "ui_ux_design",
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
      category: "mobile_apps",
    },
    {
      title: "Colorful Art Work",
      subtitle: "See Details",
      href: "/portfolio/portfolio-details",
      src: "/assets/images/branding.png",
      category: "ui_ux_design",
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
      category: "ui_ux_design",
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
      title: "UI/UX Design",
      category: "ui_ux_design",
    },
    {
      title: "Mobile Apps",
      category: "mobile_apps",
    },
    {
      title: "Logo Design",
      category: "logo_design",
    },
  ];
  return (
    <section className="background-light400_dark300 flex items-center justify-center px-16 py-20 max-md:px-5">
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
        <div className="mt-10 flex flex-wrap ">
          {portfolioData.slice(0, itemShow).map((item, index) => (
            <div
              className={` ${
                active === "all"
                  ? ""
                  : !(active === item.category)
                  ? "hidden"
                  : ""
              }`}
              key={index}
            >
              <PortfolioCard
                title={"asdfasdfasdfasdf"}
                subtitle={"asdfasdfadsf"}
                href={"asdfasdfasdf"}
                src={
                  "https://img.freepik.com/free-photo/colorful-design-with-spiral-design_188544-9588.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716422400&semt=sph"
                }
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
