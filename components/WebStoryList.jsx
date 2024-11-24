"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WebStoriesList = ({ webStories }) => {
  const router = useRouter();

  const handleCardClick = (category, slug) => {
    router.push(`/${category}/${slug}`);
  };

  return (
    <div className="bg-white text-black p-6 my-5 rounded shadow-md ">
      <h2 className="text-2xl font-bold mb-4">Web Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {webStories && webStories.length!=0 && webStories.map((story) => (
          <div
            key={story._id}
            onClick={() => handleCardClick(story.categories[0].slug, story.slug)}
            className="relative group cursor-pointer "
          >
            <Image
              src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${story.banner_image}`}
              alt={story.title}
              width={300}
              height={400}
              className="rounded-md object-cover"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-sm px-2 py-1 rounded">
              <div className="flex gap-1">
                {story.categories.length &&
                  story.categories !== 0 &&
                  story.categories.slice(0,1).map((c, i) => (
                    <p key={i} className="text-sm text-white font-semibold">
                      {c.name || "Uncategorized"}{" "}
                    </p>
                  ))}
              </div>
            </div>
            <div className="absolute bottom-0 px-2 text-white text-sm font-semibold bg-black bg-opacity-50">
              {story.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebStoriesList;
