import { getSingleAuthor } from '@/lib/getSingleAuthor';
import Link from 'next/link';
import { FaXTwitter, FaLinkedin, FaFacebookF } from 'react-icons/fa6';

export async function generateMetadata({ params }) {
  const author = await getSingleAuthor(`${process.env.NEXT_PUBLIC_API_URL}/user/${params.slug}`);
  
  return {
    title: author?.data.name || 'Author',
    description: `Articles by ${author?.data.name || 'Author'} on SportzPoint`,
  };
}

export default async function AuthorPage({ params }) {
  const author = await getSingleAuthor(`${process.env.NEXT_PUBLIC_API_URL}/user/${params.slug}`);
  
  if (!author) {
    return <div>Author not found</div>;
  }

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
                    {author.data.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Author Info */}
          <div className="pt-16 sm:pt-20 px-4 sm:px-6 pb-6 sm:pb-8">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                {author.data.name}
              </h1>
             
              {author.data.email && (
                <p className="text-base sm:text-lg text-gray-600 mb-4">
                  Email: {author.data.email}
                </p>
              )}
              
              {/* Social Links */}
              {author.data.social_profiles && author.data.social_profiles.length > 0 && (
                <div className="flex gap-3 sm:gap-4 mb-6">
                  {author.data.social_profiles.map((profile, index) => (
                    <Link 
                      key={index}
                      href={profile.url} 
                      target="_blank"
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#006356] bg-opacity-10 flex items-center justify-center text-[#006356] hover:bg-opacity-20 transition-all"
                    >
                      {profile.platform === 'Twitter' && <FaXTwitter className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />}
                      {profile.platform === 'Facebook' && <FaFacebookF className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />}
                      {profile.platform === 'LinkedIn' && <FaLinkedin className="w-4 sm:w-[18px] h-4 sm:h-[18px]" />}
                    </Link>
                  ))}
                </div>
              )}
              
              <div className="text-sm text-gray-500">
                Member since: {new Date(author.data.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}