"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const GalleryLightbox = dynamic(() => import("./GalleryLightbox"), { ssr: false });
export default function ProjectImages({ images }: { images: string }) {
  const [index, setIndex] = useState(-1);
  const imageList: { src: string; alt: string }[] = images ? JSON.parse(images) || [] : [];
  if (!imageList.length) return null;
  return <div className="w-full">
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {imageList.map((image, idx) => <button key={image.src + idx} type="button" onClick={() => setIndex(idx)}
        aria-label={`Enlarge ${image.alt || `image ${idx + 1}`}`} className="overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500">
        <Image src={image.src} alt={image.alt} width={600} height={400} loading="lazy"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px" className="h-auto w-full rounded-lg object-cover" />
      </button>)}
    </div>
    {index >= 0 && <GalleryLightbox index={index} images={imageList} close={() => setIndex(-1)} />}
  </div>;
}
