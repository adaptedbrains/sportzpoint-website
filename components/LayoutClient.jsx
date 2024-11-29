'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutClient({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow w-full px-0 sm:container sm:mx-auto sm:px-4 lg:px-8 pt-6 pb-12">
        {children}
      </main>
      <Footer />
    </>
  );
}
