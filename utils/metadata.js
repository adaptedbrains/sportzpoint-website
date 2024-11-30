export const generateMetadata = ({ article, category }) => {
  const title = article ? article.title : category?.name || 'Sports News';
  const description = article ? article.description : category?.description || 'Latest sports news, updates, and analysis';
  const url = article 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/${category?.slug}/${article.slug}`
    : category 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`
      : process.env.NEXT_PUBLIC_SITE_URL;
  
  const image = article?.banner_image 
    ? `https://dmpsza32x791.cloudfront.net/${article.banner_image}`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/default-og-image.jpg`;

  return {
    title,
    description,
    keywords: article?.tags?.map(tag => tag.name).join(', ') || 'sports, news, updates',
    openGraph: {
      title,
      description,
      url,
      siteName: 'Sportzpoint',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: article ? 'article' : 'website',
      article: article ? {
        publishedTime: article.published_date,
        modifiedTime: article.modified_date || article.published_date,
        authors: [article.author?.name || 'Sportzpoint Staff'],
        tags: article.tags?.map(tag => tag.name) || [],
        section: article.primary_category?.[0]?.name || 'Sports',
      } : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@sportzpoint',
      site: '@sportzpoint',
    },
    alternates: {
      canonical: url,
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
  };
};
