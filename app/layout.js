import "./globals.css";
import LayoutClient from "./layout-client";
import { defaultMetadata } from './metadata';
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

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${ptSerif.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="dns-prefetch" href="https://img-cdn.thepublive.com" />
        <link rel="dns-prefetch" href="https://sportzpoint.s3.ap-south-1.amazonaws.com" />
      </head>
      <body className={roboto.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}import { Inter, PT_Serif, Roboto } from 'next/font/google';
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
import { defaultMetadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });
const ptSerif = PT_Serif({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pt-serif',
});
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${ptSerif.variable}`} className={`${ptSerif.variable} ${roboto.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="dns-prefetch" href="https://img-cdn.thepublive.com" />
        <link rel="dns-prefetch" href="https://sportzpoint.s3.ap-south-1.amazonaws.com" />
      </head>
      <body className={roboto.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
