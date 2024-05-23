import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  imageUrl: string;
  title: string;
  altText: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageUrl,
  title,
  altText,
}) => (
  <div className="relative aspect-[0.91] w-[212px] grow flex-col justify-center overflow-hidden rounded-3xl px-5 py-20 text-3xl font-bold leading-8 text-white shadow-sm max-md:mt-6">
    <Image
      src={imageUrl}
      alt={altText}
      height={232}
      width={212}
      className="absolute inset-0 size-full object-cover"
    />
    {title}
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      imageUrl: "/assets/images/webdevelopment.jpg",
      title: "Web Development and Design",
      altText: "Web Development and Design",
    },
    {
      imageUrl: "/assets/images/social-media.png",
      title: "Social Media Content Creation",
      altText: "Social Media Content Creation",
    },
    {
      imageUrl: "/assets/images/landing-page.png",
      title: "Landing Page Design",
      altText: "Landing Page Design",
    },
    {
      imageUrl: "/assets/images/branding.png",
      title: "Logo & Brand Design",
      altText: "Logo & Brand Design",
    },
  ];

  return (
    <section className="flex items-center justify-center bg-white px-16 py-20 max-md:px-5">
      <div className="mt-14 w-[1200px] max-w-full max-md:mt-10">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex w-3/5 flex-col max-md:ml-0 max-md:w-full">
            <div className="my-auto flex flex-col self-stretch max-md:mt-10 max-md:max-w-full">
              <h2 className="text-2xl font-bold leading-7 text-neutral-600 max-md:max-w-full">
                {" "}
                How can I contribute{" "}
              </h2>
              <h1 className="mt-10 text-5xl font-extrabold text-zinc-700 max-md:max-w-full max-md:text-4xl">
                {" "}
                Services I can help you with{" "}
              </h1>
              <p className="mt-10 text-base leading-7 text-black max-md:max-w-full">
                {" "}
                Transform your online presence with our services. We offer
                expert web development, design, social media content creation,
                and logo/brand design. Elevate your brand with captivating
                landing page designs. Let&apos;s bring your vision to life
                online.{" "}
              </p>
              <a
                href="/services"
                className="mt-10 flex justify-center gap-4 self-start whitespace-nowrap rounded-[52.731px] py-5 text-lg font-semibold leading-7 text-blue-700"
                tabIndex={0}
              >
                <Image
                  src="/assets/icons/arrow-right-contained-02.png"
                  width={18}
                  height={18}
                  alt="arrow-right"
                  className="my-auto aspect-square w-6 shrink-0"
                />
                <span className="grow">See all services</span>
              </a>
            </div>
          </div>
          <div className="ml-5 flex w-2/5 flex-col max-md:ml-0 max-md:w-full">
            <div className=" grid grow grid-cols-2 content-start gap-5 max-md:mt-10 max-md:max-w-full">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
