'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutClient({ children }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 lg:px-8 pt-6">
        {children}
      </main>
      <Footer />
    </>
  );
}
