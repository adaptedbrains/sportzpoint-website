import { notFound } from 'next/navigation';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import Image from 'next/image';

async function getArticle(slug, id) {
  try {
    const res = await fetch(`${process.env.API_URL}/articles/${slug}/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch article');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug, params.id);
  
  if (!article) {
    return {
      title: 'Article Not Found - SportzPoint',
      description: 'The requested article could not be found.',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const ogImage = article.banner_image 
    ? `https://sportzpoint.s3.ap-south-1.amazonaws.com/${article.banner_image}`
    : 'https://sportzpoint.com/og-image.jpg';

  return {
    title: article.title,
    description: article.description || article.excerpt,
    keywords: article.tags?.map(tag => tag.name).join(', '),
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt,
      url: `https://sportzpoint.com/${params.slug}/${params.id}`,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.name || 'Sportzpoint'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || article.excerpt,
      images: [ogImage]
    },
    alternates: {
      canonical: `https://sportzpoint.com/${params.slug}/${params.id}`
    }
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug, params.id);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: article.categories?.[0]?.name || 'News', path: `/${params.slug}` },
    { name: article.title, path: `/${params.slug}/${params.id}` }
  ];

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbItems.map((item, index) => (
                <li key={item.path} className="flex items-center">
                  {index > 0 && <span className="mx-2 text-gray-500">/</span>}
                  <a href={item.path} className="text-[#006356] hover:underline">
                    {item.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-xl text-gray-600 mb-4">{article.description}</p>
          )}

          <div className="flex items-center text-sm text-gray-500 space-x-4">
            {article.author?.name && (
              <span>By {article.author.name}</span>
            )}
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          {article.content && (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          )}
        </div>
      </article>
    </>
  );
}
