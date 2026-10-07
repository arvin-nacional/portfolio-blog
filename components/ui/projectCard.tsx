// import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getCardExcerpt } from "@/lib/card-excerpt";
// import Image from "next/image";
// import DeletePost from "../DeletePost";
import { ProjectCardProps } from "@/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const ProjectCard = ({
  title,
  image,
  date,
  content,
  category,
  _id,
}: ProjectCardProps) => {
  return (
    <div className="card-wrapper background-light800_dark300 flex w-full flex-col overflow-hidden rounded-xl shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] transition-all duration-500 hover:shadow-lg animate-fade animate-once animate-duration-[500ms] animate-ease-in">
      <Link href={`/projects/${_id}`}>
        <Image
          src={image}
          alt={title}
          height={250}
          width={400}
          className="aspect-[8/5] w-full object-cover"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
        />
        {/* <div
          className="h-[250px] cursor-pointer bg-cover bg-center "
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div> */}
      </Link>
      <div className="px-7 pb-5 pt-3">
        <Link href={`/projects/${_id}`}>
          {" "}
          <h3 className="h3-bold text-dark300_light700 ">{title}</h3>
        </Link>

        <p className="small-regular text-dark300_light700 mt-2">{date}</p>
        <p className="text-dark300_light700 mt-4 line-clamp-3 text-sm leading-6">
          {getCardExcerpt(content)}
        </p>
        {/* <p className="body-regular line-clamp-4 mt-5">{content}</p> */}
        <div className="mt-5 flex items-center justify-between ">
          {/* <Link href={`/blog/${link}`}>
          <div className="flex items-center">
            <p className=" text-primary-500">Read more</p>
            <ChevronRight className="h-4 text-primary-500" />
          </div>
        </Link> */}
          <div className="mt-2 flex flex-row flex-wrap gap-2">
            {category.map((component) => (
              <div key={component.name}>
                <Badge variant="secondary">{component.name}</Badge>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
