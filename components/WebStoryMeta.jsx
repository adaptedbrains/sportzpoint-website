import Head from 'next/head';

const WebStoryMeta = ({ story }) => {
  const storyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${story.categories[0]?.slug}/${story.slug}`;
  const imageUrl = `https://dmpsza32x691.cloudfront.net/${story.banner_image}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{story.title} | Sportzpoint Web Stories</title>
      <meta name="description" content={story.description || story.title} />
      <link rel="canonical" href={storyUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={story.title} />
      <meta property="og:description" content={story.description || story.title} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={storyUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Sportzpoint" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={story.title} />
      <meta name="twitter:description" content={story.description || story.title} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Article Specific Tags */}
      <meta property="article:published_time" content={story.createdAt} />
      <meta property="article:modified_time" content={story.updatedAt || story.createdAt} />
      {story.categories?.map(category => (
        <meta key={category.slug} property="article:section" content={category.name} />
      ))}

      {/* Web Story Specific Meta Tags */}
      <meta name="web-stories-publisher-name" content="Sportzpoint" />
      <meta name="web-stories-publisher-logo-url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`} />
      <meta name="web-stories-poster-portrait-src" content={imageUrl} />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': storyUrl
            },
            'headline': story.title,
            'image': {
              '@type': 'ImageObject',
              'url': imageUrl,
              'height': 1920,
              'width': 1080
            },
            'datePublished': story.createdAt,
            'dateModified': story.updatedAt || story.createdAt,
            'author': {
              '@type': 'Organization',
              'name': 'Sportzpoint',
              'url': process.env.NEXT_PUBLIC_SITE_URL
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
            'description': story.description || story.title
          })
        }}
      />
    </Head>
  );
};

export default WebStoryMeta;
