'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'; // Import arrow icons

const WebStory = ({ story }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const handleNext = () => {
    if (currentPage < story.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="h-screen bg-black text-white relative overflow-hidden w-1/3 mx-auto">
      {/* Current Page */}
      <div className="absolute inset-0 flex justify-center items-center">
        {story[currentPage] && (
          <Image
            src={`https://img-cdn.thepublive.com/fit-in/1280x720/filters:format(webp)/sportzpoint/media/${story[currentPage].pages[0].image}`}
            alt={story[currentPage].pages[0].heading}
            className="object-cover rounded-lg shadow-lg"
            layout='fill'
          />
        )}

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          {/* Left Arrow */}
          <button
            onClick={handlePrevious}
            className={`p-2 rounded-full bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
              currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-black/70 cursor-pointer'
            }`}
            disabled={currentPage === 0}
          >
            <IoIosArrowBack size={24} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className={`p-2 rounded-full bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
              currentPage === story.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-black/70 cursor-pointer'
            }`}
            disabled={currentPage === story.length - 1}
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>

        {/* Overlay for clickable areas */}
        <div className="absolute inset-0 flex">
          {/* Left part for previous */}
          <div
            onClick={handlePrevious}
            className="flex-1 h-full cursor-pointer bg-transparent"
          ></div>
          {/* Right part for next */}
          <div
            onClick={handleNext}
            className="flex-1 h-full cursor-pointer bg-transparent"
          ></div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-[rgba(0,0,0,0.5)] left-0 w-[80%] ml-[10%]   bottom-20 absolute mx-auto rounded p-2"
      >
        {story[currentPage] &&  <>
          <h1 className="mt-4 text-3xl font-bold">{story[currentPage].pages[0].heading}</h1>
          <p className="mt-2 text-lg">{story[currentPage].pages[0].description}</p>
        </>}
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 flex justify-center space-x-2">
        {story.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-10 flex-1 rounded-full ${
              index === currentPage ? 'bg-white' : 'bg-gray-500'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default WebStory;
