"use client";
import React, { useState, useEffect } from "react";
import TestimonialCard from "./ui/testimonial-card";
import Image from "next/image";

const Testimonials = () => {
  const testimonialData = [
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      testimonialText:
        "Arvin's expertise in web development is unmatched. He seamlessly translated our ideas into a user-friendly and visually appealing website. His attention to detail and commitment to excellence are commendable.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      testimonialText:
        "Arvin's expertise in web development is unmatched. He seamlessly translated our ideas into a user-friendly and visually appealing website. His attention to detail and commitment to excellence are commendable.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      testimonialText:
        "Arvin's expertise in web development is unmatched. He seamlessly translated our ideas into a user-friendly and visually appealing website. His attention to detail and commitment to excellence are commendable.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      testimonialText:
        "Arvin's expertise in web development is unmatched. He seamlessly translated our ideas into a user-friendly and visually appealing website. His attention to detail and commitment to excellence are commendable.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      testimonialText:
        "Arvin's expertise in web development is unmatched. He seamlessly translated our ideas into a user-friendly and visually appealing website. His attention to detail and commitment to excellence are commendable.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
    {
      testimonialThumb: "/assets/images/testimonial-image2.svg",
      testimonialText:
        "Arvin's expertise in web development is unmatched. He seamlessly translated our ideas into a user-friendly and visually appealing website. His attention to detail and commitment to excellence are commendable.",
      avatarName: "John Doe",
      avatarDesignation: "Principal Solution Architect",
      ratings: "5",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  //   move every 2 seconds
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCurrentIndex((prevIndex) =>
  //         prevIndex >= testimonialData.length - 1 ? 0 : prevIndex + 1
  //       );
  //     }, 3000);

  //     return () => clearInterval(interval);
  //   }, [currentIndex, testimonialData.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonialData.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="background-light400_dark300 flex items-center justify-center px-16 py-20 max-md:px-5">
      <div className="w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <div className="flex-between mb-12 flex items-end">
          <div>
            <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
              Testimonial
            </h2>
            <h1 className="text-dark500_light700 mt-5 text-5xl font-extrabold max-md:max-w-full max-md:text-4xl">
              What clients say about my skill
            </h1>
          </div>
          <div className="flex items-end justify-end">
            <div className="mt-12 flex flex-row justify-end gap-5">
              <Image
                className="size-[43px] min-h-[43px] cursor-pointer"
                alt="left-button"
                height={43}
                width={43}
                src={"/assets/icons/arrow-btn-left.svg"}
                onClick={handlePrev}
                style={{
                  opacity: currentIndex === 0 ? 0.5 : 1,
                  pointerEvents: currentIndex === 0 ? "none" : "auto",
                }}
              />
              <Image
                className="size-[43px] min-h-[43px] cursor-pointer"
                alt="right-button"
                height={43}
                width={43}
                src={"/assets/icons/arrow-btn-right.svg"}
                onClick={handleNext}
                style={{
                  opacity:
                    currentIndex === testimonialData.length - 1 ? 0.5 : 1,
                  pointerEvents:
                    currentIndex === testimonialData.length - 1
                      ? "none"
                      : "auto",
                }}
              />
            </div>
          </div>
        </div>
        <div className=" overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${
                (currentIndex / testimonialData.length) * 100
              }%)`,
              width: `${(testimonialData.length / itemsPerPage) * 100}%`,
            }}
          >
            {testimonialData.map((item, index) => (
              <div key={index} className="w-full px-2 md:w-1/2 lg:w-1/3">
                <TestimonialCard
                  image={item.testimonialThumb}
                  name={item.avatarName}
                  designation={item.avatarDesignation}
                  rating={item.ratings}
                  text={item.testimonialText}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
