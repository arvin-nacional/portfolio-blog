"use client";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

const ProjectImages = () => {
  const [index, setIndex] = useState(-1);

  const projectImages = [
    {
      src: "/assets/images/website1.png",
      alt: "project Image",
    },
    {
      src: "/assets/images/website1.png",
      alt: "project Image",
    },
    {
      src: "/assets/images/website1.png",
      alt: "project Image",
    },
    {
      src: "/assets/images/website1.png",
      alt: "project Image",
    },
    {
      src: "/assets/images/website1.png",
      alt: "project Image",
    },
    {
      src: "/assets/images/website1.png",
      alt: "project Image",
    },
  ];
  return (
    <div>
      <p className="h3-bold mb-10 px-2">Related Images</p>
      <div className="flex flex-wrap gap-5 w-[100%] justify-center">
        {projectImages.map((image, idx) => (
          <Image
            key={idx}
            src={image.src}
            alt={image.alt}
            onClick={() => setIndex(idx)}
            width={380}
            height={380}
            // style={{ width: "100%", height: "300px" }}
            className="cursor-pointer max-w-[450px] rounded-lg shadow-md transition-transform transform hover:scale-105 object-cover"
          />
        ))}
      </div>

      <div>
        {index >= 0 && (
          <Lightbox
            open={index >= 0}
            close={() => setIndex(-1)}
            slides={projectImages}
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
