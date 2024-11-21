'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { dummyStory } from '../util/headerScore';
import Image from 'next/image';

const WebStory = ({ story = dummyStory[0] }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < story.pages.length - 1) {
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
        <Image
          src={story.pages[currentPage].image}
          alt={story.pages[currentPage].heading}
          className="object-cover rounded-lg shadow-lg"
          layout='fill'

        />

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
        key={currentPage} // Ensures re-animation when page changes
        initial={{ opacity: 0, y: 50 }} // Start state
        animate={{ opacity: 1, y: 0 }} // End state
        exit={{ opacity: 0, y: -50 }} // Exit state
        transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth transition
        className="bg-[rgba(0,0,0,0.5)] left-0 w-[80%] ml-[10%]   bottom-20 absolute mx-auto rounded p-2"
      >
        <h1 className="mt-4 text-3xl font-bold">{story.pages[currentPage].heading}</h1>
        <p className="mt-2 text-lg">{story.pages[currentPage].description}</p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 flex justify-center space-x-2">
        {story.pages.map((_, index) => (
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
