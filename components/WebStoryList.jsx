"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BsLightningChargeFill } from "react-icons/bs";

const WebStoriesList = ({ webStories }) => {
  const router = useRouter();

  const handleCardClick = (category, slug) => {
    router.push(`/${category}/${slug}`);
  };

  return (
    <div
      className="bg-white p-4 sm:p-6 my-4 sm:my-6 rounded-lg shadow-sm"
      role="region"
      aria-label="Web Stories"
    >
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <BsLightningChargeFill className="text-[#006356] text-xl sm:text-2xl" />
        <h2 className="text-xl sm:text-2xl font-bold text-[#006356]">
          Web Stories
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
        {webStories &&
          webStories.length > 0 &&
          webStories.map((story) => {
            const renderingCategory = [
              ...story.primary_category,
              ...story.categories,
            ];
            const uniqueRenderingCategory = Array.from(
              new Map(
                renderingCategory.map((item) => [item._id, item])
              ).values()
            );
            return (
              <div
                key={story._id}
                onClick={() =>
                  handleCardClick(story.primary_category[0].slug, story.slug)
                }
                className="group cursor-pointer relative flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                role="article"
                aria-label={story.title}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(story.categories[0].slug, story.slug);
                  }
                }}
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-[9/16] w-full rounded-lg overflow-hidden">
                  <Image
                    src={
                      story.banner_image
                        ? `https://dmpsza32x691.cloudfront.net/${story.banner_image}`
                        : "/placeholder.jpg"
                    }
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    {uniqueRenderingCategory.map((c, i) => (
                      <span
                        key={i}
                        className="inline-block bg-[#E5EFEE]/90 backdrop-blur-sm text-[#286356] text-xs font-medium px-2.5 py-1 rounded-full shadow-sm"
                        role="text"
                        aria-label={`Category: ${c.name || "Uncategorized"}`}
                      >
                        {c.name || "Uncategorized"}
                      </span>
                    ))}
                  </div>
                  {/* Title Overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                    aria-hidden="true"
                  >
                    <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug">
                      {story.title}
                    </h3>
                  </div>
                </div>
                {/* Title (Visible by default) */}
                <div className="p-2 group-hover:opacity-0 transition-opacity duration-300">
                  <h3 className="text-gray-800 text-sm font-medium line-clamp-2 leading-snug">
                    {story.title}
                  </h3>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default WebStoriesList;
