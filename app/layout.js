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
    template: "%s | SportzPoint - Latest Sports News"
  },
  description: "Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at SportzPoint. Your ultimate destination for comprehensive sports coverage.",
  keywords: ["sports news", "live scores", "cricket news", "football news", "tennis updates", "hockey news", "sports coverage", "live sports updates", "sports analysis"],
  authors: [{ name: "SportzPoint", url: "https://sportzpoint.com" }],
  creator: "SportzPoint",
  publisher: "SportzPoint",
  alternates: {
    canonical: 'https://sportzpoint.com',
    languages: {
      'en-US': 'https://sportzpoint.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      alt: 'SportzPoint - Your Ultimate Sports News Destination',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SportzPoint - Latest Sports News & Updates',
    description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at SportzPoint.',
    creator: '@sportz_point',
    images: {
      url: '/twitter-image.jpg',
      alt: 'SportzPoint - Your Ultimate Sports News Destination',
    },
  },
  other: {
    'google-site-verification': 'your-verification-code',
  },
};

export const viewport = {
  themeColor: '#006356',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
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
