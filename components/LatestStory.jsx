"use client";
import usePostStore from "@/store/postStore";
import Image from "next/image";
import React, { useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

const LatestStories = () => {
  const router = useRouter();
  const { fetchLatestStory, latestStory } = usePostStore();
  const isFirstLoad = useRef(true);

  const fetchPosts = useCallback(
    async (url) => {
      await fetchLatestStory(url);
    },
    [fetchLatestStory]
  );

  useEffect(() => {
    if (isFirstLoad.current) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/article/latest-articles`;
      fetchPosts(url);
      isFirstLoad.current = false;
    }
  }, [fetchPosts]);

  const handleClick = (category, slug, id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/article/latest-articles?excludeId=${id}`;
    fetchPosts(url);
    router.push(`/${category}/${slug}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 h-full">
      <div className="p-4 border-b border-gray-100">
        <div className="flex gap-2 items-center">
          <h2 className="text-lg font-semibold text-[#006356]">
            Latest Stories
          </h2>
          <div className="w-10 h-[1px] bg-[#006356] mt-1"></div>
        </div>
      </div>

      <div className="py-3">
        <div className="flex flex-col space-y-3">
          {latestStory &&
            latestStory.slice(0, 4).map((story, index) => (
              <article
                key={index}
                onClick={() =>
                  handleClick(story.primary_category?.[0]?.slug, story.slug, story._id)
                }
                className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 px-4 py-2 transition-colors duration-200"
              >
                <div className="relative w-24 aspect-[16/9] flex-shrink-0">
                  {story.banner_image && (
                    <Image
                      src={`https://dmpsza32x691.cloudfront.net/${story.banner_image}`}
                      alt={story.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                      priority={index === 0}
                    />
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1 min-h-[64px]">
                  <span className="text-xs font-medium text-[#006356]">
                    {story.primary_category?.[0]?.name}
                   
                  </span>

                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
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
