"use client";

import Head from 'next/head';
import { usePathname } from 'next/navigation';

const SEO = ({ 
  title, 
  description, 
  image, 
  article = false,
  publishedTime,
  modifiedTime,
  author,
  type = "website",
  children 
}) => {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sportzpoint.com';
  const defaultTitle = 'SportzPoint - Global Sports News & Updates';
  const defaultDescription = 'Get the latest sports news, live scores, match highlights, and in-depth analysis from SportzPoint. Coverage includes cricket, football, tennis, and more.';
  const defaultImage = `${siteUrl}/logo/logo.webp`;

  const seo = {
    title: title ? `${title} | SportzPoint` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname}`,
  };

  // Base Schema
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SportzPoint",
    "url": siteUrl,
    "logo": `${siteUrl}/logo/logo.webp`,
    "sameAs": [
      "https://www.facebook.com/sportzpoint",
      "https://twitter.com/sportz_point",
      "https://www.instagram.com/sportzpoint",
      "https://www.linkedin.com/company/sportzpoint"
    ]
  };

  // Article Schema
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "image": [image],
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": [{
      "@type": "Person",
      "name": author?.name,
    }],
    "publisher": {
      "@type": "Organization",
      "name": "SportzPoint",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo/logo.webp`
      }
    },
    "description": description
  } : null;

  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="image" content={seo.image} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={seo.url} />

        {/* Open Graph */}
        <meta property="og:url" content={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:type" content={type} />
        {article && (
          <>
            <meta property="article:published_time" content={publishedTime} />
            {modifiedTime && (
              <meta property="article:modified_time" content={modifiedTime} />
            )}
            <meta property="article:author" content={author?.name} />
          </>
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />
        <meta name="twitter:site" content="@sportz_point" />

        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(baseSchema)
          }}
        />
        {article && (
          <script 
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(articleSchema)
            }}
          />
        )}

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="theme-color" content="#39803E" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
      </Head>
      {children}
    </>
  );
};

export default SEO;
