"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

interface Props {
  images: string[];
}

const ProjectImages = ({ images }: Props) => {
  const [index, setIndex] = useState(-1);

  // const projectImages = [
  //   {
  //     src: "/assets/images/website1.png",
  //     alt: "project Image",
  //   },
  //   {
  //     src: "/assets/images/website1.png",
  //     alt: "project Image",
  //   },
  //   {
  //     src: "/assets/images/website1.png",
  //     alt: "project Image",
  //   },
  //   {
  //     src: "/assets/images/website1.png",
  //     alt: "project Image",
  //   },
  //   {
  //     src: "/assets/images/website1.png",
  //     alt: "project Image",
  //   },
  //   {
  //     src: "/assets/images/website1.png",
  //     alt: "project Image",
  //   },
  // ];
  return (
    <div>
      <p className="h3-bold text-dark400_light900 mb-10 px-2">Project Images</p>
      <div className="flex w-full flex-wrap justify-center gap-5">
        {images?.map((image, idx) => (
          <Image
            key={idx}
            src={image}
            alt={image}
            onClick={() => setIndex(idx)}
            width={380}
            height={380}
            // style={{ width: "100%", height: "300px" }}
            className="max-w-[450px] cursor-pointer rounded-lg object-cover shadow-md transition-transform hover:scale-105"
          />
        ))}
      </div>

      <div>
        {index >= 0 && (
          <Lightbox
            open={index >= 0}
            close={() => setIndex(-1)}
            // slides={{images}}
            plugins={[Zoom]}
            index={index}
            // onIndexChange={setIndex}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectImages;
