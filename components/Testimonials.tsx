import React from "react";
import TestimonialCard from "./ui/testimonial-card";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

  return (
    <section className="background-light400_dark300 flex items-center justify-center overflow-hidden px-16 py-20 max-md:px-5">
      <div className="w-[1200px] max-w-full justify-between pb-6 max-md:mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <div className="flex-between mb-12 flex items-end">
            <div>
              <h2 className="text-dark300_light700 text-2xl font-bold leading-7 max-md:max-w-full">
                Blogs
              </h2>
              <h1 className="text-dark500_light700 mt-5 text-5xl font-extrabold max-md:max-w-full max-md:text-4xl">
                Our recent news and updates
              </h1>
            </div>
            <div className="flex items-end justify-end">
              <div className="mt-12 flex flex-row justify-end gap-5 max-sm:pt-10">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>
          </div>
          <CarouselContent>
            {testimonialData.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="px-2 py-5">
                  <Card>
                    <TestimonialCard
                      image={item.testimonialThumb}
                      name={item.avatarName}
                      designation={item.avatarDesignation}
                      rating={item.ratings}
                      text={item.testimonialText}
                    />
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
