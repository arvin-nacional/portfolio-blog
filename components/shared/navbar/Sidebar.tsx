"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";

const Sidebar = () => {
  const { mode } = useTheme();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/menu-05.svg"
          width={36}
          height={36}
          alt="Menu"
          className="invert-colors max-sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="background-light900_dark200 border-none">
        <SheetHeader className="text-dark100_light900">
          <div className="p-6">
            {mode === "light" ? (
              <Image
                src="/assets/images/primary-logo-dark.svg"
                width={100}
                height={40}
                alt="logo"
              />
            ) : (
              <Image
                src="/assets/images/primary-logo-light.svg"
                width={100}
                height={40}
                alt="logo"
              />
            )}
            <SheetTitle className="mt-5">
              <p className="h1-bold"></p>Do you have a project in your mind?
              Let&apos;s connect!
            </SheetTitle>
            <SheetDescription className="mt-10 ">
              <p className="h3-bold">Contact</p>
              <div className="body-regular">
                <div className="text-dark400_light800 mt-3 flex gap-5">
                  <Image
                    src="/assets/icons/telephone-call.png"
                    width={20}
                    height={20}
                    alt="logo"
                  />
                  <p>+63 965 9256 451</p>
                </div>
                <div className="mt-3 flex gap-5 ">
                  <Image
                    src="/assets/icons/paper-plane.png"
                    width={20}
                    height={20}
                    alt="logo"
                  />
                  <p>arvin@rvinpaul.com</p>
                </div>
                <div className="mt-3 flex gap-5 ">
                  <Image
                    src="/assets/icons/location-pin.png"
                    width={20}
                    height={20}
                    alt="logo"
                  />
                  <p>Camarin, Caloocan City, Philippines</p>
                </div>
              </div>
            </SheetDescription>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
