'use client'
import Image from "next/image";
import React from "react";

const ArticleCard = () => {
  return (
    <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <Image
        src="https://img-cdn.thepublive.com/fit-in/1280x720/filters:format(webp)/sportzpoint/media/media_files/2024/11/19/TH4xd5muwXkG5NPMCjxM.png" // Replace with actual image source
        alt="Indian Batting Lineup"
        width={800}
        height={700}
      />
      <div className="p-4">
        <p className="text-sm text-green-600 font-semibold">Cricket</p>
        <h2 className="text-lg font-bold text-gray-800 mt-1">
          Border-Gavaskar Trophy: Here is how India`&apos` batting lineup might look in the first test
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Since Rohit Sharma is out of this test match, the captaincy will be in the hands of Jasprit Bumrah. In such a situation, here is how India can line up their batting order in the first test of Border-Gavaskar Trophy.
        </p>
        <div className="mt-3 flex items-center text-gray-500 text-sm">
          <p>By Payal Debnath</p>
          <span className="mx-2">•</span>
          <p>Nov 19, 2024 20:42 IST</p>
          <span className="mx-2">•</span>
          <p>2 Min read</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
