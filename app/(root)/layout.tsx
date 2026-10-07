import Footer from "@/components/Footer";
// import GoHighLevelChatWidget from "@/components/shared/navbar/GoHighLevelChatWidget";
import Navbar from "@/components/shared/navbar/Navbar";
import TawkWidget from "@/components/shared/Tawk";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import AdminOnly from "@/components/auth/AdminOnly";
import { signOut } from "@/lib/actions/auth.action";
import Link from "next/link";

// import CustomCursor from "@/components/shared/CustomCursor";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light900_dark200 relative">
      <Navbar />
      <AdminOnly>
        <div className="fixed bottom-4 right-4 z-50 flex gap-4 rounded-lg bg-dark-300 p-3 text-sm text-white shadow-lg">
          <Link href="/blog/add">New article</Link>
          <Link href="/projects/add">New project</Link>
          <form action={signOut}><button type="submit">Sign out</button></form>
        </div>
      </AdminOnly>
      <section className="flex min-h-screen flex-1 flex-col overflow-y-auto  ">
        <div className="mx-auto w-full ">{children}</div>
      </section>
      <Toaster />
      <TawkWidget />
      <Footer />
    </main>
  );
};

export default Layout;
