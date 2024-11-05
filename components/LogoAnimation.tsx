"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";

const LogoAnimation = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className=" background-light400_dark300 flex items-center justify-center px-16 max-md:px-5 max-sm:pb-20 sm:py-20">
      <div className=" flex w-[1200px] max-w-full flex-col justify-center px-28 max-md:mt-10 max-md:px-12 max-sm:px-5 sm:mb-10">
        <h2 className="h1-bold text-dark100_light900 max-sm:base-bold mb-10">
          In today&apos;s competitive landscape{" "}
          <span className="text-primary-500"> effective branding</span>, is the
          key to standing out and making your mark.
        </h2>
        <div className="relative w-full">
          <video
            className="w-full rounded-2xl shadow-xl"
            preload="none"
            poster="/assets/images/thumbnail.jpg"
            ref={videoRef}
            onClick={handlePlayPause}
          >
            <source src="/assets/videos/logo_animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {!isPlaying && (
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
              onClick={handlePlayPause}
            >
              <Image
                src="/assets/images/play_button.png"
                alt="play button icon"
                width={80}
                height={80}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default LogoAnimation;
