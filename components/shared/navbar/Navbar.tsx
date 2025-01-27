"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Theme from "./Theme";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Logo from "@/components/ui/logo";
import { cn } from "@/lib/utils";
// import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkPosition = () => {
      if (window.scrollY === 0) {
        setScrolled(false);
      } else {
        setScrolled(true);
      }
    };

    checkPosition(); // Initial check
    window.addEventListener("scroll", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
    };
  }, []);
  return (
    <nav
      className={cn(
        "flex-center background-light900_dark200 fixed z-50 w-full",
        scrolled
          ? "background-light900_dark200 shadow-md"
          : "dark:bg-transparent"
      )}
    >
      <div className="flex-between gap-5 py-4  dark:shadow-none max-xl:w-full max-xl:p-6 max-sm:px-10 max-sm:py-6 xl:min-w-[1200px]">
        <Link href="/" className="flex items-center gap-1 ">
          <Logo />
        </Link>
        <div className="text-dark100_light900 flex gap-5 max-md:hidden">
          <Link href="/">Home</Link>
          <Link href="/#about">About</Link>
          <Link href="/projects">Portfolio</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#services">Services</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex-between gap-5">
          <Theme />
          {/* <SignedOut>
            <Link href="/sign-in" className="max-lg:hidden">
              <Avatar>
                <AvatarImage
                  src="/assets/images/default_user.svg"
                  alt="Avatar"
                />
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
                variables: {
                  colorPrimary: "#ff7000",
                },
              }}
            />
          </SignedIn> */}

          <Sidebar />

          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
