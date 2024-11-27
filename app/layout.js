import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Sportzpoint - Latest Sports News, Live Scores & Updates",
  description: "Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow pt-[64px] mt-2">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
