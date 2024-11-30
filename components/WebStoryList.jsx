'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from 'react';

const WebStoriesList = memo(({ webStories }) => {
  const router = useRouter();

  const handleCardClick = (category, slug) => {
    router.push(`/${category}/${slug}`);
  };

  const generateAltText = (story) => {
    const category = story.categories[0]?.name || "News";
    return `${story.title} - ${category} Web Story by Sportzpoint`;
  };

  return (
    <div 
      className="bg-gray-100 p-3 sm:p-4 md:p-6 my-3 sm:my-5 rounded shadow-md" 
      role="region" 
      aria-label="Web Stories"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#006356]">
        Latest Web Stories
      </h2>
      <div 
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3"
        role="list"
      >
        {webStories &&
          webStories.length > 0 &&
          webStories.map((story) => (
            <article
              key={story._id}
              onClick={() => handleCardClick(story.categories[0].slug, story.slug)}
              className="relative group cursor-pointer w-full h-48 sm:h-60 md:h-72 rounded overflow-hidden hover:shadow-lg transition-shadow bg-white"
              role="listitem"
              aria-label={story.title}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCardClick(story.categories[0].slug, story.slug);
                }
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={`https://dmpsza32x691.cloudfront.net/${story.banner_image}`}
                  alt={generateAltText(story)}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  priority={false}
                />
              </div>
              <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10">
                {story.categories.slice(0, 1).map((c, i) => (
                  <span 
                    key={i} 
                    className="inline-block bg-[#E5EFEE] text-[#286356] text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded"
                    role="text"
                    aria-label={`Category: ${c.name || "Uncategorized"}`}
                  >
                    {c.name || "Uncategorized"}
                  </span>
                ))}
              </div>
              <div 
                className="absolute bottom-0 left-0 right-0 px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-gradient-to-t from-black via-black/50 to-transparent"
                aria-hidden="false"
              >
                <h3 className="text-white text-xs sm:text-sm md:text-base font-medium line-clamp-2">
                  {story.title}
                </h3>
                {story.publishDate && (
                  <time 
                    dateTime={new Date(story.publishDate).toISOString()}
                    className="text-gray-300 text-xs"
                  >
                    {new Date(story.publishDate).toLocaleDateString()}
                  </time>
                )}
              </div>
            </article>
          ))}
      </div>
    </div>
  );
});

WebStoriesList.displayName = 'WebStoriesList';

export default WebStoriesList;
