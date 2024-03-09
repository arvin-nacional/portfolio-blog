"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  const moveCursor = (e: MouseEvent): void => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.9,
    });
    gsap.to(followerRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
    });
  };

  useEffect(() => {
    gsap.set(cursorRef.current, { xPercent: 100, yPercent: 100 });

    gsap.set(followerRef.current, { xPercent: -20, yPercent: -20 });
  }, []);

  window.addEventListener("mousemove", moveCursor);

  return (
    <div>
      <div className="cursor" ref={cursorRef}></div>
      <div className="follower-cursor" ref={followerRef}></div>
    </div>
  );
};

export default CustomCursor;
