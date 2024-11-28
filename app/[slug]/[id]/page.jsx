import { notFound } from 'next/navigation';

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
    };
  }

  return {
    title: `${article.title} - SportzPoint`,
    description: article.description || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt,
      images: [article.featuredImage],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.name],
      tags: article.categories,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || article.excerpt,
      images: [article.featuredImage],
    },
  };
}

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug, params.id);

  if (!article) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-pt-serif text-gray-900 mb-4">
          {article.title}
        </h1>
        {article.description && (
          <p className="text-xl text-gray-600 mb-4">{article.description}</p>
        )}
        <div className="flex items-center text-sm text-gray-500">
          {article.author?.name && (
            <span className="mr-4">By {article.author.name}</span>
          )}
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
      </header>

      {article.featuredImage && (
        <div className="mb-8">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      )}

      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {article.categories?.map((category) => (
            <span
              key={category}
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-[#006356] text-white"
            >
              {category}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
