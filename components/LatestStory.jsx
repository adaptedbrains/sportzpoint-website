'use client'
import usePostStore from "@/store/postStore";
import Image from "next/image";
import React, { useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";

const LatestStories = () => {
  const router = useRouter();
  const { fetchLatestStory, latestStory } = usePostStore();
  const isFirstLoad = useRef(true); // Ref to track first load

  // Function to fetch posts with optional excludeId
  const fetchPosts = useCallback(
    async (url) => {
      await fetchLatestStory(url); // Fetch and update the store
    },
    [fetchLatestStory]
  );

  // Only fetch the posts on the initial render
  useEffect(() => {
    if (isFirstLoad.current) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/article/latest-articles`;
      fetchPosts(url);
      isFirstLoad.current = false; // Prevent fetching again on re-renders
    }
  }, [fetchPosts]);

  const handleClick = (category,slug, id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/article/latest-articles?excludeId=${id}`;
    fetchPosts(url); // Fetch excluding the clicked story's ID
    router.push(`/${category}/${slug}`); // Navigate to the story's page
  };

  // const truncatedStories = useMemo(() => {
  //   return latestStory &&  latestStory.map((story) => ({
  //     ...story,
  //     title: story.title,
  //     summary:story.summary? story.summary:"",
  //   }));
  // }, [latestStory]);

  return (
    <div className="bg-white rounded-lg p-4 w-full">
      <div className="w-full">
        <div className="flex gap-2 items-center mb-4">
          <h2 className="text-lg font-bold text-green-800">Latest Stories</h2>
          <div className="w-10 mt-2 h-[1px] bg-green-800"></div>
        </div>

        <div className="flex flex-col space-y-3 w-full">
          {latestStory && latestStory.slice(0, 4).map((story, index) => (
            <article
              key={index}
              onClick={() => handleClick(story.categories[0]?.slug, story.slug, story._id)}
              className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200 w-full"
            >
              <div className="w-20 h-16 relative flex-shrink-0">
                {story.banner_image && (
                  <Image
                    src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${story.banner_image}`}
                    alt={story.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                    priority={index === 0}
                  />
                )}
              </div>

              <div className="flex flex-col h-16 justify-between flex-1">
                <span className="text-xs font-medium text-green-700 mb-1">
                  {story.categories?.[0]?.name || 'Sports'}
                </span>

                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 flex-1">
                  {story.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestStories;