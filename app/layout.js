import "./globals.css";
import { Roboto, PT_Serif } from 'next/font/google';
import LayoutClient from "@/components/LayoutClient";
import Script from 'next/script';
import { GA_CONFIGS } from '@/lib/gtag';
import useGoogleAnalytics from '@/hooks/useGoogleAnalytics';

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
  useGoogleAnalytics();
  
  return (
    <html lang="en" className={`${roboto.variable} ${ptSerif.variable}`}>
      <head>
        {/* Main site analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_CONFIGS.homepage.measurementId}`}
        />
        <Script
          id="google-analytics-main"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_CONFIGS.homepage.measurementId}');
            `,
          }}
        />
        
        {/* Web Stories analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_CONFIGS.webStories.measurementId}`}
        />
        <Script
          id="google-analytics-webstories"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', '${GA_CONFIGS.webStories.measurementId}');
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
