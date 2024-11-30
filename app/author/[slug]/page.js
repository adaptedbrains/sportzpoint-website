import { FaXTwitter, FaLinkedin, FaFacebookF } from 'react-icons/fa6';
import Link from 'next/link';

export default function AuthorPage() {
  // Placeholder articles data
  const placeholderArticles = [
    {
      id: 1,
      title: "Article Coming Soon",
      summary: "We are working on bringing you amazing sports content. Stay tuned for updates!",
      category: { name: "Sports", slug: "sports" },
      banner_image: null,
      published_at_datetime: new Date().toISOString()
    },
    {
      id: 2,
      title: "More Great Content Ahead",
      summary: "Our authors are crafting engaging sports stories and analyses just for you.",
      category: { name: "News", slug: "news" },
      banner_image: null,
      published_at_datetime: new Date().toISOString()
    },
    {
      id: 3,
      title: "Sports Updates Coming Soon",
      summary: "Get ready for in-depth coverage of your favorite sports and athletes.",
      category: { name: "Analysis", slug: "analysis" },
      banner_image: null,
      published_at_datetime: new Date().toISOString()
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-4 sm:container sm:mx-auto sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-8 sm:pb-12">
        <div className="bg-white sm:rounded-lg sm:shadow-md overflow-hidden">
          {/* Author Header */}
          <div className="relative h-32 sm:h-40 bg-[#006356]">
            <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl text-[#006356]">
                    {params.slug.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6 sm:pb-8">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Author Profile Coming Soon!</h1>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                We are working on creating beautiful profile pages for our talented authors.
                Stay tuned for updates!
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
                <Link 
                  href="https://x.com/sportz_point" 
                  target="_blank"
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#006356] bg-opacity-10 flex items-center justify-center text-[#006356] hover:bg-opacity-20 transition-all"
                >
                  <FaXTwitter className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />
                </Link>
                <Link 
                  href="https://www.facebook.com/sportzpointcricket" 
                  target="_blank"
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#006356] bg-opacity-10 flex items-center justify-center text-[#006356] hover:bg-opacity-20 transition-all"
                >
                  <FaFacebookF className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />
                </Link>
                <Link 
                  href="https://www.linkedin.com/company/sportzpoint" 
                  target="_blank"
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#006356] bg-opacity-10 flex items-center justify-center text-[#006356] hover:bg-opacity-20 transition-all"
                >
                  <FaLinkedin className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Author's Articles */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 px-0 sm:px-4">Latest Articles</h2>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {placeholderArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white sm:rounded-lg sm:shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-40 sm:h-48 bg-[#006356] bg-opacity-10 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 text-[#006356] opacity-30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                    />
                  </svg>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="flex gap-2 mb-2">
                    <span className="bg-[#006356] bg-opacity-10 text-[#006356] text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded">
                      {article.category.name}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="text-xs text-gray-500">
                    {new Date(article.published_at_datetime).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateMetadata({ params }) {
  return {
    title: "Author Profile Coming Soon - Sportzpoint",
    description: "We are working on creating beautiful profile pages for our talented authors. Stay tuned for updates!",
  };
}
