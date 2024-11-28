'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutClient({ children }) {
  return (
    <body className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow py-8">
        {children}
      </main>
      <Footer />
    </body>
  );
}
