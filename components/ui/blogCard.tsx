import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import ParseHTML from "../shared/ParseHTML";
import Image from "next/image";
import DeletePost from "../DeletePost";
import { SignedIn } from "@clerk/nextjs";
import { TagProps } from "@/types";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  image: string;
  date: string;
  link: string;
  content: string;
  tags: TagProps[];
}

const BlogCard = ({ title, image, date, link, content, tags }: Props) => {
  return (
    <div className="background-light800_dark300 flex w-[300px] flex-col rounded-xl p-5 hover:shadow-lg">
      <Link href={`/blog/${link}`}>
        <div
          className="h-[200px] cursor-pointer rounded-xl bg-cover bg-center "
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
      </Link>
      <div className="mt-2 flex flex-row gap-2">
        {tags.map((component) => (
          <div key={component.name}>
            <Badge variant="secondary">{component.name}</Badge>
          </div>
        ))}
      </div>

      <Link href={`/blog/${link}`}>
        {" "}
        <h2 className="base-bold text-dark300_light700 mt-5 ">{title}</h2>
      </Link>

      <h2 className="small-regular text-dark300_light700">{date}</h2>
      <ParseHTML data={content} styles="line-clamp-4" />
      {/* <p className="body-regular line-clamp-4 mt-5">{content}</p> */}
      <div className="mt-5 flex items-center justify-between ">
        <Link href={`/blog/${link}`}>
          <div className="flex items-center">
            <p className=" text-primary-500">Read more</p>
            <ChevronRight className="h-4 text-primary-500" />
          </div>
        </Link>
        <SignedIn>
          <div className="flex items-center gap-5">
            <Link href={`/blog/edit/${link}`}>
              <Image
                src="/assets/icons/edit.svg"
                alt="edit"
                height={20}
                width={20}
                className="hover:text-primary-500"
              />
            </Link>
            <DeletePost postId={link} />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default BlogCard;
