"use client";
import React, { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
// import { ImageProps } from "@/types";
import dynamic from "next/dynamic";

// Dynamically import the lightbox to ensure it works only in the browser
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

// const Zoom = dynamic(() => import("yet-another-react-lightbox/plugins/zoom"), {
//   ssr: false,
// });
interface Props {
  images: string;
}

const ProjectImages = ({ images }: Props) => {
  const [index, setIndex] = useState(-1);

  const parsedImages = JSON.parse(images);

  return (
    <div>
      <p className="h3-bold text-dark400_light900 mb-10 px-2">Project Images</p>
      <div className="flex w-full flex-wrap gap-5">
        {parsedImages.map((image: any, idx: any) => (
          <Image
            key={idx}
            src={image.src}
            alt={image.alt}
            onClick={() => setIndex(idx)}
            width={380}
            height={380}
            loading="lazy" // Add lazy loading here
            className="max-w-[450px] cursor-pointer rounded-lg object-cover shadow-md transition-transform hover:scale-105"
          />
        ))}
      </div>

      <div>
        {index >= 0 && (
          <Lightbox
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={parsedImages}
            plugins={[]}
            index={index}
            // onIndexChange={setIndex}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectImages;