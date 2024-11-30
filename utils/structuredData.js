export const generateNewsArticleSchema = (article) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: [
      `https://dmpsza32x791.cloudfront.net/${article.banner_image}`,
    ],
    datePublished: article.published_date,
    dateModified: article.modified_date || article.published_date,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Sportzpoint Staff',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sportzpoint',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dmpsza32x791.cloudfront.net/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${article.primary_category?.[0]?.slug}/${article.slug}`,
    },
    articleSection: article.primary_category?.[0]?.name || 'Sports',
    keywords: article.tags?.map(tag => tag.name).join(', '),
  };
};

export const generateBreadcrumbSchema = (category, article) => {
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: process.env.NEXT_PUBLIC_SITE_URL,
    },
  ];

  if (category) {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: category.name,
      item: `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`,
    });
  }

  if (article) {
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name: article.title,
      item: `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}/${article.slug}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
};
