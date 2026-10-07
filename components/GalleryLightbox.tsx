"use client";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

export default function GalleryLightbox({ index, images, close }: { index: number; images: { src: string; alt: string }[]; close: () => void }) {
  return <Lightbox open index={index} slides={images} close={close} plugins={[Zoom]} />;
}
