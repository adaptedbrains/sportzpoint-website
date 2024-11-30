"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WebStoriesList = ({ webStories }) => {
  const router = useRouter();

  const handleCardClick = (category, slug) => {
    router.push(`/${category}/${slug}`);
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-6 my-5 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 sm:mb-6 text-[#006356]">Web Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 sm:gap-3">
        {webStories &&
          webStories.length > 0 &&
          webStories.map((story) => (
            <div
              key={story._id}
              onClick={() =>
                handleCardClick(story.categories[0].slug, story.slug)
              }
              className="relative group cursor-pointer w-full h-60 sm:h-72 rounded overflow-hidden hover:shadow-lg transition-shadow bg-white"
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
              <div className="absolute top-2 left-2">
                {story.categories.slice(0, 1).map((c, i) => (
                  <span key={i} className="inline-block bg-[#E5EFEE] text-[#286356] text-xs font-medium px-2.5 py-1 rounded">
                    {c.name || "Uncategorized"}
                  </span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-3 sm:px-4 py-3 bg-gradient-to-t from-black via-black/50 to-transparent">
                <h3 className="text-white text-sm sm:text-base font-medium line-clamp-2">
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
