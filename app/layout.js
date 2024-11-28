import "./globals.css";
import LayoutClient from "./layout-client";
import { Roboto, PT_Serif } from 'next/font/google';

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
  metadataBase: new URL('https://sportzpoint.com'),
  title: {
    default: "SportzPoint - Latest Sports News, Live Scores & Updates",
    template: "%s | SportzPoint"
  },
  description: "Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at SportzPoint.",
  keywords: ["sports news", "live scores", "cricket", "football", "tennis", "hockey", "sports updates", "sports coverage"],
  authors: [{ name: "SportzPoint" }],
  creator: "SportzPoint",
  publisher: "SportzPoint",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sportzpoint.com',
    siteName: 'SportzPoint',
    title: 'SportzPoint - Latest Sports News, Live Scores & Updates',
    description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at SportzPoint.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'SportzPoint',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportzPoint - Latest Sports News, Live Scores & Updates',
    description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at SportzPoint.',
    creator: '@sportz_point',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const viewport = {
  themeColor: '#006356',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${ptSerif.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="SportzPoint RSS Feed" href="/feed.xml" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <LayoutClient>{children}</LayoutClient>
    </html>
  );
}
