import "./globals.css";
import { Roboto, PT_Serif } from 'next/font/google';
import LayoutClient from "@/components/LayoutClient";
import GoogleAnalytics from '@/components/GoogleAnalytics';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const ptSerif = PT_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-serif',
});

export const metadata = {
  title: "Sportzpoint - Latest Sports News, Live Scores & Updates",
  description: "Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${ptSerif.variable}`}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="flex flex-col min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
