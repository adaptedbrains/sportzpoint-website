// Default metadata configuration
export const defaultMetadata = {
  metadataBase: new URL('https://sportzpoint.com'),
  title: {
    default: 'Sportzpoint - Latest Sports News, Live Scores & Updates',
    template: '%s | Sportzpoint'
  },
  description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.',
  keywords: ['sports news', 'live scores', 'cricket', 'football', 'tennis', 'hockey', 'sports updates'],
  authors: [{ name: 'Sportzpoint' }],
  creator: 'Sportzpoint',
  publisher: 'Sportzpoint',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: '#006356',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sportzpoint.com',
    siteName: 'Sportzpoint',
    title: 'Sportzpoint - Latest Sports News, Live Scores & Updates',
    description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sportzpoint',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sportzpoint - Latest Sports News, Live Scores & Updates',
    description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.',
    images: ['/twitter-image.jpg'],
    creator: '@sportzpoint',
  },
};

// Generate metadata for dynamic pages
export function generateMetadata({ params, article }) {
  if (!article) return defaultMetadata;

  return {
    ...defaultMetadata,
    title: article.title,
    description: article.description || defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: article.title,
      description: article.description || defaultMetadata.description,
      images: article.image ? [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ] : defaultMetadata.openGraph.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: article.title,
      description: article.description || defaultMetadata.description,
      images: article.image ? [article.image] : defaultMetadata.twitter.images,
    },
  };
}
