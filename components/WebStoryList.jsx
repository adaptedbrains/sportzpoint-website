"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const StoryCard = ({ story, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer w-full h-72 bg-zinc-900 rounded overflow-hidden"
    >
      <div className="relative w-full h-full">
        {/* Loading placeholder */}
        {imageLoading && (
          <div 
            className="absolute inset-0 bg-zinc-800 animate-pulse"
            dangerouslySetInnerHTML={{
              __html: shimmer('100%', '100%')
            }}
          />
        )}
        
        {story.banner_image && !imageError ? (
          <Image
            src={`https://sportzpoint.s3.ap-south-1.amazonaws.com/${story.banner_image}`}
            alt={story.title || "Web Story thumbnail"}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className={`transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={90}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
            onLoadingComplete={() => setImageLoading(false)}
            onError={handleImageError}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
            <div className="text-center text-zinc-400">
              <div className="text-sm font-medium">
                {imageError ? "Failed to load story" : "No preview available"}
              </div>
              <div className="text-xs mt-1">
                {story.title || "Web Story"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category badge */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs sm:text-sm px-3 py-1 rounded">
        {story.categories.slice(0, 1).map((c, i) => (
          <p key={i} className="font-semibold">
            {c.name || "Uncategorized"}
          </p>
        ))}
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black to-transparent text-white">
        <h3 className="text-sm font-medium line-clamp-2">{story.title}</h3>
      </div>
    </div>
  );
};

const WebStoriesList = ({ webStories }) => {
  const router = useRouter();

  const handleCardClick = (category, slug) => {
    router.push(`/${category}/${slug}`);
  };

  if (!webStories || webStories.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-800 text-white p-6 my-5 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Web Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {webStories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            onClick={() => handleCardClick(story.categories[0].slug, story.slug)}
          />
        ))}
      </div>
    </div>
  );
};

export default WebStoriesList;
