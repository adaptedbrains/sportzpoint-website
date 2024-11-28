// Default metadata configuration
export const defaultMetadata = {
  metadataBase: new URL('https://sportzpoint.com'),
  title: {
    default: 'Sportzpoint - Latest Sports News, Live Scores & Updates',
    template: '%s | Sportzpoint Sports News'
  },
  description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint. Real-time coverage of matches, player stats, and expert analysis.',
  keywords: ['sports news', 'live scores', 'cricket news', 'football news', 'tennis updates', 'hockey news', 'sports updates', 'live sports coverage', 'sports analysis', 'player stats'],
  authors: [{ name: 'Sportzpoint', url: 'https://sportzpoint.com/about-us' }],
  creator: 'Sportzpoint',
  publisher: 'Sportzpoint Media',
  category: 'sports news',
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
    ],
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 2,
    viewportFit: 'cover',
  },
  verification: {
    google: 'your-google-site-verification',
  },
  alternates: {
    canonical: 'https://sportzpoint.com',
    languages: {
      'en-US': 'https://sportzpoint.com',
    },
  },
  archives: 'https://sportzpoint.com/archives',
  assets: 'https://sportzpoint.com/assets',
  bookmarks: 'https://sportzpoint.com/bookmarks',
  themeColor: '#006356',
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
    siteName: 'Sportzpoint',
    title: 'Sportzpoint - Latest Sports News, Live Scores & Updates',
    description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more at Sportzpoint.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sportzpoint - Your Ultimate Sports News Destination',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sportzpoint - Latest Sports News & Updates',
    description: 'Get the latest sports news, live scores, and updates from the world of Cricket, Football, Tennis, Hockey, and more.',
    creator: '@sportzpoint',
    images: ['/twitter-image.jpg'],
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Sportzpoint',
  }
};

// Generate metadata for dynamic pages
export async function generateMetadata({ params, article }) {
  if (!article) return defaultMetadata;

  const ogImage = article.banner_image
    ? `https://img-cdn.thepublive.com/fit-in/1200x630/filters:format(jpeg)/sportzpoint/media/${article.banner_image}`
    : '/og-image.jpg';

  return {
    title: article.seo_title || article.title,
    description: article.seo_desc || article.excerpt || article.summary,
    keywords: [...(article.keywords || []), ...(article.tags?.map(tag => tag.name) || [])],
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_desc || article.excerpt || article.summary,
      type: 'article',
      publishedTime: article.published_at_datetime,
      modifiedTime: article.updated_at_datetime,
      authors: ['Sportzpoint'],
      section: article.categories?.[0]?.name || 'Sports',
      tags: article.tags?.map(tag => tag.name) || [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.seo_title || article.title,
      description: article.seo_desc || article.excerpt || article.summary,
      images: [ogImage],
    },
  };
}
