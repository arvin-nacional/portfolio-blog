import Footer from "@/components/Footer";
// import GoHighLevelChatWidget from "@/components/shared/navbar/GoHighLevelChatWidget";
import Navbar from "@/components/shared/navbar/Navbar";
import TawkWidget from "@/components/shared/Tawk";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

// import CustomCursor from "@/components/shared/CustomCursor";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light900_dark200 relative">
      <Navbar />
      <section className="flex min-h-screen flex-1 flex-col overflow-y-auto  max-md:pb-14  ">
        <div className="mx-auto w-full ">{children}</div>
      </section>
      <Toaster />
      <TawkWidget />
      <Footer />
    </main>
  );
};

export default Layout;
