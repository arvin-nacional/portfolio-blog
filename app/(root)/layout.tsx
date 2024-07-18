import Navbar from "@/components/shared/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

// import CustomCursor from "@/components/shared/CustomCursor";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      {/* <CustomCursor /> */}
      <section className="flex min-h-screen flex-1 flex-col overflow-y-auto pt-20 max-md:pb-14  ">
        <div className="mx-auto w-full ">{children}</div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
