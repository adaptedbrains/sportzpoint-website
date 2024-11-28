'use client';

import Head from 'next/head';

const SEO = ({
  title = 'SportzPoint - Latest Sports News, Live Scores & Updates',
  description = 'Get the latest sports news, live scores, match updates, player stats, and in-depth analysis across Cricket, Football, Hockey, Tennis, and more at SportzPoint.',
  image = 'https://sportzpoint.com/og-image.jpg',
  url = 'https://sportzpoint.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
  category,
}) => {
  const siteTitle = title.includes('SportzPoint') ? title : `${title} | SportzPoint`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="SportzPoint" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@sportz_point" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Specific Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {category && (
            <meta property="article:section" content={category} />
          )}
          {authors?.map((author, index) => (
            <meta key={index} property="article:author" content={author} />
          ))}
        </>
      )}

      {/* Language Tags */}
      <link rel="alternate" href={url} hrefLang="x-default" />
      <link rel="alternate" href={url} hrefLang="en" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default SEO;
