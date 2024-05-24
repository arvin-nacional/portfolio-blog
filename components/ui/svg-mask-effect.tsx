"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MaskContainer = ({
  children,
  revealText,
  size = 0,
  revealSize = 150,
  className,
}: {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<any>({ x: null, y: null });
  const containerRef = useRef<any>(null);

  const updateMousePosition = (e: any) => {
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const containerElement = containerRef.current;
    containerElement.addEventListener("mousemove", updateMousePosition);
    return () => {
      if (containerElement) {
        containerElement.removeEventListener("mousemove", updateMousePosition);
      }
    };
  }, []);

  const maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "h-full relative mb-20 mt-[-100px] max-sm:mb-[200px]",
        className
      )}
      // animate={{
      //   backgroundColor: "var(--white)",
      // }}
    >
      <motion.div
        className="absolute mb-[100px] flex size-full h-min items-start justify-start bg-black text-6xl text-white bg-grid-white/[0.2] [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px]"
        animate={{
          WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${
            mousePosition.y - maskSize / 2
          }px`,
          WebkitMaskSize: `${maskSize}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        <div className="absolute inset-0 z-0 size-full opacity-100" />
        <div
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          className="relative z-20 mx-[100px] mt-[130px] text-left text-4xl font-bold text-white max-xl:mx-[0px] max-sm:mx-[20px]"
        >
          {children}
        </div>
      </motion.div>

      <div className="mx-[100px] mt-[100px] size-full h-min text-white max-xl:mx-[0px] max-sm:mx-[20px]">
        {revealText}
      </div>
    </motion.div>
  );
};
