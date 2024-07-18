import React from "react";
import Link from "next/link";
import Theme from "./Theme";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import Logo from "@/components/ui/logo";
const Navbar = () => {
  return (
    <nav className="flex-center background-light900_dark200 fixed z-50 w-full ">
      <div className="flex-between gap-5 py-6 dark:shadow-none max-xl:w-full max-sm:p-6 xl:min-w-[1200px] ">
        <Link href="/" className="flex items-center gap-1">
          <Logo />
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
