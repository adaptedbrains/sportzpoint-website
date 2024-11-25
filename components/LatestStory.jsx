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

  const truncatedStories = useMemo(() => {
    return latestStory.map((story) => ({
      ...story,
      title: story.title,
      summary:story.summary? story.summary:"",
    }));
  }, [latestStory]);

  return (
    <div className=" rounded shadow ">
      {/* Header */}
      <div className="flex gap-2 items-center mb-4">
        <h2 className="text-xl font-bold text-green-800">Latest Stories</h2>
        <div className="w-10 mt-2 h-[1px] bg-green-800"></div>
      </div>

      {/* Check if stories exist */}
      {!latestStory || latestStory.length === 0 ? (
        <p className="text-center text-gray-500">Data is missing</p>
      ) : (
        <ul className="space-y-4">
          {truncatedStories.map((story, index) => (
            <li
              key={index}
              className="flex flex-col items-start gap-4 border-b pb-4 last:border-b-0 cursor-pointer bg-white p-2 shadow-md"
              onClick={() => handleClick(story.categories[0].slug, story.slug,story._id)}
            >
              {/* Story Image */}
              {story.banner_image && (
                <div className="w-full relative h-40">

                <Image
                  src={`https://sportzpoint-media.s3.ap-south-1.amazonaws.com/${story.banner_image}`}
                  alt={story.title}
                  className="rounded"
                 layout="fill"
                 objectFit="cover"
                 objectPosition="center"
                 priority
                 
                  />
                  </div>
              )}

              {/* Story Details */}
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h3 className="text-sm font-bold text-gray-800">{story.title}</h3>
                </div>
                <p className="text-xs text-gray-600">{story.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
   
  );
};

export default LatestStories;