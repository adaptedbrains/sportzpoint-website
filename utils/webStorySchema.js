export const generateWebStorySchema = (story) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${story.categories[0]?.slug}/${story.slug}`
    },
    'headline': story.title,
    'image': {
      '@type': 'ImageObject',
      'url': `https://dmpsza32x691.cloudfront.net/${story.banner_image}`,
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
  };
};

export const generateWebStoriesListSchema = (stories) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': stories.map((story, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'url': `${process.env.NEXT_PUBLIC_SITE_URL}/${story.categories[0]?.slug}/${story.slug}`
    }))
  };
};
