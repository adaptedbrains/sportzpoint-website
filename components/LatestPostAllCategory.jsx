'use client'
import usePostStore from "@/store/postStore";
import Image from "next/image";
import React, { useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

  const handleClick = (category, id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/article/latest-articles?excludeId=${id}`;
    fetchPosts(url); // Fetch excluding the clicked story's ID
    router.push(`/${category}/${id}`); // Navigate to the story's page
  };

  const truncatedStories = useMemo(() => {
    return latestStory.map((story) => ({
      ...story,
      title: story.title.slice(0, 40),
      summary: story.summary.slice(0, 50),
    }));
  }, [latestStory]);

  return (
    <div className="bg-white rounded shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-800">Latest Stories</h2>
        <div className="w-32 h-[1px] bg-green-800"></div>
      </div>

      {/* Check if stories exist */}
      {!latestStory || latestStory.length === 0 ? (
        <p className="text-center text-gray-500">Data is missing</p>
      ) : (
        <ul className="space-y-4">
          {truncatedStories.map((story, index) => (
            <Link
              key={index}
              
              className="flex items-start gap-4 border-b pb-4 last:border-b-0 cursor-pointer"
              onClick={() => handleClick(story.categories[0].slug, story.slug)}
            >
              {/* Story Image */}
              {story.banner_image && (
                <Image
                  src={`https://sportzpoint.s3.ap-south-1.amazonaws.com/${story.banner_image}`}
                  alt={story.title}
                  className="rounded object-cover"
                  width={150}
                  height={100}
                />
              )}

              {/* Story Details */}
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <h3 className="text-sm font-bold text-gray-800">{story.title}</h3>
                </div>
                <p className="text-xs text-gray-600">{story.summary}</p>
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestStories;