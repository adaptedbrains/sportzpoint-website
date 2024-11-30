export const runtime = 'edge';

import { generateNewsArticleSchema } from '@/utils/structuredData';
import { formatDate } from '@/utils/timeFormat';

export default async function ArticleAMP({ params }) {
  const { category, slug } = params;
  
  // Fetch article data
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`,
    {
      next: { revalidate: 60 }, // Revalidate every minute
    }
  );
  
  const article = await response.json();
  
  // Generate structured data
  const structuredData = generateNewsArticleSchema(article);

  return (
    <html amp="true" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${category}/${slug}`} />
        <style amp-boilerplate>
          {`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}
        </style>
        <noscript>
          <style amp-boilerplate>
            {`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}
          </style>
        </noscript>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <style amp-custom>
          {`
            body { font-family: -apple-system, system-ui, sans-serif; line-height: 1.5; margin: 0; padding: 0; }
            .container { max-width: 800px; margin: 0 auto; padding: 1rem; }
            .article-header { margin-bottom: 2rem; }
            .article-title { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
            .article-meta { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }
            .article-image { margin-bottom: 2rem; }
            .article-content { font-size: 1.1rem; }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          <article>
            <header className="article-header">
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta">
                <time dateTime={article.published_date}>
                  {formatDate(article.published_date)}
                </time>
                {article.author && (
                  <span> by {article.author.name}</span>
                )}
              </div>
            </header>

            {article.banner_image && (
              <amp-img
                className="article-image"
                src={`https://dmpsza32x791.cloudfront.net/${article.banner_image}`}
                alt={article.banner_desc || article.title}
                width="1200"
                height="630"
                layout="responsive"
              />
            )}

            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </div>
      </body>
    </html>
  );
}
