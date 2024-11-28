import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Performance from "@/components/Performance";

export const metadata = {
  title: "Sportzpoint - Latest Sports News, Live Scores & Updates",
  description: "Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#39803E",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Performance />
        {/* Add resource hints */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} crossOrigin="anonymous" />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_API_URL} />
        
        {/* Add manifest */}
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="flex flex-col min-h-screen font-sans">
        <Navbar />
        <main className="flex-grow py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
