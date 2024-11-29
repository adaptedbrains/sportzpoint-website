'use client';

import Script from 'next/script';
import { Suspense } from 'react';
import { GA_CONFIGS } from '@/lib/gtag';
import useGoogleAnalytics from '@/hooks/useGoogleAnalytics';

function Analytics() {
  useGoogleAnalytics();
  return null;
}

export default function GoogleAnalytics() {
  return (
    <>
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

      <Suspense fallback={null}>
        <Analytics />
      </Suspense>
    </>
  );
}
