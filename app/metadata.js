// Default metadata configuration
export const defaultMetadata = {
  metadataBase: new URL('https://sportzpoint.com'),
  title: {
    default: 'Sportzpoint - Latest Sports News, Live Scores & Updates',
    template: '%s | Sportzpoint Sports News',
    absolute: 'Sportzpoint - Your Ultimate Sports News Destination'
  },
  description: 'Get the latest sports news, live scores, and real-time updates from Cricket, Football, Tennis, Hockey, and more at Sportzpoint. Comprehensive coverage of matches, player statistics, expert analysis, and exclusive sports content.',
  keywords: [
    'sports news', 'live scores', 'cricket news', 'football news', 
    'tennis updates', 'hockey news', 'sports updates', 'live sports coverage', 
    'sports analysis', 'player stats', 'match highlights', 'sports commentary',
    'athlete profiles', 'tournament coverage', 'sports statistics'
  ],
  authors: [{ 
    name: 'Sportzpoint', 
    url: 'https://sportzpoint.com/about-us'
  }],
  creator: 'Sportzpoint',
  publisher: 'Sportzpoint Media',
  category: 'Sports News and Updates',
  
  // OpenGraph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sportzpoint.com',
    siteName: 'Sportzpoint',
    title: 'Sportzpoint - Latest Sports News & Live Updates',
    description: 'Your go-to destination for comprehensive sports coverage. Get live scores, breaking news, and in-depth analysis across all major sports.',
    images: [
      {
        url: 'https://sportzpoint.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sportzpoint - Sports News and Updates'
      }
    ]
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    site: '@sportzpoint',
    creator: '@sportzpoint',
    title: 'Sportzpoint - Latest Sports News & Live Updates',
    description: 'Your go-to destination for comprehensive sports coverage. Get live scores, breaking news, and in-depth analysis across all major sports.',
    images: ['https://sportzpoint.com/twitter-image.jpg']
  },

  // Robots metadata
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

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      }
    ],
  },

  manifest: '/manifest.json',
  
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 2,
    minimumScale: 1,
    viewportFit: 'cover',
    userScalable: true,
  },

  verification: {
    google: 'your-google-site-verification',
    yandex: 'yandex-verification',
    bing: 'msvalidate.01',
  },

  alternates: {
    canonical: 'https://sportzpoint.com',
    languages: {
      'en-US': 'https://sportzpoint.com',
      'en-GB': 'https://sportzpoint.com/gb',
      'en-IN': 'https://sportzpoint.com/in',
    },
    types: {
      'application/rss+xml': 'https://sportzpoint.com/feed.xml',
    }
  },

  archives: 'https://sportzpoint.com/archives',
  assets: 'https://sportzpoint.com/assets',
  bookmarks: 'https://sportzpoint.com/bookmarks',
  themeColor: '#006356',
};

// Generate metadata for dynamic pages
export async function generateMetadata({ params, article }) {
  if (!article) {
    return defaultMetadata;
  }

  const ogImage = article.banner_image 
    ? `https://sportzpoint.s3.ap-south-1.amazonaws.com/${article.banner_image}`
    : 'https://sportzpoint.com/og-image.jpg';

  return {
    ...defaultMetadata,
    title: article.title,
    description: article.description || article.excerpt,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: article.title,
      description: article.description || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: article.categories?.[0]?.name || 'Sports',
      authors: [article.author?.name || 'Sportzpoint'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title
        }
      ]
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: article.title,
      description: article.description || article.excerpt,
      images: [ogImage]
    }
  };
}
