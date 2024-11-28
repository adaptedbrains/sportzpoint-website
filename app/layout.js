import "./globals.css";
import LayoutClient from "./layout-client";
import { defaultMetadata } from './metadata';
import { Roboto, PT_Serif } from 'next/font/google';
import Script from 'next/script';

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
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('ServiceWorker registration successful');
                    },
                    function(err) {
                      console.log('ServiceWorker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
