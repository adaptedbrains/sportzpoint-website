'use client';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useState } from 'react';
import { getImageUrl } from '@/utils/imageUtils';

const WebStoriesList = memo(({ webStories }) => {
  const router = useRouter();
  const [imageErrors, setImageErrors] = useState({});

  const handleCardClick = (category, slug) => {
    router.push(`/${category}/${slug}`);
  };

  const generateAltText = (story) => {
    const category = story.categories[0]?.name || "News";
    return `${story.title} - ${category} Web Story by Sportzpoint`;
  };

  const handleImageError = (storyId) => {
    setImageErrors(prev => ({ ...prev, [storyId]: true }));
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
                {!imageErrors[story._id] ? (
                  <Image
                    src={getImageUrl(story.banner_image)}
                    alt={generateAltText(story)}
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                    className="group-hover:scale-105 transition-transform duration-300"
                    onError={() => handleImageError(story._id)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-500 text-sm">Image not available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="text-white text-sm sm:text-base font-semibold line-clamp-2 mb-1">
                    {story.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {story.categories.map((category, index) => (
                      <span
                        key={index}
                        className="text-[10px] font-medium text-white bg-white/20 px-2 py-0.5 rounded"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
});

WebStoriesList.displayName = 'WebStoriesList';
export default WebStoriesList;
