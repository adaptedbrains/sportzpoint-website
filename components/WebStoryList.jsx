"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WebStoriesList = ({ webStories }) => {
  const router = useRouter();

  const handleCardClick = (story) => {
    // Format story data for WebStory component with multiple slides
    const formattedStory = [
      {
        image: story.banner_image || '',
        heading: story.title || '',
        description: story.description || ''
      },
      {
        image: story.banner_image || '', // You can add different images for each slide
        heading: 'Continue Reading',
        description: story.content || ''
      }
    ];
    
    // Store formatted story in session storage
    sessionStorage.setItem('currentStory', JSON.stringify(formattedStory));
    
    // Navigate to story page
    router.push(`/web-story/${story.slug}`);
  };

  return (
    <div className="bg-gray-100 p-3 sm:p-4 md:p-6 my-3 sm:my-5 rounded shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-[#006356]">Web Stories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {webStories &&
          webStories.length > 0 &&
          webStories.map((story) => (
            <div
              key={story._id}
              onClick={() => handleCardClick(story)}
              className="relative group cursor-pointer w-full h-48 sm:h-60 md:h-72 rounded overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`https://dmpsza32x691.cloudfront.net/${story.banner_image}`}
                  alt={story.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-1 sm:top-2 left-1 sm:left-2">
                {story.categories.slice(0, 1).map((c, i) => (
                  <span key={i} className="inline-block bg-[#E5EFEE] text-[#286356] text-xs font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded">
                    {c.name || "Uncategorized"}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-2 sm:px-3 md:px-4 py-2 sm:py-3 bg-gradient-to-t from-black via-black/50 to-transparent">
                <h3 className="text-white text-xs sm:text-sm md:text-base font-medium line-clamp-2">
                  {story.title}
                </h3>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WebStoriesList;
