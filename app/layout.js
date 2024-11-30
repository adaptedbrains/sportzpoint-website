import "./globals.css";
import { Roboto, PT_Serif } from 'next/font/google';
import LayoutClient from "@/components/LayoutClient";

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
  manifest: '/manifest.json',
  themeColor: '#006356',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${ptSerif.variable}`}>
      <head>
        <link
          rel="preconnect"
          href="https://dmpsza32x691.cloudfront.net"
          crossOrigin="anonymous"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sportzpoint" />
      </head>
      <body className="flex flex-col min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

// Simple web vitals reporting for development
export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric);
  }
}
