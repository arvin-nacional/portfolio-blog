"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Theme from "./Theme";
import { useTheme } from "@/context/ThemeProvider";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { mode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex-center fixed z-50 w-full ${
        isScrolled ? "background-light900_dark200" : "bg-transparent"
      }`}
    >
      <div className="flex-between gap-5 p-6 dark:shadow-none max-lg:w-full sm:px-12 lg:min-w-[1200px]">
        <Link href="/" className="flex items-center gap-1">
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
        </Link>
        <div className="text-dark100_light900 flex gap-5 max-md:hidden">
          <Link href="/projects">Home</Link>
          <Link href="/blog">About</Link>
          <Link href="/projects">Portfolio</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/services">Services</Link>
        </div>
        <div className="flex-between">
          <Theme />
          <Sidebar />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Theme from "./Theme";
// import { useTheme } from "@/context/ThemeProvider";
// import Sidebar from "./Sidebar";
// import MobileNav from "./MobileNav";
// const Navbar = () => {
//   const { mode } = useTheme();
//   return (
//     <nav className="flex-center background-light900_dark200 fixed z-50 w-full">
//       <div className=" flex-between gap-5 p-6 dark:shadow-none max-lg:w-full sm:px-12 lg:min-w-[1200px]">
//         <Link href="/" className="flex items-center gap-1">
//           {mode === "light" ? (
//             <Image
//               src="/assets/images/primary-logo-dark.svg"
//               width={100}
//               height={40}
//               alt="logo"
//             />
//           ) : (
//             <Image
//               src="/assets/images/primary-logo-light.svg"
//               width={100}
//               height={40}
//               alt="logo"
//             />
//           )}
//         </Link>
//         <div className="text-dark100_light900 flex gap-5 max-md:hidden">
//           <Link href="/projects">Home</Link>
//           <Link href="/blog">About</Link>
//           <Link href="/projects">Portfolio</Link>
//           <Link href="/blog">Blog</Link>
//           <Link href="/services">Services</Link>
//         </div>
//         <div className="flex-between">
//           <Theme />
//           <Sidebar />
//           <MobileNav />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
