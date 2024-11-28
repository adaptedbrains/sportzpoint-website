'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutClient({ children }) {
  return (
    <body className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pb-8">
        {children}
      </main>
      <Footer />
    </body>
  );
}
