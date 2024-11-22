import Image from 'next/image';
import React from 'react';
import { FaTrophy } from 'react-icons/fa';

const LatestStories = ({ stories }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-800">Latest Stories</h2>
        <div className="w-32 h-[1px] bg-green-800"></div>
      </div>

      {/* Check if stories exist */}
      {!stories || stories.length === 0 ? (
        <p className="text-center text-gray-500">Data is missing</p>
      ) : (
        <ul className="space-y-4">
          {stories.map((story, index) => (
            <li
              key={index}
              className="flex items-start gap-4 border-b pb-4 last:border-b-0"
            >
              {/* Story Image */}
              {story.banner_image && (
                <Image
                  src={`https://img-cdn.thepublive.com/fit-in/600x200/filters:format(webp)/${story.banner_image}`}
                  alt={story.title}
                  className="rounded object-cover"
                  width={150}
                  height={100}
                />
              )}

              {/* Story Details */}
              <div className="flex-1">
                <div className="flex items-center mb-1">
                 
                  <h3 className="text-sm font-bold text-gray-800">
                    {story.title.slice(0,40)}
                  </h3>
                </div>
                <p className="text-xs text-gray-600">{story.summary.slice(0,50)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LatestStories;
