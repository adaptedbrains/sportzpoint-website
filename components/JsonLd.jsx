export function WebsiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://sportzpoint.com",
          "name": "Sportzpoint",
          "description": "Get the latest sports news, live scores, and real-time updates from Cricket, Football, Tennis, Hockey, and more at Sportzpoint.",
          "publisher": {
            "@type": "Organization",
            "name": "Sportzpoint Media",
            "logo": {
              "@type": "ImageObject",
              "url": "https://sportzpoint.com/logo.png"
            }
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://sportzpoint.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })
      }}
    />
  );
}

export function ArticleJsonLd({ article }) {
  if (!article) return null;

  const articleData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.description || article.excerpt,
    "image": article.banner_image 
      ? [`https://sportzpoint.s3.ap-south-1.amazonaws.com/${article.banner_image}`]
      : ["https://sportzpoint.com/og-image.jpg"],
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": [{
      "@type": "Person",
      "name": article.author?.name || "Sportzpoint",
      "url": `https://sportzpoint.com/author/${article.author?.slug || 'sportzpoint'}`
    }],
    "publisher": {
      "@type": "Organization",
      "name": "Sportzpoint Media",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sportzpoint.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://sportzpoint.com/${article.categories?.[0]?.slug || 'news'}/${article.slug}`
    }
  };

  if (article.categories?.length > 0) {
    articleData.articleSection = article.categories[0].name;
  }

  if (article.tags?.length > 0) {
    articleData.keywords = article.tags.map(tag => tag.name).join(", ");
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleData)
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }) {
  if (!items?.length) return null;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://sportzpoint.com${item.path}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbData)
      }}
    />
  );
}

export function SportEventJsonLd({ event }) {
  if (!event) return null;

  const eventData = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": event.title,
    "description": event.description,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": event.venue,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.city,
        "addressCountry": event.country
      }
    },
    "sport": event.sport,
    "competitor": event.teams?.map(team => ({
      "@type": "SportsTeam",
      "name": team.name
    })) || [],
    "organizer": {
      "@type": "Organization",
      "name": event.organizer || "Sportzpoint"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(eventData)
      }}
    />
  );
}
