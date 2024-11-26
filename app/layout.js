import { PT_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Configure PT Serif font
const ptSerif = PT_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pt-serif',
});

export const metadata = {
  title: "Sportzpoint - Latest Sports News, Live Scores & Updates",
  description: "Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ptSerif.variable} flex flex-col min-h-screen font-georgia`}>
        <Navbar />
        <main className="flex-grow pt-[64px] mt-2">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
