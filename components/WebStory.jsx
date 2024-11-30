'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSwipeable } from 'react-swipeable';

const WebStory = ({ story }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  return (
    <div 
      {...handlers}
      className={`relative overflow-hidden bg-black text-white ${
        isMobile 
          ? 'fixed inset-0 z-50 h-full w-full' 
          : 'h-screen w-full md:w-2/3 lg:w-1/3 mx-auto'
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex justify-center items-center"
        >
          {story[currentPage] && (
            <Image
              src={`https://dmpsza32x691.cloudfront.net/${story[currentPage].pages[0].image}`}
              alt={story[currentPage].pages[0].heading}
              className="object-cover"
              layout='fill'
              priority
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Only show on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <button
            onClick={handlePrevious}
            className={`p-2 rounded-full bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
              currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-black/70 cursor-pointer'
            }`}
            disabled={currentPage === 0}
          >
            <IoIosArrowBack size={24} />
          </button>

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
      )}

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 flex justify-center space-x-1 p-2 z-10">
        {story.map((_, index) => (
          <div key={index} className="flex-1 h-0.5 bg-gray-500 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: index < currentPage ? "100%" : "0%" }}
              animate={{ 
                width: index === currentPage ? "100%" : index < currentPage ? "100%" : "0%"
              }}
              transition={{ 
                duration: index === currentPage ? 5 : 0,
                ease: "linear"
              }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={`content-${currentPage}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-gradient-to-t from-black/80 via-black/50 to-transparent absolute bottom-0 left-0 right-0 p-4 pt-16"
      >
        {story[currentPage] && <>
          <h1 className="text-xl md:text-3xl font-bold mb-2">{story[currentPage].pages[0].heading}</h1>
          <p className="text-sm md:text-lg mb-4 text-gray-200">{story[currentPage].pages[0].description}</p>
        </>}
      </motion.div>
    </div>
  );
};

export default WebStory;
