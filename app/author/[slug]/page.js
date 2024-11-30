import { FaXTwitter, FaLinkedin, FaFacebookF } from 'react-icons/fa6';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getAuthorData(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Failed to fetch author data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching author data:', error);
    return null;
  }
}

export default async function AuthorPage({ params }) {
  const authorData = await getAuthorData(params.slug);

  if (!authorData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 sm:container sm:mx-auto sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12">
        <div className="bg-white sm:rounded-lg sm:shadow-md overflow-hidden">
          {/* Author Header */}
          <div className="relative h-32 sm:h-40 bg-[#006356]">
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                {authorData.profile_image ? (
                  <img 
                    src={authorData.profile_image} 
                    alt={authorData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl text-[#006356]">
                      {authorData.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6 sm:pb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{authorData.name}</h1>
            <p className="mt-2 text-gray-600">{authorData.bio || 'Sports journalist and analyst'}</p>
            
            {/* Social Links */}
            <div className="mt-4 flex space-x-4">
              {authorData.twitter && (
                <a href={authorData.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#006356]">
                  <FaXTwitter size={20} />
                </a>
              )}
              {authorData.linkedin && (
                <a href={authorData.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#006356]">
                  <FaLinkedin size={20} />
                </a>
              )}
              {authorData.facebook && (
                <a href={authorData.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#006356]">
                  <FaFacebookF size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Author's Articles */}
          <div className="px-4 sm:px-6 pb-6 sm:pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Articles by {authorData.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {authorData.articles && authorData.articles.map((article) => (
                <Link key={article.id} href={`/article/${article.slug}`}>
                  <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {article.banner_image && (
                      <img 
                        src={article.banner_image} 
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900">{article.title}</h3>
                      <p className="mt-2 text-gray-600 text-sm line-clamp-2">{article.summary}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        {new Date(article.published_at_datetime).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const authorData = await getAuthorData(params.slug);
  
  if (!authorData) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${authorData.name} - SportsPoint`,
    description: authorData.bio || `Articles by ${authorData.name}`,
  };
}
