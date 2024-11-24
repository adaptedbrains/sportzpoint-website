"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WebStoriesList = ({ webStories }) => {
  const router = useRouter();

  const handleCardClick = (category, slug) => {
    router.push(`/${category}/${slug}`);
  };

  return (
    <div className="bg-zinc-800 text-white p-6 my-5 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Web Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 ">
        {webStories &&
          webStories.length > 0 &&
          webStories.map((story) => (
            <div
              key={story._id}
              onClick={() =>
                handleCardClick(story.categories[0].slug, story.slug)
              }
              className="relative group cursor-pointer w-full h-72 bg-red-500  rounded overflow-hidden"
            >
              <div className="relative w-full h-full ">
                <Image
                  src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${story.banner_image}`}
                  alt={story.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className=""
                />
              </div>
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs sm:text-sm px-3 py-1 rounded">
                {story.categories.slice(0, 1).map((c, i) => (
                  <p key={i} className="font-semibold">
                    {c.name || "Uncategorized"}
                  </p>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black to-transparent text-white text-sm font-medium">
                {story.title}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WebStoriesList;
