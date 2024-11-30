import Head from 'next/head';

const NewsSEO = ({ article }) => {
  const articleUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${article.categories[0]?.slug}/${article.slug}`;
  const imageUrl = `https://dmpsza32x691.cloudfront.net/${article.banner_image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{`${article.title} | Sportzpoint News`}</title>
      <meta name="description" content={article.description || article.title} />
      <link rel="canonical" href={articleUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.description || article.title} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={articleUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Sportzpoint" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sportzpoint" />
      <meta name="twitter:title" content={article.title} />
      <meta name="twitter:description" content={article.description || article.title} />
      <meta name="twitter:image" content={imageUrl} />

      {/* News-specific Meta Tags */}
      <meta property="article:published_time" content={article.publishDate} />
      <meta property="article:modified_time" content={article.updatedAt || article.publishDate} />
      <meta property="article:author" content={article.author?.name || 'Sportzpoint'} />
      <meta property="article:section" content={article.categories[0]?.name || 'News'} />
      {article.tags?.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Google News Meta Tags */}
      <meta name="news_keywords" content={article.tags?.join(', ') || article.categories[0]?.name} />
      <meta name="googlebot-news" content="index, follow" />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': articleUrl
            },
            'headline': article.title,
            'image': {
              '@type': 'ImageObject',
              'url': imageUrl,
              'width': 1200,
              'height': 630
            },
            'datePublished': article.publishDate,
            'dateModified': article.updatedAt || article.publishDate,
            'author': {
              '@type': 'Person',
              'name': article.author?.name || 'Sportzpoint'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Sportzpoint',
              'logo': {
                '@type': 'ImageObject',
                'url': `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
                'width': 600,
                'height': 60
              }
            },
            'description': article.description || article.title,
            'articleSection': article.categories[0]?.name || 'News',
            'keywords': article.tags?.join(', ') || article.categories[0]?.name
          })
        }}
      />
    </Head>
  );
};

export default NewsSEO;
