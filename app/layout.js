import "./globals.css";
import { Roboto, PT_Serif } from 'next/font/google';
import LayoutClient from "@/components/LayoutClient";
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { reportWebVitals } from '@/utils/webVitals';

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sportzpoint.com'),
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  themeColor: '#006356',
  openGraph: {
    title: 'Sportzpoint - Latest Sports News',
    description: 'Get the latest sports news, live scores, and updates',
    siteName: 'Sportzpoint',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sportzpoint',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
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
        <GoogleAnalytics />
        <link
          rel="preconnect"
          href="https://dmpsza32x691.cloudfront.net"
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch"
          href="https://dmpsza32x691.cloudfront.net"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Sportzpoint" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

export function reportWebVitals(metric) {
  if (process.env.NODE_ENV !== 'development') {
    reportWebVitals({
      params: {},
      path: window.location.pathname,
      analyticsId: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    })(metric);
  }
}
