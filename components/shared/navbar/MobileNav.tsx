"use client";

import React from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeProvider";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-5">
      {sidebarLinks.map((item) => {
        const isActive =
          (pathname.includes(item.route) && item.route.length > 1) ||
          pathname === item.route;
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt=""
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  const { mode } = useTheme();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation"
          className="flex size-11 items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400 md:hidden"
        >
          <Image
            src="/assets/icons/hamburger.svg"
            width={28}
            height={28}
            alt=""
            className="invert-colors"
          />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 flex h-full flex-col justify-between overflow-y-auto border-none"
      >
        <div>
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Explore my work, services, and contact information.
          </SheetDescription>
          <div className="my-5 p-3">
            {mode === "light" ? (
              <Image
                src="/assets/images/primary-logo-dark.svg"
                width={100}
                height={40}
                alt="Arvin Paul"
              />
            ) : (
              <Image
                src="/assets/images/primary-logo-light.svg"
                width={100}
                height={40}
                alt="Arvin Paul"
              />
            )}
          </div>
          <div>
            <NavContent />
            {/* <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut> */}
          </div>
        </div>

        <div className="flex gap-5 p-6">
          <a
            href="https://www.facebook.com/rvinpaul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/icons/facebook.svg"
              width={20}
              height={20}
              alt="Facebook"
              className="invert-colors"
            />
          </a>
          <a
            href="https://www.instagram.com/rvinpaul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/icons/instagram.svg"
              width={20}
              height={20}
              alt="Instagram"
              className="invert-colors"
            />
          </a>
          <a
            href="https://www.linkedin.com/rvinpaul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/icons/linkedin.svg"
              width={20}
              height={20}
              alt="LinkedIn"
              className="invert-colors"
            />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
